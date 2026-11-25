'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Additive interaction layer. Renders no visible UI at rest (the progress bar
 * and image viewer only appear on scroll / click) and never touches the layout
 * or styling of existing elements; all styling lives in app/motion.css.
 */
export default function Interactions() {
  const pathname = usePathname();
  const [zoom, setZoom] = useState<{ src: string; alt: string } | null>(null);
  const isCase = pathname?.startsWith('/projects/') ?? false;

  // soft fade-in of the page on every route change (opacity only, no layout effect)
  useEffect(() => {
    const main = document.querySelector('main');
    if (!main) return;
    main.classList.remove('page-enter');
    void (main as HTMLElement).offsetWidth;
    main.classList.add('page-enter');
  }, [pathname]);

  // reading progress for long case studies
  useEffect(() => {
    if (!isCase) return;
    const bar = document.getElementById('read-progress');
    if (!bar) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isCase, pathname]);

  // hero graphic follows the cursor a few pixels (fine pointers, motion allowed)
  useEffect(() => {
    const frame = document.querySelector<HTMLElement>('.index-art-frame');
    if (!frame) return;
    const ok = window.matchMedia('(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)');
    if (!ok.matches) return;
    let raf = 0;
    const move = (e: MouseEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = frame.getBoundingClientRect();
        frame.style.setProperty('--px', String(((e.clientX - r.left) / r.width - 0.5).toFixed(3)));
        frame.style.setProperty('--py', String(((e.clientY - r.top) / r.height - 0.5).toFixed(3)));
      });
    };
    const leave = () => { frame.style.setProperty('--px', '0'); frame.style.setProperty('--py', '0'); };
    frame.addEventListener('mousemove', move);
    frame.addEventListener('mouseleave', leave);
    return () => { frame.removeEventListener('mousemove', move); frame.removeEventListener('mouseleave', leave); };
  }, [pathname]);

  // click-to-enlarge for figures inside case studies
  useEffect(() => {
    if (!isCase) return;
    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!(t instanceof HTMLImageElement)) return;
      if (t.closest('a,button,.proj-nav') || t.naturalWidth < 400) return;
      setZoom({ src: t.currentSrc || t.src, alt: t.alt });
    };
    const main = document.querySelector('main');
    main?.addEventListener('click', onClick);
    document.body.classList.add('has-zoomable');
    return () => { main?.removeEventListener('click', onClick); document.body.classList.remove('has-zoomable'); };
  }, [isCase, pathname]);

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setZoom(null); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [zoom]);

  return (
    <>
      {isCase && <div id="read-progress" aria-hidden="true" />}
      {zoom && (
        <div className="zoom-overlay" role="dialog" aria-modal="true" aria-label="Enlarged image" onClick={() => setZoom(null)}>
          <button className="zoom-close" autoFocus aria-label="Close enlarged image" onClick={() => setZoom(null)}>Close ✕</button>
          <img src={zoom.src} alt={zoom.alt} />
        </div>
      )}
    </>
  );
}
