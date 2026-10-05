"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "figure" | "p" | "h1" | "h2" | "h3" | "li" | "span";
};

/** Fades and slides content up as it enters the viewport. */
export function Reveal({
  children,
  delay = 0,
  y = 36,
  className,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      // Server HTML always starts hidden; with reduced motion we show content
      // immediately on mount instead of waiting for a scroll-triggered reveal.
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      animate={reduce ? { opacity: 1, y: 0 } : undefined}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={
        reduce
          ? { duration: 0 }
          : { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }
      }
    >
      {children}
    </Tag>
  );
}

/** Staggered container: children with variants fade in one after another. */
export function Stagger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate={reduce ? "show" : undefined}
      whileInView={reduce ? undefined : "show"}
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: reduce ? 0 : 0.12 } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      style={style}
      variants={{
        hidden: { opacity: 0, y: reduce ? 0 : 30 },
        show: {
          opacity: 1,
          y: 0,
          transition: reduce
            ? { duration: 0 }
            : { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Absolutely-positioned background layer with a slow scroll parallax.
 * Place inside a `position: relative; overflow: hidden` section.
 */
export function ParallaxBg({
  className,
  amount = 50,
}: {
  className: string;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-amount, amount]);
  return (
    <motion.div
      ref={ref}
      className={className}
      style={reduce ? undefined : { y }}
      aria-hidden="true"
    />
  );
}
