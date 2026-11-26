'use client';

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import type { Milestone } from './story-data';
import { storyPhotos, type Photo } from './story-photos';
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

/* Photographs are dealt out alternately, left / right, in reading order. The side that starts gets the extra photograph
   when the count is odd, and the starting side flips from one milestone with photographs to the next, so the extra
   photo (and the overall weight) does not always fall on the same side. */
type Placed = { photo: Photo; side: 'l' | 'r'; k: number; j: number };
function arrange(photos: Photo[], startLeft: boolean): Placed[] {
  const seen = { l: 0, r: 0 };
  return photos.map((photo, k) => {
    const left = (k % 2 === 0) === startLeft;
    const side = left ? 'l' : 'r';
    return { photo, side, k, j: seen[side]++ };
  });
}
/* How wide a photograph may be relative to its lane, by shape: portraits sit narrower, landscapes fill the lane. */
const shapeScale = (ar: number) => (ar < 0.85 ? 0.62 : ar < 1.05 ? 0.78 : ar < 1.4 ? 0.9 : 1);
const PHOTO_KEYS = Object.keys(storyPhotos).sort();
/* After the reading position settles on a milestone for this long (ms), its photographs come in and the previous
   milestone's go out. It keeps a fast flick through several milestones from flashing each set in turn. */
const PHOTO_SETTLE = 140;

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
  const pvIdx = useRef(-1);
  const pvWant = useRef(-1);
  const pvTimer = useRef<number | undefined>(undefined);
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
    // photographs follow the milestone being read, once the reading position has settled on it
    if (active !== pvWant.current) {
      pvWant.current = active;
      window.clearTimeout(pvTimer.current);
      pvTimer.current = window.setTimeout(() => {
        if (pvIdx.current === pvWant.current) return;
        els.current[pvIdx.current]?.removeAttribute('data-pv');
        els.current[pvWant.current]?.setAttribute('data-pv', '');
        pvIdx.current = pvWant.current;
      }, PHOTO_SETTLE);
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
      window.clearTimeout(pvTimer.current);
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
        <style>{'.st-item{opacity:1!important;visibility:visible!important;transform:none!important}.st-seg{transform:none!important}.st-track{display:none}.st-photos{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:24px}.st-lane,.st-stack{display:contents!important}.st-ph{opacity:1!important;visibility:visible!important;transform:none!important;width:100%!important}'}</style>
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
              {storyPhotos[m.n] && (
                <Lanes
                  photos={storyPhotos[m.n]}
                  title={m.title}
                  startLeft={PHOTO_KEYS.indexOf(m.n) % 2 === 0}
                />
              )}
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

/* One milestone's photographs: a lane on each side of the timeline on wide screens (pinned beside the text while the
   milestone is read), or a compact grid under the text on tablet and mobile. Every image reserves its box up front
   (width/height + aspect ratio) and loads lazily. */
function Lanes({ photos, title, startLeft }: { photos: Photo[]; title: string; startLeft: boolean }) {
  const placed = arrange(photos, startLeft);
  return (
    <div className="st-photos">
      {(['l', 'r'] as const).map((side) => {
        const mine = placed.filter((p) => p.side === side);
        if (!mine.length) return null;
        return (
          <div key={side} className={`st-lane ${side === 'l' ? 'is-left' : 'is-right'}`} style={{ '--cnt': mine.length } as CSSProperties}>
            <div className="st-stack">
              {mine.map(({ photo, k, j }) => (
                <figure
                  key={photo.src}
                  className="st-ph"
                  style={{ '--nw': photo.w, '--ar': (photo.w / photo.h).toFixed(4), '--sc': shapeScale(photo.w / photo.h), '--k': k, '--j': j } as CSSProperties}
                >
                  <img
                    src={photo.src}
                    width={photo.w}
                    height={photo.h}
                    alt={photo.label ?? `${title} — image ${k + 1} of ${photos.length}`}
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
