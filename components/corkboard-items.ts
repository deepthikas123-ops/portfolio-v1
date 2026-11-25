/**
 * Corkboard item registry.
 *
 * Every object on the board is one entry in `boardItems`. To add an object, append an entry; to
 * remove one, delete its entry. The <Corkboard /> component never needs to change for either.
 *
 * Placement units
 *   x, y : centre of the object, as a % of the cork area (0–100); the entries below write them in board units via at()
 *   w    : width of the object, in cqw (1cqw = 1% of the board's width) so everything scales together
 *   r    : rotation in degrees
 *   z    : initial stacking order
 *
 * Each item carries a `desktop` and a `mobile` placement. The mobile board is a taller, composed
 * layout (not a scaled copy of the desktop one), so the two are authored separately.
 *
 * New kinds of object: add the kind to `ItemKind`, then handle it in `renderItem` in Corkboard.tsx.
 */

export type ItemKind = 'photo' | 'book' | 'note' | 'tape' | 'clip' | 'pin';

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
  /** Sticky notes only: the handwritten text, its size (in % of the note's width), ink colour and slight tilt. */
  text?: string;
  fs?: number;
  ink?: string;
  tilt?: number;
  /**
   * Id of the object this one belongs to (a caption's photo, a pin's note…). On Shuffle an attached object travels
   * with its host and keeps the same arrangement relative to it; while dragging, every object stays independent.
   */
  attach?: string;
  desktop: Placement;
  mobile: Placement;
}

/** Size of the cork area in cqw (1cqw = 1% of the board's width), so layouts below can be written in board units. */
const DS = { w: 93.46, h: 58.2 };   // desktop board, 1439 : 931
const MS = { w: 91.2, h: 166.2 };   // phone board, 4 : 7
const at = (s: { w: number; h: number }, x: number, y: number, w: number, r: number, z: number): Placement =>
  ({ x: +((x / s.w) * 100).toFixed(2), y: +((y / s.h) * 100).toFixed(2), w, r, z });

const D = '/images/corkboard';

