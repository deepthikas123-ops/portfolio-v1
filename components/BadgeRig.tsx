'use client';

import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { usePathname, useRouter } from 'next/navigation';
import { markStoryIntent, raiseVeil, startStoryScroll } from './story-handoff';

/**
 * Interactive retractable badge. Same layers as before (strap, shell, card, gloss, clip);
 * the strap and clip are the handles. The strap and the hanger (clip + pouch) share one vertical
 * offset, so they extend together; the hanger additionally rotates about the clip ring.
 */

const MAX_TILT = 16;        // deg, hard limit while dragging
const MAX_SWING_VEL = 80;   // deg/s, limit for the release kick
const PULL_LIMIT_K = 18;    // max pull = 20 stage units (1k = 1% of stage width)
const PULL_ENTER = 0.5;     // letting go after pulling at least this fraction of the way opens the story
const VEIL_MS = 380;        // dissolve before the Curator's Note page opens

export default function BadgeRig() {
  const reduce = useReducedMotion();
  const router = useRouter();
  const pathname = usePathname();
  const y = useMotionValue(0);                       // raw pull in px (>= 0 except tiny overshoot)
  const angle = useMotionValue(0);                   // deg
  const shownY = useTransform(y, (v) => Math.max(v, -3));
  const rootRef = useRef<HTMLDivElement>(null);
  const drag = useRef<null | { id: number; x0: number; y0: number; rawStart: number; samples: { t: number; x: number; y: number }[]; limit: number }>(null);
  const touched = useRef(false);

  // "PULL TO KNOW MY STORY" cursor: follows the pointer over the handles; purely visual (pointer-events: none)
  const [mode, setMode] = useState<'off' | 'grab' | 'hold'>('off');
  const [hintGone, setHintGone] = useState(false);
  const [ready, setReady] = useState(false);            // pulled far enough that letting go enters the story
  const readyRef = useRef(false);
  const entering = useRef(false);
  const [mounted, setMounted] = useState(false);
  const pillRef = useRef<HTMLDivElement>(null);
  useEffect(() => setMounted(true), []);
  const place = (e: React.PointerEvent) => {
    const el = pillRef.current; if (!el) return;
    el.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0) translate(-50%,-50%)`;
  };
  const finePointer = (e: React.PointerEvent) => e.pointerType !== 'touch';

  const limitPx = () => {
    const w = rootRef.current?.parentElement?.getBoundingClientRect().width ?? 480; // badge wrap = 48 stage units
    return Math.min(PULL_LIMIT_K * (w / 48), 260);
  };

  const stopAll = () => { y.stop(); angle.stop(); };

  const setReadyState = (v: boolean) => {
    if (readyRef.current === v) return;
    readyRef.current = v;
    setReady(v);
    if (v) { try { navigator.vibrate?.(8); } catch { /* not supported */ } }
  };

  // Pull completed: open the Curator's Note page at its top, which then glides down to 01 / MY STORY (see story-handoff.ts).
  // Already on that page: just glide.
  const enterStory = () => {
    if (entering.current) return;
    entering.current = true;
    window.setTimeout(() => { entering.current = false; }, 6000);
    const onAbout = (pathname ?? '').replace(/\/+$/, '') === '/about';
    if (onAbout) { startStoryScroll({ reduce: !!reduce, beat: 0 }); return; }
    markStoryIntent();
    const go = () => router.push('/about/');
    if (reduce) go(); else raiseVeil(VEIL_MS).then(go);
  };

  const release = useCallback((vy: number, vx: number, dir: number) => {
    const pulled = Math.max(y.get(), 0);
    const L = limitPx();
    if (reduce) {
      animate(y, 0, { duration: 0.35, ease: 'easeOut' });
      animate(angle, 0, { duration: 0.35, ease: 'easeOut' });
      return;
    }
    // strap retracts: well-damped spring, small overshoot, carries the release velocity
    animate(y, 0, { type: 'spring', stiffness: 85, damping: 13, mass: 1, velocity: Math.max(Math.min(vy, 2500), -2500) });
    // badge swings: lightly damped spring => several decaying oscillations.
    // Kick comes from sideways release speed, plus a little from how far it was pulled.
    const kick = Math.max(-MAX_SWING_VEL, Math.min(MAX_SWING_VEL, vx * 0.035 + dir * (pulled / L) * 38));
    animate(angle, 0, { type: 'spring', stiffness: 40, damping: 1.9, mass: 1, velocity: kick, restDelta: 0.02, restSpeed: 0.05 });
  }, [reduce, y, angle]);

  const onDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    e.preventDefault();
    touched.current = true;
    stopAll();
    const L = limitPx();
    const y0 = Math.min(Math.max(y.get(), 0), L * 0.97);
    drag.current = {
      id: e.pointerId, x0: e.clientX, y0: e.clientY, limit: L,
      rawStart: L * Math.atanh(y0 / L),               // so a grab mid-swing continues without a jump
      samples: [{ t: performance.now(), x: e.clientX, y: e.clientY }],
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    document.body.classList.add('bh-dragging');
    setHintGone(true);
    setReadyState(false);
    if (finePointer(e)) { place(e); setMode('hold'); }
  };

  const onMove = (e: React.PointerEvent) => {
    if (finePointer(e)) {
      place(e);
      // safety net: any movement over the strap, clip, shell or card shows the pill, even if the enter event was missed
      if (!drag.current) setMode((m) => (m === 'off' ? 'grab' : m));
    }
    const d = drag.current; if (!d || e.pointerId !== d.id) return;
    const now = performance.now();
    d.samples.push({ t: now, x: e.clientX, y: e.clientY });
    while (d.samples.length > 2 && now - d.samples[0].t > 90) d.samples.shift();
    const raw = d.rawStart + (e.clientY - d.y0);
    // resistance: slope 1 at the start, tapering to the limit; slight give upwards
    y.set(raw >= 0 ? d.limit * Math.tanh(raw / d.limit) : -3 * Math.tanh(-raw / 40));
    setReadyState(y.get() >= d.limit * PULL_ENTER);
    if (!reduce) {
      const a = d.samples[0], b = d.samples[d.samples.length - 1];
      const dt = Math.max(b.t - a.t, 16);
      const vx = ((b.x - a.x) / dt) * 1000;
      const target = Math.max(-MAX_TILT, Math.min(MAX_TILT, (e.clientX - d.x0) * 0.05 + vx * 0.003));
      angle.set(angle.get() + (target - angle.get()) * 0.35); // follows with a little lag
    }
  };

  const end = (e: React.PointerEvent) => {
    const d = drag.current; if (!d || e.pointerId !== d.id) return;
    drag.current = null;
    const pulledPx = Math.max(y.get(), 0);
    const pulledFar = e.type === 'pointerup' && pulledPx >= d.limit * PULL_ENTER; // a cancelled pointer is never a pull
    setReadyState(false);
    document.body.classList.remove('bh-dragging');
    try { (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId); } catch {}
    if (finePointer(e)) {
      const t = e.currentTarget as HTMLElement;
      setMode(t.matches(':hover') ? 'grab' : 'off');
    }
    const a = d.samples[0], b = d.samples[d.samples.length - 1];
    const dt = Math.max(b.t - a.t, 16);
    const stale = performance.now() - b.t > 120;          // held still before letting go => no throw
    const vx = stale ? 0 : ((b.x - a.x) / dt) * 1000;
    const vy = stale ? 0 : ((b.y - a.y) / dt) * 1000;
    const dir = Math.sign(angle.get() || b.x - d.x0 || 1);
    release(-vy * 0.6, vx, dir);                           // moving down => spring velocity is negative toward 0
    if (pulledFar) enterStory();
  };

  // keyboard / assistive alternative: Enter or Space gives the badge a tug and lets it swing back
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    e.preventDefault(); touched.current = true; stopAll();
    const L = limitPx();
    animate(y, L * 0.6, { duration: reduce ? 0.2 : 0.28, ease: 'easeOut' }).then(() => { release(0, 0, 1); enterStory(); });
  };

  // one gentle hint tug after load (skipped for reduced motion or once the visitor has tried it)
  useEffect(() => {
    if (reduce) return;
    const t = window.setTimeout(() => {
      if (touched.current || window.scrollY > 120) return;
      const L = limitPx();
      animate(y, L * 0.22, { duration: 0.32, ease: 'easeOut' }).then(() => { if (!touched.current) release(0, 0, 1); });
    }, 2600);
    return () => window.clearTimeout(t);
  }, [reduce]); // eslint-disable-line react-hooks/exhaustive-deps

  const grab = {
    onPointerDown: onDown, onPointerMove: onMove, onPointerUp: end, onPointerCancel: end,
    onPointerEnter: (e: React.PointerEvent) => { if (finePointer(e) && !drag.current) { place(e); setMode('grab'); } },
    onPointerLeave: (e: React.PointerEvent) => { if (finePointer(e) && !drag.current) setMode('off'); },
  };

  // The pouch (shell + card) is a handle too, for mouse and pen. Touch keeps scrolling the page normally there.
  const grabPouch = { ...grab, onPointerDown: (e: React.PointerEvent) => { if (finePointer(e)) onDown(e); } };

  return (
    <div ref={rootRef} className="bh-rig" style={{ display: 'contents' }}>
      <span className={`bh-hint${hintGone ? ' is-gone' : ''}`} aria-hidden="true">PULL TO KNOW<br />MY STORY</span>
      {mounted && createPortal(
        <div ref={pillRef} className={`bh-cursor${mode !== 'off' ? ' is-on' : ''}${mode === 'hold' ? ' is-hold' : ''}${ready ? ' is-ready' : ''}`} aria-hidden="true">
          {mode === 'hold' ? (ready ? 'LET GO TO ENTER' : 'HOLDING') : 'PULL TO KNOW MY STORY'}
        </div>,
        document.body,
      )}
      <motion.div
        className="bh-strap bh-grab"
        data-layer="strap"
        style={{ y: shownY }}
        role="button"
        tabIndex={0}
        aria-label="ID badge: pull to know my story. Press Enter to pull it, or drag the strap down and let go."
        onKeyDown={onKey}
        {...grab}
      >
        <img className="bh-layer" draggable={false} src="/images/badge/strap.png" alt="" aria-hidden="true" width={130} height={415} decoding="async" />
      </motion.div>
      <motion.div className="bh-hanger" data-layer="hanger" style={{ y: shownY, rotate: angle }}>
        <div className="bh-pouch bh-grab-pouch" data-layer="pouch" {...grabPouch}>
          <img className="bh-layer bh-shell" data-layer="shell" src="/images/badge/shell.png" alt="" aria-hidden="true" width={670} height={840} decoding="async" />
          <div className="bh-card" data-layer="card">
            <p className="bh-card-title">CURATOR<br />&amp; MAKER</p>
            <img
              className="bh-photo"
              src="/images/deepthika-badge.jpg"
              width={800}
              height={812}
              alt="Portrait of Deepthika S, smiling, in a tweed blazer and white shirt"
              fetchPriority="high"
              decoding="async"
            />
            <p className="bh-row bh-row-1"><b>NAME</b><span><img src="/images/badge/handwritten-name.png" alt="DEEPTHIKA S." /></span></p>
            <p className="bh-row bh-row-2"><b>INTERESTS</b><span><img src="/images/badge/handwritten-interests.png" alt="Art × Design × Engineering" /></span></p>
            <i className="bh-bar" aria-hidden="true" />
            <p className="bh-acc">ACCESSION NO. 001</p>
          </div>
          <img className="bh-layer bh-gloss" data-layer="gloss" src="/images/badge/shell-gloss.png" alt="" aria-hidden="true" width={670} height={840} decoding="async" />
        </div>
        <img className="bh-layer bh-clip bh-grab" draggable={false} data-layer="clip" src="/images/badge/clip.png" alt="" aria-hidden="true" width={470} height={630} decoding="async" {...grab} />
      </motion.div>
    </div>
  );
}
