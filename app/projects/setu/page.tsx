import type { Metadata } from 'next';
import Link from 'next/link';
import { Reveal, Stagger, StaggerItem, ParallaxBg } from '@/components/Motion';
import { projects } from '@/components/projects';

export const metadata: Metadata = {
  title: 'SETU — Rapid Deployment Emergency Logistics System | Deepthika S',
  description:
    'SETU (सेतु, bridge) — a compact disaster-response system that delivers critical medical supplies across collapsed, flooded and inaccessible environments.',
};

const iterations = [
  {
    n: 1,
    issueTitle: 'ISSUE',
    issue:
      'High centre of gravity and an open-frame design caused poor stability & frequent tipping.',
    transition:
      'Redesigned with a lower, enclosed chassis to improve balance.',
  },
  {
    n: 2,
    issueTitle: 'ISSUE',
    issue:
      'The open-top architecture allowed the rope to disengage during traversal.',
    transition:
      'Introduced a cable pinch mechanism to securely retain the rope.',
  },
  {
    n: 3,
    issueTitle: 'ISSUE',
    issue:
      'The guide-pulley pinch mechanism was difficult to align, & the two wheels weren\u2019t supporting the cable enough.',
    transition: 'Transitioned to four-wheel traction for enhanced stability.',
  },
  {
    n: 4,
    issueTitle: 'ISSUE',
    issue:
      'Four-wheel traction improved grip, but stability under acceleration & payload shifts required further refinement.',
    transition:
      'Increased the distance between the wheels to maximize leverage and resist tipping.',
  },
  {
    n: 5,
    issueTitle: 'OUTCOME',
    issue:
      'Final architecture achieved excellent passive stability with reliable cable grip and a compact, balanced configuration.',
    transition: null,
  },
];

const logistics = [
  {
    num: '01',
    label: 'GROUND VEHICLES',
    img: '/images/tp-ground.jpg',
    points: [
      'Dependent on road accessibility.',
      'Unable to reach isolated communities after infrastructure failure.',
    ],
  },
  {
    num: '02',
    label: 'BOAT',
    img: '/images/tp-boat.jpg',
    points: [
      'Effective only where waterways remain navigable.',
      'Limited access in debris-filled or fragmented flood zones.',
    ],
  },
  {
    num: '03',
    label: 'HELICOPTER',
    img: '/images/tp-heli.jpg',
    points: [
      'Prioritized for large-scale evacuation and rescue.',
      'Unsuitable for frequent delivery of small medical payloads.',
      'High operational cost limits continuous deployment.',
    ],
  },
  {
    num: '04',
    label: 'DRONE',
    img: '/images/tp-drone.jpg',
    points: [
      'Designed primarily for one-time payload delivery.',
      'Lacks continuity for sustained medical supply.',
    ],
  },
];

