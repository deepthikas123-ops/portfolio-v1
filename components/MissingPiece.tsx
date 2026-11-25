'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import '../app/puzzle.css';
import {
  CONTACTS,
  LAYOUTS,
  MISSING,
  PIECES,
  PUZZLE_RATIO,
  START_ROTATION,
  geometry,
  type PuzzleLayout,
} from './puzzle-config';

type Pos = { x: number; y: number; r: number };
type Phase = 'idle' | 'drag' | 'key' | 'snap' | 'return' | 'done';

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const smooth = (t: number) => t * t * (3 - 2 * t);
const topPct = (y: number) => `${(y / (100 / PUZZLE_RATIO)) * 100}%`;

/** Timings (ms) for the Stage 1 → Stage 2 hand-off. */
const T = {
  snap: 380, // the piece settles into its slot
  hold: 820, // highlight + confirmation, measured from the snap landing
  fadeOut: 450, // Stage 1 leaves
  fadeIn: 650, // Stage 2 arrives (CSS owns the actual fade; this is when focus moves)
};

/**
 * Two consecutive full-screen states in one section:
 *  Stage 1 — "The Missing Piece": a four-piece jigsaw; drag the loose piece into the slot.
 *  Stage 2 — "Before you leave": the contact links, revealed only after the puzzle is solved.
 * Pointer-driven (mouse/touch/pen) with a keyboard route (arrows to move, Enter/Space to place).
 */
