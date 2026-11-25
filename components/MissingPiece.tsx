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

/**
 * "The Missing Piece" — a four-piece jigsaw. Three pieces are assembled; the visitor drags the
 * fourth (turned sideways) into the empty slot, which reveals the contact links.
 * Pointer-driven (mouse/touch/pen) with a keyboard route (arrows to move, Enter/Space to place).
 */
export default function MissingPiece() {
  const stageRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const [layoutKey, setLayoutKey] = useState<'desktop' | 'mobile'>('desktop');
  const [pos, setPos] = useState<Pos | null>(null); // null = resting at its start position (CSS default)
  const [phase, setPhase] = useState<Phase>('idle');
  const [near, setNear] = useState(0); // 0..1 proximity for the slot preview
  const [solved, setSolved] = useState(false);
  const [touched, setTouched] = useState(false);
  const drag = useRef<{ id: number; sx: number; sy: number; ox: number; oy: number; k: number; moved: boolean } | null>(null);
  const solvedOnce = useRef(false);
  const viaKeyboard = useRef(false);
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

  const solve = useCallback(() => {
    if (solvedOnce.current) return;
    solvedOnce.current = true;
    setPhase('snap');
    setPos({ x: 0, y: 0, r: 0 });
    setNear(0);
    later(
      () => {
        setPhase('done');
        setSolved(true);
        if (viaKeyboard.current) {
          later(() => contactRef.current?.querySelector<HTMLElement>('a')?.focus({ preventScroll: true }), 700);
        }
      },
      reduced() ? 0 : 480,
    );
  }, []);

  const sendBack = useCallback(() => {
    setPhase('return');
    setPos(null);
    setNear(0);
    later(() => setPhase('idle'), reduced() ? 0 : 700);
  }, []);

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
    const c = current();
    // read the freshest position from the event instead of (possibly stale) state
    const x = d.ox + (e.clientX - d.sx) / d.k;
    const y = d.oy + (e.clientY - d.sy) / d.k;
    const p = confine(x, y, rotationAt(x, y));
    const dist = e.type === 'pointercancel' ? Math.hypot(c.x, c.y) : Math.hypot(p.x, p.y);
    if (e.type !== 'pointercancel' && dist <= G.snap) solve();
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
        viaKeyboard.current = true;
        solve();
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

  const hintAngle = (Math.atan2(-G.oy, -G.ox) * 180) / Math.PI;
  const showHint = !touched && !solved;

  return (
    <section className={`index-puzzle${solved ? ' is-solved' : ''}`} id="contact" aria-labelledby="pz-title">
      <div className="wrap">
        <div className="pz-grid">
          <div className="pz-copy">
            <p className="index-section-kicker">06 / THE MISSING PIECE</p>
            <h2 id="pz-title" className="pz-title">
              <span className="pz-line pz-line-a" aria-hidden={solved}>DRAG THE PIECE INTO PLACE<span className="pz-dot">.</span></span>
              <span className="pz-line pz-line-b" aria-hidden={!solved}>
                Looks like we&rsquo;ve found the <em>missing connection.</em>
              </span>
            </h2>
          </div>

          <div className="pz-stage-wrap" style={style}>
            <div ref={stageRef} className={`pz-stage phase-${phase}`}>
              <div className={`pz-puzzle${solved ? ' pulse' : ''}`}>
                {PIECES.filter((p) => !p.missing).map((p) => (
                  <div
                    key={p.id}
                    className={`pz-piece pz-${p.tone}`}
                    style={{ left: `${p.x}%`, top: `${(p.y / (100 / PUZZLE_RATIO)) * 100}%`, width: `${p.w}%` }}
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
                    top: `${(MISSING.y / (100 / PUZZLE_RATIO)) * 100}%`,
                    width: `${MISSING.w}%`,
                    aspectRatio: `${MISSING.w} / ${MISSING.h}`,
                    opacity: near * 0.6,
                    WebkitMaskImage: `url(${MISSING.src})`,
                    maskImage: `url(${MISSING.src})`,
                  }}
                />

                <div
                  className={`pz-piece pz-missing pz-${MISSING.tone}${phase === 'drag' ? ' is-drag' : ''}${solved ? ' is-placed' : ''}`}
                  style={{
                    left: `${MISSING.x}%`,
                    top: `${(MISSING.y / (100 / PUZZLE_RATIO)) * 100}%`,
                    width: `${MISSING.w}%`,
                    ...pieceStyle,
                  }}
                  role="button"
                  tabIndex={solved ? -1 : 0}
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
                <div className="pz-hint" aria-hidden="true" style={{ ['--ang' as string]: `${hintAngle}deg` } as React.CSSProperties}>
                  <svg viewBox="0 0 40 24" width="40" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 12h32M26 4l9 8-9 8" />
                  </svg>
                </div>
              )}
            </div>
            <div ref={contactRef} className={`pz-contact${solved ? ' is-open' : ''}`}>
              <ul className="pz-contact-inner">
                {CONTACTS.map((c, i) => (
                  <li key={c.id} style={{ ['--i' as string]: i } as React.CSSProperties}>
                    <a
                      className="pz-card"
                      href={c.href}
                      aria-label={c.aria}
                      {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      tabIndex={solved ? 0 : -1}
                    >
                      <span className="pz-sym" aria-hidden="true">{c.symbol}</span>
                      <span className="pz-lab">{c.label}</span>
                      <span className="pz-arrow" aria-hidden="true">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        <p className="pz-sr" role="status" aria-live="polite">
          {solved ? 'Looks like we’ve found the missing connection. Email, LinkedIn and Behance links are now available.' : ''}
        </p>
      </div>
    </section>
  );
}
