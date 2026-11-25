import type { Metadata } from 'next';
import { Reveal, Stagger, StaggerItem } from '@/components/Motion';
import ProjectNav from '@/components/ProjectNav';
import { getProject } from '@/components/projects';
import './tactile.css';

const p = getProject('tactile-trails');
const img = (f: string) => `/images/tactile-trails/${f}`;

export const metadata: Metadata = {
  title: 'Tactile Trails — A Mat That Grows With Your Child | Deepthika S',
  description:
    'A modular, multi-sensory play mat for neurodivergent children, designed for the Cognify-Rewire toy design contest at IIT Madras. Top 25 national finalist from 1,200+ participants and 3rd place at Pitch Arena.',
  openGraph: {
    title: 'Tactile Trails — A Mat That Grows With Your Child',
    description:
      'A modular, multi-sensory play experience that adapts to individual needs and evolves with every stage of a child’s development.',
    images: ['/images/tactile-trails/card.jpg'],
  },
};

const gaps = [
  { n: '01', t: 'Few products', d: 'Limited toys intentionally target neurodivergent cognitive growth.' },
  { n: '02', t: 'Limited interaction', d: 'Many sensory toys were just textured mats with little active engagement.' },
  { n: '03', t: 'Static', d: 'Once a child outgrows a developmental stage, there is little room for the toy to evolve.' },
];

const inspirations = [
  { f: 'insp-path.jpg', l: 'Path inspiration' },
  { f: 'insp-sensory.jpg', l: 'Sensory pathway' },
  { f: 'insp-task.jpg', l: 'Task-based adventure' },
  { f: 'insp-bond.jpg', l: 'Emotional bonding' },
  { f: 'insp-tactile.jpg', l: 'Tactile stimulus' },
];

const intents = [
  { t: 'Sensory pathway', q: 'Make the path something to feel' },
  { t: 'Adventure', q: 'Turn sensory play into a journey' },
  { t: 'Story', q: 'Give the journey a reason' },
  { t: 'Reward based', q: 'Give the child a purpose to keep going' },
  { t: 'Adaptable', q: 'Adapt the experience to each child' },
  { t: 'Modular', q: 'A toy that grows with the child' },
];

const iterations = [
  { f: 'iteration-1.jpg', t: 'Iteration 1', d: 'A tabletop board game of cards, dice and small tactile elements.' },
  { f: 'iteration-2.jpg', t: 'Iteration 2', d: 'A larger floor-based board with tactile paths and activities.' },
  { f: 'iteration-3.jpg', t: 'Iteration 3', d: 'A full-scale sensory-rich playmat, drawn up as a blueprint.' },
];

const experts = [
  {
    f: 'expert-apoorva.jpg',
    name: 'Apoorva Sriram',
    role: 'Neurodiversity Researcher, Victoria University of Wellington',
    q: (
      <>
        The <strong>3–6 years</strong> window is crucial, as children are highly receptive to sensory and motor
        learning during this stage.
      </>
    ),
  },
  {
    f: 'expert-madhavi.jpg',
    name: 'Madhavi Ghosh K',
    role: 'Toy and Game Designer, IDC School of Design, IIT Bombay',
    q: (
      <>
        A <strong>play mat</strong> is more suitable than a <strong>board game</strong> for this age group, as it
        offers a larger, more immersive surface for tactile exploration.
      </>
    ),
  },
];

const compare = [
  ['Format', 'Board game', 'Larger floor-based board', 'Full-scale playmat'],
  ['Play', 'Turn-based', 'Path-based', 'Open-ended exploration'],
  ['Interaction', 'Cards, dice & small tactile elements', 'Tactile paths + activities', 'Whole-body movement + tactile activities'],
  ['Scale', 'Tabletop', 'Larger tabletop', 'Floor-based'],
  ['Challenge', 'Follow rules', 'Navigate paths', 'Explore & solve'],
  ['Key shift', 'Playing with the game', 'Moving through the game', 'Becoming part of the game'],
];

const swatches = [
  { f: 'swatch-grass.jpg', t: 'Grass' },
  { f: 'swatch-fur.jpg', t: 'Fur' },
  { f: 'swatch-jute.jpg', t: 'Soft jute' },
  { f: 'swatch-grip.jpg', t: 'Grip' },
  { f: 'swatch-noodle.jpg', t: 'Noodle' },
];

