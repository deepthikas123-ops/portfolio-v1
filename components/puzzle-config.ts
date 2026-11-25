/**
 * Config for "The Missing Piece" contact puzzle.
 *
 * Geometry is expressed in % of the assembled puzzle's WIDTH (so 100 = puzzle width),
 * measured from the supplied reference image after seating the four pieces edge-to-edge.
 * `x`/`y`/`w`/`h` describe each piece's PNG/WebP rectangle (including a few px of padding),
 * so every piece drops into the same coordinates it had when the puzzle was fitted.
 */

export type PuzzlePiece = {
  id: 'tl' | 'tr' | 'bl' | 'br';
  src: string;
  tone: 'orange' | 'grey';
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  /** The one piece the visitor moves. */
  missing?: boolean;
};

/** Aspect ratio (width / height) of the assembled puzzle. */
export const PUZZLE_RATIO = 1.1335;

export const PIECES: PuzzlePiece[] = [
  { id: 'tl', src: '/images/puzzle/piece-tl.webp', tone: 'orange', label: 'top-left', x: -0.44, y: -0.66, w: 51.073, h: 44.799 },
  { id: 'tr', src: '/images/puzzle/piece-tr.webp', tone: 'grey', label: 'top-right', x: 48.982, y: -0.66, w: 51.293, h: 54.816 },
  { id: 'bl', src: '/images/puzzle/piece-bl.webp', tone: 'grey', label: 'bottom-left', x: -0.66, y: 34.232, w: 59.659, h: 54.595 },
  { id: 'br', src: '/images/puzzle/piece-br.webp', tone: 'orange', label: 'bottom-right', x: 48.597, y: 42.763, w: 52.064, h: 46.12, missing: true },
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
  desktop: { px: 0, py: 4, pw: 64, sx: 85, sy: 68, sh: 90 },
  mobile: { px: 11, py: 2, pw: 78, sx: 64, sy: 96, sh: 118 },
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

/** Contact destinations. LinkedIn comes from the site's existing links (app/about/page.tsx, Footer). */
export const BEHANCE_PLACEHOLDER = 'https://www.behance.net/REPLACE-WITH-YOUR-BEHANCE-USERNAME';

export type ContactLink = {
  id: 'email' | 'linkedin' | 'behance';
  label: string;
  symbol: string;
  display: string;
  href: string;
  external: boolean;
  aria: string;
};

export const CONTACTS: ContactLink[] = [
  {
    id: 'email',
    label: 'EMAIL',
    symbol: '@',
    display: 'hello@deepthika.studio',
    href: 'mailto:hello@deepthika.studio',
    external: false,
    aria: 'Email Deepthika at hello@deepthika.studio',
  },
  {
    id: 'linkedin',
    label: 'LINKEDIN',
    symbol: 'in',
    display: 'linkedin.com/in/deepthika365',
    href: 'https://www.linkedin.com/in/deepthika365/',
    external: true,
    aria: 'Deepthika on LinkedIn (opens in a new tab)',
  },
  {
    id: 'behance',
    label: 'BEHANCE',
    symbol: 'Bē',
    // TODO: no Behance URL exists anywhere in the site or project config — replace this placeholder.
    display: 'behance.net/REPLACE-ME',
    href: BEHANCE_PLACEHOLDER,
    external: true,
    aria: 'Deepthika on Behance (opens in a new tab)',
  },
];
