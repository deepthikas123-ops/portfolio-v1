import type { Metadata } from 'next';
import { Reveal, Stagger, StaggerItem } from '@/components/Motion';
import ProjectNav from '@/components/ProjectNav';
import { getProject } from '@/components/projects';
import './morse.css';

const p = getProject('morse-code-vault');

export const metadata: Metadata = {
  title: 'Morse Code Logic Game — A Game of Signals, Switches and Logic | Deepthika S',
  description:
    'An interactive electronic learning game where children decode Morse signals, enter the answer in binary on DIP switches, and let XNOR and AND logic verify it — three progressive levels, four hand-built circuits, and a product-first redesign.',
  openGraph: {
    title: 'Morse Code Logic Game — A Game of Signals, Switches and Logic',
    description:
      'Hear the signal. Crack the code. Match the logic. An electronic learning game that turns digital logic into play.',
    images: ['/images/morse-board.jpg'],
  },
};

const steps = [
  {
    n: '01',
    t: 'Set the target',
    who: 'Game Master',
    d: 'Selects a target number — here, 3 — converts it into binary and sets the corresponding input switches.',
  },
  {
    n: '02',
    t: 'Send the Morse',
    who: 'Game Master',
    d: 'Presses the tap switch to transmit the Morse code for 3: three short beeps followed by two long beeps.',
  },
  {
    n: '03',
    t: 'Decode',
    who: 'Player',
    d: 'Listens to the beeps and uses the Morse code reference sheet to identify the number as 3.',
  },
  {
    n: '04',
    t: 'Convert',
    who: 'Player',
    d: 'Converts the decimal number 3 into its 2-bit binary representation: “1 1”.',
  },
  {
    n: '05',
    t: 'Enter',
    who: 'Player',
    d: 'Sets both DIP switches to ON to enter the binary value 11.',
  },
  {
    n: '06',
    t: 'Verify',
    who: 'Player',
    d: 'The seven-segment display shows the player’s entered value, providing visual feedback.',
  },
  {
    n: '07',
    t: 'Progress',
    who: 'Player',
    d: 'If the input matches the Game Master’s, the LED glows and the player moves to the next level.',
  },
];

const levels = [
  {
    n: 'Level 1',
    bits: '2-bit input',
    range: 'Single-digit numbers, 0–3',
    d: 'The player decodes the Morse tone and enters a 2-bit binary number on a 2-input DIP switch.',
    img: '/images/morse-level-1.jpg',
  },
  {
    n: 'Level 2',
    bits: '4-bit input',
    range: 'Extended range, 0–9',
    d: 'The player decodes the Morse tone and enters a 4-bit binary number on a 4-input DIP switch.',
    img: '/images/morse-level-2.jpg',
  },
  {
    n: 'Level 3',
    bits: '8-bit input',
    range: 'Larger range, 0–99',
    d: 'The player decodes the Morse tone and enters a two-digit number in binary on an 8-input DIP switch.',
    img: '/images/morse-level-3.jpg',
  },
];