const process = [
  { f: 'process-01-sourcing.jpg', t: 'Material sourcing', d: 'Exploring and selecting textures with distinct sensory qualities.' },
  { f: 'process-02-selection.jpg', t: 'Material selection', d: 'Finalising suitable materials based on texture, safety and durability needs.' },
  { f: 'process-03-layout.jpg', t: 'Layout planning', d: 'Mapping the playmat layout and placement of tactile zones.' },
  { f: 'process-04-sewing.jpg', t: 'Hand-sewing', d: 'Stitching and preparing the individual tactile elements.' },
  { f: 'process-05-assembling.jpg', t: 'Assembling', d: 'Integrating all textures into the final playmat structure.' },
  { f: 'process-06-prototyping.jpg', t: 'Prototyping', d: 'Developing and integrating the components into the prototype.' },
  { f: 'process-07-final-assembly.jpg', t: 'Final assembly', d: 'Completing the playmat with all elements and details.' },
  { f: 'process-08-play-testing.jpg', t: 'Play testing', d: 'Observing children’s interactions with the playmat for refinement.' },
];

const journey = [
  { f: 'journey-01-story.jpg', t: 'Story introduction', d: 'The child is introduced to the story of a lost baby animal searching for its mother.' },
  { f: 'journey-02-begin.jpg', t: 'Begin the journey', d: 'The child picks up the baby animal and steps onto the tactile trail to begin the journey.' },
  { f: 'journey-03-orchard.jpg', t: 'The apple orchard', d: 'On the grassy texture, the child sorts the apples into their corresponding baskets through hands-on interaction.' },
  { f: 'journey-04-ducklings.jpg', t: 'Guide the ducklings', d: 'Moving onto the fur texture, the child guides the baby ducklings towards the pond.' },
  { f: 'journey-05-wings.jpg', t: 'Colour the wings', d: 'On the soft jute texture, the child attaches colourful feathers to complete the parrot’s wings.' },
  { f: 'journey-06-crab.jpg', t: 'Feed the hungry crab', d: 'On the grip texture, the child unzips the crab’s mouth and feeds it numbered fish in sequence before zipping it back up.' },
  { f: 'journey-07-search.jpg', t: 'The final search', d: 'Following the last stretch of the tactile trail, the child approaches the end of the journey to find the mother animal.' },
  { f: 'journey-08-reunion.jpg', t: 'Emotional reunion', d: 'The child reunites the baby animal with its mother using Velcro, completing the journey with a simulated hug.' },
];

const events = [
  { f: 'event-crowd.jpg', c: 'Families exploring the mat at IIT Madras' },
  { f: 'event-explaining.jpg', c: 'Walking visitors through the play experience' },
  { f: 'event-family.jpg', c: 'Children and parents playing together' },
  { f: 'event-play.jpg', c: 'Hands-on tactile exploration' },
];

