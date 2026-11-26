import { Reveal } from '@/components/Motion';
import BadgeRig from '@/components/BadgeRig';
import Bloom from '@/components/Bloom';

export default function BadgeHero() {
  return (
    <section className="badge-hero" aria-labelledby="bh-title">
      <div className="bh-stage">
        <p className="bh-meta bh-meta-left" aria-hidden="true">THE DEEPTHIKA STUDIO<span className="dot">.</span></p>
        <p className="bh-meta bh-meta-right">A PERSONAL ARCHIVE<br />OF IDEAS, OBJECTS &amp;<br />EXPERIMENTS</p>

        {/*
          Badge layers (bottom → top), each an independent element:
            strap   – hangs from the navigation bar
            hanger  – group that swings as one rigid body (pivot = clip ring); see components/BadgeRig.tsx
              pouch  – acrylic shell (shell image + card + gloss)
              clip   – metal swivel clip, attached through the shell's slot
        */}
        <Reveal className="bh-badge-wrap" y={20}>
          <BadgeRig />
        </Reveal>

        <Reveal delay={0.12} y={24}>
          <h1 id="bh-title" className="bh-title"><span className="t1">THE</span> <span className="t2">DEEPTHIKA</span> <span className="t3">STUDIO<span className="dot">.</span></span></h1>
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

      {/* two decorative blooms in the open space either side of the badge; they sit outside the stage, which clips its content */}
      <div className="bh-blooms" aria-hidden="true">
        <Bloom x={-77.6} y={28.9} angle={0} />
        <Bloom x={81.3} y={66.8} yNarrow={28.9} angle={26} />
      </div>
    </section>
  );
}