export default function MorseCodeLogicGamePage() {
  return (
    <article>
      {/* ---------- Hero ---------- */}
      <section className="morse-hero grain">
        <div className="bg" aria-hidden="true" />
        <span className="ghost" aria-hidden="true">
          {p.index}
        </span>
        <div className="hero-grid">
          <Reveal as="figure" className="card" delay={0.15}>
            <img
              src="/images/morse-board.jpg"
              alt="The finished prototype: a red board holding a Morse tone generator circuit with a speaker, and Level 1, Level 2 and Level 3 comparator circuit boards with DIP switches and seven-segment displays, wired to a row of connectors"
            />
            <figcaption>
              Coursework · Open Laboratory I &amp; II
              <br />
              Group project (3 members) · 2025 | 6 months
            </figcaption>
          </Reveal>
          <div className="copy">
            <Reveal delay={0.3}>
              <p className="kicker">Electronics · Educational Game</p>
              <h1>{p.title}.</h1>
              <p className="sub">A game of signals, switches and logic.</p>
            </Reveal>
            <Reveal delay={0.45}>
              <p className="desc">
                An interactive electronic learning game where children decode Morse signals,
                experiment with binary inputs and discover digital logic through play.
              </p>
            </Reveal>
            <Reveal delay={0.6}>
              <div className="sdg-row">
                <img src="/images/morse-sdg-4.png" alt="UN Sustainable Development Goal 4: Quality education" />
                <img src="/images/morse-sdg-9.png" alt="UN Sustainable Development Goal 9: Industry, innovation and infrastructure" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- The problem ---------- */}
      <section className="finding" style={{ borderTop: 'none' }}>
        <div className="wrap">
          <div className="split morse-problem">
            <Reveal className="copy-block">
              <p className="tag">The problem</p>
              <h2 className="section-title">
                Most systems either engage or educate — <span className="morse-red">rarely both.</span>
              </h2>
              <p>
                Games are fun to play, interactive and give immediate feedback, but learning can
                remain secondary. Educational material gives knowledge and structured content, but
                often limited hands-on interaction.
              </p>
            </Reveal>
            <Reveal className="fig-card" y={0} delay={0.1}>
              <img
                src="/images/morse-engage-educate-venn.png"
                alt="Venn diagram: Engagement (fun to play, interactive, immediate feedback, but learning can remain secondary) and Education (knowledge to gain, structured content, but often limited hands-on interaction), with the gap at their intersection"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <div className="split" style={{ margin: 0 }}>
            <Reveal className="copy-block">
              <h3>Digital logic is hard to grasp when it stays on paper</h3>
              <p>
                Binary numbers, logic gates and digital signals are usually introduced through
                symbols, truth tables and circuit diagrams. For a child, these can feel abstract
                without something they can <strong>see, hear and interact with</strong>.
              </p>
              <div className="fig-card abstract-fig">
                <img
                  src="/images/morse-abstract-concepts.png"
                  alt="Three abstract representations: a grid of binary numbers, a logic gate symbol and a truth table"
                />
              </div>
            </Reveal>
            <Reveal className="opportunity" delay={0.1}>
              <p className="tag">The opportunity</p>
              <h3>What if children could learn digital logic by playing with it?</h3>
              <p>
                Morse code is a simple, tangible example of digital communication: a signal, a
                timing conversion, a decoding and a verification. It can be heard, entered by hand
                and checked by a circuit, giving an unambiguous result —{' '}
                <strong>right or wrong, open or locked.</strong>
              </p>
              <p className="arrow-line">
                From abstract concepts <span aria-hidden="true">→</span> to a hands-on learning
                experience
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- The game ---------- */}
      <section className="finding" style={{ borderTop: 'none' }}>
        <div className="wrap">
          <div className="split narrow-fig">
            <Reveal className="copy-block">
              <h2 className="signal-title">
                Hear the Signal.
                <br />
                <span className="morse-red">Crack the Code.</span>
                <br />
                Match the Logic.
              </h2>
              <p>
                The <strong>Game Master</strong> sends a number in Morse code. The{' '}
                <strong>Player</strong> decodes it, enters the binary value and lets the circuit
                check the answer.
              </p>
            </Reveal>
            <Reveal as="figure" className="photo" y={0} delay={0.1}>
              <img
                src="/images/morse-game-master-player.jpg"
                alt="Two children facing each other across the game: the Game Master selects a number and sends it as Morse code; the Player listens, decodes and enters the answer in binary"
              />
            </Reveal>
          </div>
          <Reveal className="fig-card" y={0}>
            <img
              src="/images/morse-signal-key.png"
              alt="Morse signal key: a dot is a short beep of 1 second, a dash is a long beep of 2 seconds. Example, number 3: three short beeps then two long beeps. A number-to-Morse-code mapping table for the digits 1 to 0."
            />
            <figcaption>
              The signal key: a dot is a short beep (1 s), a dash a long beep (2 s). The number 3 is
              three short beeps followed by two long ones.
            </figcaption>
          </Reveal>
        </div>
      </section>

      {/* ---------- How to play ---------- */}
      <section className="band">
        <div className="wrap">
          <Reveal className="band-head">
            <p className="tag">How to play</p>
            <h2 className="section-title">Seven Steps, Two Players</h2>
          </Reveal>
          <Stagger className="play-steps">
            {steps.map((s, i) => (
              <StaggerItem key={s.n} className="play-step">
                <img
                  src={`/images/morse-step-${i + 1}.jpg`}
                  alt={`Step ${s.n}: ${s.t}`}
                  loading="lazy"
                />
                <div className="ps-n">{s.n}</div>
                <h4>{s.t}</h4>
                <p className={`who ${s.who === 'Game Master' ? 'gm' : ''}`}>{s.who}</p>
                <p>{s.d}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---------- Progressive levels ---------- */}
      <section className="finding" style={{ borderTop: 'none' }}>
        <div className="wrap">
          <Reveal>
            <p className="tag">Progressive levels</p>
            <h2 className="section-title">Each Level Doubles the Bits</h2>
          </Reveal>
          <Stagger className="levels-grid">
            {levels.map((l) => (
              <StaggerItem key={l.n} className="level-card">
                <img src={l.img} alt={`${l.n} comparator board`} loading="lazy" />
                <p className="lv-k">
                  {l.n} · {l.bits}
                </p>
                <h4>{l.range}</h4>
                <p>{l.d}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---------- No partial credit ---------- */}
      <section className="dark-section dark-fig grain">
        <div className="glow" aria-hidden="true" />
        <div className="wrap">
          <Reveal>
            <p className="finding-tag">The verification logic</p>
            <h2 className="section-title">There Is No Partial Credit.</h2>
            <p className="lead">
              Each bit of the player’s entry is compared with the matching bit of the Game Master’s
              value by an <strong>XNOR gate</strong>, whose output goes HIGH only when both bits
              match. The outputs feed a multi-input <strong>AND gate</strong>, so the indicator
              turns on only when every bit agrees. A single mismatch keeps the output LOW — and the
              player tries again.
            </p>
          </Reveal>
          <Reveal className="fig-card" y={0}>
            <img
              src="/images/morse-xnor-logic.png"
              alt="Two logic diagrams. Left: Game Master bits 1 0 and Player bits 1 0 pass through XNOR gates into an AND gate, lighting the match indicator — HIGH. Right: Game Master 1 0 and Player 0 1 give a LOW match indicator."
            />
            <figcaption>
              Every bit matches → match indicator HIGH. One bit differs → LOW.
            </figcaption>
          </Reveal>
        </div>
      </section>

      {/* ---------- Four circuits ---------- */}
      <section className="finding" style={{ borderTop: 'none' }}>
        <div className="wrap">
          <Reveal>
            <p className="tag">Engineering</p>
            <h2 className="section-title">
              Four circuits. <span className="morse-red">One growing challenge.</span>
            </h2>
            <p className="lead">
              A Morse tone generator and a comparator for each level. Every circuit was drawn as a
              schematic, simulated, and translated into a physical PCB.
            </p>
          </Reveal>
          <Reveal className="fig-card" y={0}>
            <img
              src="/images/morse-circuits.jpg"
              alt="A four-column grid: 01 Morse tone generator, 02 Level 1 comparator, 03 Level 2 comparator, 04 Level 3 comparator. Each column shows the schematic, the circuit simulation and the PCB layout."
            />
            <figcaption>
              Schematic → simulation → PCB, for the tone generator and the three level comparators.
            </figcaption>
          </Reveal>
        </div>
      </section>

      <section className="morse-full">
        <Reveal as="figure" y={0}>
          <img
            src="/images/morse-build-collage.jpg"
            alt="The assembled red game board with the tone generator, speaker and three level boards, surrounded by black-and-white photographs of the build process: soldering, breadboarding, PCB etching and testing"
          />
          <figcaption className="wrap">From breadboard to board: the assembled game and its build.</figcaption>
        </Reveal>
      </section>

      {/* ---------- Expo ---------- */}
      <section className="finding">
        <div className="wrap">
          <div className="split narrow-fig">
            <Reveal className="copy-block">
              <p className="tag">Open Lab — the Expo</p>
              <h3>Can you crack the code?</h3>
              <p>
                The Open House gave us the opportunity to bring the game to life and share it with
                others. Watching visitors gather around our stall, explore the game and eagerly try
                to crack the code made every challenge along the way worthwhile.
              </p>
            </Reveal>
            <Reveal as="figure" className="photo" y={0} delay={0.1}>
              <img
                src="/images/morse-expo.jpg"
                alt="Collage from the Open Lab expo: the game on display with a 'Can you crack the code' banner, visitors trying the game, and the team at the stall"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Rethinking ---------- */}
      <section className="dark-section statement-band grain">
        <div className="glow" aria-hidden="true" />
        <div className="wrap">
          <Reveal as="h2">
            The original approach<span className="accent">.</span>
          </Reveal>
          <Reveal as="p" delay={0.15}>
            As part of the Open Lab project, we were tasked with developing the electronic circuitry
            for the game. The circuit handled the game logic — but the system had{' '}
            <span className="accent">no user-friendly interface</span> for players.
          </Reveal>
        </div>
      </section>

      <section className="finding" style={{ borderTop: 'none' }}>
        <div className="wrap">
          <div className="split">
            <Reveal className="fig-card" y={0}>
              <img
                src="/images/morse-original-prototype.jpg"
                alt="The original prototype: separate PCBs wired together by hand on a red board, annotated with its problems — no dedicated enclosure, manual wiring, multiple PCBs, too bulky, not user-friendly"
              />
            </Reveal>
            <Reveal className="copy-block" delay={0.1}>
              <h3>Engineered, but not yet a product</h3>
              <p>
                Multiple PCBs were interconnected by manual wiring, making the setup bulky, exposed
                and difficult to integrate into a compact product.
              </p>
            </Reveal>
          </div>

          <Reveal>
            <p className="tag" style={{ marginTop: 40 }}>
              Rethinking the approach
            </p>
            <h2 className="section-title">What if I approached it from scratch?</h2>
            <p className="lead">
              Instead of starting with the circuitry, I would start with the product itself: define
              the form, understand how the two players interact with it, and design an enclosure
              that supports the gameplay. Once the physical structure and interface were
              established, I would work backwards to integrate the electronics within it.
            </p>
            <p className="pull">
              Design the experience first.{' '}
              <span className="soft">Engineer the technology around it.</span>
            </p>
          </Reveal>
          <Stagger className="sequence">
            <StaggerItem>
              <div className="s-n">01</div>
              <div className="s-k">Define the product</div>
              <h4>Form, user interaction, enclosure</h4>
            </StaggerItem>
            <StaggerItem>
              <div className="s-n">02</div>
              <div className="s-k">Design the interface</div>
              <h4>Control layout, player separation</h4>
            </StaggerItem>
            <StaggerItem>
              <div className="s-n">03</div>
              <div className="s-k">Integrate the electronics</div>
              <h4>Engineer the circuitry from within</h4>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* ---------- Ideation & visualisation ---------- */}
      <section className="band">
        <div className="wrap">
          <Reveal className="band-head">
            <p className="tag">Ideation and visualisation</p>
            <h2 className="section-title">A Game You Can Carry</h2>
            <p>
              A compact, sturdy case with a latch to keep it closed. Inside, a sliding divider
              separates the Game Master’s side, with its tap switch, from the Player’s, with the DIP
              switches, seven-segment displays, a Morse reference board and a whiteboard for jotting
              down the signal.
            </p>
          </Reveal>
          <Reveal className="fig-card" y={0}>
            <img
              src="/images/morse-redesign-sketches.jpg"
              alt="Hand-drawn concept sketches: an open case with a divider hiding the Game Master side from the player; Game Master and Player panels with switches and displays; a compact closed case with a handle and latch; a Morse code reference board and a whiteboard for the player"
            />
            <figcaption>Concept sketches of the redesigned product.</figcaption>
          </Reveal>
          <div className="split render-pair">
            <Reveal as="figure" className="photo" y={0}>
              <img
                src="/images/morse-redesign-console.jpg"
                alt="Concept render of the opened game: a cream and red console with a tap knob, a raised illustrated divider, and DIP switches with seven-segment displays for 2, 4 and 8 bits"
              />
              <figcaption>Open: the divider keeps each player’s controls private.</figcaption>
            </Reveal>
            <Reveal as="figure" className="photo" y={0} delay={0.1}>
              <img
                src="/images/morse-redesign-closed.jpg"
                alt="Concept render of the closed game: a cream and red carry case with a handle and front latch"
              />
              <figcaption>Closed: a carry case with a handle and latch.</figcaption>
            </Reveal>
          </div>
          <Reveal className="fig-card" y={0}>
            <img
              src="/images/morse-redesign-views.jpg"
              alt="Front, side and back views of the closed carry case"
            />
            <figcaption>Front, side and back views.</figcaption>
          </Reveal>
        </div>
      </section>

      <section className="morse-full">
        <Reveal as="figure" y={0}>
          <img
            src="/images/morse-redesign-in-use.jpg"
            alt="AI-rendered concept: two children playing the redesigned game at a table, one at the Game Master side and one at the Player side"
          />
          <figcaption className="wrap">AI-rendered concept visualisation of the redesign in use.</figcaption>
        </Reveal>
      </section>

      {/* ---------- Closing ---------- */}
      <section className="dark-section closing grain" style={{ background: 'var(--dark-3)' }}>
        <div className="glow" aria-hidden="true" />
        <div className="wrap">
          <Reveal as="p">
            A beep becomes a number. A number becomes a challenge.
            <br />
            And every correct answer brings{' '}
            <span className="accent">the joy of discovery.</span>
          </Reveal>
        </div>
      </section>

      <ProjectNav slug="morse-code-vault" />
    </article>
  );
}
