'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { projects } from './projects';

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const ddRef = useRef<HTMLDivElement>(null);

  // every live case study opens on a dark hero — invert header text until scrolled
  const slug = pathname?.match(/^\/projects\/([^/]+)/)?.[1];
  const onDark = !!slug && projects.some((p) => p.slug === slug && p.live);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMobile(false);
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ddRef.current && !ddRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <>
      <header className={`site-header ${scrolled ? 'scrolled' : ''} ${onDark ? 'on-dark' : ''}`}>
        <div className="header-inner">
          <Link href="/" className="brand" aria-label="Deepthika S — home">
            Deepthika S<span className="dot">.</span>
          </Link>

          <nav className="nav" aria-label="Primary">
            <Link href="/" className={pathname === '/' ? 'active' : ''}>
              Work
            </Link>

            <div className="nav-projects" ref={ddRef}>
              <button
                aria-expanded={open}
                aria-haspopup="true"
                onClick={() => setOpen((v) => !v)}
              >
                Projects <span aria-hidden="true">{open ? '▴' : '▾'}</span>
              </button>
              {open && (
                <div className="dropdown" role="menu">
                  {projects.map((p) =>
                    p.live ? (
                      <Link
                        key={p.slug}
                        href={`/projects/${p.slug}`}
                        role="menuitem"
                        className={pathname?.startsWith(`/projects/${p.slug}`) ? 'current' : ''}
                      >
                        <span>
                          <span className="idx">{p.index}</span>
                          {p.title}
                        </span>
                        <span className="tag live-tag">{p.discipline}</span>
                      </Link>
                    ) : (
                      <span key={p.slug} className="soon" role="menuitem" aria-disabled="true">
                        <span>
                          <span className="idx">{p.index}</span>
                          {p.title}
                        </span>
                        <span className="tag">Coming soon</span>
                      </span>
                    ),
                  )}
                </div>
              )}
            </div>

            <Link href="/about" className={pathname === '/about' ? 'active' : ''}>
              About
            </Link>
            <a href="mailto:deepthikas123@gmail.com">Contact</a>
          </nav>

          <button className="menu-btn" onClick={() => setMobile(true)} aria-label="Open menu">
            Menu
          </button>
        </div>
      </header>

      {mobile && (
        <div className="mobile-nav" role="dialog" aria-label="Menu">
          <div className="top">
            <span className="brand">
              Deepthika S<span className="dot">.</span>
            </span>
            <button onClick={() => setMobile(false)} aria-label="Close menu">
              Close
            </button>
          </div>
          <Link href="/">Work</Link>
          {projects.map((p) =>
            p.live ? (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className={`small ${pathname?.startsWith(`/projects/${p.slug}`) ? 'current' : ''}`}
              >
                <span>
                  <span className="m-idx">{p.index}</span>
                  {p.title}
                </span>
                <span>{p.discipline}</span>
              </Link>
            ) : (
              <a key={p.slug} className="small" aria-disabled="true">
                <span>
                  <span className="m-idx">{p.index}</span>
                  {p.title}
                </span>
                <span>Coming soon</span>
              </a>
            ),
          )}
          <Link href="/about">About</Link>
          <a href="mailto:deepthikas123@gmail.com">Contact</a>
        </div>
      )}
    </>
  );
}
