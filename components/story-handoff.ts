/**
 * "Pull to know my story": hand-off from the hanging ID card to 01 / MY STORY on the Curator's Note page.
 *
 * The visitor really does arrive on /about/ (at the top, with the portrait and introduction), and only then does the page
 * glide down to the start of My Story. Nothing here uses a URL hash, so a refresh or an ordinary link to the page
 * always opens at the top: the glide happens only when the pull left a short-lived "intent" behind.
 */

export const STORY_TARGET_ID = 'my-story';

const KEY = 'story-handoff';
const INTENT_TTL = 15000;      // an intent older than this is stale and ignored
const READY_CAP = 4000;        // safety net only: how long to wait for fonts / images / layout before going anyway
const STABLE_FRAMES = 5;       // consecutive frames with an unchanged layout before the page counts as ready
const VEIL_ID = 'story-veil';
const VEIL_COLOUR = '#f6f4f1'; // the hero's paper colour, so the home page dissolves into itself rather than into a flash

/* ---------- intent (survives a client-side navigation; sessionStorage covers a hard-navigation fallback) ---------- */

let memIntent: number | null = null;

export function markStoryIntent() {
  memIntent = Date.now();
  try { sessionStorage.setItem(KEY, String(memIntent)); } catch { /* storage blocked: memory alone is enough for client navigation */ }
}

export function hasStoryIntent(): boolean {
  let t = memIntent;
  try {
    const v = sessionStorage.getItem(KEY);
    if (v) t = Math.max(t ?? 0, Number(v));
  } catch { /* ignore */ }
  return t != null && Date.now() - t < INTENT_TTL;
}

export function clearStoryIntent() {
  memIntent = null;
  try { sessionStorage.removeItem(KEY); } catch { /* ignore */ }
}

/* ---------- the veil: a soft dissolve that carries the visitor from the card into the next page ---------- */

export function raiseVeil(ms: number): Promise<void> {
  let v = document.getElementById(VEIL_ID) as HTMLDivElement | null;
  if (!v) {
    v = document.createElement('div');
    v.id = VEIL_ID;
    v.setAttribute('aria-hidden', 'true');
    Object.assign(v.style, {
      position: 'fixed', inset: '0', zIndex: '140', background: VEIL_COLOUR, opacity: '0', pointerEvents: 'none',
      transition: `opacity ${ms}ms cubic-bezier(.4,0,.2,1)`,
    });
    document.body.appendChild(v);
  }
  void v.offsetWidth; // commit opacity 0 so the fade-in actually transitions
  v.style.opacity = '1';
  // if the navigation never happens, the veil must not stay
  window.setTimeout(() => { if (v && v.isConnected && v.dataset.taken !== '1') lowerVeil(500); }, 6000);
  return new Promise((r) => window.setTimeout(r, ms));
}

export function lowerVeil(ms: number) {
  const v = document.getElementById(VEIL_ID);
  if (!v) return;
  v.dataset.taken = '1';
  if (ms <= 0) { v.remove(); return; }
  v.style.transition = `opacity ${ms}ms cubic-bezier(.2,.6,.2,1)`;
  v.style.opacity = '0';
  window.setTimeout(() => v.remove(), ms + 80);
}

/* ---------- target position ---------- */

/** Document Y at which the My Story heading sits just below the fixed navigation bar. */
export function storyTargetY(): number | null {
  const el = document.getElementById(STORY_TARGET_ID);
  if (!el) return null;
  const header = document.querySelector<HTMLElement>('.site-header');
  const bar = header ? header.getBoundingClientRect().height : 0;
  const gap = Math.round(Math.min(36, Math.max(16, window.innerHeight * 0.04)));
  const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  return Math.min(max, Math.max(0, Math.round(el.getBoundingClientRect().top + window.scrollY - bar - gap)));
}

/* ---------- waiting until the page is genuinely ready ---------- */

const frame = () => new Promise<void>((r) => requestAnimationFrame(() => r()));

/**
 * Resolves true once the target exists, web fonts are in, the images above it have loaded and its position has stopped
 * moving. Resolves false if cancelled, or if the target never appears. The cap only stops a failed image from holding
 * the visitor up forever; it is not how readiness is normally decided.
 */
