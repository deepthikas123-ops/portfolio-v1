import type { Metadata } from 'next';
import Link from 'next/link';
import { Reveal } from '@/components/Motion';

export const metadata: Metadata = {
  title: "Curator's Note — Deepthika S",
  description: 'A note on the ideas, questions and experiences that shape Deepthika S’s approach to product design, engineering and research.',
};

const LINKEDIN = 'https://www.linkedin.com/in/deepthika365';

/* An engineer by training and a designer by passion — copy follows the latest résumé. */
const story = [
  'I believe great products are built when design leads and engineering shapes it into reality. Following this approach, I developed a strong interest in human-centered design and product innovation, focusing on building technology that truly serves people. With a passion for blending engineering and design, I aim to bridge the gap between technology and usability in everything I create.',
  'I’m an Electronics and Communication Engineering student who has always found herself moving between different ways of making. I enjoy the visual language of art, the questions that guide design, and the logic that makes engineering work. Over time, I’ve realised that I’m most interested in the space where these three meet: where a human observation can become an experience, a product or an idea worth testing.',
  'My starting point was often visual. I liked arranging things, making graphics, drawing and noticing why one object or interface felt more considered than another. Studying electronics gave me another way to look at the world: to understand what sits beneath the surface, how systems behave, and how an idea can be made to function.',
  'Design became the bridge between those interests. It gave me a way to begin with people, understand the situation around a problem, explore possible forms and then work with technology to bring one of those forms to life. I’m drawn to projects that let me move through that whole process, from observation and sketching to prototyping, testing and refinement.',
  'That curiosity now takes different forms: a sensory play experience for children, a disaster-response rover, a wearable that turns movement into art, or research into how people respond to visual and AI-generated systems. The subjects change, but the question stays similar: how might we make technology feel more thoughtful, understandable and human?',
];

type Skill = { k: string; v: string };
const skills: Skill[] = [
  { k: 'Design skills', v: 'Concept development, Design Thinking, Aesthetic and form analysis, User studies, Storyboarding, Sensory design, Spatial planning, Biomimetic design' },
  { k: 'Digital skills', v: 'Fusion 360, Photoshop, Illustrator, InDesign, Vizcom AI, Figma, Canva, Notion, Proteus and KiCAD (circuit simulation & PCB layout)' },
  { k: 'Analogue skills', v: 'Ideation sketching, Rapid prototyping, Circuit design, Testing and troubleshooting' },
  { k: 'Engineering tools', v: 'LT Spice, ModelSim, CEDAR, Ansys HFSS, Wokwi, Arduino IDE' },
  { k: 'Programming', v: 'MATLAB, Embedded C, Verilog, Python' },
  { k: 'Soft skills', v: 'Visual storytelling, Communication, Interdisciplinary collaboration, Receptive to feedback, Technical communication, Team collaboration, Time management' },
];

type Education = { k: string; t: string; d: string };
const education: Education[] = [
  { k: 'AUG 2023 — JUN 2027 (EXPECTED)', t: 'B.Tech, Electronics and Communication Engineering', d: 'Amrita Vishwa Vidyapeetham, Coimbatore · CGPA 7.99/10 (through Semester 6)' },
  { k: 'JAN 2022 — MAR 2023', t: 'CBSE Class XII · 93.4%', d: 'Vidhya Niketan Public School, Coimbatore · Physics, Chemistry, Biology, Mathematics' },
  { k: 'MAR 2020 — APR 2021', t: 'CBSE Class X · 97.4%', d: 'SSVM World School, Coimbatore' },
  { k: 'CURRENT FOCUS', t: 'Product and interaction design', d: 'Human-centred systems, prototyping and design research' },
  { k: 'BASED IN', t: 'Coimbatore, India', d: 'Open to thoughtful collaborations' },
];

