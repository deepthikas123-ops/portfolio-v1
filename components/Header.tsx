'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { projects } from './projects';

type NavItem = { label: string; href: string; section?: string; collection?: 'project' | 'research' };

const navigation: NavItem[] = [
  { label: 'Collection', href: '/#collection', section: 'collection' },
  { label: 'Projects', href: '/#projects', section: 'projects', collection: 'project' },
  { label: 'Research', href: '/#research', section: 'research', collection: 'research' },
  { label: 'Cabinet', href: '/#curiosities', section: 'curiosities' },
  { label: 'Curator’s note', href: '/about' },
];

const SECTIONS = ['collection', 'projects', 'research', 'maker', 'curiosities'];
const FOCUSABLE = 'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])';

const liveIn = (collection?: 'project' | 'research') =>
  collection ? projects.filter((p) => p.live && p.collection === collection) : [];

export default function Header() {
  const rawPath = usePathname();
  // static exports can serve '/about/' — compare paths without the trailing slash
  const pathname = rawPath && rawPath.length > 1 ? rawPath.replace(/\/+$/, '') : rawPath;
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [section, setSection] = useState('');
  const menuBtn = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);

  // the case study being read decides which top-level item is highlighted
  const slug = pathname?.match(/^\/projects\/([^/]+)/)?.[1];
  const current = slug ? projects.find((p) => p.slug === slug) : undefined;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // scroll-spy: highlight the nav item for the home-page section in view
  useEffect(() => {
    if (pathname !== '/') {
      setSection('');
      return;
    }
    const seen = new Map<string, boolean>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => seen.set(e.target.id, e.isIntersecting));
        const first = SECTIONS.find((id) => seen.get(id));
        setSection(first ?? '');
      },
      { rootMargin: '-35% 0px -60% 0px' },
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [pathname]);

  const closeMenu = useCallback(() => {
    setMobile(false);
    menuBtn.current?.focus();
  }, []);

  useEffect(() => {
    setMobile(false);
  }, [pathname]);

  // modal behaviour for the mobile menu: lock scroll, move focus in, trap Tab, close on Escape
  useEffect(() => {
    if (!mobile) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const node = dialog.current;
    node?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu();
        return;
      }
      if (e.key !== 'Tab' || !node) return;
      const items = Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [mobile, closeMenu]);

  const isActive = (item: NavItem) => {
    if (item.href === '/about') return pathname === '/about';
    if (pathname === '/') return !!item.section && section === item.section;
    return !!item.collection && current?.collection === item.collection;
  };

  return (
    <>
      <header className={`site-header index-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-inner">
          <Link href="/" className="brand" aria-label="The Deepthika Index — home">
            THE DEEPTHIKA INDEX<span className="dot">.</span>
          </Link>
          <nav className="nav" aria-label="Primary">
            {navigation.map((item) => {
              const active = isActive(item);
              const link = (
                <Link href={item.href} className={active ? 'active' : ''} aria-current={active ? (item.href === '/about' ? 'page' : 'location') : undefined}>
                  {item.label}
                </Link>
              );
              const items = liveIn(item.collection);
              if (!items.length) return <span key={item.href} style={{ display: 'contents' }}>{link}</span>;
              return (
                <div className="nav-dd" key={item.href}>
                  {link}
                  <div className="nav-dd-menu">
                    {items.map((p) => (
                      <Link key={p.slug} href={`/projects/${p.slug}`}>
                        <span className="nav-idx">{p.index}</span>
                        {p.title}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
            <a href="/Deepthika-S-Resume.pdf" download className="header-resume-link">
              Résumé ↓
            </a>
          </nav>
          <button
            ref={menuBtn}
            className="menu-btn"
            onClick={() => setMobile(true)}
            aria-label="Open menu"
            aria-haspopup="dialog"
            aria-expanded={mobile}
          >
            Menu +
          </button>
        </div>
      </header>
      {mobile && (
        <div ref={dialog} className="mobile-nav index-mobile-nav" role="dialog" aria-modal="true" aria-label="Navigation">
          <div className="top">
            <span className="brand">
              THE DEEPTHIKA INDEX<span className="dot">.</span>
            </span>
            <button onClick={closeMenu} aria-label="Close menu">
              Close ×
            </button>
          </div>
          {navigation.map((item) => {
            const items = liveIn(item.collection);
            return (
              <div key={item.href}>
                <Link href={item.href} onClick={() => setMobile(false)} aria-current={isActive(item) ? 'location' : undefined}>
                  {item.label}
                </Link>
                {items.length > 0 && (
                  <div className="mobile-sub">
                    {items.map((p) => (
                      <Link key={p.slug} href={`/projects/${p.slug}`} onClick={() => setMobile(false)}>
                        {p.index} · {p.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          <a href="/Deepthika-S-Resume.pdf" download>
            Download résumé ↓
          </a>
          <a href="mailto:deepthikas123@gmail.com">Contact ↗</a>
        </div>
      )}
    </>
  );
}