export const boardItems: BoardItem[] = [
  // ── Photographs in Polaroid frames ──
  {
    id: 'photo', kind: 'photo', label: 'Polaroid photograph of Deepthika',
    frame: { src: `${D}/polaroid-4.png`, hole: [11.28, 13.09, 76.41, 64.55], ratio: 390 / 550 },
    photo: { src: `${D}/portrait.jpg`, position: 'center 18%' },
    desktop: at(DS, 13, 20, 17.5, -4, 2), mobile: at(MS, 22, 25, 30, -4, 2),
  },
  {
    id: 'sunrise', kind: 'photo', label: 'Polaroid photograph: my first sunrise trek',
    frame: { src: `${D}/polaroid-2.png`, hole: [15.63, 8.38, 66.04, 65.87], ratio: 371 / 501 },
    photo: { src: `${D}/sunrise.jpg`, position: 'center 55%' },
    desktop: at(DS, 33.5, 19, 15.5, 3, 2), mobile: at(MS, 66, 24, 27, 3, 2),
  },
  {
    id: 'meadow', kind: 'photo', label: 'Polaroid photograph: a wildflower meadow',
    frame: { src: `${D}/polaroid-1.png`, hole: [6.78, 6.81, 79.49, 68.88], ratio: 546 / 543 },
    photo: { src: `${D}/meadow.jpg`, position: 'center 100%' },
    desktop: at(DS, 80, 17.5, 20, -3, 2), mobile: at(MS, 30, 108, 36, -3, 2),
  },
  {
    id: 'drawing', kind: 'photo', label: 'Polaroid: a drawing from my first drawing contest',
    frame: { src: `${D}/polaroid-3.png`, hole: [10.94, 8.61, 82.92, 60.0], ratio: 521 / 360 },
    photo: { src: `${D}/drawing.jpg`, position: 'center 42%' },
    desktop: at(DS, 14, 45.5, 21, 2, 2), mobile: at(MS, 27, 148, 40, 2, 2),
  },

  // ── The Midnight Library ──
  {
    id: 'book', kind: 'book', label: 'The Midnight Library. Click to open a note about it',
    src: `${D}/book-cover.jpg`,
    desktop: at(DS, 57.5, 19.5, 14.5, 3, 3), mobile: at(MS, 24, 72, 25, 3, 3),
  },

  // ── Captions: small sticky notes tucked against their photographs ──
  { id: 'cap-sunrise', kind: 'note', attach: 'sunrise', label: 'My first sunrise trek', text: 'My first sunrise trek', src: `${D}/note-green.webp`,
    fs: 15, ink: '#243a63', tilt: -2,
    desktop: at(DS, 43.2, 25.5, 8.5, 6, 6), mobile: at(MS, 76, 43, 19, 6, 6) },
  { id: 'cap-meadow', kind: 'note', attach: 'meadow', label: 'A little moment among the wildflowers', text: 'A little moment among the wildflowers', src: `${D}/note-orange.webp`,
    fs: 13.2, ink: '#2b2f4a', tilt: 1.5,
    desktop: at(DS, 72.6, 29.4, 9.5, -5, 6), mobile: at(MS, 50, 124, 21, -5, 6) },
  { id: 'cap-drawing', kind: 'note', attach: 'drawing', label: 'My First Drawing Contest', text: 'My First Drawing Contest', src: `${D}/note-purple.webp`,
    fs: 14.5, ink: '#2a2650', tilt: -1.5,
    desktop: at(DS, 27.6, 48.8, 8.8, 5, 6), mobile: at(MS, 50, 154, 20, 5, 6) },

  // ── Three favourite quotes ──
  { id: 'note-create', kind: 'note', label: "You've consumed enough. It's time to CREATE", text: "You've consumed enough. It's time to CREATE", src: `${D}/note-yellow.webp`,
    fs: 14, ink: '#1f3270', tilt: -1.5,
    desktop: at(DS, 42.5, 46.5, 12.5, -3, 7), mobile: at(MS, 64, 72, 28, -3, 7) },
  { id: 'note-exist', kind: 'note', label: 'Make it exist first. Perfect it later :)', text: 'Make it exist first. Perfect it later :)', src: `${D}/note-pink.webp`,
    fs: 14.5, ink: '#2a2a3a', tilt: 1.2,
    desktop: at(DS, 59.5, 47, 12.5, 3, 7), mobile: at(MS, 74, 104, 28, 3, 7) },
  { id: 'note-rose', kind: 'note', label: 'la vie en rose.', text: 'la vie en rose.', src: `${D}/note-blue.webp`,
    fs: 19, ink: '#3a2340', tilt: -2,
    desktop: at(DS, 77, 46.5, 12.5, -2, 7), mobile: at(MS, 76, 143, 28, -2, 7) },

  // ── Washi tape ──
  { id: 'tape-photo', kind: 'tape', attach: 'photo', label: '', src: `${D}/tape-1.png`,
    desktop: at(DS, 13, 8, 10, -5, 10), mobile: at(MS, 22, 4.2, 17, -5, 10) },
  { id: 'tape-strip', kind: 'tape', attach: 'sunrise', label: '', src: `${D}/tape-6.png`,
    desktop: at(DS, 33.5, 8.6, 11, 4, 10), mobile: at(MS, 66, 6.8, 20, 4, 10) },
  { id: 'tape-corner', kind: 'tape', attach: 'meadow', label: '', src: `${D}/tape-9.png`,
    desktop: at(DS, 89, 8.4, 7, 28, 10), mobile: at(MS, 46.5, 91, 12, 28, 10) },

  // ── Binder clips ──
  { id: 'clip-book', kind: 'clip', attach: 'book', label: '', src: `${D}/clip-2.png`,
    desktop: at(DS, 57.5, 9.9, 4.6, 4, 11), mobile: at(MS, 24, 55.8, 8, 4, 11) },
  { id: 'clip-spare', kind: 'clip', attach: 'sunrise', label: '', src: `${D}/clip-8.png`,
    desktop: at(DS, 27, 29.4, 4.2, -14, 11), mobile: at(MS, 54, 41, 8, -14, 11) },

  // ── Push pins ──
  { id: 'pin-c', kind: 'pin', attach: 'photo', label: '', src: `${D}/pin-10.png`,
    desktop: at(DS, 20.6, 31.4, 2.6, 12, 12), mobile: at(MS, 35.5, 44.5, 6, 12, 12) },
  { id: 'pin-d', kind: 'pin', attach: 'note-create', label: '', src: `${D}/pin-2.png`,
    desktop: at(DS, 42.5, 40.2, 2.6, -8, 13), mobile: at(MS, 64, 58.5, 6, -8, 13) },
  { id: 'pin-e', kind: 'pin', attach: 'note-exist', label: '', src: `${D}/pin-4.png`,
    desktop: at(DS, 59.5, 40.7, 2.6, 14, 13), mobile: at(MS, 74, 90.5, 6, 14, 13) },
  { id: 'pin-f', kind: 'pin', attach: 'note-rose', label: '', src: `${D}/pin-7.png`,
    desktop: at(DS, 77, 40.2, 2.6, -6, 13), mobile: at(MS, 76, 129.5, 6, -6, 13) },
  { id: 'pin-a', kind: 'pin', attach: 'cap-sunrise', label: '', src: `${D}/pin-1.png`,
    desktop: at(DS, 43.2, 21.2, 2.6, 8, 12), mobile: at(MS, 76, 34, 6, 8, 12) },
  { id: 'pin-g', kind: 'pin', attach: 'cap-meadow', label: '', src: `${D}/pin-8.png`,
    desktop: at(DS, 72.6, 25.2, 2.6, 10, 13), mobile: at(MS, 50, 114, 6, 10, 13) },
  { id: 'pin-b', kind: 'pin', attach: 'drawing', label: '', src: `${D}/pin-6.png`,
    desktop: at(DS, 5.6, 38.8, 2.8, -10, 12), mobile: at(MS, 9, 135, 6.5, -10, 12) },
  { id: 'pin-h', kind: 'pin', attach: 'book', label: '', src: `${D}/pin-9.png`,
    desktop: at(DS, 51.4, 29.4, 2.6, 14, 13), mobile: at(MS, 13.5, 88, 6, 14, 13) },
  { id: 'pin-i', kind: 'pin', attach: 'cap-drawing', label: '', src: `${D}/pin-11.png`,
    desktop: at(DS, 27.6, 44.2, 2.6, 6, 13), mobile: at(MS, 50, 144, 6, 6, 13) },
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
