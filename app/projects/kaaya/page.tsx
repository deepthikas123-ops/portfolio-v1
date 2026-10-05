import type { Metadata } from 'next';
import { Reveal, Stagger, StaggerItem } from '@/components/Motion';
import ProjectNav from '@/components/ProjectNav';
import { getProject } from '@/components/projects';

const p = getProject('kaaya');

export const metadata: Metadata = {
  title: 'KAAYA — The Body Draws What the Eye Never Sees | Deepthika S',
  description:
    'KAAYA cuts the sensorimotor loop of drawing in two: a blindfolded artist draws by proprioception through an IMU on the back of the hand, and a generative image model interprets the trace they never see. NeurIPS 2026 Creative AI Track.',
  openGraph: {
    title: 'KAAYA — The Body Draws What the Eye Never Sees',
    description:
      'Blind drawing through the body, interpreted by a machine. A wearable IMU, a Unity canvas and a generative image model.',
    images: ['/images/kaaya-machine-interpretation.jpg'],
  },
};

const mapping = [
  {
    n: 'Pitch',
    k: 'Hand tilts forward / back',
    h: 'Horizontal position',
    b: 'Pitch moves the brush left and right across the canvas.',
  },
  {
    n: 'Roll',
    k: 'Hand rotates side to side',
    h: 'Vertical position',
    b: 'Roll moves the brush up and down.',
  },
  {
    n: 'Yaw',
    k: 'Hand turns about its axis',
    h: 'Colour and thickness',
    b: 'Yaw is folded into the colour and the weight of the stroke.',
  },
];