export default function SetuPage() {
  const idx = projects.findIndex((p) => p.slug === 'setu');
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];

  return (
    <article>
      {/* ---------- Hero ---------- */}
      <section className="setu-hero grain">
        <div className="bg" aria-hidden="true" />
        <span className="ghost" aria-hidden="true">
          02
        </span>
        <div className="hero-grid">
          <Reveal as="figure" className="card" delay={0.15}>
            <img src="/images/hero-card.jpg" alt="SETU device prototype — front view" />
            <figcaption>
              Group project
              <br />
              2025 | 3 weeks
            </figcaption>
          </Reveal>
          <div className="copy">
            <Reveal delay={0.3}>
              <h1>
                SETU. <span className="hindi">सेतु</span> <span className="small">(bridge)</span>
              </h1>
              <p className="sub">Rapid Deployment Emergency Logistics System</p>
            </Reveal>
            <Reveal delay={0.45}>
              <p className="desc">
                A compact disaster-response system that delivers critical medical supplies across
                collapsed, flooded &amp; inaccessible environments. By bridging the last mile
                between emergency responders and isolated communities, SETU enables faster, safer,
                and more resilient relief operations.
              </p>
            </Reveal>
            <Reveal delay={0.6}>
              <img
                className="sdg"
                src="/images/sdg.png"
                alt="UN Sustainable Development Goals 3, 9 and 11"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Flood: the last-mile problem ---------- */}
      <section className="flood">
        <ParallaxBg className="bg" amount={70} />
        <div className="inner">
          <Reveal as="h2">
            The Shortest Distance.
            <br />
            The Hardest Journey.
          </Reveal>
          <Reveal as="span" className="chip chip-stranded" delay={0.5}>
            Stranded community
          </Reveal>
          <Reveal as="span" className="chip chip-relief" delay={0.7}>
            Relief Team
          </Reveal>
          <Reveal className="caption" delay={0.3}>
            <h3>Aid arrives. Delivery stops.</h3>
            <p>
              When roads collapse and access is lost, even the final 10–20 metres can prevent
              medicines &amp; other essential supplies from reaching affected communities.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- Current Disaster Logistics ---------- */}
      <section className="logistics">
        <div className="wrap">
          <Reveal>
            <h2 className="section-title">Current Disaster Logistics</h2>
            <p className="intro">
              Disaster response relies on multiple transportation systems. Each serves a critical
              role, yet none is optimized for repeated delivery of small, time-sensitive medical
              supplies to isolated communities.
            </p>
          </Reveal>
          <Stagger className="logi-grid">
            {logistics.map((l) => (
              <StaggerItem key={l.num} className="logi-item">
                <div className="num">{l.num}</div>
                <div className="label">{l.label}</div>
                <img src={l.img} alt={l.label.toLowerCase()} />
                <ul>
                  {l.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---------- Dark quote ---------- */}
      <section className="dark-section quote-band grain">
        <div className="glow" aria-hidden="true" />
        <div className="wrap">
          <Reveal as="p">
            Current systems are designed to reach disaster zones quickly.
            <br />
            But none are optimized to sustain <span className="accent">
              last-mile delivery
            </span>{' '}
            challenge.
          </Reveal>
        </div>
      </section>

      {/* ---------- Statement ---------- */}
      <section className="dark-section statement-band grain">
        <div className="glow" aria-hidden="true" />
        <div className="wrap">
          <Reveal as="h2">
            Statement<span className="accent">.</span>
          </Reveal>
          <Reveal as="p" delay={0.15}>
            To design &amp; develop a <span className="accent">rapidly deployable</span> logistics
            system capable of <span className="accent">delivering</span> essential supplies{' '}
            <span className="accent">repeatedly</span> across inaccessible{' '}
            <span className="accent">last-mile environments.</span>
          </Reveal>
        </div>
      </section>

      {/* ---------- Cable closeup ---------- */}
      <section className="closeup">
        <Reveal y={0}>
          <img src="/images/closeup.jpg" alt="SETU prototype gripping a suspended cable" />
        </Reveal>
      </section>

      {/* ---------- Ideation & Prototyping ---------- */}
      <section className="ideation">
        <div className="wrap">
          <Reveal>
            <h2 className="section-title">Ideation &amp; Prototyping</h2>
          </Reveal>
          <Stagger className="iter-grid">
            {iterations.map((it) => (
              <StaggerItem key={it.n} className="iter-col">
                <span className="pill">Iteration {it.n}</span>
                <img
                  src={`/images/iter-${it.n}.jpg`}
                  alt={`Iteration ${it.n} — sketches and prototype`}
                />
                <div className="iter-panel grain">
                  <h4>{it.issueTitle}</h4>
                  <p>{it.issue}</p>
                </div>
                {it.transition && (
                  <div className="iter-panel grain">
                    <h4>TRASITION</h4>
                    <p>{it.transition}</p>
                  </div>
                )}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---------- Design Process ---------- */}
      <section className="process">
        <div className="wrap">
          <Reveal>
            <h2 className="section-title">Design Process</h2>
          </Reveal>
        </div>
        <Reveal className="strip">
          <div className="wrap">
            <p className="label">Ideation + Form Prototyping</p>
          </div>
          <img src="/images/strip-1.jpg" alt="Ideation and form prototyping — photo strip" />
        </Reveal>
        <Reveal className="strip right">
          <div className="wrap">
            <p className="label">Electronic Prototyping</p>
          </div>
          <img src="/images/strip-2.jpg" alt="Electronic prototyping — photo strip" />
        </Reveal>
        <Reveal className="strip">
          <div className="wrap">
            <p className="label">Indoor Validation + Outdoor Testing</p>
          </div>
          <img src="/images/strip-3.jpg" alt="Indoor validation and outdoor testing — photo strip" />
        </Reveal>
      </section>

      {/* ---------- Introducing SETU / Features / Exploded view ---------- */}
      <section className="slab">
        <Reveal y={0}>
          <img src="/images/p2-hero.jpg" alt="Introducing SETU — final product render" />
        </Reveal>
        <Reveal y={0}>
          <img
            src="/images/p2-features.jpg"
            alt="SETU features — 01 traction system, 02 payload bay, 03 obstacle detection"
          />
        </Reveal>
        <Reveal y={0}>
          <img
            src="/images/p2-exploded.jpg"
            alt="Exploded view — wings, traction wheels with motors, ultrasonic sensor, PCB, battery pack, payload drawer, load cell, suspension cable, side cover, lower chassis, screws, bolts and bushings"
          />
        </Reveal>
      </section>

      {/* ---------- Closing quote ---------- */}
      <section className="dark-section closing grain" style={{ background: 'var(--dark-3)' }}>
        <div className="glow" aria-hidden="true" />
        <div className="wrap">
          <Reveal as="p">
            In disaster response, every minute without aid is time against survival.
            <br />
            <span className="accent">SETU</span> gives that time back.
          </Reveal>
        </div>
      </section>

      {/* ---------- Prev / next ---------- */}
      <nav className="proj-nav" aria-label="Project navigation">
        <div className="wrap row">
          <div>
            <p className="hint">Previous project</p>
            <p className="name">
              {prev.title}
              {!prev.live && <span className="soon-mark">coming soon</span>}
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p className="hint">Next project</p>
            {next.live ? (
              <Link href={`/projects/${next.slug}`} className="name">
                {next.title}
              </Link>
            ) : (
              <p className="name">
                {next.title}
                <span className="soon-mark">coming soon</span>
              </p>
            )}
          </div>
        </div>
      </nav>
    </article>
  );
}
