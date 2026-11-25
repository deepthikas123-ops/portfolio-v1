'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { boardItems, type BoardItem, type Placement } from './corkboard-items';
import { BookBox, BookNote } from './CorkboardBook';
import '../app/corkboard.css';

type Layout = 'desktop' | 'mobile';
type State = { x: number; y: number; r: number; z: number };
type Positions = Record<string, State>;

const STORAGE = 'deepthika-corkboard-v2';
const MOBILE_QUERY = '(max-width: 720px)';
const DRAG_THRESHOLD = 5;

const defaults = (layout: Layout, items: BoardItem[]): Positions =>
  Object.fromEntries(items.map((it) => {
    const p: Placement = it[layout];
    return [it.id, { x: p.x, y: p.y, r: p.r, z: p.z }];
  }));

const read = (layout: Layout): Positions | null => {
  try {
    const raw = window.localStorage.getItem(`${STORAGE}:${layout}`);
    return raw ? (JSON.parse(raw) as Positions) : null;
  } catch { return null; }
};
const write = (layout: Layout, pos: Positions) => {
  try { window.localStorage.setItem(`${STORAGE}:${layout}`, JSON.stringify(pos)); } catch { /* storage unavailable */ }
};
const forget = (layout: Layout) => { try { window.localStorage.removeItem(`${STORAGE}:${layout}`); } catch { /* ignore */ } };

/** Keep an object's (rotated) bounding box inside the cork area. Returns the clamped centre as %. */
function clampCentre(x: number, y: number, r: number, el: HTMLElement, stage: DOMRect) {
  const rad = (r * Math.PI) / 180, c = Math.abs(Math.cos(rad)), s = Math.abs(Math.sin(rad));
  const w = el.offsetWidth, h = el.offsetHeight;
  const hw = ((w * c + h * s) / 2 / stage.width) * 100, hh = ((w * s + h * c) / 2 / stage.height) * 100;
  return {
    x: Math.min(Math.max(x, Math.min(hw, 50)), Math.max(100 - hw, 50)),
    y: Math.min(Math.max(y, Math.min(hh, 50)), Math.max(100 - hh, 50)),
  };
}

function renderItem(it: BoardItem, bookOpen: boolean) {
  switch (it.kind) {
    case 'photo':
      return (
        <div className="cb-polaroid" style={{ aspectRatio: String(it.frame!.ratio) }}>
          <img
            className="cb-photo-img" src={it.photo!.src} alt="" draggable={false}
            style={{
              left: `${it.frame!.hole[0]}%`, top: `${it.frame!.hole[1]}%`,
              width: `${it.frame!.hole[2]}%`, height: `${it.frame!.hole[3]}%`,
              objectPosition: it.photo!.position ?? 'center',
            }}
          />
          <img className="cb-photo-frame" src={it.frame!.src} alt="" draggable={false} />
        </div>
      );
    case 'book':
      return <BookBox src={it.src!} open={bookOpen} />;
    case 'note':
      return (
        <div className="cb-note-in">
          <img className="cb-note-img" src={it.src} alt="" draggable={false} />
          <span className="cb-note-text" style={{ fontSize: `${it.fs ?? 14}cqw`, color: it.ink, transform: `rotate(${it.tilt ?? 0}deg)` }}>{it.text}</span>
        </div>
      );
    default:
      return <img className="cb-decor" src={it.src} alt="" draggable={false} />;
  }
}

