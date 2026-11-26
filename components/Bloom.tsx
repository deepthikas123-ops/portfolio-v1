import type { CSSProperties } from 'react';

/**
 * The seven-petal bloom: a flat, decorative graphic that turns slowly about its centre dot.
 *
 * Geometry is traced from the supplied reference: seven identical teardrop petals (narrow at the centre end, round at
 * the outer end) spaced 360/7 degrees apart around a separate centre dot, with a clear gap between each petal's inner
 * tip and the dot. The viewBox is centred on the dot, so the whole mark rotates about it with no drift.
 * Colour is the site's accent token and nothing else (no stroke, gradient, shadow or glow).
 *
 * Position and size are in "k" units (1% of the hero composition's width, the same unit the ID card is built in), so a
 * bloom keeps its place relative to the card at every screen size. Used inside .bh-blooms (see hero-badge.css).
 *   x      signed horizontal offset of the bloom's centre from the middle of the composition (negative = left)
 *   y      vertical offset of its centre from the top of the composition
 *   yNarrow  optional y used instead on portrait-ish screens (aspect ratio <= 13:10), where the headline spans the full
 *          width and there is no open space beside it at the lower level
 *   size   diameter
 *   angle  static starting angle in degrees (also what shows when reduced motion is on)
 *   delay  animation delay in seconds (negative starts it part-way round)
 *   duration  seconds per full turn
 */
const PETAL =
  'M0 -85.2C8.3 -95.6 10.2 -109.2 13.5 -121.8C16.8 -134.5 20.6 -147.4 25.4 -159.7C30.2 -172 36.3 -183.6 42.8 -195C49.3 -206.4 56.1 -217.5 62.1 -229.2C68.1 -240.9 73.3 -253.2 76.5 -266.2C79.8 -279.2 81.3 -292.5 80 -305.3C78.7 -318.2 74.6 -330.5 67.2 -341.4C59.7 -352.3 49.4 -361.7 37.7 -368.2C26 -374.6 13 -378.1 0 -377.2C-13 -378.1 -26 -374.6 -37.7 -368.2C-49.4 -361.7 -59.7 -352.3 -67.2 -341.4C-74.6 -330.5 -78.7 -318.2 -80 -305.3C-81.3 -292.5 -79.8 -279.2 -76.5 -266.2C-73.3 -253.2 -68.1 -240.9 -62.1 -229.2C-56.1 -217.5 -49.3 -206.4 -42.8 -195C-36.3 -183.6 -30.2 -172 -25.4 -159.7C-20.6 -147.4 -16.8 -134.5 -13.5 -121.8C-10.2 -109.2 -8.3 -95.6 0 -85.2Z';

export default function Bloom({
  x,
  y,
  yNarrow,
  size = 12,
  angle = 0,
  delay = 0,
  duration = 22,
}: {
  x: number;
  y: number;
  yNarrow?: number;
  size?: number;
  angle?: number;
  delay?: number;
  duration?: number;
}) {
  const style = {
    '--bx': Math.abs(x),
    '--sx': x < 0 ? -1 : 1,
    '--by': y,
    ...(yNarrow != null ? { '--byn': yNarrow } : {}),
    '--bs': `calc(${size} * 1cqw)`,
    '--ba': `${angle}deg`,
    '--bdl': `${delay}s`,
    '--bd': `${duration}s`,
  } as CSSProperties;
  return (
    <svg className="bloom" viewBox="-380 -380 760 760" aria-hidden="true" focusable="false" style={style}>
      {Array.from({ length: 7 }, (_, i) => (
        <path key={i} d={PETAL} transform={`rotate(${(i * 360) / 7})`} />
      ))}
      <circle r="45.4" />
    </svg>
  );
}
