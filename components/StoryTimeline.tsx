'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Milestone } from './story-data';
import '../app/story.css';

/* How far down the viewport the next milestone's top must travel before it may appear (fraction of viewport height). */
const TRIGGER = 0.72;
/* If the visitor has already scrolled past the next milestone (End key, anchor jump), reveal without requiring extra scroll. */
const PASSED = 0.35;
/* Minimum extra scroll (px) after a reveal before the following one is allowed, and minimum time between reveals (ms). */
const MIN_SCROLL = 48;
const MIN_GAP = 520;

/**
 * "01 / My Story" — a vertical timeline that unfolds one milestone at a time.
 * `shown` is the single source of truth: milestone i is visible only when i < shown, and `shown` can only
 * ever grow by one per step, so entries can never appear out of order or all at once.
 */
export default function StoryTimeline({ items }: { items: Milestone[] }) {
  const [shown, setShown] = useState(1);
  const shownRef = useRef(1);
  const els = useRef<(HTMLLIElement | null)[]>([]);
  const last = useRef({ t: 0, y: 0 });
  const timer = useRef<number | undefined>(undefined);
  const total = items.length;

  const reveal = useCallback(() => {
    const n = shownRef.current;
    if (n >= total) return;
    shownRef.current = n + 1;
    last.current = { t: performance.now(), y: window.scrollY };
    setShown(n + 1);
  }, [total]);

  const tick = useCallback(() => {
    window.clearTimeout(timer.current);
    const n = shownRef.current;
    if (n >= total) return;
    const el = els.current[n];
    if (!el) return;
    const vh = window.innerHeight;
    const top = el.getBoundingClientRect().top;
    if (top > vh * TRIGGER) return; // the next milestone has not reached the trigger line yet

    const waited = performance.now() - last.current.t;
    const scrolled = Math.abs(window.scrollY - last.current.y);
    const passed = top < vh * PASSED;
    if (waited < MIN_GAP) {
      // one milestone per step: try again once the gap has elapsed
      timer.current = window.setTimeout(tick, MIN_GAP - waited + 20);
      return;
    }
    if (scrolled >= MIN_SCROLL || passed) {
      reveal();
      // a visitor who jumped well past several entries still gets them one after another, in order
      timer.current = window.setTimeout(tick, MIN_GAP + 20);
    }
  }, [reveal, total]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      shownRef.current = total;
      setShown(total);
      return;
    }
    last.current = { t: performance.now(), y: window.scrollY };
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        tick();
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    // a visitor who arrives already scrolled below the start (back/forward, reload) is caught up in order
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.clearTimeout(timer.current);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [tick, total]);

  return (
    <>
      <noscript>
        <style>{'.st-item{opacity:1!important;visibility:visible!important;transform:none!important}.st-seg{transform:none!important}'}</style>
      </noscript>
      <ol className="story-tl" aria-label="My story, in 17 chapters">
        {items.map((m, i) => {
          const on = i < shown;
          const cls = ['st-item', on && 'is-on', i + 1 < shown && 'is-linked', i === shown - 1 && 'is-current', i === total - 1 && 'is-last']
            .filter(Boolean)
            .join(' ');
          return (
            <li
              key={m.n}
              ref={(el) => {
                els.current[i] = el;
              }}
              className={cls}
              aria-hidden={on ? undefined : true}
            >
              <span className="st-mark" aria-hidden="true">
                {m.n}
              </span>
              <div className="st-body">
                {m.date && <p className="st-date">{m.date}</p>}
                <h3>
                  <span className="st-sr">{m.n} — </span>
                  {m.title}
                </h3>
                {m.paras.map((p) => (
                  <p className="st-p" key={p.slice(0, 28)}>
                    {p}
                  </p>
                ))}
              </div>
              {i < total - 1 && <span className="st-seg" aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
    </>
  );
}