export default function Page() {
  return (
    <article className="tt">
      {/* ---------- hero ---------- */}
      <section className="tt-hero grain">
        <div className="bg" aria-hidden="true" />
        <span className="ghost" aria-hidden="true">
          {p.index}
        </span>
        <div className="hero-grid">
          <Reveal as="figure" className="card">
            <img src={img('cover.jpg')} alt="A child walking along the Tactile Trails play mat, holding a teddy bear" />
            <figcaption>
              Passion Project for a Toy Design Contest (Cognify-Rewire · IIT Madras)
              <br />
              2024 | 2 months | group project (2 members)
            </figcaption>
          </Reveal>
          <Reveal className="copy" delay={0.12}>
            <p className="kicker">Human-Centred Design</p>
            <h1>Tactile Trails</h1>
            <p className="sub">A mat that grows with your child</p>
            <p className="desc">
              A modular, multi-sensory play experience that adapts to individual needs and evolves with every stage of
              a child’s development.
            </p>
            <img
              className="partners"
              src={img('partners.png')}
              alt="IIT Madras, India Autism Center and Help Them Shine"
            />
          </Reveal>
        </div>
      </section>

      {/* ---------- problem ---------- */}
      <section className="tt-sec">
        <div className="wrap tt-split">
          <Reveal as="figure" className="tt-fig">
            <img src={img('problem.jpg')} alt="A child in a classroom covering her ears, hugging a soft toy" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="tt-tag">The problem</p>
            <h2 className="tt-title">
              Not every child experiences <span className="accent">play</span> in the same way.
            </h2>
            <p className="tt-body">
              For neurodivergent children (kids with autism, ADHD, dyslexia, etc.), certain sounds, colours, textures
              or interactions can feel overwhelming. What may be playful for some may be overstimulating for them. Yet
              many products are designed for a general audience, offering fixed, one-size-fits-all experiences that
              don’t adapt to these varied sensory and developmental needs.
            </p>
            <p className="tt-hmw">
              <span>How might we</span> design a sensory experience that supports the sensory and developmental needs
              of neurodivergent children?
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- landscape ---------- */}
      <section className="tt-sec tt-panel">
        <div className="wrap">
          <Reveal>
            <p className="tt-tag">Research</p>
            <h2 className="tt-title">
              We started by understanding the <span className="accent">existing landscape.</span>
            </h2>
          </Reveal>
          <div className="tt-landscape">
            <Reveal as="figure" className="tt-card">
              <h3>Brands studied</h3>
              <p>Quantitative review of sensory and cognitive toys across brands.</p>
              <img src={img('diagram-brands.png')} alt="Logos of ten children’s toy brands that were reviewed" />
            </Reveal>
            <Reveal as="figure" className="tt-card wide" delay={0.08}>
              <h3>Market positioning</h3>
              <p>Products mapped by interaction type and adaptability.</p>
              <img
                src={img('diagram-market-matrix.png')}
                alt="Matrix of toys by fixed versus adaptable and passive versus active, with an open opportunity in the active, adaptable corner"
              />
            </Reveal>
            <Stagger className="tt-card gaps">
              <h3>Gaps in existing products</h3>
              {gaps.map((g) => (
                <StaggerItem key={g.n} className="gap">
                  <span className="n">{g.n}</span>
                  <div>
                    <h4>{g.t}</h4>
                    <p>{g.d}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
          <Reveal className="tt-cycle">
            <p>
              This meant parents could end up <span className="accent">buying different products</span> as their
              child’s needs and abilities changed.
            </p>
            <span className="arrow" aria-hidden="true" />
            <p className="break">
              We wanted to <strong>Break</strong> that cycle.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- inspiration + intent ---------- */}
      <section className="tt-sec">
        <div className="wrap">
          <div className="tt-two">
            <Reveal>
              <p className="tt-tag">About the inspiration</p>
              <h2 className="tt-title sm">Where the ideas came from.</h2>
              <ul className="tt-insp">
                {inspirations.map((i) => (
                  <li key={i.f}>
                    <img src={img(i.f)} alt={i.l} />
                    <span>{i.l}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <div>
              <Reveal delay={0.08}>
                <p className="tt-tag">Design intent</p>
                <h2 className="tt-title sm">Six intents the design had to meet.</h2>
              </Reveal>
              <Stagger className="tt-notes">
                {intents.map((n) => (
                  <StaggerItem key={n.t} className="note">
                    <h3>{n.t}</h3>
                    <p>“{n.q}”</p>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
          <Reveal className="tt-statement">
            <p>
              To design a <strong>modular</strong>, <strong>adaptable</strong> sensory play experience that transforms
              everyday play into a meaningful <strong>adventure</strong> and <strong>story</strong>, creating a{' '}
              <strong>rewarding</strong>, <strong>multi-sensory pathway</strong> for each child’s unique journey.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- concept development ---------- */}
      <section className="tt-sec tt-panel">
        <div className="wrap">
          <Reveal>
            <p className="tt-tag">Concept development</p>
            <h2 className="tt-title">
              From board game to <span className="accent">becoming part of the game.</span>
            </h2>
          </Reveal>
          <Stagger className="tt-iters">
            {iterations.map((i) => (
              <StaggerItem as="div" key={i.f} className="iter">
                <img src={img(i.f)} alt={`${i.t} sketch`} />
                <h3>{i.t}</h3>
                <p>{i.d}</p>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal>
            <h3 className="tt-sub">
              Experts who <span className="accent">changed our trajectory.</span>
            </h3>
          </Reveal>
          <Stagger className="tt-experts">
            {experts.map((e) => (
              <StaggerItem key={e.name} className="expert">
                <img src={img(e.f)} alt={e.name} />
                <div>
                  <h4>{e.name}</h4>
                  <p className="role">{e.role}</p>
                  <blockquote>{e.q}</blockquote>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="tt-table-wrap">
            <table className="tt-table">
              <thead>
                <tr>
                  <th aria-label="Dimension" />
                  <th>Iteration 1</th>
                  <th>Iteration 2</th>
                  <th>Iteration 3</th>
                </tr>
              </thead>
              <tbody>
                {compare.map((r) => (
                  <tr key={r[0]} className={r[0] === 'Key shift' ? 'key' : undefined}>
                    <th scope="row">{r[0]}</th>
                    <td>{r[1]}</td>
                    <td>{r[2]}</td>
                    <td>{r[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      {/* ---------- materials + process ---------- */}
      <section className="tt-sec">
        <div className="wrap">
          <Reveal>
            <p className="tt-tag">Materials</p>
            <h2 className="tt-title">
              A tactile landscape that doesn’t <span className="accent">overwhelm.</span>
            </h2>
            <p className="tt-body wide">
              We wanted to move beyond simply placing different textures next to each other and make sensory
              exploration part of the play itself. Each material is chosen to offer a distinct sensory cue, helping
              children differentiate touch, movement, and space through experience. Together, these materials create a
              tactile landscape that encourages exploration without overwhelming the senses.
            </p>
          </Reveal>
          <Stagger className="tt-swatches">
            {swatches.map((s) => (
              <StaggerItem key={s.f} className="swatch">
                <img src={img(s.f)} alt={`${s.t} texture`} />
                <span>{s.t}</span>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal>
            <h3 className="tt-sub">Design process</h3>
          </Reveal>
          <Stagger className="tt-process" as="ol">
            {process.map((s, i) => (
              <StaggerItem as="li" key={s.f} className="step">
                <img src={img(s.f)} alt={s.t} />
                <span className="n">{String(i + 1).padStart(2, '0')}</span>
                <h4>{s.t}</h4>
                <p>{s.d}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---------- introducing ---------- */}
      <section className="tt-intro">
        <Reveal as="figure">
          <img src={img('introducing.jpg')} alt="Introducing Tactile Trails: a child walks along the finished play mat" />
        </Reveal>
      </section>

      {/* ---------- journey ---------- */}
      <section className="tt-sec">
        <div className="wrap">
          <Reveal>
            <p className="tt-tag">User journey</p>
            <h2 className="tt-title">
              A lost baby animal, eight <span className="accent">textures</span> and one hug.
            </h2>
          </Reveal>
          <Stagger className="tt-journey" as="ol">
            {journey.map((s, i) => (
              <StaggerItem as="li" key={s.f} className="jstep">
                <img src={img(s.f)} alt={s.t} />
                <span className="n">{String(i + 1).padStart(2, '0')}</span>
                <h4>{s.t}</h4>
                <p>{s.d}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---------- adapts + evolves ---------- */}
      <section className="tt-sec tt-panel">
        <div className="wrap">
          <Reveal>
            <p className="tt-tag">Personas</p>
            <h2 className="tt-title">
              A play experience that <span className="accent">adapts and evolves.</span>
            </h2>
            <p className="tt-body wide">
              The two persona stories demonstrate how the mat adapts to individual sensory preferences and evolves with
              changing abilities.
            </p>
          </Reveal>
          <div className="tt-personas">
            <Reveal className="persona">
              <img className="face" src={img('persona-ishika.jpg')} alt="Ishika, age 4" />
              <h3>Persona 1 · Ishika</h3>
              <dl>
                <dt>Age</dt>
                <dd>4 years</dd>
                <dt>Sensory profile</dt>
                <dd>Tactile sensitive</dd>
                <dt>Preference</dt>
                <dd>Soft and smooth textures</dd>
                <dt>Challenge</dt>
                <dd>Shows discomfort and avoids bristly textures</dd>
              </dl>
              <div className="pair">
                <figure>
                  <img src={img('adapt-original.jpg')} alt="Original grassy module" />
                  <figcaption>Original module (grassy texture)</figcaption>
                </figure>
                <figure>
                  <img src={img('adapt-adjusted.jpg')} alt="Adjusted softer, low-stimulation module" />
                  <figcaption>Adjusted module (softer, low-stimulation texture)</figcaption>
                </figure>
              </div>
              <p className="verdict">
                <strong>A toy that adapts to every child.</strong> Interchangeable sensory modules allow textures and
                activities to be selectively replaced based on each child’s individual sensory preferences.
              </p>
            </Reveal>
            <Reveal className="persona" delay={0.1}>
              <img className="face" src={img('persona-arjun.jpg')} alt="Arjun, age 5" />
              <h3>Persona 2 · Arjun</h3>
              <dl>
                <dt>Age</dt>
                <dd>5 years</dd>
                <dt>Play profile</dt>
                <dd>Curious, seeks new challenges</dd>
                <dt>Preference</dt>
                <dd>Problem solving and hands-on tasks</dd>
                <dt>Challenge</dt>
                <dd>Familiar activities have become less engaging</dd>
              </dl>
              <div className="pair">
                <figure>
                  <img src={img('evolve-earlier.jpg')} alt="Earlier activity: sliding ducklings" />
                  <figcaption>Earlier activity (sliding ducklings)</figcaption>
                </figure>
                <figure>
                  <img src={img('evolve-evolved.jpg')} alt="Evolved activity: number problem solving" />
                  <figcaption>Evolved activity (problem-solving activities)</figcaption>
                </figure>
              </div>
              <p className="verdict">
                <strong>A toy that grows with the child.</strong> Activities can be upgraded with more complex,
                age-appropriate challenges as the child develops new skills and abilities.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- outcomes ---------- */}
      <section className="tt-sec">
        <div className="wrap">
          <Reveal>
            <p className="tt-tag">Outcomes</p>
            <h2 className="tt-title">
              From national finalist to <span className="accent">pitch podium.</span>
            </h2>
          </Reveal>
          <div className="tt-outcomes">
            <Reveal className="out">
              <span className="n">01</span>
              <h3>Cognify · IIT Madras</h3>
              <p>
                Developed for Cognify-Rewire, a toy design competition for neurodivergent children organised by IIT
                Madras in collaboration with Help Them Shine and India Autism Center, Tactile Trails was selected among
                the <strong>Top 25 finalists from over 1,200 participants</strong> across India.
              </p>
              <p>
                The prototype was subsequently showcased at IIT Madras, where families of neurodivergent children
                explored and interacted with the play experience. One interaction stayed with us: a father whose
                autistic son engaged with the mat asked if he could buy it immediately, showing us how thoughtful design
                could meet a genuine need in a child’s everyday life.
              </p>
            </Reveal>
            <Reveal className="out" delay={0.1}>
              <span className="n">02</span>
              <h3>Pitch Arena</h3>
              <p>
                Pitched Tactile Trails at Pitch Arena in front of Ms. Swati Sri, Co-founder and COO of A Toddler Thing,
                whose work has been featured on Shark Tank, <strong>securing 3rd place</strong>.
              </p>
              <p>
                Her feedback offered valuable insights into value optimisation and market positioning, helping us
                consider the product beyond its design and explore its commercial viability.
              </p>
            </Reveal>
          </div>
          <Stagger className="tt-events">
            {events.map((e) => (
              <StaggerItem as="div" key={e.f} className="ev">
                <img src={img(e.f)} alt={e.c} />
                <span>{e.c}</span>
              </StaggerItem>
            ))}
          </Stagger>
          <Stagger className="tt-pitch">
            <StaggerItem className="ev">
              <img src={img('pitch-arena.jpg')} alt="Presenting Tactile Trails to an audience" />
              <span>Presenting the concept</span>
            </StaggerItem>
            <StaggerItem className="ev">
              <img src={img('pitch-screen.jpg')} alt="Pitch slides on screen during the presentation" />
              <span>Pitch slides on screen</span>
            </StaggerItem>
            <StaggerItem className="ev press">
              <img src={img('press-the-hindu.jpg')} alt="The Hindu headline: Toys for neurodivergent children showcased at Shaastra 2025" />
              <span>Featured in The Hindu</span>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      <ProjectNav slug="tactile-trails" />
    </article>
  );
}
