import type { Metadata } from 'next';
import Link from 'next/link';
import { Reveal, Stagger, StaggerItem } from '@/components/Motion';
import ProjectNav from '@/components/ProjectNav';
import { getProject } from '@/components/projects';
import './kaaya-wearable.css';

const p = getProject('kaaya-wearable');
const img = (f: string) => `/images/kaaya-wearable/${f}`;

export const metadata: Metadata = {
  title: 'KAAYA — Kinaesthetic Abstract Art using Yaw and Attitude | Deepthika S',
  description:
    'A wearable IMU-to-generative-art system that splits drawing’s sensorimotor loop between a blindfolded artist and a machine. Shortlisted for presentation at NeurIPS 2026, Sydney.',
  openGraph: {
    title: 'KAAYA — Kinaesthetic Abstract Art using Yaw and Attitude',
    description: 'When humans create and machines interpret, who is really making the art?',
    images: ['/images/covers/kaaya.jpg'],
  },
};

const bodyHalf = [
  { t: 'The wearable', d: 'IMU (Nano 33 IoT) on the hand' },
  { t: 'Orientation', d: 'Captures hand pose (yaw, pitch, roll)' },
  { t: 'Motion to brush', d: 'Maps motion → position, colour & thickness' },
  { t: 'Unity canvas', d: 'Trace captured on a Unity canvas' },
];

const machineHalf = [
  { t: 'Prompt assembly', d: 'Freedom Dial, Intention Gate' },
  { t: 'Image model', d: 'Gemini Nano Banana 2.1' },
  { t: 'Fidelity check', d: 'Checks trace and regenerates if needed' },
  { t: 'Reveal & share', d: 'Reveal ritual + final artwork' },
];

const grid = [
  { f: 'faithful-blind.jpg', a: 'Watercolour rings that follow the captured trace closely, made without knowing the artist was drawing grief' },
  { f: 'free-blind.jpg', a: 'Orange and white koi swirling in a blue whirlpool, made without knowing the artist was drawing grief' },
  { f: 'faithful-knows.jpg', a: 'Dark plum and rose watercolour spiral that follows the captured trace, made knowing the artist was drawing grief' },
  { f: 'free-knows.jpg', a: 'Black, red and cream brush strokes spiralling inward, made knowing the artist was drawing grief' },
];

function Arrow({ id, color }: { id: string; color: string }) {
  return (
    <marker id={id} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M1 1 L9 5 L1 9" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </marker>
  );
}

function OrdinaryLoop() {
  return (
    <svg viewBox="0 0 640 260" role="img" aria-labelledby="kw-loop-a">
      <title id="kw-loop-a">
        Ordinary drawing is one closed loop: the eye feeds the brain, the brain drives the hand, the hand marks the canvas, and the canvas is seen again by the eye.
      </title>
      <defs>
        <Arrow id="kw-ap" color="#5b2d6e" />
      </defs>
      <g className="box">
        <rect x="60" y="20" width="110" height="46" />
        <rect x="400" y="20" width="110" height="46" />
        <rect x="60" y="192" width="110" height="46" />
        <rect x="400" y="192" width="110" height="46" />
      </g>
      <g className="lab" textAnchor="middle">
        <text x="115" y="48">eye</text>
        <text x="455" y="48">brain</text>
        <text x="115" y="220">canvas</text>
        <text x="455" y="220">hand</text>
      </g>
      <g fill="none" stroke="#5b2d6e" strokeWidth="1.8" markerEnd="url(#kw-ap)">
        <path d="M172 40 C 240 64, 330 64, 398 40" />
        <path d="M455 68 V 190" />
        <path d="M398 218 C 330 194, 240 194, 172 218" />
        <path d="M115 190 V 68" />
      </g>
      <g className="note" textAnchor="middle">
        <text x="285" y="122">the eye corrects the hand</text>
        <text x="285" y="140">continuously; seeing and</text>
        <text x="285" y="158">moving are one act</text>
      </g>
      <g className="note it" textAnchor="end">
        <text x="100" y="124">visual return</text>
        <text x="100" y="142">path</text>
      </g>
    </svg>
  );
}

