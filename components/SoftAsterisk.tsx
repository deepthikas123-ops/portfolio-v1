'use client';

import { useEffect, useRef } from 'react';

/**
 * Soft Asterisk — the studio's signature mark.
 *
 * Six rounded, slightly irregular arms (each one differs a little in length,
 * width, lean and angle so it feels hand-cut rather than machined) that rotate
 * slowly and smoothly. The speed eases up on hover and eases back down when the
 * pointer leaves. Under `prefers-reduced-motion` it stays still.
 *
 * Rotation is driven by requestAnimationFrame rather than a CSS animation so
 * that the speed change is continuous: changing `animation-duration` on a CSS
 * animation makes the mark jump, an eased angular velocity never does.
 */

type Props = {
  /** Number = px; string = any CSS length (e.g. "1.5em"). */
  size?: number | string;
  /** Any CSS colour. Defaults to the site's brand orange token. */
  color?: string;
  /** Seconds for one full revolution at rest. Higher = slower. */
  duration?: number;
  /** How many times faster it spins while hovered. */
  hoverSpeedUp?: number;
  /** Seconds the speed takes to ease between resting and hovered. */
  easing?: number;
  /**
   * Where hover is detected. "self" = the mark itself; "parent" = its parent
   * element (handy when the mark sits inside a link and is only ~20px wide).
   */
  hoverScope?: 'self' | 'parent';
  /** Optional accessible name. Omit for a purely decorative mark. */
  title?: string;
  className?: string;
};

// [angle jitter°, length, tip half-width, base half-width, lean]
const ARMS: ReadonlyArray<readonly [number, number, number, number, number]> = [
  [0, 43, 8.2, 5.0, 0.8],
  [3, 39, 7.4, 4.6, -0.6],
  [-2, 44, 8.6, 5.2, 0.4],
  [2, 38, 7.8, 4.8, -0.9],
  [-3, 42, 8.0, 5.0, 0.7],
  [1, 40, 7.2, 4.4, -0.4],
];

const r = (n: number) => Math.round(n * 10) / 10;

// Each arm points straight up from (50,50) and is rotated into place.
const ARM_PATHS = ARMS.map(([, L, wt, wb, lean]) =>
  [
    `M${r(50 - wb)} 50`,
    `C${r(50 - wb - 1 + lean)} ${r(50 - L * 0.35)} ${r(50 - wt - 0.6)} ${r(50 - L * 0.7)} ${r(50 - wt)} ${r(50 - L + wt)}`,
    `A${wt} ${r(wt * 1.05)} 0 0 1 ${r(50 + wt)} ${r(50 - L + wt)}`,
    `C${r(50 + wt + 0.6 - lean * 0.5)} ${r(50 - L * 0.7)} ${r(50 + wb + 1)} ${r(50 - L * 0.35)} ${r(50 + wb)} 50Z`,
  ].join(''),
);

export default function SoftAsterisk({
  size = 24,
  color = 'var(--accent)',
  duration = 28,
  hoverSpeedUp = 3,
  easing = 0.45,
  hoverScope = 'self',
  title,
  className,
}: Props) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const restSpeed = 360 / Math.max(duration, 0.1); // degrees per second
    let angle = 0;
    let target = restSpeed;
    let velocity = restSpeed;
    let last = 0;
    let raf = 0;

    const paint = () => {
      svg.style.transform = `rotate(${angle}deg)`;
    };

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1); // clamp after tab switches
      last = now;
      // exponential ease of angular velocity towards the target: no jumps
      velocity += (target - velocity) * (1 - Math.exp(-dt / Math.max(easing / 3, 0.01)));
      angle = (angle + velocity * dt) % 360;
      paint();
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      if (reduce.matches) {
        angle = 0;
        paint();
        return;
      }
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    const scope: HTMLElement | SVGSVGElement | null = hoverScope === 'parent' ? svg.parentElement : svg;
    const over = (e: Event) => {
      if ((e as PointerEvent).pointerType === 'touch') return;
      target = restSpeed * hoverSpeedUp;
    };
    const out = () => {
      target = restSpeed;
    };
    scope?.addEventListener('pointerenter', over);
    scope?.addEventListener('pointerleave', out);
    scope?.addEventListener('focusin', over);
    scope?.addEventListener('focusout', out);
    reduce.addEventListener('change', start);
    start();

    return () => {
      cancelAnimationFrame(raf);
      reduce.removeEventListener('change', start);
      scope?.removeEventListener('pointerenter', over);
      scope?.removeEventListener('pointerleave', out);
      scope?.removeEventListener('focusin', over);
      scope?.removeEventListener('focusout', out);
    };
  }, [duration, hoverSpeedUp, easing, hoverScope]);

  const dim = typeof size === 'number' ? `${size}px` : size;

  return (
    <svg
      ref={ref}
      className={className}
      viewBox="0 0 100 100"
      width={dim}
      height={dim}
      fill={color}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
      style={{ display: 'inline-block', flex: 'none', willChange: 'transform' }}
    >
      {title ? <title>{title}</title> : null}
      {ARM_PATHS.map((d, i) => (
        <path key={i} d={d} transform={`rotate(${60 * i + ARMS[i][0]} 50 50)`} />
      ))}
      <circle cx="50" cy="50" r="9" />
    </svg>
  );
}
