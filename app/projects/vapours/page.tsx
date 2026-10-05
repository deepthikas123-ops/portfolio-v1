import type { Metadata } from 'next';
import { Reveal, Stagger, StaggerItem } from '@/components/Motion';
import ProjectNav from '@/components/ProjectNav';
import { getProject } from '@/components/projects';

const p = getProject('vapours');

export const metadata: Metadata = {
  title: 'VAPOURS — Sculpting Fog to Find the Form Before the Form | Deepthika S',
  description:
    'VAPOURS is a fully specified VR system in which a designer shapes continuously dissipating volumetric fog with bare hands to find a product’s preform. In a medium that forgets, persistence becomes evidence of care. NeurIPS 2026 Creative AI Track.',
  openGraph: {
    title: 'VAPOURS — Sculpting Fog to Find the Form Before the Form',
    description:
      'A VR medium that deliberately forgets: dissipating fog, bare-hand gestures and two memories of every session.',
  },
};

/* ---- decay chart: pure exponential decay at the specified half-lives ---- */
const W = 720;
const H = 360;
const X0 = 70;
const X1 = 690;
const Y0 = 30;
const Y1 = 300;
const TMAX = 180;
const x = (t: number) => X0 + ((X1 - X0) * t) / TMAX;
const y = (v: number) => Y1 - (Y1 - Y0) * v;
const curve = (half: number) =>
  Array.from({ length: 91 }, (_, i) => {
    const t = (i * TMAX) / 90;
    return `${i === 0 ? 'M' : 'L'}${x(t).toFixed(1)},${y(Math.pow(0.5, t / half)).toFixed(1)}`;
  }).join(' ');
const curves = [
  { half: 20, label: '20 s', note: 'shortest allowed', stroke: 'var(--ink-soft)', dash: '5 5' },
  { half: 45, label: '45 s', note: 'default', stroke: 'var(--lime)', dash: '' },
  { half: 90, label: '90 s', note: 'longest allowed', stroke: 'var(--ink)', dash: '2 4' },
];

const gestures = [
  {
    name: 'Gather',
    how: 'Cupped palms moving towards each other',
    does: 'Condenses nearby particles into the enclosed region.',
    icon: (
      <svg viewBox="0 0 80 60" aria-hidden="true">
        <path d="M10 10 Q28 30 10 50" />
        <path d="M70 10 Q52 30 70 50" />
        <circle cx="40" cy="30" r="9" className="mass" />
        <path d="M22 30 h6 M58 30 h-6" />
      </svg>
    ),
  },
  {
    name: 'Carve',
    how: 'Moving fingertips',
    does: 'Displaces density along the finger path — a notch cut, a waist hollowed.',
    icon: (
      <svg viewBox="0 0 80 60" aria-hidden="true">
        <ellipse cx="40" cy="30" rx="26" ry="20" className="mass" />
        <path d="M14 46 Q40 24 66 14" className="cut" />
      </svg>
    ),
  },
  {
    name: 'Sweep',
    how: 'A flat palm',
    does: 'Disperses density along the sweep — erasing at the scale of the whole arm.',
    icon: (
      <svg viewBox="0 0 80 60" aria-hidden="true">
        <circle cx="26" cy="32" r="4" className="mass" />
        <circle cx="40" cy="26" r="3" className="mass" />
        <circle cx="52" cy="36" r="2.5" className="mass" />
        <circle cx="62" cy="28" r="1.8" className="mass" />
        <path d="M8 48 L72 48" />
        <path d="M60 42 L72 48 L60 54" />
      </svg>
    ),
  },
];