type Entry = { t: string; meta?: string; d?: string; bullets?: string[] };
const experience: Entry[] = [
  {
    t: 'Product Design Intern · SCALE Lab, CPDM, Indian Institute of Science (IISc)',
    meta: 'JAN 2026 — JUN 2026',
    bullets: [
      'Developed the Iconicity Classification Algorithm (IKA), a framework that places product designs on a spectrum from conventional to unconventional using image embeddings and vision-language models, giving designers’ judgement of “unconventional” a measurable scale.',
      'Designed and conducted a cross-generational study of how people respond to conventional and unconventional product aesthetics, comparing neophilic and neophobic preferences across Generations X, Y, Z and Alpha.',
      'Contributed to FLAVOVR, an immersive VR eye-tracking system that captures implicit aesthetic preferences, and to a separate study of aesthetic gaze behaviour, exploring how individual gaze patterns can inform personalised product design.',
    ],
  },
  {
    t: 'Head of Design · Quizkrieg, Quiz Wing of Srishti, Amrita Vishwa Vidyapeetham',
    meta: 'AUG 2024 — JUN 2026',
    bullets: ['Managed the end-to-end design workflow, coordinating a team of designers, assigning tasks, maintaining design quality and ensuring timely delivery of projects.'],
  },
  {
    t: 'Toy Design Innovator · Cognify (ReWire), IIT Madras',
    meta: 'SHAASTRA 2025',
    d: 'Designed Tactile Trails, a cognitive-sensory playmat for neurodivergent children. Worked with domain experts and conducted playtesting with children and parents. The prototype was showcased at Shaastra 2025 Open House and selected as a Top 25 finalist out of 1200+ teams.',
  },
];

type Research = { slug?: string; t: string; v: string };
const research: Research[] = [
  { slug: 'kaaya', t: 'KAAYA: The Body Draws What the Eye Never Sees', v: 'Accepted · NeurIPS 2026 · Creative AI Track (Agency), Sydney' },
  { slug: 'aesthetic-fingerprint', t: 'Where the Gaze Lingers: From Immersive Free-Viewing to a Stable Aesthetic Fingerprint', v: 'Accepted · VRST 2026 (Sendai, Japan) · Poster and Demo Track' },
  { t: 'When a Hundred Machines Agree to Disagree: Visualising Synthetic Consensus, Conflict and Compromise among Agents in AI-Assisted Design Ideation', v: 'Submitted · Information+ 2027, Politecnico di Milano' },
  { slug: 'flavovr', t: 'Neophilic and Neophobic Design Preferences Across Generational Cohorts', v: 'Submitted · International Journal of Human–Computer Interaction (Taylor & Francis)' },
  { slug: 'vapours', t: 'VAPOURS: Sculpting Fog to Find the Form Before the Form', v: 'NeurIPS 2026 · Creative AI Track' },
  { slug: 'calculator-fallacy', t: 'The Calculator Fallacy: Learners Blindly Trust AI, Even When It Is Wrong', v: 'Submitted · 16th International Conference of the European Academy of Design (TRUST–DISTRUST)' },
  { slug: 'llm-conformity', t: 'When the Majority Is Wrong: Would AI Still Follow the Crowd?', v: '13th IEEE UPCON 2026' },
  { slug: 'atomic-user-model', t: 'Creating an Atomic User Model for Personality-Aware LLM Interaction', v: 'Position paper · EMNLP 2026' },
];

const honors = [
  { t: 'NeurIPS Financial Assistance Award', d: 'Awarded USD 515 covering conference and workshop registration, along with one week of accommodation in Sydney, to support the presentation of the accepted paper “KAAYA: The Body Draws What the Eye Never Sees” at NeurIPS 2026.' },
  { t: 'Rewire-Cognify — Finalist, IIT Madras', d: '“Tactile Trails” was selected among the Top 25 finalists from over 1,200 entries across India and invited for exhibition at the Open House Neurodivergent Toy Expo during Shaastra 2025.' },
  { t: 'Pitch Arena — Third Place', d: 'Secured third place for pitching “Tactile Trails” before a panel of Shark Tank contestants at the entrepreneurship competition organised by ELITE, the university’s Entrepreneurship Club.' },
  { t: 'Creative Canvas — Third Place', d: 'Recognised among the top three entries out of 200+ participants in a national-level poster design competition organised by IEEE Student Branch WIE, BAIT.' },
  { t: 'Anokha 2026 Techfair', d: 'SETU 5.0 was shortlisted for the Open House display at Anokha Techfair, a national-level techfest.' },
  { t: 'Product Construct — IIT Madras', d: 'Shortlisted in Round 1 of Product Construct, organised by the E-Cell, IIT Madras.' },
  { t: 'Prompt Masters ’25 — Second Runner Up', d: 'Built HelloMahila, an AI-driven women’s wellness companion using structured prompt flows and AI Library integration.' },
];