function KaayaLoop() {
  return (
    <svg viewBox="0 0 640 260" role="img" aria-labelledby="kw-loop-b">
      <title id="kw-loop-b">
        In KAAYA the loop is cut at the eye: the blindfolded eye has no visual return path. The brain drives the hand and IMU onto the canvas, and a machine eye sees the canvas and produces the artwork.
      </title>
      <defs>
        <Arrow id="kw-bp" color="#5b2d6e" />
        <Arrow id="kw-br" color="#9b1c1c" />
        <Arrow id="kw-bd" color="#a8841c" />
      </defs>
      <g className="box">
        <rect x="30" y="20" width="100" height="46" />
        <rect x="260" y="20" width="100" height="46" />
        <rect x="30" y="192" width="100" height="46" />
        <rect x="250" y="192" width="130" height="46" />
      </g>
      <g className="box red">
        <rect x="500" y="20" width="110" height="46" />
        <rect x="490" y="192" width="130" height="46" />
        <path d="M30 20 L130 66 M130 20 L30 66" strokeWidth="2.2" />
      </g>
      <g className="lab" textAnchor="middle">
        <text x="80" y="48">eye</text>
        <text x="310" y="48">brain</text>
        <text x="555" y="48">artwork</text>
        <text x="80" y="220">canvas</text>
        <text x="315" y="220">hand + IMU</text>
        <text x="555" y="220">machine eye</text>
      </g>
      <g fill="none" strokeWidth="1.8">
        <path d="M310 68 V 190" stroke="#5b2d6e" markerEnd="url(#kw-bp)" />
        <path d="M248 216 H 132" stroke="#5b2d6e" markerEnd="url(#kw-bp)" />
        <path d="M110 190 C 170 120, 400 110, 500 190" stroke="#9b1c1c" markerEnd="url(#kw-br)" />
        <path d="M555 190 V 68" stroke="#9b1c1c" markerEnd="url(#kw-br)" />
        <path d="M498 44 H 362" stroke="#a8841c" strokeDasharray="6 5" markerEnd="url(#kw-bd)" />
        <path d="M258 44 H 132" stroke="#a8841c" strokeDasharray="6 5" markerEnd="url(#kw-bd)" />
      </g>
      <g className="note" textAnchor="middle">
        <text x="80" y="90">blindfolded</text>
        <text x="338" y="92" textAnchor="start">proprioception</text>
        <text x="338" y="109" textAnchor="start">only</text>
      </g>
      <g className="note it" textAnchor="middle">
        <text x="68" y="128">no visual</text>
        <text x="68" y="146">return path</text>
      </g>
    </svg>
  );
}