const architecture = [
  {
    k: 'Input',
    h: 'Bare hands',
    body: [
      'Meta Quest Pro hand tracking is the only input. No controllers, no menus during a session, no tool palette.',
      'Three gesture fields give the hands their verbs: gather, carve and sweep.',
    ],
  },
  {
    k: 'Medium',
    h: 'A dissipating particle volume',
    body: [
      'A GPU particle density field in Unity’s VFX Graph, on the order of one to two million particles.',
      'Every particle decays exponentially: half-life 45 s by default, set between 20 and 90 s before a session — never during one.',
    ],
  },
  {
    k: 'Memory',
    h: 'Two independent ledgers',
    body: [
      'Asserted: a held pinch captures a timestamped volumetric snapshot.',
      'Inferred: an observer samples the volume and captures masses whose silhouette persists above threshold for a sustained window.',
    ],
  },
  {
    k: 'Aftermath',
    h: 'Two shelves, then generation',
    body: [
      'The fog dissolves completely. A two-shelf gallery shows what you kept and what it kept.',
      'After the session, Gemini image models translate snapshots into monochrome massing sketches and an optional early render.',
    ],
  },
];

export default function VapoursPage() {
  return (
    <article>
      {/* ---------- Hero ---------- */}
      <section className="fog-hero grain">
        <div className="fog" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <span className="ghost" aria-hidden="true">
          {p.index}
        </span>
        <div className="inner">
          <Reveal delay={0.2}>
            <p className="kicker">Creative AI · NeurIPS 2026 Creative AI Track</p>
            <h1>
              VAPOURS.
              <span className="small">Sculpting fog to find the form before the form</span>
            </h1>
          </Reveal>
          <div>
            <Reveal delay={0.4}>
              <p className="desc">
                Every medium a designer uses to find form makes a promise the earliest moment of an
                idea cannot keep: the promise to hold still. VAPOURS (Volumetric Atmosphere for
                Preform-ideation through Observant User Sculpting of fog) is a virtual reality
                medium made of fog that dissipates continuously and cannot be paused. In a medium
                that forgets, whatever persists is being maintained — and maintenance is intention
                made measurable.
              </p>
              <p className="desc" style={{ marginTop: 14 }}>
                <strong>Status:</strong> a complete system specification. The build is planned, and
                no empirical claim is made yet.
              </p>
            </Reveal>
            <Reveal delay={0.55}>
              <div className="tags">
                <span>Virtual Reality</span>
                <span>Hand Tracking</span>
                <span>Form Finding</span>
                <span>Creative Agency</span>
                <span>System Specification</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- The problem ---------- */}
      <section className="paper-narrative">
        <div className="wrap">
          <Reveal>
            <h2 className="section-title">Every Medium Wants to Hold Still</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="intro">
              Clay stays where it is pressed. CAD preserves every operation. A sketch outlives the
              moment of its making. Yet an idea, at the moment of its birth, has{' '}
              <strong>no boundary</strong>, changes whenever attention returns to it, and vanishes
              if it is not captured.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="intro">
              Before a designer looks at anyone else’s images, they often already hold a vague sense
              of the thing itself — its stance, its weight, whether it is squat or tall, whether it
              leans or sits. It is what a designer’s hands describe in the air when words fail them.
              It cannot be sketched without acquiring edges it does not have yet, modelled in clay
              without a fixed boundary, or entered into CAD at all.
            </p>
          </Reveal>
          <Reveal>
            <p className="pull">
              The preform: the gestural envelope of a product{' '}
              <span className="soft">before any feature, surface or detail exists.</span>
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="intro">
              Externalising too early carries a known cost: the first crisp version anchors
              everything after it — the design fixation that research has measured for over three
              decades. What the preform needs is a medium exactly as vague as the idea.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="intro">
              The lineage is Fujiko Nakaya, who has sculpted real water fog since 1970 — a medium
              that forms, drifts, thins and dissolves while the audience is still inside it.
              VAPOURS asks what happens when that medium is given to a designer, not to make an
              atmosphere, but <strong>to think with</strong>.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- Quote ---------- */}
      <section className="dark-section quote-band grain">
        <div className="glow" aria-hidden="true" />
        <div className="wrap">
          <Reveal as="p">
            In a permanent medium, everything survives equally. In a medium with a half-life,{' '}
            <span className="accent">survival is never accidental</span> — a mass still there after
            several half-lives exists only because a pair of hands{' '}
            <span className="accent">kept returning to it.</span>
          </Reveal>
        </div>
      </section>

      {/* ---------- Why the medium must forget ---------- */}
      <section className="finding">
        <div className="wrap">
          <Reveal>
            <p className="tag">The central claim</p>
            <h2 className="section-title">Why the Medium Must Forget</h2>
          </Reveal>
          <div className="split">
            <Reveal as="figure" className="photo" y={0}>
              <svg
                className="decay-chart"
                viewBox={`0 0 ${W} ${H}`}
                role="img"
                aria-label="Three exponential decay curves showing the share of an unattended fog mass remaining over 180 seconds for half-lives of 20, 45 and 90 seconds."
              >
                {[0, 0.25, 0.5, 0.75, 1].map((v) => (
                  <g key={v}>
                    <line x1={X0} x2={X1} y1={y(v)} y2={y(v)} stroke="rgba(45,45,38,0.1)" />
                    <text x={X0 - 10} y={y(v) + 4} textAnchor="end" fontSize="15" fill="#55554c">
                      {Math.round(v * 100)}%
                    </text>
                  </g>
                ))}
                {[0, 30, 60, 90, 120, 150, 180].map((t) => (
                  <text key={t} x={x(t)} y={Y1 + 22} textAnchor="middle" fontSize="15" fill="#55554c">
                    {t}s
                  </text>
                ))}
                <text x={(X0 + X1) / 2} y={H - 8} textAnchor="middle" fontSize="15" fill="#55554c">
                  Time since the mass was last gathered
                </text>
                {curves.map((c) => (
                  <path
                    key={c.half}
                    d={curve(c.half)}
                    fill="none"
                    stroke={c.stroke}
                    strokeWidth={c.half === 45 ? 4 : 2.2}
                    strokeDasharray={c.dash || undefined}
                    strokeLinecap="round"
                  />
                ))}
                {curves.map((c, i) => (
                  <g key={`l${c.half}`} transform={`translate(${X1 - 245}, ${Y0 + 8 + i * 28})`}>
                    <line
                      x1="0"
                      x2="26"
                      y1="0"
                      y2="0"
                      stroke={c.stroke}
                      strokeWidth={c.half === 45 ? 4 : 2.2}
                      strokeDasharray={c.dash || undefined}
                    />
                    <text x="36" y="4" fontSize="15.5" fill="#2d2d26">
                      half-life {c.label} — {c.note}
                    </text>
                  </g>
                ))}
              </svg>
              <figcaption>
                How much of an unattended fog mass remains, at the half-lives the specification
                allows. Drawn directly from the stated parameters (exponential decay; 45 s default,
                20–90 s range) — an illustration of the medium, not system output.
              </figcaption>
            </Reveal>
            <Reveal className="copy-block" delay={0.1}>
              <h3>Fog shares the three properties of a fuzzy idea</h3>
              <p>
                A fog mass has <strong>density rather than a surface</strong>. It deforms under
                every touch, so touching it and revising it are the same act. And it{' '}
                <strong>dissipates on its own</strong>, so an unattended mass simply leaves.
              </p>
              <p>
                The forgetting is what turns a likeness into an instrument. Decay converts an
                invisible mental quantity — how much the designer cares about this mass right now —
                into a physical one: how recently, and how often, it has been rebuilt.
              </p>
              <p>
                That is why the refusal has to be real. VAPOURS has{' '}
                <strong>no pause, no undo and no way to save the volume</strong>. If the fog could
                be paused, persistence would stop meaning maintenance, and the signal would die.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Bare hands ---------- */}
      <section className="pipeline gestures-section">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">Proposed interaction</p>
            <h2 className="section-title">Bare Hands, Three Verbs</h2>
            <p className="lead">
              The designer stands in a dark, quiet void with a single soft key light; the fog is the
              only thing in the world. There is deliberately nothing else — no colour, no texture,
              no snapping, no symmetry aids. The medium answers only the question the preform stage
              asks: <strong>where does the mass want to be?</strong>
            </p>
          </Reveal>
          <Stagger className="gesture-grid">
            {gestures.map((g) => (
              <StaggerItem key={g.name} className="gesture">
                {g.icon}
                <h4>{g.name}</h4>
                <p className="how">{g.how}</p>
                <p>{g.does}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <Stagger className="stat-row">
            <StaggerItem className="stat">
              <div className="v">Unity</div>
              <div className="k">PC-VR application, simulation on desktop-class compute</div>
            </StaggerItem>
            <StaggerItem className="stat">
              <div className="v">Quest&nbsp;Pro</div>
              <div className="k">Meta headset over Link; hand tracking as the only input</div>
            </StaggerItem>
            <StaggerItem className="stat">
              <div className="v">1–2M</div>
              <div className="k">GPU particles in a VFX Graph density field</div>
            </StaggerItem>
            <StaggerItem className="stat">
              <div className="v">45s</div>
              <div className="k">default half-life, fixed for the length of a session</div>
            </StaggerItem>
          </Stagger>
          <p className="figure-note">All values are from the system specification; the build is planned.</p>
        </div>
      </section>

      {/* ---------- Two memories ---------- */}
      <section className="dark-section dark-fig grain">
        <div className="glow" aria-hidden="true" />
        <div className="wrap">
          <Reveal>
            <p className="finding-tag">Designer memory vs. observer memory</p>
            <h2 className="section-title">Two Memories of Every Session</h2>
            <p className="lead">
              The system keeps two records, and the difference between them is the point of the
              design.
            </p>
          </Reveal>
          <Stagger className="ledgers">
            <StaggerItem className="ledger">
              <p className="who">The asserted ledger</p>
              <h3>What you kept</h3>
              <p>
                Agency in its familiar, declarative form. The designer decides a moment matters and
                says so: a pinch held on a mass captures a volumetric snapshot with a timestamp.
              </p>
              <p className="trigger">Trigger: a held pinch gesture</p>
            </StaggerItem>
            <StaggerItem className="ledger">
              <p className="who">The inferred ledger</p>
              <h3>What it kept</h3>
              <p>
                An observer agent samples the volume continuously and scores each coherent mass by
                silhouette persistence — a direct reading of maintenance. It captures on its own,
                without asking or announcing itself. It never touches the fog.
              </p>
              <p className="trigger">Trigger: persistence above threshold for a sustained window</p>
            </StaggerItem>
          </Stagger>
          <Reveal>
            <p className="lead" style={{ marginTop: 44 }}>
              The shelves will usually disagree, in both directions: masses maintained with evident
              care but never consciously chosen, and pinches on masses too young to have persisted.
              <strong> The disagreement is not an error to reconcile. It is the artefact.</strong>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- Architecture ---------- */}
      <section className="band">
        <div className="wrap">
          <Reveal className="band-head">
            <p className="tag">System architecture</p>
            <h2 className="section-title">From Hands to Two Shelves</h2>
            <p>
              Hands act on a dissipating particle volume through three gesture fields; two
              independent memories record the session; the aftermath places them side by side.
            </p>
          </Reveal>
          <Stagger className="sequence c4">
            {architecture.map((a, i) => (
              <StaggerItem key={a.k}>
                <div className="s-n">{String(i + 1).padStart(2, '0')}</div>
                <div className="s-k">{a.k}</div>
                <h4>{a.h}</h4>
                {a.body.map((b) => (
                  <p key={b}>{b}</p>
                ))}
              </StaggerItem>
            ))}
          </Stagger>
          <p className="figure-note">
            Architecture drawn from the written system specification.
          </p>

          <div className="split" style={{ marginBottom: 0 }}>
            <Reveal className="copy-block">
              <h3>Generation happens after, never during</h3>
              <p>
                Each captured snapshot is rendered from a canonical view and translated by Gemini
                image models into a <strong>monochrome massing sketch</strong> that commits only to
                what the fog committed to — silhouette and proportion — and an optional early render
                for a product class the designer supplies.
              </p>
            </Reveal>
            <Reveal className="copy-block" delay={0.1}>
              <h3>Why the delay matters</h3>
              <p>
                The session must belong to the hands. If anything generated fed back into the fog
                while it was still alive, the observer would begin to shape the very behaviour it
                claims to read. The generation stage reuses an agentic image pipeline validated in
                earlier form-design work.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Agency ---------- */}
      <section className="commitments grain">
        <div className="wrap">
          <Reveal>
            <h2>Creative Agency, Redistributed</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead">
              A medium that forgets makes intention <span className="accent">measurable</span>; a
              machine that remembers makes it <span className="accent">survivable</span>.
            </p>
          </Reveal>
          <Stagger className="commit-grid">
            <StaggerItem>
              <div className="n">01</div>
              <h4>Agency as performance</h4>
              <p>
                Form exists only as long as it is enacted — closer to a dancer’s relation to a
                phrase than a sculptor’s relation to clay.
              </p>
            </StaggerItem>
            <StaggerItem>
              <div className="n">02</div>
              <h4>Refusal as preservation</h4>
              <p>
                Nothing made in fog can anchor the next thing made in fog, because it will not be
                there. The friction keeps the work in the register where it belongs.
              </p>
            </StaggerItem>
            <StaggerItem>
              <div className="n">03</div>
              <h4>Accountability, distributed</h4>
              <p>
                A preform passes through hands, a decay constant, a salience threshold and a
                generative model. Whoever sets the half-life decides how much devotion a thought
                must show before it is allowed to survive.
              </p>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* ---------- Planned implementation ---------- */}
      <section className="open">
        <div className="wrap">
          <Reveal>
            <h2 className="section-title">Planned Implementation</h2>
            <p className="lead">
              This is a design paper, and its claims are design claims. The persistence-as-intention
              argument is conceptual, and the salience measure has not yet been validated.
            </p>
          </Reveal>
          <Stagger className="status-grid">
            <StaggerItem className="status-col built">
              <p className="st-label">Exists today</p>
              <h3>The complete design</h3>
              <ul>
                <li>
                  <strong>System specification</strong>
                  Medium, gestures, two-ledger memory and aftermath, as presented here.
                </li>
                <li>
                  <strong>Simulation scripts</strong>
                  Simulations of the specified medium behaviour and an illustrative session
                  timeline.
                </li>
              </ul>
            </StaggerItem>
            <StaggerItem className="status-col specified">
              <p className="st-label">Planned</p>
              <h3>The Unity build, and four questions</h3>
              <ul>
                <li>
                  <strong>Pressure or permission?</strong>
                  Is decay experienced as pressure, or as forgiveness for every mistake?
                </li>
                <li>
                  <strong>How the ledgers disagree</strong>
                  How often, in which direction, and which shelf designers generate from.
                </li>
                <li>
                  <strong>Surprise</strong>
                  Whether inferred preforms surprise their makers — evidence that enacted care and
                  asserted taste dissociate.
                </li>
                <li>
                  <strong>Survival into sketching</strong>
                  Whether massing found in fog survives into the sketching stage.
                </li>
              </ul>
            </StaggerItem>
          </Stagger>
          <Stagger className="open-grid">
            <StaggerItem className="iter-panel grain">
              <h4>Performing care</h4>
              <p>
                A designer who learns the observer’s rule may maintain masses in order to be
                captured, collapsing the signal into its own target.
              </p>
            </StaggerItem>
            <StaggerItem className="iter-panel grain">
              <h4>A narrowing measure</h4>
              <p>
                Salience tuned to compact, stable silhouettes may fail designers whose preforms are
                diffuse or oscillating.
              </p>
            </StaggerItem>
            <StaggerItem className="iter-panel grain">
              <h4>Visual only</h4>
              <p>
                The hands feel nothing — unlike Nakaya’s wet, cold medium — and the PC tether
                constrains the body the gestures depend on.
              </p>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* ---------- Closing ---------- */}
      <section className="dark-section closing grain" style={{ background: 'var(--dark-3)' }}>
        <div className="glow" aria-hidden="true" />
        <div className="wrap">
          <Reveal as="p">
            The earliest moment of form deserves a medium.
            <br />
            One that holds a mass without a boundary — and{' '}
            <span className="accent">forgets on purpose.</span>
          </Reveal>
        </div>
      </section>

      <ProjectNav slug="vapours" />
    </article>
  );
}
