'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { NOTE_HEADING, NOTE_PARAGRAPHS } from './corkboard-items';

/** Slim 3D hardcover: cover, back, spine, page block and top/bottom page edges. */
export function BookBox({ src, open = false, children }: { src: string; open?: boolean; children?: React.ReactNode }) {
  return (
    <div className="cbk-root"><div className="cbk">
      <div className={`cbk-box${open ? ' is-open' : ''}`}>
        <div className="cbk-face cbk-back" />
        <div className="cbk-face cbk-spine" />
        <div className="cbk-face cbk-pages-r" />
        <div className="cbk-face cbk-pages-t" />
        <div className="cbk-face cbk-pages-b" />
        {children}
        <div className="cbk-cover">
          <div className="cbk-cover-front"><img src={src} alt="" draggable={false} /><i className="cbk-hinge" /><i className="cbk-gloss" /></div>
          <div className="cbk-cover-inside" />
        </div>
      </div>
    </div></div>
  );
}

const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * The note. The book lifts from its place on the board to the centre of the screen (FLIP), the cover swings
 * open on its spine, and the journal page is revealed. Closing runs the same steps backwards.
 */
export function BookNote({ src, fromRect, fromRotation, onClosed }: {
  src: string; fromRect: DOMRect; fromRotation: number; onClosed: () => void;
}) {
  const flyRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [flown, setFlown] = useState(false);
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const timers = useRef<number[]>([]);
  const later = (fn: () => void, ms: number) => { timers.current.push(window.setTimeout(fn, reduced() ? 30 : ms)); };

  // Place the book exactly over its board position before the first paint.
  useLayoutEffect(() => {
    const el = flyRef.current; if (!el) return;
    const w = el.offsetWidth, h = el.offsetHeight;
    const vx = window.innerWidth / 2, vy = window.innerHeight / 2;
    const dx = fromRect.left + fromRect.width / 2 - vx, dy = fromRect.top + fromRect.height / 2 - vy;
    const s = fromRect.width / w;
    el.style.setProperty('--from', `translate(${dx}px, ${dy}px) rotate(${fromRotation}deg) scale(${s})`);
    void h;
  }, [fromRect, fromRotation]);

  useEffect(() => {
    let r1 = 0, r2 = 0;
    r1 = requestAnimationFrame(() => { r2 = requestAnimationFrame(() => setFlown(true)); });
    later(() => setOpen(true), 700);
    later(() => closeRef.current?.focus({ preventScroll: true }), 1500);
    const prev = document.body.style.overflow; document.body.style.overflow = 'hidden';
    return () => { cancelAnimationFrame(r1); cancelAnimationFrame(r2); timers.current.forEach(clearTimeout); document.body.style.overflow = prev; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const close = useCallback(() => {
    if (closing) return;
    setClosing(true); setOpen(false);
    later(() => setFlown(false), 650);
    later(onClosed, 650 + 760);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closing, onClosed]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [close]);

  return createPortal(
    <div className={`cbn${flown ? ' is-flown' : ''}${open ? ' is-open' : ''}`} role="dialog" aria-modal="true" aria-label="A note about The Midnight Library" onClick={close}>
      <div className="cbn-fly" ref={flyRef} onClick={(e) => e.stopPropagation()}>
        <div className="cbn-shift">
          <BookBox src={src} open={open}>
            <div className="cbn-paper">
              <div className="cbn-paper-in">
                <button ref={closeRef} type="button" className="cbn-close" onClick={close} aria-label="Close note">
                  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" /></svg>
                </button>
                <h3>{NOTE_HEADING}</h3>
                {NOTE_PARAGRAPHS.map((p) => <p key={p}>{p}</p>)}
              </div>
            </div>
          </BookBox>
        </div>
      </div>
    </div>,
    document.body,
  );
}
