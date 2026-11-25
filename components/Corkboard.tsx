'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { boardItems, type BoardItem, type Placement } from './corkboard-items';
import { BookBox, BookNote } from './CorkboardBook';
import '../app/corkboard.css';

type Layout = 'desktop' | 'mobile';
type State = { x: number; y: number; r: number; z: number };
type Positions = Record<string, State>;

const STORAGE = 'deepthika-corkboard-v3';
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

  /**
   * Shuffle moves whole groups: every object that is attached to a host (caption, tape, clip, pin…) keeps its
   * arrangement relative to that host and turns with it. Groups are placed so they overlap as little as possible.
   */
  const shuffle = () => {
    const stage = stageRef.current?.getBoundingClientRect(); if (!stage || !pos) return;
    settle();
    const byId = new Map(items.map((i) => [i.id, i]));
    const rootOf = (it: BoardItem): BoardItem => (it.attach && byId.get(it.attach) ? rootOf(byId.get(it.attach)!) : it);
    const depth = (it: BoardItem): number => (it.attach && byId.get(it.attach) ? 1 + depth(byId.get(it.attach)!) : 0);
    const groups = new Map<string, BoardItem[]>();
    for (const it of [...items].sort((a, b) => depth(a) - depth(b))) {
      const r = rootOf(it).id; groups.set(r, [...(groups.get(r) ?? []), it]);
    }
    const W = stage.width, H = stage.height;
    type Box = { l: number; t: number; r: number; b: number };
    const half = (it: BoardItem, rot: number) => {
      const el = els.current[it.id]; const w = el?.offsetWidth ?? 0, h = el?.offsetHeight ?? 0;
      const c = Math.abs(Math.cos((rot * Math.PI) / 180)), s = Math.abs(Math.sin((rot * Math.PI) / 180));
      return { hw: (w * c + h * s) / 2, hh: (w * s + h * c) / 2 };
    };
    // lay a group out around a root centre (px) and rotation; returns member states in px and its bounding box
    const lay = (members: BoardItem[], root: BoardItem, cx: number, cy: number, rot: number) => {
      const R = root[layout], d = ((rot - R.r) * Math.PI) / 180, cs = Math.cos(d), sn = Math.sin(d);
      const out = members.map((m) => {
        const M = m[layout], ox = ((M.x - R.x) / 100) * W, oy = ((M.y - R.y) / 100) * H;
        const x = cx + ox * cs - oy * sn, y = cy + ox * sn + oy * cs, r = M.r + (rot - R.r);
        const { hw, hh } = half(m, r);
        return { m, x, y, r, hw, hh };
      });
      const box: Box = {
        l: Math.min(...out.map((o) => o.x - o.hw)), r: Math.max(...out.map((o) => o.x + o.hw)),
        t: Math.min(...out.map((o) => o.y - o.hh)), b: Math.max(...out.map((o) => o.y + o.hh)),
      };
      return { out, box };
    };
    const overlap = (a: Box, b: Box) => Math.max(0, Math.min(a.r, b.r) - Math.max(a.l, b.l) + 6) * Math.max(0, Math.min(a.b, b.b) - Math.max(a.t, b.t) + 6);

    const order = Array.from(groups.entries()).map(([id, members]) => {
      const root = byId.get(id)!; const g = lay(members, root, 0, 0, root[layout].r);
      return { id, members, root, area: (g.box.r - g.box.l) * (g.box.b - g.box.t) };
    }).sort((a, b) => b.area - a.area);

    const placed: Box[] = [];
    const next: Positions = {};
    for (const { members, root } of order) {
      const rot = root[layout].r + (Math.random() * 2 - 1) * 8;
      let best: ReturnType<typeof lay> | null = null, bestScore = Infinity;
      for (let i = 0; i < 260 && bestScore > 0; i++) {
        let g = lay(members, root, 0.1 * W + Math.random() * 0.8 * W, 0.1 * H + Math.random() * 0.8 * H, rot);
        // slide the whole group back inside the cork if it pokes out
        const sx = g.box.l < 4 ? 4 - g.box.l : g.box.r > W - 4 ? W - 4 - g.box.r : 0;
        const sy = g.box.t < 4 ? 4 - g.box.t : g.box.b > H - 4 ? H - 4 - g.box.b : 0;
        if (sx || sy) g = { out: g.out.map((o) => ({ ...o, x: o.x + sx, y: o.y + sy })), box: { l: g.box.l + sx, r: g.box.r + sx, t: g.box.t + sy, b: g.box.b + sy } };
        const score = placed.reduce((n, p) => n + overlap(g.box, p), 0);
        if (score < bestScore) { best = g; bestScore = score; }
      }
      if (!best) continue;
      placed.push(best.box);
      for (const o of best.out) next[o.m.id] = { x: (o.x / W) * 100, y: (o.y / H) * 100, r: o.r, z: ++zTop.current };
    }
    for (const it of items) if (!next[it.id]) next[it.id] = pos[it.id];
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
