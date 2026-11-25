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
  desktop: Placement;
  mobile: Placement;
}

/** Size of the cork area in cqw (1cqw = 1% of the board's width), so layouts below can be written in board units. */
const DS = { w: 93.46, h: 58.2 };   // desktop board, 1439 : 931
const MS = { w: 91.2, h: 148.7 };   // phone board, 4 : 6.3
const at = (s: { w: number; h: number }, x: number, y: number, w: number, r: number, z: number): Placement =>
  ({ x: +((x / s.w) * 100).toFixed(2), y: +((y / s.h) * 100).toFixed(2), w, r, z });

const D = '/images/corkboard';

export const boardItems: BoardItem[] = [
  // ── Photographs in Polaroid frames ──
  {
    id: 'photo', kind: 'photo', label: 'Polaroid photograph of Deepthika',
    frame: { src: `${D}/polaroid-4.png`, hole: [11.28, 13.09, 76.41, 64.55], ratio: 390 / 550 },
    photo: { src: `${D}/portrait.jpg`, position: 'center 18%' },
    desktop: at(DS, 15, 21, 19, -4, 2), mobile: at(MS, 22, 25, 30, -4, 2),
  },
  {
    id: 'sunrise', kind: 'photo', label: 'Polaroid photograph: my first sunrise trek',
    frame: { src: `${D}/polaroid-2.png`, hole: [15.63, 8.38, 66.04, 65.87], ratio: 371 / 501 },
    photo: { src: `${D}/sunrise.jpg`, position: 'center 55%' },
    desktop: at(DS, 36, 19.5, 17, 3, 2), mobile: at(MS, 67, 24, 26, 3, 2),
  },
  {
    id: 'meadow', kind: 'photo', label: 'Polaroid photograph: a wildflower meadow',
    frame: { src: `${D}/polaroid-1.png`, hole: [6.78, 6.81, 79.49, 68.88], ratio: 546 / 543 },
    photo: { src: `${D}/meadow.jpg`, position: 'center 100%' },
    desktop: at(DS, 79, 18.5, 21, -3, 2), mobile: at(MS, 30, 112, 36, -3, 2),
  },

  // ── The Midnight Library ──
  {
    id: 'book', kind: 'book', label: 'The Midnight Library. Click to open a note about it',
    src: `${D}/book-cover.jpg`,
    desktop: at(DS, 56, 20, 14.5, 3, 3), mobile: at(MS, 24, 73, 25, 3, 3),
  },

  // ── Captions: small sticky notes beside their photographs ──
  { id: 'cap-sunrise', kind: 'note', label: 'My first sunrise trek', text: 'My first sunrise trek', src: `${D}/note-green.webp`,
    fs: 15, ink: '#243a63', tilt: -2,
    desktop: at(DS, 43.5, 36, 8.5, 6, 6), mobile: at(MS, 75, 49, 20, 6, 6) },
  { id: 'cap-meadow', kind: 'note', label: 'A little moment among the wildflowers', text: 'A little moment among the wildflowers', src: `${D}/note-orange.webp`,
    fs: 13.2, ink: '#2b2f4a', tilt: 1.5,
    desktop: at(DS, 83, 35.5, 9.5, -5, 6), mobile: at(MS, 30, 139, 21, -5, 6) },

  // ── Three favourite quotes ──
  { id: 'note-create', kind: 'note', label: "You've consumed enough. It's time to CREATE", text: "You've consumed enough. It's time to CREATE", src: `${D}/note-yellow.webp`,
    fs: 14, ink: '#1f3270', tilt: -1.5,
    desktop: at(DS, 17, 46, 12.5, -3, 7), mobile: at(MS, 62, 74, 28, -3, 7) },
  { id: 'note-exist', kind: 'note', label: 'Make it exist first. Perfect it later :)', text: 'Make it exist first. Perfect it later :)', src: `${D}/note-pink.webp`,
    fs: 14.5, ink: '#2a2a3a', tilt: 1.2,
    desktop: at(DS, 55, 46, 12.5, 3, 7), mobile: at(MS, 72, 100, 28, 3, 7) },
  { id: 'note-rose', kind: 'note', label: 'la vie en rose.', text: 'la vie en rose.', src: `${D}/note-blue.webp`,
    fs: 19, ink: '#3a2340', tilt: -2,
    desktop: at(DS, 79, 47, 12.5, -2, 7), mobile: at(MS, 72, 130, 28, -2, 7) },

  // ── Washi tape ──
  { id: 'tape-photo', kind: 'tape', label: '', src: `${D}/tape-1.png`,
    desktop: at(DS, 15, 8.2, 11, -5, 10), mobile: at(MS, 22, 4.2, 17, -5, 10) },
  { id: 'tape-strip', kind: 'tape', label: '', src: `${D}/tape-6.png`,
    desktop: at(DS, 36, 8.4, 12, 4, 10), mobile: at(MS, 67, 6.8, 20, 4, 10) },
  { id: 'tape-corner', kind: 'tape', label: '', src: `${D}/tape-9.png`,
    desktop: at(DS, 89, 8.6, 7, 28, 10), mobile: at(MS, 47, 95, 12, 28, 10) },

  // ── Binder clips ──
  { id: 'clip-book', kind: 'clip', label: '', src: `${D}/clip-2.png`,
    desktop: at(DS, 56, 9.9, 4.6, 4, 11), mobile: at(MS, 24, 55.8, 8, 4, 11) },
  { id: 'clip-spare', kind: 'clip', label: '', src: `${D}/clip-8.png`,
    desktop: at(DS, 29, 31.5, 4.2, -14, 11), mobile: at(MS, 14, 127, 8, -14, 11) },

  // ── Push pins ──
  { id: 'pin-c', kind: 'pin', label: '', src: `${D}/pin-10.png`,
    desktop: at(DS, 23.8, 33.6, 2.6, 12, 12), mobile: at(MS, 35.5, 44.5, 6, 12, 12) },
  { id: 'pin-d', kind: 'pin', label: '', src: `${D}/pin-2.png`,
    desktop: at(DS, 17, 40.2, 2.6, -8, 13), mobile: at(MS, 62, 60, 6, -8, 13) },
  { id: 'pin-e', kind: 'pin', label: '', src: `${D}/pin-4.png`,
    desktop: at(DS, 55, 39.5, 2.6, 14, 13), mobile: at(MS, 72, 86.5, 6, 14, 13) },
  { id: 'pin-f', kind: 'pin', label: '', src: `${D}/pin-7.png`,
    desktop: at(DS, 79, 41.2, 2.6, -6, 13), mobile: at(MS, 72, 117, 6, -6, 13) },
  { id: 'pin-a', kind: 'pin', label: '', src: `${D}/pin-1.png`,
    desktop: at(DS, 43.5, 32.2, 2.6, 8, 12), mobile: at(MS, 75, 39.5, 6, 8, 12) },
  { id: 'pin-g', kind: 'pin', label: '', src: `${D}/pin-8.png`,
    desktop: at(DS, 83, 31.4, 2.6, 10, 13), mobile: at(MS, 30, 129, 6, 10, 13) },
  { id: 'pin-b', kind: 'pin', label: '', src: `${D}/pin-6.png`,
    desktop: at(DS, 89, 52, 2.8, -10, 12), mobile: at(MS, 7, 62, 6.5, -10, 12) },
  { id: 'pin-h', kind: 'pin', label: '', src: `${D}/pin-9.png`,
    desktop: at(DS, 30, 52.5, 2.6, 14, 13), mobile: at(MS, 50, 100, 6, 14, 13) },
  { id: 'pin-i', kind: 'pin', label: '', src: `${D}/pin-11.png`,
    desktop: at(DS, 64, 40.5, 2.6, 6, 13), mobile: at(MS, 7, 92, 6, 6, 13) },
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