async function whenReady(cancelled: () => boolean): Promise<boolean> {
  const t0 = performance.now();
  const late = () => performance.now() - t0 > READY_CAP;

  let target = document.getElementById(STORY_TARGET_ID);
  while (!target) {
    if (cancelled() || late()) return false;
    await frame();
    target = document.getElementById(STORY_TARGET_ID);
  }

  const waits: Promise<unknown>[] = [];
  if (document.fonts?.ready) waits.push(document.fonts.ready);
  document.querySelectorAll('img').forEach((img) => {
    if (img.complete || img.loading === 'lazy') return;                                  // lazy ones are not needed for the layout
    if (!(img.compareDocumentPosition(target!) & Node.DOCUMENT_POSITION_FOLLOWING)) return; // only images above the target can move it
    waits.push(new Promise((r) => {
      img.addEventListener('load', r, { once: true });
      img.addEventListener('error', r, { once: true });
    }));
  });
  if (waits.length) {
    await Promise.race([Promise.all(waits), new Promise((r) => window.setTimeout(r, Math.max(0, READY_CAP - (performance.now() - t0))))]);
  }

  let last = '';
  let steady = 0;
  while (steady < STABLE_FRAMES) {
    if (cancelled()) return false;
    if (late()) break;
    await frame();
    const key = `${Math.round(target.getBoundingClientRect().top + window.scrollY)}|${document.documentElement.scrollHeight}`;
    steady = key === last ? steady + 1 : 0;
    last = key;
  }
  return !cancelled();
}

/* ---------- the scroll itself ---------- */

export type StoryScrollResult = 'done' | 'interrupted' | 'cancelled';

const easeInOut = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
const SCROLL_KEYS = new Set(['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' ', 'Spacebar']);

/**
 * Waits for the page to be ready, holds for `beat` ms (so the portrait and introduction are seen), then glides to the
 * start of My Story. Any wheel, touch, pointer press or scrolling key from the visitor ends it at once and leaves them
 * where they are. With reduced motion it positions instantly, without the beat.
 */
export function startStoryScroll({ reduce, beat }: { reduce: boolean; beat: number }) {
  let ended = false;
  let raf = 0;
  let timer = 0;
  let resolveDone!: (r: StoryScrollResult) => void;
  const done = new Promise<StoryScrollResult>((r) => { resolveDone = r; });

  const interrupt = () => finish('interrupted');
  const onKey = (e: KeyboardEvent) => { if (SCROLL_KEYS.has(e.key)) finish('interrupted'); };
  const listen = (on: boolean) => {
    const m = on ? window.addEventListener.bind(window) : window.removeEventListener.bind(window);
    m('wheel', interrupt, { passive: true });
    m('touchstart', interrupt, { passive: true });
    m('pointerdown', interrupt, { passive: true });
    m('keydown', onKey as EventListener);
  };
  function finish(r: StoryScrollResult) {
    if (ended) return;
    ended = true;
    cancelAnimationFrame(raf);
    window.clearTimeout(timer);
    listen(false);
    resolveDone(r);
  }
  listen(true);

  (async () => {
    const ok = await whenReady(() => ended);
    if (ended) return;
    if (!ok) { finish('cancelled'); return; }
    await new Promise<void>((r) => { timer = window.setTimeout(r, reduce ? 0 : beat); });
    if (ended) return;

    const jump = (y: number) => window.scrollTo({ top: y, behavior: 'instant' as ScrollBehavior });
    let ty = storyTargetY();
    if (ty == null) { finish('cancelled'); return; }
    if (reduce) { jump(ty); finish('done'); return; }

    const y0 = window.scrollY;
    const dist = Math.abs(ty - y0);
    if (dist < 2) { finish('done'); return; }
    const dur = Math.min(1800, Math.max(1000, 650 + dist * 0.7));
    const t0 = performance.now();
    let lastSet = y0;
    const step = (now: number) => {
      if (ended) return;
      // the page moved by something other than us (scrollbar drag, keyboard, assistive tech): the visitor has taken over
      if (Math.abs(window.scrollY - lastSet) > 2.5) { finish('interrupted'); return; }
      ty = storyTargetY() ?? ty; // follow the target if the layout is still settling
      const p = Math.min(1, (now - t0) / dur);
      jump(y0 + ((ty as number) - y0) * easeInOut(p));
      lastSet = window.scrollY;
      if (p >= 1) finish('done');
      else raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
  })();

  return { cancel: () => finish('cancelled'), done };
}
