import { Reveal } from '@/components/Motion';

export default function BadgeHero() {
  return (
    <section className="badge-hero" aria-labelledby="bh-title">
      <div className="bh-stage">
        <p className="bh-meta bh-meta-left" aria-hidden="true">THE DEEPTHIKA INDEX</p>
        <p className="bh-meta bh-meta-right">A PERSONAL ARCHIVE<br />OF IDEAS, OBJECTS &amp;<br />EXPERIMENTS</p>

        {/*
          Badge layers (bottom → top), each an independent element:
            strap   – hangs from the navigation bar
            hanger  – group that will swing as one rigid body (pivot = clip ring, see --bh-swing in hero-badge.css)
              pouch  – acrylic shell (shell image + card + gloss)
              clip   – metal swivel clip, attached through the shell's slot
        */}
        <Reveal className="bh-badge-wrap" y={20}>
          <img className="bh-layer bh-strap" data-layer="strap" src="/images/badge/strap.png" alt="" aria-hidden="true" width={130} height={415} decoding="async" />
          <div className="bh-hanger" data-layer="hanger">
            <div className="bh-pouch" data-layer="pouch">
              <img className="bh-layer bh-shell" data-layer="shell" src="/images/badge/shell.png" alt="" aria-hidden="true" width={670} height={840} decoding="async" />
              <div className="bh-card" data-layer="card">
                <p className="bh-card-title">CURATOR<br />&amp; MAKER</p>
                <img
                  className="bh-photo"
                  src="/images/deepthika-badge.jpg"
                  width={800}
                  height={812}
                  alt="Portrait of Deepthika S, smiling, in a tweed blazer and white shirt"
                  fetchPriority="high"
                  decoding="async"
                />
                <p className="bh-row bh-row-1"><b>NAME</b><span><img src="/images/badge/handwritten-name.png" alt="DEEPTHIKA S." /></span></p>
                <p className="bh-row bh-row-2"><b>INTERESTS</b><span><img src="/images/badge/handwritten-interests.png" alt="Art × Design × Engineering" /></span></p>
                <i className="bh-bar" aria-hidden="true" />
                <p className="bh-acc">ACCESSION NO. 001</p>
              </div>
              <img className="bh-layer bh-gloss" data-layer="gloss" src="/images/badge/shell-gloss.png" alt="" aria-hidden="true" width={670} height={840} decoding="async" />
            </div>
            <img className="bh-layer bh-clip" data-layer="clip" src="/images/badge/clip.png" alt="" aria-hidden="true" width={470} height={630} decoding="async" />
          </div>
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
