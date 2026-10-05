import type { Metadata } from 'next';
import Link from 'next/link';
import { Reveal, Stagger, StaggerItem } from '@/components/Motion';

export const metadata: Metadata = {
  title: 'About — Deepthika S',
  description:
    'ECE student and product designer working across product design, electronics, immersive interaction and research on how people see, make and trust with AI.',
};

/* Research outputs featured as case studies. Venue labels follow the papers and
   case-study pages; no acceptance status is claimed here. */
const research = [
  {
    slug: 'flavovr',
    t: 'Neophilic and Neophobic Design Preferences Across Generational Cohorts: Consumer Attraction to Conventional and Unconventional Product Aesthetics',
    v: 'Journal of Business Research, Elsevier (submitted)',
  },
  {
    slug: 'aesthetic-fingerprint',
    t: 'Where the Gaze Lingers: From Immersive Free-Viewing to a Stable Aesthetic Fingerprint',
    v: 'VRST 2026 (accepted)',
  },
  {
    slug: 'kaaya',
    t: 'KAAYA: The Body Draws What the Eye Never Sees',
    v: 'NeurIPS 2026, Creative AI Track (accepted)',
  },
  {
    slug: 'vapours',
    t: 'VAPOURS: Sculpting Fog to Find the Form Before the Form',
    v: ' ',
  },
  {
    slug: 'calculator-fallacy',
    t: 'The Calculator Fallacy: Learners Blindly Trust Confident AI, Even When It Is Wrong',
    v: '16th International Conference of the European Academy of Design (TRUST-DISTRUST) (submitted)',
  },
  {
    slug: 'llm-conformity',
    t: 'When the Majority Is Wrong: Would AI Still Follow the Crowd? Studying Conformity and Authority Bias in Multi-Agent LLM Systems',
    v: '13th IEEE UPCON 2026 (submitted)',
  },
  {
    slug: 'atomic-user-model',
    t: 'Creating an Atomic User Model for Personality-Aware LLM Interaction',
    v: ' ',
  },
];

const skills = [
  {
    k: 'Design',
    v: 'Human-Centred Design, Design Thinking, Rapid Prototyping, UI/UX, Graphic Design',
  },
  {
    k: 'Tools',
    v: 'Fusion 360, Proteus, LT Spice, KiCAD, ModelSim, CEDAR, Ansys HFSS, Wokwi, Arduino IDE, Figma, Canva',
  },
  { k: 'Programming', v: 'MATLAB, Embedded C, Verilog, Python' },
  { k: 'Soft skills', v: 'Technical Communication, Team Collaboration, Time Management' },
];