const certs = [
  { t: '3D Printing and Additive Manufacturing', o: 'University of Illinois Urbana-Champaign', w: 'Ongoing' },
  { t: 'Build Wireframes and Low Fidelity Prototypes', o: 'Google UX Design Professional', w: 'June 2025' },
  { t: 'Fundamentals of Graphic Design', o: 'California Institute of the Arts', w: 'June 2025' },
  { t: 'Introduction to the Internet of Things and Embedded Systems', o: 'University of California, Irvine', w: 'May 2025' },
  { t: 'Innovation Through Design: Think-Make-Break-Repeat', o: 'University of Sydney', w: 'May 2025' },
  { t: 'MATLAB Onramp Certification', o: 'MathWorks', w: 'Dec 2024' },
];

const volunteering: Entry[] = [
  { t: 'Community Art Volunteer · “Wall as a Canvas”, Bengaluru', d: 'Contributed to a community art initiative, collaborating with artists to transform a public space through collective mural painting.' },
  { t: 'Marketing Intern · Shaastra 2026, IIT Madras', meta: 'SHAASTRA 2026', d: 'Led campus outreach and marketing for the event; recognised among the Top 50 Campus Ambassador Interns nationwide.' },
];

const languages = [
  { l: 'English', p: 'Professional' },
  { l: 'Tamil', p: 'Native' },
  { l: 'Hindi', p: 'Limited' },
  { l: 'Italian', p: 'Elementary' },
  { l: 'Japanese', p: 'Elementary' },
];

const interests = ['Reading', 'Exploring new hobbies', 'Junk journaling', 'Sketching', 'Art & Calligraphy', 'Gardening', 'Visual storytelling', 'Everyday objects', 'Graphic design', 'How things work'];

const pad = (i: number) => String(i + 1).padStart(2, '0');

function Head({ num, title, sub }: { num: string; title: string; sub?: string }) {
  return <div className="curator-section-head"><span className="num">{num}</span><div><h2>{title}</h2>{sub && <p>{sub}</p>}</div></div>;
}