export default function Corkboard({ items = boardItems }: { items?: BoardItem[] }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const els = useRef<Record<string, HTMLElement | null>>({});
  const drag = useRef<{ id: string; sx: number; sy: number; cx: number; cy: number; moved: boolean } | null>(null);
  const zTop = useRef(100);

  const [layout, setLayout] = useState<Layout>('desktop');
  const [pos, setPos] = useState<Positions | null>(null);
  const [active, setActive] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const rot = useRef<{ id: string; a0: number; r0: number } | null>(null);
  const [easing, setEasing] = useState(false);
  const [note, setNote] = useState<{ rect: DOMRect; rotation: number } | null>(null);
  const loaded = useRef(false);

  // Hydrate on the client: pick the layout for this viewport, then restore any saved arrangement.
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const apply = () => {
      const l: Layout = mq.matches ? 'mobile' : 'desktop';
      const base = defaults(l, items);
      const saved = read(l);
      const merged: Positions = { ...base };
      if (saved) for (const id of Object.keys(base)) if (saved[id]) merged[id] = { ...base[id], ...saved[id] };
      zTop.current = Math.max(100, ...Object.values(merged).map((p) => p.z));
      loaded.current = true;
      setLayout(l);
      setPos(merged);
    };
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, [items]);

  useEffect(() => { if (pos && loaded.current) write(layout, pos); }, [pos, layout]);

  const bringToFront = useCallback((id: string) => {
    setPos((p) => (p ? { ...p, [id]: { ...p[id], z: ++zTop.current } } : p));
  }, []);

  const onDown = (e: React.PointerEvent<HTMLDivElement>, id: string) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    if (!pos || !stageRef.current) return;
    const p = pos[id];
    drag.current = { id, sx: e.clientX, sy: e.clientY, cx: p.x, cy: p.y, moved: false };
    e.currentTarget.setPointerCapture(e.pointerId);
    setEasing(false);
    setSelected(id);
    bringToFront(id);
  };

  // Sticky notes can also be turned: drag the small handle at their lower-left corner.
  const centreOf = (id: string) => {
    const r = els.current[id]?.getBoundingClientRect();
    return r ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : { x: 0, y: 0 };
  };
  const onRotDown = (e: React.PointerEvent<HTMLElement>, id: string) => {
    if (!pos) return;
    e.stopPropagation();
    const c = centreOf(id);
    rot.current = { id, a0: Math.atan2(e.clientY - c.y, e.clientX - c.x), r0: pos[id].r };
    e.currentTarget.setPointerCapture(e.pointerId);
    setEasing(false); setActive(id); setSelected(id); bringToFront(id);
  };
  const onRotMove = (e: React.PointerEvent<HTMLElement>, id: string) => {
    const g = rot.current; if (!g || g.id !== id || !stageRef.current) return;
    e.stopPropagation();
    const c = centreOf(id);
    const a = Math.atan2(e.clientY - c.y, e.clientX - c.x);
    const r = g.r0 + ((a - g.a0) * 180) / Math.PI;
    const stage = stageRef.current.getBoundingClientRect(); const el = els.current[id]; if (!el) return;
    setPos((p) => {
      if (!p) return p;
      const q = clampCentre(p[id].x, p[id].y, r, el, stage);
      return { ...p, [id]: { ...p[id], r, ...q } };
    });
  };
  const onRotUp = (e: React.PointerEvent<HTMLElement>, id: string) => {
    if (rot.current?.id !== id) return;
    e.stopPropagation(); rot.current = null; setActive(null);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const onMove = (e: React.PointerEvent<HTMLDivElement>, id: string) => {
    const d = drag.current;
    if (!d || d.id !== id || !stageRef.current) return;
    const dx = e.clientX - d.sx, dy = e.clientY - d.sy;
    if (!d.moved) {
      if (Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
      d.moved = true; setActive(id);
    }
    const stage = stageRef.current.getBoundingClientRect();
    const el = els.current[id]; if (!el) return;
    setPos((p) => {
      if (!p) return p;
      const c = clampCentre(d.cx + (dx / stage.width) * 100, d.cy + (dy / stage.height) * 100, p[id].r, el, stage);
      return { ...p, [id]: { ...p[id], ...c } };
    });
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>, id: string, cancelled = false) => {
    const d = drag.current;
    if (!d || d.id !== id) return;
    drag.current = null;
    setActive(null);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
    const item = items.find((i) => i.id === id);
    if (!cancelled && !d.moved && item?.kind === 'book') openNote(e.currentTarget);
  };

  const openNote = (el: HTMLElement) => {
    if (!pos) return;
    setNote({ rect: el.getBoundingClientRect(), rotation: pos.book?.r ?? 0 });
  };

  const settle = () => { setEasing(true); window.setTimeout(() => setEasing(false), 800); };

  const reset = () => {
    forget(layout); settle();
    zTop.current = 100;
    setPos(defaults(layout, items));
  };

  const shuffle = () => {
    const stage = stageRef.current?.getBoundingClientRect(); if (!stage || !pos) return;
    settle();
    const next: Positions = {};
    const placed: { x: number; y: number }[] = [];
    // Larger objects first, so they keep their breathing room; small decor lands wherever it likes.
    const order = [...items].sort((a, b) => b[layout].w - a[layout].w);
    for (const it of order) {
      const el = els.current[it.id]; if (!el) { next[it.id] = pos[it.id]; continue; }
      const major = it.kind === 'photo' || it.kind === 'book' || it.kind === 'note';
      const r = (Math.random() * 2 - 1) * (major ? 8 : 24);
      let best = { x: 50, y: 50 }, bestD = -1;
      for (let i = 0; i < (major ? 40 : 1); i++) {
        const c = clampCentre(8 + Math.random() * 84, 8 + Math.random() * 84, r, el, stage);
        const dist = placed.length ? Math.min(...placed.map((q) => Math.hypot((q.x - c.x) * (stage.width / stage.height), q.y - c.y))) : 99;
        if (dist > bestD) { best = c; bestD = dist; }
      }
      if (major) placed.push(best);
      next[it.id] = { x: best.x, y: best.y, r, z: ++zTop.current };
    }
    setPos(next);
  };

  const closeNote = useCallback(() => setNote(null), []);
  const book = items.find((i) => i.kind === 'book');

  return (
    <div className="cb" data-layout={layout}>
      <div className="cb-wrap">
        <div className="cb-board">
          <div className="cb-stage" ref={stageRef} onPointerDown={(e) => { if (e.target === e.currentTarget) setSelected(null); }}>
            {pos && items.map((it) => {
              const p = pos[it.id]; if (!p) return null;
              const isBook = it.kind === 'book';
              return (
                <div
                  key={it.id}
                  ref={(el) => { els.current[it.id] = el; }}
                  className={`cb-item cb-${it.kind}${active === it.id ? ' is-dragging' : ''}${selected === it.id ? ' is-selected' : ''}${easing ? ' is-easing' : ''}${isBook && note ? ' is-away' : ''}`}
                  style={{ left: `${p.x}%`, top: `${p.y}%`, width: `${it[layout].w}cqw`, zIndex: p.z, ['--r' as string]: `${p.r}deg` }}
                  onPointerDown={(e) => onDown(e, it.id)}
                  onPointerMove={(e) => onMove(e, it.id)}
                  onPointerUp={(e) => endDrag(e, it.id)}
                  onPointerCancel={(e) => endDrag(e, it.id, true)}
                  onDragStart={(e) => e.preventDefault()}
                  {...(isBook ? {
                    role: 'button', tabIndex: 0, 'aria-label': it.label,
                    onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openNote(e.currentTarget); } },
                  } : it.label ? { role: 'img', 'aria-label': it.label } : { 'aria-hidden': true })}
                >
                  {renderItem(it, false)}
                  {it.kind === 'note' && (
                    <span
                      className="cb-rot" aria-hidden="true" title="Turn"
                      onPointerDown={(e) => onRotDown(e, it.id)}
                      onPointerMove={(e) => onRotMove(e, it.id)}
                      onPointerUp={(e) => onRotUp(e, it.id)}
                      onPointerCancel={(e) => onRotUp(e, it.id)}
                    >
                      <svg viewBox="0 0 16 16" width="12" height="12"><path d="M13 8a5 5 0 1 1-1.6-3.7M13 2v3h-3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="cb-controls">
        <p className="cb-hint">Drag things around. Explore a little.</p>
        <div className="cb-buttons">
          <button type="button" className="cb-btn" onClick={shuffle}>Shuffle</button>
          <button type="button" className="cb-btn" onClick={reset}>Reset board</button>
        </div>
      </div>

      {note && book && <BookNote src={book.src!} fromRect={note.rect} fromRotation={note.rotation} onClosed={closeNote} />}
    </div>
  );
}