const honors = [
  {
    t: 'Pitch Arena — Third Place',
    d: 'Honoured with 3rd place for pitching “Tactile Trails” at the Pitch Arena, a Shark Tank–style pitching competition organised by ELITE, the Entrepreneurship Club of Amrita, during Anokha 2026.',
  },
  {
    t: 'Anokha 2026 Techfair',
    d: 'Project “SETU 5.0” was shortlisted for the Open House display at Anokha Techfair, where it received highly positive feedback from CEOs and government officials from NITI Aayog.',
  },
  {
    t: 'Product Construct — IIT Madras',
    d: 'Shortlisted in Round 1 of Product Construct, organised by the E-Cell, IIT Madras, evaluating core product-building fundamentals including design thinking, product life cycle, MVPs, metrics and product management principles.',
  },
  {
    t: 'Prompt Masters ’25 — Second Runner Up',
    d: 'Created HelloMahila, an AI-driven women’s wellness companion that delivers personalised, context-aware nutrition and self-care guidance using structured prompt flows and AI Library integration.',
  },
  {
    t: 'Creative Canvas — Second Runner Up',
    d: 'IEEE Student Branch WIE Branch, BAIT. Second Runner Up out of 200+ participants in the National-Level Creative Canvas Poster Design Contest for innovative and impactful poster design.',
  },
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
  return (
    <>
      <section className="about-hero">
        <div className="wrap about-grid">
          <Reveal className="about-photo">
            <img src="/images/deepthika.png" alt="Portrait of Deepthika S" />
            <span className="chip frame-chip">Coimbatore, India</span>
          </Reveal>
          <div className="about-copy">
            <Reveal as="h1">
              Design first.
              <br />
              Engineered to last<span className="dot" style={{ color: 'var(--lime)' }}>.</span>
            </Reveal>
            <Reveal as="p" className="role" delay={0.1}>
              Product Design · B.Tech ECE · Amrita Vishwa Vidyapeetham
            </Reveal>
            <Reveal as="p" className="lede" delay={0.2}>
              Passionate ECE student with a strong interest in{' '}
              <strong>product design and user-centric product development</strong>. I believe that
              great products are built when design leads and engineering shapes them into reality.
              With a strong foundation in electronics and an appreciation for good design, I aim to
              bridge the gap between technology and usability in everything I create. Alongside
              physical products, my research spans immersive VR and eye tracking, human–AI trust,
              multi-agent LLM behaviour and creative AI.
            </Reveal>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="wrap">
          <Reveal as="h2">Education</Reveal>
          <Reveal className="two-col" delay={0.1}>
            <div className="fact">
              <p className="k">2023 — 2027</p>
            </div>
            <div className="fact">
              <p className="v">
                B.Tech, Electronics and Communication Engineering
                <br />
                <span className="muted">Amrita Vishwa Vidyapeetham, Coimbatore · CGPA 7.9/10</span>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="about-section">
        <div className="wrap">
          <Reveal as="h2">Skills</Reveal>
          <Stagger className="skill-rows">
            {skills.map((s) => (
              <StaggerItem key={s.k} className="skill-row">
                <span className="k">{s.k}</span>
                <span className="v">{s.v}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="about-section">
        <div className="wrap">
          <Reveal as="h2">Experience</Reveal>
          <Reveal className="exp-card" delay={0.1}>
            <p className="k" style={{ fontWeight: 700, fontSize: 16 }}>
              Toy Design Innovator — Cognify (ReWire), IIT Madras
            </p>
            <p className="where">Human-centred toy design for neurodivergent children</p>
            <ul>
              <li>
                Designed <strong>“Tactile Trails”</strong> — a cognitive-sensory playmat for
                neurodivergent children, applying human-centered design, ergonomics and safety
                principles.
              </li>
              <li>
                Collaborated closely with neurologists, child-development experts and toy design
                mentors to refine sensory pathways, interaction goals and form factors suited for
                neurodivergent children.
              </li>
              <li>
                Conducted structured playtesting sessions with children and parents, gathering
                behavioural insights that improved usability, sensory transitions and emotional
                comfort.
              </li>
              <li>
                <strong>Outcome:</strong> the final prototype was showcased at IIT Madras during
                Shaastra 2025 Open House for public interaction, and was selected as a{' '}
                <strong>Top 25 finalist out of 1200+ teams</strong> for human-centered design depth
                and impactful prototype execution.
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="about-section">
        <div className="wrap">
          <Reveal as="h2">Research</Reveal>
          <Stagger className="honor-list">
            {research.map((r, i) => (
              <StaggerItem key={r.slug} className="honor">
                <span className="n">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>
                    <Link href={`/projects/${r.slug}`} className="research-link">
                      {r.t}
                    </Link>
                  </h3>
                  <p>{r.v}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="about-section">
        <div className="wrap">
          <Reveal as="h2">Honors &amp; Awards</Reveal>
          <Stagger className="honor-list">
            {honors.map((h, i) => (
              <StaggerItem key={h.t} className="honor">
                <span className="n">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{h.t}</h3>
                  <p>{h.d}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="about-section">
        <div className="wrap">
          <Reveal as="h2">Certifications</Reveal>
          <Stagger className="cert-grid">
            {certs.map((c) => (
              <StaggerItem key={c.t} className="cert">
                <span>
                  {c.t}
                  <br />
                  <span className="org">{c.o}</span>
                </span>
                <span className="when">{c.w}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="about-section">
        <div className="wrap">
          <Reveal as="h2">Beyond the desk</Reveal>
          <Reveal className="tags" delay={0.1}>
            {[
              'English — Professional',
              'Tamil — Native',
              'Hindi — Limited',
              'Japanese — Elementary',
              'Reading',
              'Gardening',
              'Journaling',
              'Art & Calligraphy',
            ].map((t) => (
              <span key={t} className="tag-chip">
                {t}
              </span>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
