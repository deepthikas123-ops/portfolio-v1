/**
 * Config for "The Missing Piece" contact puzzle.
 *
 * Geometry is expressed in % of the assembled puzzle's WIDTH (so 100 = puzzle width),
 * measured from the supplied, already-assembled reference image (cut along the seams).
 * `x`/`y`/`w`/`h` describe each piece's PNG/WebP rectangle (including a few px of padding),
 * so every piece drops into the same coordinates it had when the puzzle was fitted.
 */

export type PuzzlePiece = {
  id: 'tl' | 'tr' | 'bl' | 'br';
  src: string;
  tone: 'orange' | 'grey' | 'cream';
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  /** The one piece the visitor moves. */
  missing?: boolean;
};

/** Aspect ratio (width / height) of the assembled puzzle. */
export const PUZZLE_RATIO = 1.0986;

export const PIECES: PuzzlePiece[] = [
  { id: 'tl', src: '/images/puzzle/piece-tl.webp', tone: 'grey', label: 'top-left', x: -0.31, y: -0.413, w: 51.496, h: 46.336 },
  { id: 'tr', src: '/images/puzzle/piece-tr.webp', tone: 'cream', label: 'top-right', x: 37.564, y: -0.413, w: 62.848, h: 45.924 },
  { id: 'bl', src: '/images/puzzle/piece-bl.webp', tone: 'cream', label: 'bottom-left', x: -0.413, y: 33.127, w: 62.642, h: 58.308 },
  { id: 'br', src: '/images/puzzle/piece-br.webp', tone: 'orange', label: 'bottom-right', x: 48.607, y: 33.024, w: 51.806, h: 58.411, missing: true },
];

export const MISSING = PIECES.find((p) => p.missing)!;

/**
 * Stage layouts. Units are `cqw` (1 = 1% of the stage width), so the whole scene scales with the stage.
 *  - px/py/pw: top-left and width of the assembled puzzle
 *  - sx/sy:    where the missing piece's centre starts (sideways, apart from the puzzle)
 *  - sh:       stage height
 * Keep these in step with the matching CSS custom properties in `app/puzzle.css`.
 */
export type PuzzleLayout = { px: number; py: number; pw: number; sx: number; sy: number; sh: number };

export const LAYOUTS: Record<'desktop' | 'mobile', PuzzleLayout> = {
  desktop: { px: 0, py: 4, pw: 54, sx: 80, sy: 62, sh: 80 },
  mobile: { px: 13, py: 2, pw: 74, sx: 62, sy: 97, sh: 119 },
};

/** The missing piece begins turned sideways and rotates upright as it nears the slot. */
export const START_ROTATION = 90;
/** Release within this fraction of the puzzle width (centre-to-centre) to snap. */
export const SNAP_RADIUS = 0.17;
/** The slot preview (ghost outline) starts to show inside this fraction. */
export const PREVIEW_RADIUS = 0.32;

export function geometry(l: PuzzleLayout) {
  const k = l.pw / 100;
  const cx = l.px + k * (MISSING.x + MISSING.w / 2);
  const cy = l.py + k * (MISSING.y + MISSING.h / 2);
  const pieceW = k * MISSING.w;
  const pieceH = k * MISSING.h;
  const ox = l.sx - cx;
  const oy = l.sy - cy;
  return {
    cx,
    cy,
    pieceW,
    pieceH,
    ox,
    oy,
    d0: Math.hypot(ox, oy),
    snap: SNAP_RADIUS * l.pw,
    preview: PREVIEW_RADIUS * l.pw,
  };
}

/** Contact destinations (LinkedIn is the site's existing profile link). Only the label is shown; the link is the href. */
export type ContactLink = {
  id: 'email' | 'linkedin' | 'behance';
  label: string;
  symbol: string;
  href: string;
  external: boolean;
  aria: string;
};

export const CONTACTS: ContactLink[] = [
  {
    id: 'email',
    label: 'EMAIL',
    symbol: '@',
    href: 'mailto:deepthikas123@gmail.com',
    external: false,
    aria: 'Email Deepthika at deepthikas123@gmail.com',
  },
  {
    id: 'linkedin',
    label: 'LINKEDIN',
    symbol: 'in',
    href: 'https://www.linkedin.com/in/deepthika365/',
    external: true,
    aria: 'Deepthika on LinkedIn (opens in a new tab)',
  },
  {
    id: 'behance',
    label: 'BEHANCE',
    symbol: 'Bē',
    href: 'https://www.behance.net/deepthikas1',
    external: true,
    aria: 'Deepthika on Behance (opens in a new tab)',
  },
];
