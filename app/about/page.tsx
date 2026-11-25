import type { Metadata } from 'next';
import Link from 'next/link';
import { Reveal, Stagger, StaggerItem } from '@/components/Motion';

export const metadata: Metadata = {
  title: "Curator's Note — Deepthika S",
  description: 'A note on the ideas, questions and experiences that shape Deepthika S’s approach to product design, engineering and research.',
};

const skills = [
  { k: 'Design', v: 'Human-Centred Design, Design Thinking, Rapid Prototyping, UI/UX, Graphic Design' },
  { k: 'Tools', v: 'Fusion 360, Proteus, LT Spice, KiCAD, ModelSim, CEDAR, Ansys HFSS, Wokwi, Arduino IDE, Figma, Canva' },
  { k: 'Programming', v: 'MATLAB, Embedded C, Verilog, Python' },
  { k: 'Ways of working', v: 'Technical Communication, Team Collaboration, Time Management' },
];
const research = [
  { slug: 'flavovr', t: 'Neophilic and Neophobic Design Preferences Across Generational Cohorts', v: 'Journal manuscript · submitted' },
  { slug: 'aesthetic-fingerprint', t: 'Where the Gaze Lingers: From Immersive Free-Viewing to a Stable Aesthetic Fingerprint', v: 'VRST 2026' },
  { slug: 'kaaya', t: 'KAAYA: The Body Draws What the Eye Never Sees', v: 'NeurIPS 2026 · Creative AI Track' },
  { slug: 'vapours', t: 'VAPOURS: Sculpting Fog to Find the Form Before the Form', v: 'NeurIPS 2026 · Creative AI Track' },
  { slug: 'calculator-fallacy', t: 'The Calculator Fallacy: Learners Blindly Trust Confident AI, Even When It Is Wrong', v: 'Research project' },
  { slug: 'llm-conformity', t: 'When the Majority Is Wrong: Would AI Still Follow the Crowd?', v: '13th IEEE UPCON 2026' },
  { slug: 'atomic-user-model', t: 'Creating an Atomic User Model for Personality-Aware LLM Interaction', v: 'Position paper · EMNLP 2026' },
];
const experience = [
  { t: 'Design Intern · SCALE Lab, IISc', d: 'Department of Design and Manufacturing. Working on design-led research and prototyping under the guidance of Sankar Balasubramanian.' },
  { t: 'Toy Design Innovator · Cognify (ReWire), IIT Madras', d: 'Designed Tactile Trails, a cognitive-sensory playmat for neurodivergent children. Worked with domain experts and conducted playtesting with children and parents. The prototype was showcased at Shaastra 2025 Open House and selected as a Top 25 finalist out of 1200+ teams.' },
  { t: 'Marketing Intern · Shaastra 2026, IIT Madras', d: 'Contributed to marketing and outreach for the annual technical festival.' },
];
const honors = [
  { t: 'Pitch Arena — Third Place', d: 'Pitched Tactile Trails at the Shark Tank–style competition organised by ELITE, the Entrepreneurship Club of Amrita, during Anokha 2026.' },
  { t: 'Anokha 2026 Techfair', d: 'SETU 5.0 was shortlisted for the Open House display at Anokha Techfair.' },
  { t: 'Product Construct — IIT Madras', d: 'Shortlisted in Round 1 of Product Construct, organised by the E-Cell, IIT Madras.' },
  { t: 'Prompt Masters ’25 — Second Runner Up', d: 'Built HelloMahila, an AI-driven women’s wellness companion using structured prompt flows and AI Library integration.' },
  { t: 'Creative Canvas — Second Runner Up', d: 'National-Level Creative Canvas Poster Design Contest organised by IEEE Student Branch WIE Branch, BAIT.' },
];
const certs = [
  { t: '3D Printing and Additive Manufacturing', o: 'University of Illinois Urbana-Champaign', w: 'Ongoing' },
  { t: 'Build Wireframes and Low Fidelity Prototypes', o: 'Google UX Design Professional', w: 'June 2025' },
  { t: 'Fundamentals of Graphic Design', o: 'California Institute of the Arts', w: 'June 2025' },
  { t: 'Introduction to the Internet of Things and Embedded Systems', o: 'University of California, Irvine', w: 'May 2025' },
  { t: 'Innovation Through Design: Think-Make-Break-Repeat', o: 'University of Sydney', w: 'May 2025' },
  { t: 'MATLAB Onramp Certification', o: 'MathWorks', w: 'Dec 2024' },
];

