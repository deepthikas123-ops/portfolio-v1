import { Reveal } from '@/components/Motion';

/** Metal D-ring, swivel and clip that hold the badge. Pure SVG, no raster art. */
function Clip() {
  return (
    <svg className="bh-clip" viewBox="0 0 140 210" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="bhm" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8d9096" />
          <stop offset=".22" stopColor="#f4f5f7" />
          <stop offset=".5" stopColor="#b9bcc2" />
          <stop offset=".78" stopColor="#eef0f2" />
          <stop offset="1" stopColor="#80838a" />
        </linearGradient>
        <linearGradient id="bhv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fafafa" />
          <stop offset=".55" stopColor="#c5c8cd" />
          <stop offset="1" stopColor="#9a9da3" />
        </linearGradient>
      </defs>
      <rect x="8" y="6" width="124" height="76" rx="24" fill="none" stroke="url(#bhm)" strokeWidth="7" />
      <rect x="48" y="74" width="44" height="44" rx="14" fill="url(#bhv)" stroke="#8a8d93" strokeWidth="1" />
      <path d="M34 112h72a10 10 0 0 1 10 10v50a6 6 0 0 1-6 6H30a6 6 0 0 1-6-6v-50a10 10 0 0 1 10-10z" fill="url(#bhm)" stroke="#8a8d93" strokeWidth="1" />
      <ellipse cx="70" cy="146" rx="13" ry="14" fill="url(#bhv)" stroke="#7d8087" strokeWidth="1.5" />
      <circle cx="70" cy="146" r="4.5" fill="#6f7279" />
      <rect x="4" y="182" width="132" height="18" rx="7" fill="url(#bhm)" stroke="#8a8d93" strokeWidth="1" />
    </svg>
  );
}

export default function BadgeHero() {
  return (
    <section className="badge-hero" aria-labelledby="bh-title">
      <div className="bh-stage">
        <p className="bh-meta bh-meta-left" aria-hidden="true">THE DEEPTHIKA INDEX</p>
        <p className="bh-meta bh-meta-right">A PERSONAL ARCHIVE<br />OF IDEAS, OBJECTS &amp;<br />EXPERIMENTS</p>

        <Reveal className="bh-badge-wrap" y={20}>
          <div className="bh-strap" aria-hidden="true" />
          <Clip />
          <figure className="bh-holder">
            <div className="bh-card">
              <p className="bh-card-title">CURATOR<br />&amp; MAKER</p>
              <img
                className="bh-photo"
                src="/images/deepthika-badge.jpg"
                width={800}
                height={842}
                alt="Portrait of Deepthika S, smiling, in a tweed blazer and white shirt"
                fetchPriority="high"
                decoding="async"
              />
              <p className="bh-row bh-row-1"><b>NAME</b><span>DEEPTHIKA S.</span></p>
              <p className="bh-row bh-row-2"><b>INTERESTS</b><span>ART × DESIGN × ENGINEERING</span></p>
              <i className="bh-bar" aria-hidden="true" />
              <p className="bh-acc">ACCESSION NO. 001</p>
            </div>
          </figure>
        </Reveal>

        <Reveal delay={0.12} y={24}>
          <h1 id="bh-title" className="bh-title"><span className="t1">THE</span> <span className="t2">DEEPTHIKA</span> <span className="t3">INDEX</span></h1>
        </Reveal>

        <Reveal className="bh-cols" delay={0.2} y={20}>
          <div className="bh-col">
            <h2>AN ENGINEER WITH AN EYE FOR DESIGN</h2>
            <p>I explore the intersection of technology, people and everyday life to design thoughtful, tangible and meaningful experiences.</p>
          </div>
          <div className="bh-rule" aria-hidden="true" />
          <div className="bh-col">
            <h2>A COLLECTION OF CURIOSITIES</h2>
            <p>Projects, research, experiments and little things that spark my imagination. A growing archive of how I think, make and learn.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
