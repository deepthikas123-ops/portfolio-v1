'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const navigation = [
  { label: 'Collection', href: '/#collection' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Research', href: '/#research' },
  { label: 'Cabinet', href: '/#curiosities' },
  { label: 'Curator’s note', href: '/about' },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => setMobile(false), [pathname]);
  return <>
    <header className={`site-header index-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-inner">
        <Link href="/" className="brand" aria-label="The Deepthika Index — home">THE DEEPTHIKA INDEX<span className="dot">.</span></Link>
        <nav className="nav" aria-label="Primary">
          {navigation.map((item) => <Link key={item.href} href={item.href} className={pathname === '/about' && item.href === '/about' ? 'active' : ''}>{item.label}</Link>)}
          <a href="/Deepthika-S-Resume.pdf" download className="header-resume-link">Résumé ↓</a>
        </nav>
        <button className="menu-btn" onClick={() => setMobile(true)} aria-label="Open menu">Menu +</button>
      </div>
    </header>
    {mobile && <div className="mobile-nav index-mobile-nav" role="dialog" aria-modal="true" aria-label="Navigation">
      <div className="top"><span className="brand">THE DEEPTHIKA INDEX<span className="dot">.</span></span><button onClick={() => setMobile(false)} aria-label="Close menu">Close ×</button></div>
      {navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
      <a href="/Deepthika-S-Resume.pdf" download>Download résumé ↓</a><a href="mailto:deepthikas123@gmail.com">Contact ↗</a>
    </div>}
  </>;
}