export default function KaayaPage() {
  return (
    <article>
      {/* ---------- Hero ---------- */}
      <section className="paper-hero grain">
        <div className="glow" aria-hidden="true" />
        <span className="ghost" aria-hidden="true">
          {p.index}
        </span>
        <div className="hero-grid">
          <Reveal as="figure" className="card art" delay={0.15}>
            <img
              src="/images/kaaya-machine-interpretation.jpg"
              alt="A finished artwork: violet and amber loops of a blind drawing, rendered by a generative model with teal watercolour washes and a warm glow at its centre"
            />
            <figcaption>
              What the machine saw in a blind trace. The artist who drew it has never seen the
              curve underneath.
            </figcaption>
          </Reveal>
          <div className="copy">
            <Reveal delay={0.3}>
              <p className="kicker">Creative AI · NeurIPS 2026 Creative AI Track</p>
              <h1>
                KAAYA.
                <span className="small">The body draws what the eye never sees</span>
              </h1>
              <p className="sub">Blind drawing through the body, interpreted by a machine</p>
            </Reveal>
            <Reveal delay={0.45}>
              <p className="desc">
                In ordinary drawing, the eye and the hand form one closed loop inside one person.
                KAAYA (Kinaesthetic Abstract Art through Yaw and Attitude) cuts that loop and hands
                each half to a different agent. A blindfolded artist keeps the motor half, drawing
                through an IMU on the back of the hand. A machine keeps the visual half: it sees
                every curve the artist never will, and interprets the trace into a finished
                artwork. <em>Kaaya</em> is the Sanskrit word for the body — the only instrument
                the artist is allowed.
              </p>
            </Reveal>
            <Reveal delay={0.6}>
              <div className="tags">
                <span>Wearable Sensing</span>
                <span>Proprioception</span>
                <span>Unity</span>
                <span>Generative Imaging</span>
                <span>Creative Agency</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- The ordinary loop ---------- */}
      <section className="paper-narrative">
        <div className="wrap">
          <Reveal>
            <h2 className="section-title">Look at What You Are Doing</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="intro">
              Every drawing lesson begins with the same instruction. It is so obvious that it hides
              a structural fact: drawing is a <strong>closed sensorimotor loop</strong>. The eye
              watches the mark, the brain compares it with the intention, the hand corrects, and the
              eye watches again — many times a second. We experience the loop as a single act, and
              every drawing tool ever made, from charcoal to the stylus, assumes it is intact.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="intro">
              KAAYA is built on the opposite assumption. The artist is blindfolded, so the visual
              half of the loop is severed. What remains is <strong>proprioception</strong> — the
              body’s own sense of its position and motion. The visual half is not thrown away; it
              is handed to a machine. The two halves meet again only at the reveal.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <Reveal className="fig-card fig-wide" y={0}>
            <img
              src="/images/kaaya-sensorimotor-loop.png"
              alt="Diagram. (a) Ordinary drawing: eye, brain, hand and canvas form one closed loop. (b) KAAYA: the eye is blindfolded, the brain drives hand and IMU onto a canvas, and a machine eye sees the canvas and produces the artwork; the reveal comes only after the session ends."
            />
            <figcaption>
              The structural move. (a) Ordinary drawing is one closed loop inside one person. (b)
              KAAYA cuts the loop at the eye: the artist keeps the motor half, the machine receives
              the visual half, and the two meet again only at the reveal.
            </figcaption>
          </Reveal>
        </div>
      </section>

      {/* ---------- Pull quote ---------- */}
      <section className="dark-section quote-band grain">
        <div className="glow" aria-hidden="true" />
        <div className="wrap">
          <Reveal as="p">
            The artist executes everything and <span className="accent">sees nothing</span>. The
            machine executes nothing and <span className="accent">sees everything.</span>
          </Reveal>
        </div>
      </section>

      {/* ---------- The instrument ---------- */}
      <section className="pipeline">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">
              Version 1 · Built and running end to end
            </p>
            <h2 className="section-title">The Instrument</h2>
          </Reveal>

          <div className="split">
            <Reveal as="figure" className="photo" y={0}>
              <img
                src="/images/kaaya-wearable-unit.jpg"
                alt="The back of a hand wearing a grey strap that holds an Arduino Nano 33 IoT board, labelled 'Arduino Nano 33 IoT' and 'IMU sensor inside', with a USB cable running off the wrist"
              />
              <figcaption>
                The wearable unit: an Arduino Nano 33 IoT with its onboard inertial measurement unit,
                strapped to the dorsal side of the hand.
              </figcaption>
            </Reveal>
            <Reveal className="copy-block" delay={0.1}>
              <h3>A brush made of the back of a hand</h3>
              <p>
                The board streams over serial into a <strong>desktop canvas built in Unity</strong>.
                A complementary filter estimates the hand’s attitude as pitch, roll and yaw, and a
                recalibration control lets the artist set any comfortable posture as the neutral
                centre of the canvas.
              </p>
              <p>
                The interface offers only three things — <strong>start, generate and
                recalibrate</strong> — and the artist wears the blindfold for the whole session.
                Nothing but the orientation of the body ever reaches the canvas.
              </p>
            </Reveal>
          </div>

          <Reveal>
            <p className="lead">
              The v1 mapping is deliberately simple. Orientation becomes position and colour; the
              hand’s movement through the room leaves no mark.
            </p>
          </Reveal>
          <Stagger className="sequence">
            {mapping.map((m) => (
              <StaggerItem key={m.n}>
                <div className="s-n">{m.n}</div>
                <div className="s-k">{m.k}</div>
                <h4>→ {m.h}</h4>
                <p>{m.b}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---------- Trace vs interpretation ---------- */}
      <section className="dark-section dark-fig grain">
        <div className="glow" aria-hidden="true" />
        <div className="wrap">
          <Reveal>
            <p className="finding-tag">A v1 session pair</p>
            <h2 className="section-title">Two Halves of One Drawing</h2>
            <p className="lead">
              After the session, the accumulated curve canvas is passed to a{' '}
              <strong>Gemini image model</strong>, which interprets it into a finished artwork. On
              the left is the raw trace the body left. On the right, what the machine saw in it.
              The artist has never seen the first image.
            </p>
          </Reveal>
          <Stagger className="pair">
            <StaggerItem>
              <figure>
                <img
                  src="/images/kaaya-drawing-trace.jpg"
                  alt="The raw blind trace: overlapping looping strokes shading from deep violet to pale amber on a white canvas, drifting across the frame"
                />
                <figcaption>
                  <span className="l">(a)</span>
                  <span className="d">The trace — what the body drew.</span>
                </figcaption>
              </figure>
            </StaggerItem>
            <StaggerItem>
              <figure>
                <img
                  src="/images/kaaya-machine-interpretation.jpg"
                  alt="The machine interpretation: the same loops rendered as painted strokes over teal watercolour washes, with a warm glow at the dense centre"
                />
                <figcaption>
                  <span className="l">(b)</span>
                  <span className="d">The interpretation — what the machine saw in it.</span>
                </figcaption>
              </figure>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* ---------- What blind curves look like ---------- */}
      <section className="finding">
        <div className="wrap">
          <Reveal>
            <p className="tag">Why the curves wander</p>
            <h2 className="section-title">Drift Is the Signature, Not a Defect</h2>
          </Reveal>
          <Reveal className="split copy-pair" y={20}>
              <div className="copy-block">
              <h3>Curvature true, coordinates free</h3>
              <p>
                A blind trace invites a dismissal: it looks like scribble. Without vision the motor
                system runs <strong>open loop</strong>. Small biases in heading and amplitude, which
                sighted drawing corrects dozens of times a second, accumulate uncorrected, and the
                drawing wanders.
              </p>
              </div>
              <div className="copy-block">
              <p>
                The paper shows the mechanism in simulation. The same intended circle, drawn with
                and without a corrective term standing in for vision, keeps its curvature while its
                placement, scale and orientation drift. That is exactly the visual character of the
                v1 traces.
              </p>
              <p>
                It connects to earlier work on concept sketching, where classifiers built on over
                150 kinematic features of a stroke identified stroke types with near-perfect field
                accuracy, while pixel-based models on the rendered image reached{' '}
                <strong>82.5%</strong>. The kinematics of drawing carry more of its identity than
                its appearance. Blind drawing is the limit case: it leaves the maker only the
                kinematic channel.
              </p>
              </div>
            </Reveal>
          <Reveal className="fig-card" y={0}>
              <img
                src="/images/kaaya-blind-curve-simulation.png"
                alt="Two simulation panels. (a) The v2 mapping on a synthetic attitude stream: curves coloured by yaw, with weight from angular speed. (b) An intended circle drawn sighted stays on the circle; four blind trials keep the curvature but drift in placement."
              />
              <figcaption>
                Simulation of the specified behaviour, not a measurement of artists. (a) The v2
                mapping run on a synthetic attitude stream. (b) Sighted versus blind trials of the
                same intended circle.
              </figcaption>
            </Reveal>
        </div>
      </section>

      {/* ---------- Architecture ---------- */}
      <section className="band">
        <div className="wrap">
          <Reveal className="band-head">
            <p className="tag">Architecture</p>
            <h2 className="section-title">What Exists, and What Comes Next</h2>
            <p>
              Solid boxes are the v1 pipeline, built and running end to end. Dashed boxes are the
              second version, specified in the paper but not yet built.
            </p>
          </Reveal>
          <Reveal className="fig-card" y={0}>
            <img
              src="/images/kaaya-system-architecture.png"
              alt="Architecture diagram. Solid v1 boxes: wearable unit, attitude estimation, brush mapping, curve canvas, interpretation by a Gemini image model. Dashed v2 boxes: kinematic channel, intention gate, regime dial and reveal ritual."
            />
            <figcaption>
              The KAAYA architecture. Wearable unit → attitude estimation → brush mapping → curve
              canvas → interpretation (v1, solid). Kinematic channel, intention gate, regime dial
              and reveal ritual (v2, dashed).
            </figcaption>
          </Reveal>

          <Stagger className="status-grid">
            <StaggerItem className="status-col built">
              <p className="st-label">Implemented</p>
              <h3>Version 1</h3>
              <ul>
                <li>
                  <strong>Wearable sensing</strong>
                  Arduino Nano 33 IoT with onboard IMU on the back of the hand.
                </li>
                <li>
                  <strong>Attitude to brush</strong>
                  Complementary filter → pitch and roll as position, yaw as colour and thickness.
                </li>
                <li>
                  <strong>Blind canvas</strong>
                  Unity desktop application, unseen by the blindfolded artist.
                </li>
                <li>
                  <strong>Machine interpretation</strong>
                  The finished trace is interpreted by a Gemini image model.
                </li>
              </ul>
            </StaggerItem>
            <StaggerItem className="status-col specified">
              <p className="st-label">Proposed · not yet built</p>
              <h3>Version 2</h3>
              <ul>
                <li>
                  <strong>Kinematic expressiveness</strong>
                  Angular speed drives stroke weight and jerk drives opacity, so a slow sweep and a
                  sharp flick leave different marks.
                </li>
                <li>
                  <strong>Double blindness</strong>
                  The artist speaks an intention aloud and chooses whether the machine receives it.
                </li>
                <li>
                  <strong>Faithful and Free dial</strong>
                  Faithful preserves every curve and adds only colour, texture and atmosphere; Free
                  treats the trace as loose inspiration.
                </li>
                <li>
                  <strong>Reveal ritual</strong>
                  Before the blindfold comes off, the artist describes what they believe they drew.
                  The session ends in a triptych: belief, trace and interpretation.
                </li>
              </ul>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* ---------- Statement ---------- */}
      <section className="dark-section statement-band grain">
        <div className="glow" aria-hidden="true" />
        <div className="wrap">
          <Reveal as="h2">
            Split Authorship<span className="accent">.</span>
          </Reveal>
          <Reveal as="p" delay={0.15}>
            Human–AI art usually divides labour between <span className="accent">idea</span> and{' '}
            <span className="accent">execution</span>. KAAYA splits it somewhere the usual
            vocabulary does not even name: down the middle of the{' '}
            <span className="accent">sensorimotor loop</span> itself. Asking who made the artwork
            becomes asking where, inside one act of drawing, seeing ends and moving begins.
          </Reveal>
        </div>
      </section>

      {/* ---------- Agency ---------- */}
      <section className="commitments grain">
        <div className="wrap">
          <Reveal>
            <h2>What This Does to Agency</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead">
              The work is a question about <span className="accent">agency</span>, not only about
              technique.
            </p>
          </Reveal>
          <Stagger className="commit-grid">
            <StaggerItem>
              <div className="n">01</div>
              <h4>The blindfold is a chosen refusal</h4>
              <p>
                Nothing stops the artist from looking. The constraint is worn voluntarily, and it
                makes visible a class of mark — drift-shaped, curvature-true — that sighted drawing
                corrects out of existence before it can appear.
              </p>
            </StaggerItem>
            <StaggerItem>
              <div className="n">02</div>
              <h4>The machine’s sight is a position</h4>
              <p>
                The machine is described not as contributing talent but as occupying a position in
                the loop: it stands where the artist’s eye used to stand.
              </p>
            </StaggerItem>
            <StaggerItem>
              <div className="n">03</div>
              <h4>Delegation as a dial</h4>
              <p>
                At the Faithful end the machine is a devoted colourist of someone else’s line; at
                the Free end it is closer to a co-author who took a suggestion. The proposed dial
                lets the artist decide, per work, how much to give away.
              </p>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* ---------- Limitations ---------- */}
      <section className="open">
        <div className="wrap">
          <Reveal>
            <h2 className="section-title">Limitations and Failure Modes</h2>
          </Reveal>
          <Stagger className="open-grid">
            <StaggerItem className="iter-panel grain">
              <h4>Existence claims</h4>
              <p>
                The claims about v1 are existence claims: the pipeline runs and produces session
                pairs. No user study is reported.
              </p>
            </StaggerItem>
            <StaggerItem className="iter-panel grain">
              <h4>Orientation, not position</h4>
              <p>
                A single IMU reads attitude, so the hand’s translation through the room leaves no
                mark — part of the motivation for the v2 kinematic channel.
              </p>
            </StaggerItem>
            <StaggerItem className="iter-panel grain">
              <h4>Simulated drift</h4>
              <p>
                The drift account is a simulation of the mechanism, not a measurement of artists.
              </p>
            </StaggerItem>
            <StaggerItem className="iter-panel grain">
              <h4>An opaque interpreter</h4>
              <p>
                The model can be constrained in what it preserves, but not inspected in what it
                sees — and it may read figures into drift with confidence.
              </p>
            </StaggerItem>
            <StaggerItem className="iter-panel grain">
              <h4>Learning the mapping</h4>
              <p>
                An artist who learns the mapping well may simulate the canvas in imagination,
                drawing sighted in all but name.
              </p>
            </StaggerItem>
            <StaggerItem className="iter-panel grain">
              <h4>The ritual’s pressure</h4>
              <p>
                Knowing their belief will hang beside their trace, an artist may begin drawing what
                is easy to describe.
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
            The body draws what the eye never sees. The machine sees what the body could never show
            it meant.
            <br />
            And the artwork, for once, is honest about being made by{' '}
            <span className="accent">neither one alone.</span>
          </Reveal>
        </div>
      </section>

      <ProjectNav slug="kaaya" />
    </article>
  );
}