export default function About() {
  return <article className="editorial-about">
    <section className="curator-hero">
      <div className="wrap">
        <div className="curator-topline"><span>THE DEEPTHIKA INDEX / 01</span><span>CURATOR'S NOTE · COIMBATORE, INDIA</span><span>EST. 2026</span></div>
        <div className="curator-hero-grid">
          <Reveal className="curator-portrait"><img src="/images/deepthika.png" alt="Portrait of Deepthika S" /></Reveal>
          <div className="curator-copy">
            <Reveal><p className="index-section-kicker">A NOTE FROM THE CURATOR</p><h1>Curious by nature.<br /><em>Made to connect.</em></h1></Reveal>
            <Reveal delay={0.12}><p className="curator-role">Product Design · Design Research · Electronics · Interaction</p>
              <p className="curator-lede">I’m Deepthika, an Electronics and Communication Engineering student who has always found herself moving between different ways of making. I enjoy the visual language of art, the questions that guide design, and the logic that makes engineering work. Over time, I’ve realised that I’m most interested in the space where these three meet: where a human observation can become an experience, a product or an idea worth testing.</p>
            </Reveal>
            <Reveal delay={0.2}><div className="curator-actions"><a className="index-primary-link" href="/Deepthika-S-Resume.pdf" download>Download résumé <span>↓</span></a><a className="text-link" href="mailto:deepthikas123@gmail.com">Write to me ↗</a></div></Reveal>
          </div>
        </div>
      </div>
    </section>

    <section className="curator-section">
      <div className="wrap">
        <div className="curator-section-head"><span className="num">01 / THE THREAD</span><div><h2>How I got here.</h2><p>A little context behind the work, and the questions I keep returning to.</p></div></div>
        <div className="curator-story">
          <p>My starting point was often visual. I liked arranging things, making graphics, drawing and noticing why one object or interface felt more considered than another. Studying electronics gave me another way to look at the world: to understand what sits beneath the surface, how systems behave, and how an idea can be made to function.</p>
          <p>Design became the bridge between those interests. It gave me a way to begin with people, understand the situation around a problem, explore possible forms and then work with technology to bring one of those forms to life. I’m drawn to projects that let me move through that whole process, from observation and sketching to prototyping, testing and refinement.</p>
          <p>That curiosity now takes different forms: a sensory play experience for children, a disaster-response rover, a wearable that turns movement into art, or research into how people respond to visual and AI-generated systems. The subjects change, but the question stays similar: how might we make technology feel more thoughtful, understandable and human?</p>
        </div>
      </div>
    </section>

    <section className="curator-section">
      <div className="wrap">
        <div className="curator-section-head"><span className="num">02 / THE INTERSECTION</span><div><h2>Art × Design × Engineering.</h2><p>Three ways of thinking that keep finding their way into the same work.</p></div></div>
        <div className="curator-facts">
          <div className="curator-fact"><span className="k">ART</span><strong>Notice. Express. Communicate.</strong><p>Visual thinking, composition and storytelling.</p></div>
          <div className="curator-fact"><span className="k">DESIGN</span><strong>Question. Shape. Improve.</strong><p>Human-centred problem framing and experience design.</p></div>
          <div className="curator-fact"><span className="k">ENGINEERING</span><strong>Build. Test. Make it work.</strong><p>Electronics, systems and working prototypes.</p></div>
        </div>
      </div>
    </section>

    <section className="curator-section">
      <div className="wrap">
        <div className="curator-section-head"><span className="num">03 / EDUCATION</span><div><h2>Learning the systems.</h2><p>The technical foundation behind my design practice.</p></div></div>
        <div className="curator-facts">
          <div className="curator-fact"><span className="k">2023 — 2027</span><strong>B.Tech, Electronics and Communication Engineering</strong><p>Amrita Vishwa Vidyapeetham, Coimbatore</p></div>
          <div className="curator-fact"><span className="k">CURRENT FOCUS</span><strong>Product and interaction design</strong><p>Human-centred systems, prototyping and design research</p></div>
          <div className="curator-fact"><span className="k">BASED IN</span><strong>Coimbatore, India</strong><p>Open to thoughtful collaborations</p></div>
        </div>
      </div>
    </section>

    <section className="curator-section">
      <div className="wrap">
        <div className="curator-section-head"><span className="num">04 / PRACTICE</span><div><h2>Tools of the trade.</h2><p>A working set of methods and tools I keep building on.</p></div></div>
        <div className="curator-skill-grid">{skills.map(s=><div className="curator-skill" key={s.k}><strong>{s.k}</strong><span>{s.v}</span></div>)}</div>
      </div>
    </section>

    <section className="curator-section">
      <div className="wrap">
        <div className="curator-section-head"><span className="num">05 / FIELDWORK</span><div><h2>Places I've learned by doing.</h2><p>Experiences that have shaped how I approach people, products and problems.</p></div></div>
        <div className="curator-list">{experience.map((e,i)=><div className="curator-list-item" key={e.t}><span className="n">{String(i+1).padStart(2,'0')}</span><div><h3>{e.t}</h3><p>{e.d}</p></div><span className="meta">EXPERIENCE / {String(i+1).padStart(2,'0')}</span></div>)}</div>
      </div>
    </section>

    <section className="curator-section">
      <div className="wrap">
        <div className="curator-section-head"><span className="num">06 / RESEARCH</span><div><h2>Questions I keep following.</h2><p>Research projects exploring perception, interaction, creativity and human–AI relationships.</p></div></div>
        <div className="curator-list">{research.map((r,i)=><Link href={`/projects/${r.slug}`} className="curator-list-item" key={r.slug}><span className="n">{String(i+1).padStart(2,'0')}</span><div><h3>{r.t}</h3><p>{r.v}</p></div><span className="meta">OPEN CASE STUDY ↗</span></Link>)}</div>
      </div>
    </section>

    <section className="curator-section">
      <div className="wrap">
        <div className="curator-section-head"><span className="num">07 / MILESTONES</span><div><h2>A few markers along the way.</h2><p>Small reminders of ideas that made it out of the notebook.</p></div></div>
        <div className="curator-awards">{honors.map(h=><article className="curator-award" key={h.t}><h3>{h.t}</h3><p>{h.d}</p></article>)}</div>
      </div>
    </section>

    <section className="curator-section">
      <div className="wrap">
        <div className="curator-section-head"><span className="num">08 / CONTINUING EDUCATION</span><div><h2>Things I've been learning.</h2></div></div>
        <div className="curator-list">{certs.map((c,i)=><div className="curator-list-item" key={c.t}><span className="n">{String(i+1).padStart(2,'0')}</span><div><h3>{c.t}</h3><p>{c.o}</p></div><span className="meta">{c.w}</span></div>)}</div>
      </div>
    </section>

    <section className="curator-section">
      <div className="wrap">
        <div className="curator-section-head"><span className="num">09 / OUTSIDE THE STUDIO</span><div><h2>Other things I collect.</h2><p>Interests that keep my curiosity fed, even when I’m away from a screen.</p></div></div>
        <div className="curator-tags">{['Reading','Gardening','Journaling','Art & Calligraphy','Visual storytelling','Everyday objects','Graphic design','How things work'].map(t=><span key={t}>{t}</span>)}</div>
      </div>
    </section>
  </article>;
}
