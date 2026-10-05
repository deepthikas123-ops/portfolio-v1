import Link from 'next/link';
import { Reveal, Stagger, StaggerItem } from '@/components/Motion';
import { projects } from '@/components/projects';

export default function Home() {
  const live = projects.filter((p) => p.live);
  const recent = live.slice(-4);

  return (
    <>
      <section className="home-hero">
        <span className="ghost-bg" aria-hidden="true">
          DS
        </span>
        <div className="wrap">
          <Reveal as="p" className="kicker">
            Product Design · Human-Centred Design · Electronics · Immersive Interaction · AI
            Research
          </Reveal>
          <Reveal as="h1" delay={0.1}>
            Deepthika S<span className="dot">.</span>
          </Reveal>
          <Reveal as="p" className="tagline" delay={0.25}>
            I believe that great products are built when <strong>design leads</strong> and{' '}
            <strong>engineering shapes them into reality</strong>. With a strong foundation in
            electronics and an appreciation for good design, I aim to bridge the gap between
            technology and usability in everything I create — from physical products to research
            on how people see, make and trust with AI.
          </Reveal>
          <Reveal className="recent" delay={0.4}>
            <p className="recent-label">Recent research</p>
            <ul>
              {recent.map((p) => (
                <li key={p.slug}>
                  <Link href={`/projects/${p.slug}`}>
                    <span className="r-idx">{p.index}</span>
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="work" id="work">
        <div className="wrap">
          <Reveal className="head">
            <h2 className="section-title">Selected Work</h2>
            <span className="count">
              {String(live.length).padStart(2, '0')} case studies ·{' '}
              {String(projects.length).padStart(2, '0')} projects
            </span>
          </Reveal>
          <Stagger className="work-grid">
            {live.map((p) => (
              <StaggerItem key={p.slug} className={p.featured ? 'featured-wrap' : ''}>
                <Link
                  href={`/projects/${p.slug}`}
                  className={`work-card ${p.featured ? 'featured' : ''}`}
                >
                  <div className={`media ${p.coverClass ?? ''}`}>
                    {p.cover ? (
                      <img src={p.cover} alt={`${p.title} — ${p.subtitle}`} loading="lazy" />
                    ) : (
                      <span className="fog-word" aria-hidden="true">
                        {p.title}
                      </span>
                    )}
                  </div>
                  <div className="meta">
                    <div>
                      <span className="idx">
                        {p.index}
                        <span className="disc">{p.discipline}</span>
                      </span>
                      <h3>{p.title}</h3>
                      <p className="sub">{p.subtitle}</p>
                    </div>
                    <span className="cta">View case study →</span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="index-section" id="index">
        <div className="wrap">
          <Reveal className="head">
            <h2 className="section-title">Project Index</h2>
          </Reveal>
          <Reveal as="div" className="proj-index" delay={0.1}>
            {projects.map((p) =>
              p.live ? (
                <Link key={p.slug} href={`/projects/${p.slug}`} className="pi-row">
                  <span className="pi-n">{p.index}</span>
                  <span className="pi-t">{p.title}</span>
                  <span className="pi-d">{p.discipline}</span>
                  <span className="pi-s">Case study</span>
                </Link>
              ) : (
                <div key={p.slug} className="pi-row soon" aria-disabled="true">
                  <span className="pi-n">{p.index}</span>
                  <span className="pi-t">{p.title}</span>
                  <span className="pi-d">{p.discipline}</span>
                  <span className="pi-s">In documentation</span>
                </div>
              ),
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}
