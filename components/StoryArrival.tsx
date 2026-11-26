'use client';

import { useEffect } from 'react';
import { clearStoryIntent, hasStoryIntent, lowerVeil, startStoryScroll } from './story-handoff';

/** How long the opening portrait and introduction are held on screen before the page glides down to My Story. */
const INTRO_BEAT = 450;

let epoch = 0;

/**
 * Lives on the Curator's Note page. If the visitor got here by pulling the ID card, it waits for the page to be ready and
 * then glides down to 01 / MY STORY. Every other arrival (a nav link, a refresh, a typed address) does nothing.
 */
export default function StoryArrival() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mine = ++epoch;

    if (!hasStoryIntent()) {
      lowerVeil(0); // nothing to carry on: make sure no veil is left over
      return;
    }

    // a refresh while this is pending is a "direct" visit: it must not scroll
    const onHide = () => clearStoryIntent();
    window.addEventListener('pagehide', onHide);

    // the veil that covered the home page lifts, revealing the top of this page
    let r1 = 0;
    let r2 = 0;
    r1 = requestAnimationFrame(() => { r2 = requestAnimationFrame(() => lowerVeil(reduce ? 0 : 325)); });

    const run = startStoryScroll({ reduce, beat: INTRO_BEAT });
    // finished or interrupted: the intent is spent. (A cancel comes from leaving the page, handled in the cleanup below.)
    run.done.then((r) => { if (r !== 'cancelled') clearStoryIntent(); });

    return () => {
      window.removeEventListener('pagehide', onHide);
      cancelAnimationFrame(r1);
      cancelAnimationFrame(r2);
      run.cancel(); // leaving the page before the scroll finishes cancels it
      // React's dev-only double mount re-runs this effect immediately; a real unmount does not, so only then clear the intent
      window.setTimeout(() => { if (epoch === mine) clearStoryIntent(); }, 0);
    };
  }, []);

  return null;
}
