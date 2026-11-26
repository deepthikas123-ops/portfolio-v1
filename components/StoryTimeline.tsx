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
/* Reading line for the per-milestone tracker. Same line as the reveal trigger, so a milestone is always
   fully read (tracker full) by the time the next one is allowed to appear. */
const READ = TRIGGER;

/**
 * "01 / My Story" — a vertical timeline that unfolds one milestone at a time.
 * `shown` is the single source of truth: milestone i is visible only when i < shown, and `shown` can only
 * ever grow by one per step, so entries can never appear out of order or all at once.
 */
export default function StoryTimeline({ items }: { items: Milestone[] }) {
  const [shown, setShown] = useState(1);
  const shownRef = useRef(1);
  const els = useRef<(HTMLLIElement | null)[]>([]);
  const bodies = useRef<(HTMLDivElement | null)[]>([]);
  const list = useRef<HTMLOListElement | null>(null);
  const read = useRef<number[]>([]);
  const activeIdx = useRef(-1);
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

  /* Reading progress of every milestone, from the real scroll position: 0 while the reading line is above its
     text, 1 once the line has passed the end of its text, linear in between. It is written straight to the
     element as a CSS variable (no React state, no layout), and only when the value actually changes. */
  const measure = useCallback(() => {
    const ol = list.current;
    if (!ol) return;
    const line = window.innerHeight * READ;
    const base = ol.getBoundingClientRect().top;
    const n = shownRef.current;
    const next: number[] = [];
    for (let i = 0; i < total; i++) {
      const li = els.current[i];
      const body = bodies.current[i];
      let p = 0;
      if (li && body && i < n && body.offsetHeight > 0) {
        // offset geometry ignores the reveal animation's translate, so the value never wobbles while an entry fades in
        const top = base + li.offsetTop + body.offsetTop;
        p = Math.min(1, Math.max(0, (line - top) / body.offsetHeight));
      }
      next.push(Math.round(p * 1000) / 1000);
    }
    for (let i = 0; i < total; i++) {
      if (read.current[i] === next[i]) continue;
      read.current[i] = next[i];
      els.current[i]?.style.setProperty('--read', String(next[i]));
    }
    // the milestone being read = the furthest revealed one the reading line has entered (the first one before that)
    let active = 0;
    for (let i = 0; i < total; i++) if (next[i] > 0) active = i;
    if (active !== activeIdx.current) {
      els.current[activeIdx.current]?.removeAttribute('data-active');
      els.current[active]?.setAttribute('data-active', '');
      activeIdx.current = active;
    }
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
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      shownRef.current = total;
      setShown(total);
    }
    last.current = { t: performance.now(), y: window.scrollY };
    let raf = 0;
    const frame = () => {
      raf = 0;
      measure();
      if (!reduce) tick();
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    // text reflow (web fonts, narrower screen) changes milestone heights: re-measure
    const ro = typeof ResizeObserver !== 'undefined' && list.current ? new ResizeObserver(onScroll) : null;
    if (ro && list.current) ro.observe(list.current);
    // a visitor who arrives already scrolled below the start (back/forward, reload) is caught up in order
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      ro?.disconnect();
      window.clearTimeout(timer.current);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [tick, measure, total]);

  // a newly revealed milestone starts reporting progress immediately
  useEffect(() => {
    const id = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(id);
  }, [shown, measure]);

  return (
    <>
      <noscript>
        <style>{'.st-item{opacity:1!important;visibility:visible!important;transform:none!important}.st-seg{transform:none!important}.st-track{display:none}'}</style>
      </noscript>
      <ol className="story-tl" aria-label="My story, in 17 chapters" ref={list}>
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
              <div
                className="st-body"
                ref={(el) => {
                  bodies.current[i] = el;
                }}
              >
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
              <span className="st-track" aria-hidden="true">
                <i className="st-light" />
                <b className="st-dot is-start" />
                <b className="st-dot is-end" />
              </span>
            </li>
          );
        })}
      </ol>
    </>
  );
}