export default function MissingPiece() {
  const stageRef = useRef<HTMLDivElement>(null);
  const titleTwoRef = useRef<HTMLHeadingElement>(null);
  const [layoutKey, setLayoutKey] = useState<'desktop' | 'mobile'>('desktop');
  const [pos, setPos] = useState<Pos | null>(null); // null = resting at its start position (CSS default)
  const [phase, setPhase] = useState<Phase>('idle');
  const [near, setNear] = useState(0); // 0..1 proximity for the slot preview
  const [solved, setSolved] = useState(false); // puzzle complete: highlight + confirmation heading
  const [s1On, setS1On] = useState(true); // Stage 1 visible
  const [s2On, setS2On] = useState(false); // Stage 2 visible
  const [touched, setTouched] = useState(false);
  const drag = useRef<{ id: number; sx: number; sy: number; ox: number; oy: number; k: number; moved: boolean } | null>(null);
  const solvedOnce = useRef(false);
  const timers = useRef<number[]>([]);

  const L: PuzzleLayout = LAYOUTS[layoutKey];
  const G = geometry(L);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 720px)');
    const sync = () => setLayoutKey(mq.matches ? 'mobile' : 'desktop');
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };
  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /** Rotation for a piece-centre offset from the slot: sideways when far, upright when close. */
  const rotationAt = useCallback(
    (x: number, y: number) => {
      const t = clamp(Math.hypot(x, y) / (G.d0 * 0.8), 0, 1);
      return START_ROTATION * smooth(t);
    },
    [G.d0],
  );

  /** Keep the whole (rotated) piece inside the stage. */
  const confine = useCallback(
    (x: number, y: number, r: number): Pos => {
      const rad = (r * Math.PI) / 180;
      const hw = (Math.abs(Math.cos(rad)) * G.pieceW + Math.abs(Math.sin(rad)) * G.pieceH) / 2;
      const hh = (Math.abs(Math.sin(rad)) * G.pieceW + Math.abs(Math.cos(rad)) * G.pieceH) / 2;
      const cx = clamp(G.cx + x, hw, 100 - hw);
      const cy = clamp(G.cy + y, hh, L.sh - hh);
      return { x: cx - G.cx, y: cy - G.cy, r };
    },
    [G.cx, G.cy, G.pieceW, G.pieceH, L.sh],
  );

  const moveTo = useCallback(
    (x: number, y: number) => {
      const r0 = rotationAt(x, y);
      const p = confine(x, y, r0);
      p.r = rotationAt(p.x, p.y);
      setPos(p);
      const d = Math.hypot(p.x, p.y);
      setNear(d < G.preview ? 1 - d / G.preview : 0);
      return d;
    },
    [confine, rotationAt, G.preview],
  );

  /** Snap in → highlight → Stage 1 fades out → Stage 2 fades in. */
  const solve = useCallback((viaKeyboard = false) => {
    if (solvedOnce.current) return;
    solvedOnce.current = true;
    const rm = reduced();
    const snap = rm ? 0 : T.snap;
    const hold = rm ? 500 : T.hold;
    setPhase('snap');
    setPos({ x: 0, y: 0, r: 0 });
    setNear(0);
    later(() => {
      setPhase('done');
      setSolved(true);
    }, snap);
    later(() => setS1On(false), snap + hold);
    later(() => {
      setS2On(true);
      later(() => titleTwoRef.current?.focus({ preventScroll: true }), viaKeyboard || rm ? 100 : T.fadeIn);
    }, snap + hold + (rm ? 0 : T.fadeOut));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendBack = useCallback(() => {
    setPhase('return');
    setPos(null);
    setNear(0);
    later(() => setPhase('idle'), reduced() ? 0 : 700);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Replay: Stage 2 leaves, the puzzle resets, Stage 1 returns. */
  const replay = () => {
    clearTimers();
    const rm = reduced();
    setS2On(false);
    later(() => {
      solvedOnce.current = false;
      drag.current = null;
      setSolved(false);
      setPos(null);
      setPhase('idle');
      setNear(0);
      setTouched(false);
      setS1On(true);
    }, rm ? 0 : T.fadeOut);
  };

  const current = (): { x: number; y: number } => (pos ? { x: pos.x, y: pos.y } : { x: G.ox, y: G.oy });

  /* ---------- pointer dragging ---------- */
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (solved || phase === 'snap' || (e.pointerType === 'mouse' && e.button !== 0)) return;
    e.preventDefault();
    const stage = stageRef.current;
    if (!stage) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const c = current();
    drag.current = { id: e.pointerId, sx: e.clientX, sy: e.clientY, ox: c.x, oy: c.y, k: stage.getBoundingClientRect().width / 100, moved: false };
    setTouched(true);
    setPhase('drag');
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.sx;
    const dy = e.clientY - d.sy;
    if (!d.moved && Math.hypot(dx, dy) < 3) return;
    d.moved = true;
    moveTo(d.ox + dx / d.k, d.oy + dy / d.k);
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    drag.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
    if (!d.moved) {
      setPhase('idle');
      return;
    }
    const x = d.ox + (e.clientX - d.sx) / d.k;
    const y = d.oy + (e.clientY - d.sy) / d.k;
    const p = confine(x, y, rotationAt(x, y));
    if (e.type !== 'pointercancel' && Math.hypot(p.x, p.y) <= G.snap) solve();
    else sendBack();
  };

  /* ---------- keyboard alternative ---------- */
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (solved || phase === 'snap') return;
    const step = e.shiftKey ? 7 : 2.5;
    const c = current();
    let handled = true;
    switch (e.key) {
      case 'ArrowLeft': setPhase('key'); moveTo(c.x - step, c.y); break;
      case 'ArrowRight': setPhase('key'); moveTo(c.x + step, c.y); break;
      case 'ArrowUp': setPhase('key'); moveTo(c.x, c.y - step); break;
      case 'ArrowDown': setPhase('key'); moveTo(c.x, c.y + step); break;
      case 'Enter':
      case ' ':
        solve(true);
        break;
      case 'Escape': sendBack(); break;
      default: handled = false;
    }
    if (handled) {
      e.preventDefault();
      setTouched(true);
    }
  };

  /* ---------- derived values ---------- */
  const style = {
    '--d-px': LAYOUTS.desktop.px, '--d-py': LAYOUTS.desktop.py, '--d-pw': LAYOUTS.desktop.pw,
    '--d-sx': LAYOUTS.desktop.sx, '--d-sy': LAYOUTS.desktop.sy, '--d-sh': LAYOUTS.desktop.sh,
    '--m-px': LAYOUTS.mobile.px, '--m-py': LAYOUTS.mobile.py, '--m-pw': LAYOUTS.mobile.pw,
    '--m-sx': LAYOUTS.mobile.sx, '--m-sy': LAYOUTS.mobile.sy, '--m-sh': LAYOUTS.mobile.sh,
    '--bx': (MISSING.x + MISSING.w / 2) / 100,
    '--by': (MISSING.y + MISSING.h / 2) / 100,
    '--ratio': PUZZLE_RATIO,
    '--rot0': `${START_ROTATION}deg`,
  } as React.CSSProperties;

  const pieceStyle = pos
    ? ({ transform: `translate(${pos.x}cqw, ${pos.y}cqw) rotate(${pos.r}deg)` } as React.CSSProperties)
    : undefined;

  /* dashed guide from the loose piece towards its slot (stage units: 1 = 1cqw) */
  const arrow = (() => {
    const ux = -G.ox / G.d0;
    const uy = -G.oy / G.d0;
    const x0 = L.sx + ux * (0.5 * G.pieceH + 3);
    const y0 = L.sy + uy * (0.5 * G.pieceH + 3);
    const x1 = L.sx + ux * G.d0 * 0.72;
    const y1 = L.sy + uy * G.d0 * 0.72;
    const mx = (x0 + x1) / 2 + -uy * 7;
    const my = (y0 + y1) / 2 + ux * 7;
    const ang = Math.atan2(y1 - my, x1 - mx);
    const head = (a: number) => `${(x1 + Math.cos(ang + a) * 2.4).toFixed(2)},${(y1 + Math.sin(ang + a) * 2.4).toFixed(2)}`;
    return {
      path: `M${x0.toFixed(2)},${y0.toFixed(2)} Q${mx.toFixed(2)},${my.toFixed(2)} ${x1.toFixed(2)},${y1.toFixed(2)}`,
      head: `M${head(Math.PI - 0.55)} L${x1.toFixed(2)},${y1.toFixed(2)} L${head(Math.PI + 0.55)}`,
    };
  })();
  const showHint = !touched && !solved;

  return (
    <section
      className={`index-puzzle${solved ? ' is-solved' : ''}${s2On ? ' on-two' : ''}`}
      id="contact"
      aria-label="Contact"
    >
      <div className="wrap pz-stages">
        {/* ───────────── STAGE 1 · 06 / THE MISSING PIECE ───────────── */}
        <div className={`pz-s1${s1On ? '' : ' is-off'}`} aria-hidden={!s1On}>
          <div className="pz-grid">
            <div className="pz-copy">
              <p className="index-section-kicker">06 / THE MISSING PIECE</p>
              <h2 id="pz-title" className="pz-title">
                <span className="pz-line pz-line-a" aria-hidden={solved}>
                  Something&rsquo;s<br />
                  <em>missing.</em>
                </span>
                <span className="pz-line pz-line-b" aria-hidden={!solved}>
                  Looks like we&rsquo;ve found the <em>missing connection.</em>
                </span>
              </h2>
              <p className="pz-pill" aria-hidden={solved}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 14a8 8 0 0 1-8 8" />
                  <path d="M18 11v-1a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
                  <path d="M14 10V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1" />
                  <path d="M10 9.5V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v10" />
                  <path d="M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
                </svg>
                <span>DRAG THE PIECE INTO PLACE.</span>
              </p>
            </div>

            <div className="pz-stage-wrap" style={style}>
              <div ref={stageRef} className={`pz-stage phase-${phase}`}>
                <div className={`pz-puzzle${solved ? ' pulse' : ''}`}>
                  {PIECES.filter((p) => !p.missing).map((p) => (
                    <div
                      key={p.id}
                      className={`pz-piece pz-${p.tone}`}
                      style={{ left: `${p.x}%`, top: topPct(p.y), width: `${p.w}%` }}
                      aria-hidden="true"
                    >
                      <img src={p.src} alt="" draggable={false} />
                    </div>
                  ))}

                  <div
                    className="pz-ghost"
                    aria-hidden="true"
                    style={{
                      left: `${MISSING.x}%`,
                      top: topPct(MISSING.y),
                      width: `${MISSING.w}%`,
                      aspectRatio: `${MISSING.w} / ${MISSING.h}`,
                      opacity: near * 0.6,
                      WebkitMaskImage: `url(${MISSING.src})`,
                      maskImage: `url(${MISSING.src})`,
                    }}
                  />

                  <div
                    className={`pz-piece pz-missing pz-${MISSING.tone}${phase === 'drag' ? ' is-drag' : ''}${solved ? ' is-placed' : ''}`}
                    style={{ left: `${MISSING.x}%`, top: topPct(MISSING.y), width: `${MISSING.w}%`, ...pieceStyle }}
                    role="button"
                    tabIndex={s1On && !solved ? 0 : -1}
                    aria-disabled={solved}
                    aria-label={
                      solved
                        ? 'Puzzle piece, placed'
                        : 'Missing puzzle piece, bottom right. Drag it into the empty slot, or use the arrow keys to move it and Enter to place it.'
                    }
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={endDrag}
                    onPointerCancel={endDrag}
                    onKeyDown={onKeyDown}
                  >
                    <img src={MISSING.src} alt="" draggable={false} />
                  </div>
                </div>

                {showHint && (
                  <svg className="pz-guide" viewBox={`0 0 100 ${L.sh}`} preserveAspectRatio="none" aria-hidden="true">
                    <path className="pz-guide-line" d={arrow.path} />
                    <path className="pz-guide-head" d={arrow.head} />
                  </svg>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ───────────── STAGE 2 · 07 / BEFORE YOU LEAVE ───────────── */}
        <div className={`pz-s2${s2On ? ' is-on' : ''}`} aria-hidden={!s2On}>
          <div className="pz-two-copy">
            <p className="index-section-kicker">07 / BEFORE YOU LEAVE</p>
            <h2 id="pz-title-two" className="pz-title-two" ref={titleTwoRef} tabIndex={-1}>
              Have something
              <br />
              <em>interesting in mind?</em>
            </h2>
            <p className="pz-desc">
              I&rsquo;m always happy to talk about design, research, making, and ideas that refuse to sit in one category.
            </p>
          </div>

          <div className="pz-two-row">
            <ul className="pz-contact-inner">
              {CONTACTS.map((c, i) => (
                <li key={c.id} style={{ ['--i' as string]: i } as React.CSSProperties}>
                  <a
                    className="pz-card"
                    href={c.href}
                    aria-label={c.aria}
                    {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    tabIndex={s2On ? 0 : -1}
                  >
                    <span className="pz-sym" aria-hidden="true">{c.symbol}</span>
                    <span className="pz-lab">{c.label}</span>
                    <span className="pz-arrow" aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="pz-motif">
              <div className="pz-mini" aria-hidden="true" style={{ aspectRatio: String(PUZZLE_RATIO) }}>
                {PIECES.map((p) => (
                  <img
                    key={p.id}
                    src={p.src}
                    alt=""
                    draggable={false}
                    style={{ left: `${p.x}%`, top: topPct(p.y), width: `${p.w}%` }}
                  />
                ))}
              </div>
              <button type="button" className="pz-replay" onClick={replay} tabIndex={s2On ? 0 : -1}>
                <span aria-hidden="true">↺</span> Play again
              </button>
            </div>
          </div>
        </div>

        <p className="pz-sr" role="status" aria-live="polite">
          {s2On ? 'Puzzle complete. Contact options are now available.' : solved ? 'Looks like we’ve found the missing connection.' : ''}
        </p>
      </div>
    </section>
  );
}
