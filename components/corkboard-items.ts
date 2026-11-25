/**
 * Corkboard item registry.
 *
 * Every object on the board is one entry in `boardItems`. To add an object, append an entry; to
 * remove one, delete its entry. The <Corkboard /> component never needs to change for either.
 *
 * Placement units
 *   x, y : centre of the object, as a % of the cork area (0–100)
 *   w    : width of the object, in cqw (1cqw = 1% of the board's width) so everything scales together
 *   r    : rotation in degrees
 *   z    : initial stacking order
 *
 * Each item carries a `desktop` and a `mobile` placement. The mobile board is a taller, composed
 * layout (not a scaled copy of the desktop one), so the two are authored separately.
 *
 * New kinds of object: add the kind to `ItemKind`, then handle it in `renderItem` in Corkboard.tsx.
 */

export type ItemKind = 'photo' | 'book' | 'tape' | 'clip' | 'pin';

export interface Placement {
  x: number;
  y: number;
  w: number;
  r: number;
  z: number;
}

export interface BoardItem {
  id: string;
  kind: ItemKind;
  /** Accessible label. Decor is decorative, so it is left empty. */
  label: string;
  /** Image for decor and the book cover. */
  src?: string;
  /** Photo only: the transparent-hole Polaroid frame and the photograph that sits behind it. */
  frame?: { src: string; hole: [number, number, number, number]; ratio: number };
  photo?: { src: string; position?: string };
  desktop: Placement;
  mobile: Placement;
}

const D = '/images/corkboard';

export const boardItems: BoardItem[] = [
  {
    id: 'photo',
    kind: 'photo',
    label: 'Polaroid photograph of Deepthika',
    frame: { src: `${D}/polaroid-4.png`, hole: [11.28, 13.09, 76.41, 64.55], ratio: 390 / 550 },
    photo: { src: `${D}/portrait.jpg`, position: 'center 18%' },
    desktop: { x: 31, y: 51, w: 21.5, r: -4, z: 2 },
    mobile: { x: 38, y: 31, w: 47, r: -4, z: 2 },
  },
  {
    id: 'book',
    kind: 'book',
    label: 'The Midnight Library. Click to open a note about it',
    src: `${D}/book-cover.jpg`,
    desktop: { x: 68, y: 52, w: 17, r: 3, z: 3 },
    mobile: { x: 66, y: 71, w: 36, r: 3, z: 3 },
  },

  // Tapes
  { id: 'tape-photo', kind: 'tape', label: '', src: `${D}/tape-1.png`,
    desktop: { x: 31, y: 26.5, w: 11, r: -5, z: 10 }, mobile: { x: 38, y: 7.5, w: 24, r: -5, z: 10 } },
  { id: 'tape-strip', kind: 'tape', label: '', src: `${D}/tape-6.png`,
    desktop: { x: 49, y: 85, w: 13, r: 7, z: 10 }, mobile: { x: 28, y: 90, w: 28, r: 7, z: 10 } },
  { id: 'tape-corner', kind: 'tape', label: '', src: `${D}/tape-9.png`,
    desktop: { x: 88, y: 20, w: 7, r: 28, z: 10 }, mobile: { x: 87, y: 12, w: 15, r: 28, z: 10 } },

  // Binder clips
  { id: 'clip-book', kind: 'clip', label: '', src: `${D}/clip-2.png`,
    desktop: { x: 68, y: 27.5, w: 4.6, r: 4, z: 11 }, mobile: { x: 66, y: 48, w: 10, r: 4, z: 11 } },
  { id: 'clip-spare', kind: 'clip', label: '', src: `${D}/clip-8.png`,
    desktop: { x: 11, y: 79, w: 4.2, r: -14, z: 11 }, mobile: { x: 11, y: 56, w: 9, r: -14, z: 11 } },

  // Push pins
  { id: 'pin-a', kind: 'pin', label: '', src: `${D}/pin-1.png`,
    desktop: { x: 45.5, y: 21, w: 2.6, r: 8, z: 12 }, mobile: { x: 78, y: 28, w: 6, r: 8, z: 12 } },
  { id: 'pin-b', kind: 'pin', label: '', src: `${D}/pin-6.png`,
    desktop: { x: 86, y: 74, w: 2.8, r: -10, z: 12 }, mobile: { x: 85, y: 87, w: 6.5, r: -10, z: 12 } },
  { id: 'pin-c', kind: 'pin', label: '', src: `${D}/pin-10.png`,
    desktop: { x: 40.2, y: 73.6, w: 2.6, r: 12, z: 12 }, mobile: { x: 14, y: 14, w: 6, r: 12, z: 12 } },
];

export const NOTE_HEADING = 'A book that found me at the right time.';

export const NOTE_PARAGRAPHS = [
  'Some books find their way to you at exactly the right time.',
  'The Midnight Library was one of those books for me.',
  'It made me pause and think about the lives we imagine, the choices we make, and all the possibilities that exist between the two.',
  "It reminded me that life isn't about finding the one perfect version of ourselves. It's about recognising the beauty in the life we're already living.",
  "Perhaps that's why this book stayed with me.",
  'Some stories are read. Others find a little place in you.',
];
