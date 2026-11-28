import type { Metadata } from 'next';
import { Fragment } from 'react';
import Link from 'next/link';
import { Reveal } from '@/components/Motion';
import StoryTimeline from '@/components/StoryTimeline';
import StoryArrival from '@/components/StoryArrival';
import { STORY_TARGET_ID } from '@/components/story-handoff';
import { milestones, storyIntro } from '@/components/story-data';

export const metadata: Metadata = {
  title: "Curator's Note — Deepthika S",
  description: 'A note on the ideas, questions and experiences that shape Deepthika S’s approach to product design, engineering and research.',
};

const LINKEDIN = 'https://www.linkedin.com/in/deepthika365/';
const SCHOLAR = 'https://scholar.google.com/citations?user=susKJWYAAAAJ&hl=en';
/* Hero sub-description. Each item is kept whole so the line can wrap between items, never inside one. */
const HERO_ROLE = ['PRODUCT DESIGN', 'RESEARCH', 'ENGINEERING', 'ART', 'EVERYTHING IN BETWEEN'];
const GITHUB = 'https://github.com/deepthikas123-ops';

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

/* `url` opens the verified certificate (links come from the résumé); add one to any entry to link it. */
const certs: { t: string; o: string; w: string; url?: string }[] = [
  { t: '3D Printing and Additive Manufacturing', o: 'University of Illinois Urbana-Champaign', w: 'Ongoing' },
  { t: 'Build Wireframes and Low Fidelity Prototypes', o: 'Google UX Design Professional', w: 'June 2025', url: 'https://coursera.org/share/548395a29d26a87ee64d9748e4a9d766' },
  { t: 'Fundamentals of Graphic Design', o: 'California Institute of the Arts', w: 'June 2025', url: 'https://www.coursera.org/account/accomplishments/verify/84ZFX0CM88AD' },
  { t: 'Introduction to the Internet of Things and Embedded Systems', o: 'University of California, Irvine', w: 'May 2025', url: 'https://www.coursera.org/account/accomplishments/verify/T6DDWAYX4PYQ' },
  { t: 'Innovation Through Design: Think-Make-Break-Repeat', o: 'University of Sydney', w: 'May 2025', url: 'https://www.coursera.org/account/accomplishments/verify/BDUX3AMNQWL6' },
  { t: 'MATLAB Onramp Certification', o: 'MathWorks', w: 'Dec 2024' },
];

const pad = (i: number) => String(i + 1).padStart(2, '0');

function Head({ num, title, sub, id }: { num: string; title: string; sub?: string; id?: string }) {
  return <div className="curator-section-head" id={id}><span className="num">{num}</span><div><h2>{title}</h2>{sub && <p>{sub}</p>}</div></div>;
}

export default function About() {
  return <article className="editorial-about">
    <StoryArrival />
    <section className="curator-hero">
      <div className="wrap">
        <div className="curator-topline"><span>THE DEEPTHIKA STUDIO / 01</span><span>CURATOR'S NOTE · COIMBATORE, INDIA</span><span>EST. 2026</span></div>
        <div className="curator-hero-grid">
          <Reveal className="curator-portrait"><img src="/images/deepthika-portrait.jpg" alt="Portrait of Deepthika S, smiling, seated in a beige blazer and white shirt" width={1100} height={1251} /></Reveal>
          <div className="curator-copy">
            <Reveal><p className="index-section-kicker">A NOTE FROM THE CURATOR</p><h1><span>I’ve never felt the need to choose just one box.</span> <em>There’s too much to explore outside it.</em></h1></Reveal>
            <Reveal delay={0.12}><p className="curator-role">{HERO_ROLE.map((r, i) => <Fragment key={r}><span>{r}{i < HERO_ROLE.length - 1 && <span aria-hidden="true"> ·</span>}</span>{' '}</Fragment>)}</p>
              <p className="curator-lede">An engineer by training and a designer by passion, driven by the belief that understanding how things work is the first step towards making them work better. I’m Deepthika, and I’m most interested in the space where art, design and engineering meet: where a human observation can become an experience, a product or an idea worth testing.</p>
            </Reveal>
            <Reveal delay={0.2}><div className="curator-actions"><a className="index-primary-link" href="/Deepthika-S-Resume.pdf" download>Download résumé <span>↓</span></a><a className="text-link" href="mailto:deepthikas123@gmail.com">Write to me ↗</a><a className="text-link" href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a className="text-link" href={SCHOLAR} target="_blank" rel="noopener noreferrer">Google Scholar ↗</a><a className="text-link" href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub ↗</a></div></Reveal>
          </div>
        </div>
      </div>
    </section>

    <section className="curator-section is-story">
      <div className="wrap">
        <Head num="01 / MY STORY" title="The making of me." id={STORY_TARGET_ID} />
        <Reveal as="p" className="story-open">I wish I could say I always knew where I was headed. <em>I really didn’t.</em></Reveal>
        <Reveal className="story-intro" delay={0.1}>{storyIntro.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}</Reveal>
        <StoryTimeline items={milestones} />
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
        <Head num="03 / RESEARCH" title="Questions I keep following." sub="Research projects exploring perception, interaction, creativity and human–AI relationships." />
        <div className="curator-list">{research.map((r, i) => r.slug
          ? <Link href={`/research/${r.slug}`} className="curator-list-item" key={r.t}><span className="n">{pad(i)}</span><div><h3>{r.t}</h3><p>{r.v}</p></div><span className="meta">OPEN CASE STUDY ↗</span></Link>
          : <div className="curator-list-item is-soon" key={r.t}><span className="n">{pad(i)}</span><div><h3>{r.t}</h3><p>{r.v}</p></div><span className="meta">CASE STUDY SOON</span></div>)}</div>
      </div>
    </section>

    <section className="curator-section">
      <div className="wrap">
        <Head num="04 / MILESTONES" title="A few markers along the way." sub="Small reminders of ideas that made it out of the notebook." />
        <div className="curator-awards">{honors.map((h) => <article className="curator-award" key={h.t}><h3>{h.t}</h3><p>{h.d}</p></article>)}</div>
      </div>
    </section>

    <section className="curator-section">
      <div className="wrap">
        <Head num="05 / CONTINUING EDUCATION" title="Things I've been learning." />
        <div className="curator-list">{certs.map((c, i) => c.url
          ? <a className="curator-list-item" key={c.t} href={c.url} target="_blank" rel="noopener noreferrer"><span className="n">{pad(i)}</span><div><h3>{c.t}</h3><p>{c.o}</p></div><span className="meta">{c.w} · VIEW CERTIFICATE ↗</span></a>
          : <div className="curator-list-item" key={c.t}><span className="n">{pad(i)}</span><div><h3>{c.t}</h3><p>{c.o}</p></div><span className="meta">{c.w}</span></div>)}</div>
      </div>
    </section>
  </article>;
}