export default function Page() {
  return (
    <article className="kw">
      {/* ---------- hero ---------- */}
      <section className="kw-hero grain">
        <div className="bg" aria-hidden="true" />
        <span className="ghost" aria-hidden="true">
          {p.index}
        </span>
        <div className="hero-grid">
          <Reveal as="figure" className="card">
            <img
              src={img('card.jpg')}
              alt="A black glove with a small circuit board strapped to the back of the hand and copper tape on the index finger, against a fluted glass backdrop"
            />
            <figcaption>
              Research Project (Shortlisted for Presentation @NeurIPS 2026, Sydney)
              <br />
              2026 | 2 months | group project (2 members)
            </figcaption>
          </Reveal>
          <Reveal className="copy" delay={0.12}>
            <p className="kicker">Wearable · Creative AI</p>
            <h1>KAAYA</h1>
            <p className="sub">Kinaesthetic Abstract Art using Yaw and Attitude</p>
            <p className="desc">
              IMU-to-generative-art system that splits drawing’s sensorimotor loop between a blindfolded artist and
              asks:
              <br />
              <strong>When humans create and machines interpret, who is really making the art?</strong>
            </p>
            <img className="partners" src={img('neurips.png')} alt="Neural Information Processing Systems (NeurIPS)" />
          </Reveal>
        </div>
      </section>

      {/* ---------- the question ---------- */}
      <section className="kw-question">
        <div className="scene">
          <img src={img('blind-scene.jpg')} alt="A blindfolded woman in a purple knit sweater drawing loose loops on a large sheet of paper" />
        </div>
        <div className="top">
          <div className="wrap">
            <Reveal>
              <h2 className="kw-title light">What if you cannot see what you are drawing?</h2>
              <p className="kw-body light">
                When you draw, your eyes constantly guide your hand. You observe every stroke, adjust your movements
                and correct what appears on the page. But what happens when that visual feedback disappears? What would
                your movements create?
              </p>
            </Reveal>
          </div>
        </div>
        <div className="rq">
          <div className="wrap">
            <p>
              <strong>Research question:</strong> How might we translate bodily movement into an expressive drawing
              experience, without relying on visual feedback?
            </p>
          </div>
        </div>
      </section>

      {/* ---------- cut the loop ---------- */}
      <section className="kw-sec">
        <div className="wrap">
          <Reveal>
            <p className="kw-tag">The idea</p>
            <h2 className="kw-title">Cut the loop at the eye.</h2>
          </Reveal>
          <div className="kw-loops">
            <Reveal as="figure" className="loop">
              <h3>
                <strong>Ordinary drawing:</strong> one closed loop; one person
              </h3>
              <OrdinaryLoop />
            </Reveal>
            <Reveal as="figure" className="loop" delay={0.1}>
              <h3>
                <strong>KAAYA:</strong> the loop is cut at the eye and shared between two agents
              </h3>
              <KaayaLoop />
            </Reveal>
          </div>

          <Reveal>
            <h3 className="kw-sub">KAAYA — the process</h3>
          </Reveal>
          {[
            { k: 'Body’s half', s: 'Blindfolded artist', rows: bodyHalf, n: 0 },
            { k: 'Machine’s half', s: 'AI model', rows: machineHalf, n: 4 },
          ].map((r) => (
            <div className="kw-flow" key={r.k}>
              <Reveal className="who">
                <h4>{r.k}</h4>
                <p>({r.s})</p>
              </Reveal>
              <Stagger as="ol" className="steps">
                {r.rows.map((x, i) => (
                  <StaggerItem as="li" key={x.t} className="step">
                    <span className="n">{String(r.n + i + 1).padStart(2, '0')}</span>
                    <h5>{x.t}</h5>
                    <p>{x.d}</p>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- ideation & prototyping ---------- */}
      <section className="kw-sec kw-panel">
        <div className="wrap">
          <Reveal>
            <p className="kw-tag">Build</p>
            <h2 className="kw-title">Ideation &amp; prototyping.</h2>
          </Reveal>
          <div className="kw-build">
            <div className="left">
              <Reveal as="figure">
                <img
                  src={img('sketches.jpg')}
                  alt="Pencil sketches of four hands wearing different strap and glove layouts for the sensor unit"
                />
                <figcaption>Sketching where the sensor could live on the hand.</figcaption>
              </Reveal>
              <Reveal as="figure" delay={0.08}>
                <img
                  src={img('prototypes.jpg')}
                  alt="Three early prototypes: a strap-on sensor box on the back of a hand, then two versions of a mesh glove with the board and a copper-tape fingertip"
                />
                <figcaption>From a strap-on box to a glove: three early prototypes.</figcaption>
              </Reveal>
            </div>
            <Reveal as="figure" className="right" delay={0.12}>
              <img
                src={img('exploded.jpg')}
                alt="Exploded view of the wearable with six numbered parts: copper foil tape for touch input, an Arduino Nano ESP32 microcontroller, an IMU sensor for yaw, pitch and roll, a 3D-printed enclosure, an adjustable strap system and a glove as the base"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- two choices ---------- */}
      <section className="kw-sec">
        <div className="wrap">
          <Reveal>
            <p className="kw-tag">The machine’s brief</p>
            <h2 className="kw-title">
              <span className="accent">Two choices</span> before the blindfold goes on.
            </h2>
          </Reveal>

          <div className="kw-choices">
            <div className="col-l">
              <Reveal className="kw-dials">
                <div className="dial">
                  <span className="n">01</span>
                  <h3>Freedom Dial</h3>
                  <ul className="track t3" aria-label="Faithful, Balanced, Free">
                    <li>Faithful</li>
                    <li>Balanced</li>
                    <li>Free</li>
                  </ul>
                </div>
                <div className="dial">
                  <span className="n">02</span>
                  <h3>Intention Gate</h3>
                  <ul className="track t2" aria-label="Machine knows intention, Machine blind to intention">
                    <li>Machine knows intention</li>
                    <li>Machine blind to intention</li>
                  </ul>
                </div>
              </Reveal>
              <Reveal as="figure" className="kw-portrait" delay={0.1}>
                <img
                  src={img('portrait.webp')}
                  alt="A blindfolded woman looking upward, drawing in the air with her glove-wearing hand; a purple trail follows her hand"
                />
              </Reveal>
            </div>

            <div className="col-r">
              <Reveal className="kw-matrix-wrap">
                <div className="kw-matrix" role="table" aria-label="The same trace, rendered under each combination of the two choices">
                  <div className="cell head corner" role="presentation" />
                  <div className="cell head" role="columnheader">
                    <strong>Faithful</strong>
                    <span>(Preserves the exact trace)</span>
                  </div>
                  <div className="cell head" role="columnheader">
                    <strong>Free</strong>
                    <span>(Uses trace as loose inspo)</span>
                  </div>

                  <div className="cell trace" role="rowheader">
                    <strong>Captured trace</strong>
                    <img src={img('trace.png')} alt="A single captured trace: three nested loops drawn in black ink" />
                    <span>The artist is drawing “grief”</span>
                  </div>
                  <div className="cell rowhead" role="rowheader">
                    <strong>Blind to intention</strong>
                    <span>Machine doesn’t know that artist is drawing grief</span>
                  </div>
                  <img className="cell art" role="cell" src={img(grid[0].f)} alt={grid[0].a} />
                  <img className="cell art" role="cell" src={img(grid[1].f)} alt={grid[1].a} />

                  <div className="cell rowhead" role="rowheader">
                    <strong>Knows intention</strong>
                    <span>Machine knows artist is drawing grief</span>
                  </div>
                  <img className="cell art" role="cell" src={img(grid[2].f)} alt={grid[2].a} />
                  <img className="cell art" role="cell" src={img(grid[3].f)} alt={grid[3].a} />
                </div>
              </Reveal>

              <div className="kw-trio">
                <Reveal as="figure" className="f meant">
                  <figcaption>I meant</figcaption>
                  <blockquote>
                    <span aria-hidden="true">“</span>
                    I drew a trapped form breaking out of a closed ring, and it felt like tight tension giving way to a
                    sudden release
                  </blockquote>
                </Reveal>
                <Reveal as="figure" className="f made" delay={0.08}>
                  <figcaption>I made</figcaption>
                  <img src={img('i-made.jpg')} alt="The blind drawing: loose looping lines with a long curve sweeping between two clusters" />
                </Reveal>
                <Reveal as="figure" className="f saw" delay={0.16}>
                  <figcaption>The machine saw</figcaption>
                  <img src={img('machine-saw.jpg')} alt="The machine’s rendering: dark tangled ink at the left breaking out into gold and teal watercolour washes" />
                </Reveal>
                <div className="gap g1">
                  <strong>Belief–Trace Gap</strong>
                  <span>How far the body wandered from what the artist felt</span>
                </div>
                <div className="gap g2">
                  <strong>Trace–Interpretation Gap</strong>
                  <span>What the machine added</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- beyond the prototype ---------- */}
      <section className="kw-sec kw-panel">
        <div className="wrap">
          <Reveal>
            <p className="kw-tag">Outcome</p>
            <h2 className="kw-title">Beyond the prototype.</h2>
          </Reveal>
          <div className="kw-beyond">
            <Reveal as="figure">
              <img src={img('presentation.jpg')} alt="The NeurIPS 2026 presentation recording: the presenter on the left, the KAAYA title slide on the right" />
              <figcaption>
                <strong>The full presentation can be viewed at:</strong>
                <a
                  href="https://recorder-v3.slideslive.com/?share=114816&s=a857b3be-b47d-4b47-ba94-f1b7b104c46d"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  recorder-v3.slideslive.com/?share=114816
                </a>
              </figcaption>
            </Reveal>
            <Reveal as="figure" delay={0.1}>
              <img src={img('gallery.jpg')} alt="A gallery of four abstract watercolour and ink artworks produced by KAAYA sessions" />
              <figcaption>
                <strong>Gallery and share pages:</strong>
                <a href="https://kaaya-neurips.vercel.app" target="_blank" rel="noopener noreferrer">
                  kaaya-neurips.vercel.app
                </a>
              </figcaption>
            </Reveal>
          </div>

          <Reveal className="kw-paper">
            <img src={img('neurips.png')} alt="Neural Information Processing Systems (NeurIPS)" />
            <p>
              <strong>Paper #99, KAAYA: The Body Draws What the Eye Never Sees</strong> — Selected for presentation
              under Creative AI Track at NeurIPS 2026, Sydney.{' '}
              <Link href="/projects/kaaya">Read the research write-up →</Link>
            </p>
          </Reveal>
        </div>
      </section>

      <section className="kw-close grain">
        <div className="wrap">
          <Reveal as="p">
            The <strong>artist</strong> sees nothing, executes everything; The <strong>machine</strong> executes
            nothing, sees everything.
          </Reveal>
        </div>
      </section>

      <ProjectNav slug="kaaya-wearable" />
    </article>
  );
}