function Details({ e }: { e: Entry }) {
  return <>
    {e.d && <p>{e.d}</p>}
    {e.bullets && <ul className="curator-bullets">{e.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}
  </>;
}

export default function About() {
  return <article className="editorial-about">
    <section className="curator-hero">
      <div className="wrap">
        <div className="curator-topline"><span>THE DEEPTHIKA INDEX / 01</span><span>CURATOR'S NOTE · COIMBATORE, INDIA</span><span>EST. 2026</span></div>
        <div className="curator-hero-grid">
          <Reveal className="curator-portrait"><img src="/images/deepthika-portrait.jpg" alt="Portrait of Deepthika S, smiling, seated in a beige blazer and white shirt" width={1100} height={1251} /></Reveal>
          <div className="curator-copy">
            <Reveal><p className="index-section-kicker">A NOTE FROM THE CURATOR</p><h1>Curious by nature.<br /><em>Made to connect.</em></h1></Reveal>
            <Reveal delay={0.12}><p className="curator-role">Product Design · Design Research · Electronics · Interaction</p>
              <p className="curator-lede">An engineer by training and a designer by passion, driven by the belief that understanding how things work is the first step towards making them work better. I’m Deepthika, and I’m most interested in the space where art, design and engineering meet: where a human observation can become an experience, a product or an idea worth testing.</p>
            </Reveal>
            <Reveal delay={0.2}><div className="curator-actions"><a className="index-primary-link" href="/Deepthika-S-Resume.pdf" download>Download résumé <span>↓</span></a><a className="text-link" href="mailto:deepthikas123@gmail.com">Write to me ↗</a><a className="text-link" href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></div></Reveal>
          </div>
        </div>
      </div>
    </section>

    <section className="curator-section">
      <div className="wrap">
        <Head num="01 / THE THREAD" title="How I got here." sub="A little context behind the work, and the questions I keep returning to." />
        <div className="curator-story">{story.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}</div>
      </div>
    </section>

    <section className="curator-section">
      <div className="wrap">
        <Head num="02 / THE INTERSECTION" title="Art × Design × Engineering." sub="Three ways of thinking that keep finding their way into the same work." />
        <div className="curator-facts">
          <div className="curator-fact"><span className="k">ART</span><strong>Notice. Express. Communicate.</strong><p>Visual thinking, composition and storytelling.</p></div>
          <div className="curator-fact"><span className="k">DESIGN</span><strong>Question. Shape. Improve.</strong><p>Human-centred problem framing and experience design.</p></div>
          <div className="curator-fact"><span className="k">ENGINEERING</span><strong>Build. Test. Make it work.</strong><p>Electronics, systems and working prototypes.</p></div>
        </div>
      </div>
    </section>

    <section className="curator-section">
      <div className="wrap">
        <Head num="03 / EDUCATION" title="Learning the systems." sub="The technical foundation behind my design practice." />
        <div className="curator-facts">{education.map((e) => <div className="curator-fact" key={e.t}><span className="k">{e.k}</span><strong>{e.t}</strong><p>{e.d}</p></div>)}</div>
      </div>
    </section>

    <section className="curator-section">
      <div className="wrap">
        <Head num="04 / PRACTICE" title="Tools of the trade." sub="A working set of methods and tools I keep building on." />
        <div className="curator-skill-grid">{skills.map((s) => <div className="curator-skill" key={s.k}><strong>{s.k}</strong><span>{s.v}</span></div>)}</div>
      </div>
    </section>

    <section className="curator-section">
      <div className="wrap">
        <Head num="05 / FIELDWORK" title="Places I've learned by doing." sub="Experiences that have shaped how I approach people, products and problems." />
        <div className="curator-list">{experience.map((e, i) => <div className="curator-list-item" key={e.t}><span className="n">{pad(i)}</span><div><h3>{e.t}</h3><Details e={e} /></div><span className="meta">{e.meta ?? `EXPERIENCE / ${pad(i)}`}</span></div>)}</div>
      </div>
    </section>

    <section className="curator-section">
      <div className="wrap">
        <Head num="06 / RESEARCH" title="Questions I keep following." sub="Research projects exploring perception, interaction, creativity and human–AI relationships." />
        <div className="curator-list">{research.map((r, i) => r.slug
          ? <Link href={`/projects/${r.slug}`} className="curator-list-item" key={r.t}><span className="n">{pad(i)}</span><div><h3>{r.t}</h3><p>{r.v}</p></div><span className="meta">OPEN CASE STUDY ↗</span></Link>
          : <div className="curator-list-item is-soon" key={r.t}><span className="n">{pad(i)}</span><div><h3>{r.t}</h3><p>{r.v}</p></div><span className="meta">CASE STUDY SOON</span></div>)}</div>
      </div>
    </section>

    <section className="curator-section">
      <div className="wrap">
        <Head num="07 / MILESTONES" title="A few markers along the way." sub="Small reminders of ideas that made it out of the notebook." />
        <div className="curator-awards">{honors.map((h) => <article className="curator-award" key={h.t}><h3>{h.t}</h3><p>{h.d}</p></article>)}</div>
      </div>
    </section>

    <section className="curator-section">
      <div className="wrap">
        <Head num="08 / CONTINUING EDUCATION" title="Things I've been learning." />
        <div className="curator-list">{certs.map((c, i) => <div className="curator-list-item" key={c.t}><span className="n">{pad(i)}</span><div><h3>{c.t}</h3><p>{c.o}</p></div><span className="meta">{c.w}</span></div>)}</div>
      </div>
    </section>

    <section className="curator-section">
      <div className="wrap">
        <Head num="09 / VOLUNTEERING" title="Giving back, making together." sub="Community work and outreach beyond the studio." />
        <div className="curator-list">{volunteering.map((e, i) => <div className="curator-list-item" key={e.t}><span className="n">{pad(i)}</span><div><h3>{e.t}</h3><Details e={e} /></div><span className="meta">{e.meta ?? `VOLUNTEERING / ${pad(i)}`}</span></div>)}</div>
      </div>
    </section>

    <section className="curator-section">
      <div className="wrap">
        <Head num="10 / LANGUAGES" title="Ways of speaking." />
        <div className="curator-tags">{languages.map((l) => <span key={l.l}>{l.l} · {l.p}</span>)}</div>
      </div>
    </section>

    <section className="curator-section">
      <div className="wrap">
        <Head num="11 / OUTSIDE THE STUDIO" title="Other things I collect." sub="Interests that keep my curiosity fed, even when I’m away from a screen." />
        <div className="curator-tags">{interests.map((t) => <span key={t}>{t}</span>)}</div>
      </div>
    </section>
  </article>;
}
