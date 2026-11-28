import type { Metadata } from 'next';
import { Reveal, Stagger, StaggerItem } from '@/components/Motion';
import ProjectNav from '@/components/ProjectNav';
import { getProject } from '@/components/projects';

const p = getProject('llm-conformity');

export const metadata: Metadata = {
  title: 'When the Majority Is Wrong — Conformity and Authority Bias in Multi-Agent LLMs | Deepthika S',
  description:
    'An Asch-inspired multi-agent experiment: 45 scripted confederate agents unanimously back a wrong answer. Across 450 subject-agent responses, gpt-4o-mini conformed, gpt-5.6 resisted, and gpt-4.1-mini resisted peers but conformed to “Senior Principal Engineers”.',
  openGraph: {
    title: 'When the Majority Is Wrong: Would AI Still Follow the Crowd?',
    description:
      'Conformity and authority bias in multi-agent LLM systems — three models, two framings, 450 responses.',
    images: ['/images/llm-conformity-rate-matrix.png'],
  },
};

const tiers = [
  {
    n: '1',
    k: 'Leader agent',
    h: 'Presents the incident',
    b: 'Sets out the scenario and the candidate answers, and moderates. It never casts a vote.',
  },
  {
    n: '45',
    k: 'Confederate agents',
    h: 'A scripted, unanimous majority',
    b: 'Each gives a predetermined vote with a confident justification — generated without any model call — so the majority is identical across every condition.',
  },
  {
    n: '5',
    k: 'Subject agents',
    h: 'The measured participants',
    b: 'A mid-level software engineer, a graduate student, a senior product designer, a business analyst and a junior researcher. They vote in sequence and see every vote cast before theirs.',
  },
];

const trials = [
  {
    n: 'Trial 1',
    k: 'Correct C · majority votes B',
    h: 'Incorrect majority',
    b: 'The initial conformity test.',
  },
  {
    n: 'Trial 2',
    k: 'Correct C · majority votes C',
    h: 'Correct-majority control',
    b: 'Establishes baseline accuracy, separating conformity from simply failing the task.',
  },
  {
    n: 'Trial 3',
    k: 'Correct C · majority votes A',
    h: 'Incorrect majority, again',
    b: 'Targets a distractor carried over from Trial 1’s options, testing whether conformity persists after the control.',
  },
];

export default function LlmConformityPage() {
  return (
    <article>
      {/* ---------- Hero ---------- */}
      <section className="paper-hero grain">
        <div className="glow" aria-hidden="true" />
        <span className="ghost" aria-hidden="true">
          {p.index}
        </span>
        <div className="hero-grid">
          <Reveal as="figure" className="card room-card" delay={0.15}>
            <div className="rc-tier">
              <p>1 leader — does not vote</p>
              <div className="rc-dots">
                <i className="leader" />
              </div>
            </div>
            <div className="rc-tier">
              <p>45 confederates — unanimous, confident, wrong</p>
              <div className="rc-dots">
                {Array.from({ length: 45 }, (_, i) => (
                  <i key={i} className="conf" />
                ))}
              </div>
            </div>
            <div className="rc-tier">
              <p>5 subject agents — the ones being measured</p>
              <div className="rc-dots">
                {Array.from({ length: 5 }, (_, i) => (
                  <i key={i} className="subj" />
                ))}
              </div>
            </div>
            <figcaption>
              The room every subject agent votes in. Each sees all 45 confederate votes before
              casting its own.
            </figcaption>
          </Reveal>
          <div className="copy">
            <Reveal delay={0.3}>
              <p className="kicker">Research · Multi-Agent LLM Systems</p>
              <h1>
                When the Majority Is Wrong.
                <span className="small">Would AI still follow the crowd?</span>
              </h1>
            </Reveal>
            <Reveal delay={0.45}>
              <p className="desc">
                Language models increasingly work as agents alongside other agents, where a decision
                can be swayed by the group. This Asch-inspired experiment places a subject agent in
                front of 45 agents who all confidently pick the wrong answer — and varies whether
                that majority is introduced as peers or as senior authority. Across 450 responses,
                three models behaved in three different ways.
              </p>
            </Reveal>
            <Reveal delay={0.6}>
              <div className="tags">
                <span>Multi-Agent Systems</span>
                <span>Conformity</span>
                <span>Authority Bias</span>
                <span>Social Influence</span>
                <span>LLM Evaluation</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- The Asch question ---------- */}
      <section className="paper-narrative">
        <div className="wrap">
          <Reveal>
            <h2 className="section-title">The Asch Question, Asked of Machines</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="intro">
              In Solomon Asch’s classic conformity experiments, a participant sat in a group whose
              other members deliberately gave the wrong answer. The question was whether the
              participant would follow the majority against what they could plainly see.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="intro">
              Earlier work had mostly asked whether <strong>people</strong> conform to robots and
              virtual agents. This study asks whether <strong>LLM agents themselves</strong>{' '}
              conform when the group around them is made of other LLM agents — and whether it
              matters who that group is said to be.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="dark-section quote-band grain">
        <div className="glow" aria-hidden="true" />
        <div className="wrap">
          <Reveal as="p">
            If every other agent confidently gives the wrong answer, does the subject agent{' '}
            <span className="accent">still trust its own?</span>
          </Reveal>
        </div>
      </section>

      {/* ---------- Setup ---------- */}
      <section className="pipeline" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">Experimental setup</p>
            <h2 className="section-title">A Software War Room</h2>
            <p className="lead">
              Agents are shown a production deployment log and asked to vote on the root cause of a
              cascade failure. The design is fully factorial: <strong>three subject-agent models</strong>{' '}
              — gpt-4o-mini, gpt-4.1-mini and gpt-5.6, spanning roughly two years of OpenAI model
              development — crossed with <strong>two authority framings</strong>, giving six
              conditions.
            </p>
          </Reveal>
          <Stagger className="sequence">
            {tiers.map((t) => (
              <StaggerItem key={t.k}>
                <div className="s-n">{t.n}</div>
                <div className="s-k">{t.k}</div>
                <h4>{t.h}</h4>
                <p>{t.b}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <Reveal className="fig-card" y={0}>
            <img
              src="/images/llm-conformity-experiment-workflow.jpg"
              alt="Experimental workflow in five panels: experimental setup with three language models and two framing conditions; agent configuration with 1 leader, 45 confederates and 5 subject agents; sequential voting from leader to confederates to subjects in positions 1 to 5; a three-trial procedure of incorrect majority, correct majority and incorrect majority; and data recording of each response as a JSON record. 3 models × 2 conditions × 5 runs × 5 subject agents × 3 trials = 450 subject responses."
            />
            <figcaption>
              The experimental workflow. 3 models × 2 framings × 5 runs × 5 subject agents × 3
              trials = 450 subject-agent responses, each stored as a JSON record.
            </figcaption>
          </Reveal>
        </div>
      </section>

      {/* ---------- Trials + framing ---------- */}
      <section className="finding" style={{ borderTop: 'none' }}>
        <div className="wrap">
          <Reveal>
            <p className="tag">Trial structure</p>
            <h2 className="section-title">Pressure, Control, Pressure</h2>
            <p className="lead">
              Every run has three sequential trials in a fixed order. The correct answer is always
              C; only the majority moves.
            </p>
          </Reveal>
          <Stagger className="sequence">
            {trials.map((t) => (
              <StaggerItem key={t.n}>
                <div className="s-n">{t.n}</div>
                <div className="s-k">{t.k}</div>
                <h4>{t.h}</h4>
                <p>{t.b}</p>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal>
            <h3 className="sub-title">Peer or authority — two words apart</h3>
            <p className="lead">
              The framing manipulation changes exactly two elements and nothing else: the
              confederates’ role label in the visible transcript, and one line in the subject
              agent’s system prompt saying who it works alongside. The prompt never tells an agent
              to agree with, defer to or resist the majority.
            </p>
          </Reveal>
          <Stagger className="compare">
            <StaggerItem className="cmp">
              <p className="cmp-k">Peer framing</p>
              <p className="cmp-v">“Peer Engineers”</p>
              <p className="cmp-d">No seniority implied.</p>
            </StaggerItem>
            <StaggerItem className="cmp auth">
              <p className="cmp-k">Authority framing</p>
              <p className="cmp-v">“Senior Principal Engineers”</p>
              <p className="cmp-d">Same votes, same justifications, higher rank.</p>
            </StaggerItem>
          </Stagger>

          <Stagger className="stat-row">
            <StaggerItem className="stat">
              <div className="v">450</div>
              <div className="k">subject-agent responses in total</div>
            </StaggerItem>
            <StaggerItem className="stat">
              <div className="v">300</div>
              <div className="k">under an incorrect majority (Trials 1 and 3)</div>
            </StaggerItem>
            <StaggerItem className="stat">
              <div className="v">150</div>
              <div className="k">correct-majority control responses (Trial 2)</div>
            </StaggerItem>
            <StaggerItem className="stat">
              <div className="v">6</div>
              <div className="k">conditions, 5 independent runs each</div>
            </StaggerItem>
          </Stagger>
          <p className="figure-note">
            gpt-4o-mini and gpt-4.1-mini ran at temperature 1.0; gpt-5.6 ran with reasoning effort
            fixed at none, so all three answered directly without extended reasoning.
          </p>
        </div>
      </section>

      {/* ---------- Results ---------- */}
      <section className="dark-section dark-fig grain">
        <div className="glow" aria-hidden="true" />
        <div className="wrap">
          <div className="split narrow-fig" style={{ margin: 0 }}>
            <Reveal className="copy-block">
              <p className="finding-tag">Result · Conformity to an incorrect majority</p>
              <h2 className="section-title">Three Models, Three Behaviours</h2>
              <p>
                <strong>gpt-4o-mini</strong> conformed on every incorrect-majority trial, under
                both framings. <strong>gpt-5.6</strong> never conformed, consistently choosing the
                answer the log supported even against 45 unanimous confederates.
              </p>
              <p>
                <strong>gpt-4.1-mini</strong> resisted completely when the majority were peers —
                and conformed on every trial when the same majority was relabelled as senior
                engineers. Within each condition, all 50 responses moved the same way.
              </p>
            </Reveal>
            <Reveal className="fig-card" y={0}>
              <img
                src="/images/llm-conformity-rate-matrix.png"
                alt="Conformity rate matrix, n = 50 per cell. gpt-4o-mini: 100% with peer confederates, 100% with authority confederates. gpt-4.1-mini: 0% peer, 100% authority. gpt-5.6: 0% peer, 0% authority."
              />
              <figcaption>
                Conformity rate by model and authority framing (n = 50 per cell).
              </figcaption>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="finding">
        <div className="wrap">
          <Stagger className="verdicts">
            <StaggerItem className="vd conform">
              <p className="model">gpt-4o-mini</p>
              <div className="cells">
                <div>
                  <b>100%</b>peer
                </div>
                <div>
                  <b>100%</b>authority
                </div>
              </div>
              <p>Followed the wrong majority regardless of who it was said to be.</p>
            </StaggerItem>
            <StaggerItem className="vd split-v">
              <p className="model">gpt-4.1-mini</p>
              <div className="cells">
                <div>
                  <b>0%</b>peer
                </div>
                <div>
                  <b>100%</b>authority
                </div>
              </div>
              <p>Its behaviour flipped with the framing alone — the clearest authority effect.</p>
            </StaggerItem>
            <StaggerItem className="vd resist">
              <p className="model">gpt-5.6</p>
              <div className="cells">
                <div>
                  <b>0%</b>peer
                </div>
                <div>
                  <b>0%</b>authority
                </div>
              </div>
              <p>Held to the evidence in the log under both framings.</p>
            </StaggerItem>
          </Stagger>
          <p className="figure-note">Conformity rate on incorrect-majority trials, n = 50 per condition.</p>

          <Reveal>
            <h3 className="sub-title">Capable alone, wrong in a crowd</h3>
            <p className="lead">
              Every model reached <strong>100% accuracy in the control trials</strong>, so the task
              was well within reach. Under the incorrect majority, gpt-4o-mini dropped to 0% in both
              framings and gpt-4.1-mini dropped from 100% (peer) to 0% (authority); only gpt-5.6
              held at 100%. And conformity rates were identical between Trial 1 and Trial 3 in all
              six conditions — the behaviour followed the group’s vote, not familiarity with a
              particular set of options.
            </p>
          </Reveal>
          <div className="two-fig">
            <Reveal className="fig-card" y={0}>
              <img
                src="/images/llm-conformity-accuracy-control.png"
                alt="Bar chart of accuracy in control versus incorrect-majority trials. All models score 100% in control trials. Under an incorrect majority: gpt-4o-mini 0% peer and authority, gpt-4.1-mini 100% peer and 0% authority, gpt-5.6 100% for both."
              />
              <figcaption>
                Accuracy in correct-majority (control) versus incorrect-majority trials.
              </figcaption>
            </Reveal>
            <Reveal className="fig-card" y={0}>
              <img
                src="/images/llm-conformity-trial-persistence.png"
                alt="Bar chart of conformity in Trial 1 versus Trial 3: identical in every condition — 100% for gpt-4o-mini in both framings, 0% versus 100% for gpt-4.1-mini by framing, and 0% for gpt-5.6."
              />
              <figcaption>
                Conformity in Trial 1 versus Trial 3 (new distractors, same correct answer); n = 25
                per bar.
              </figcaption>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Group-reference language ---------- */}
      <section className="finding">
        <div className="wrap">
          <Reveal>
            <p className="tag">What changes across models</p>
            <h2 className="section-title">The Group Became the Reason</h2>
            <p className="lead">
              Conforming agents were not drifting passively toward the wrong answer — they treated
              the group’s agreement as a reason. gpt-4o-mini cited the confederate group directly in
              44 of 50 justifications under both framings. For gpt-4.1-mini, citations rose from{' '}
              <strong>8/50 with peers to 47/50 with authority</strong>, mirroring its conformity
              shift. gpt-5.6 cited the group <strong>0 times</strong> in either framing. All 46 uses
              of the word “senior” came from the authority conditions.
            </p>
          </Reveal>
          <div className="two-fig">
            <Reveal className="fig-card" y={0}>
              <img
                src="/images/llm-conformity-group-citation.png"
                alt="Bar chart of justifications citing the confederate group, n = 50 per condition: gpt-4o-mini 44 peer and 44 authority; gpt-4.1-mini 8 peer and 47 authority; gpt-5.6 0 and 0."
              />
              <figcaption>
                Justifications citing the confederate group as a reason for the vote.
              </figcaption>
            </Reveal>
            <Reveal className="fig-card" y={0}>
              <img
                src="/images/llm-conformity-group-keywords.png"
                alt="Horizontal stacked bar chart of group-reference keywords across 300 incorrect-majority justifications: consensus 68, engineer 64, unanimous 50, agree 48, senior 46, then experienced, vote, peer, team, expert, everyone and majority."
              />
              <figcaption>
                Group-reference keywords across 300 incorrect-majority justifications, by model and
                framing.
              </figcaption>
            </Reveal>
          </div>
          <div className="split" style={{ marginBottom: 0 }}>
            <Reveal className="fig-card" y={0}>
              <img
                src="/images/llm-conformity-justification-length.png"
                alt="Mean justification length in incorrect-majority trials: 25.1 and 26.8 words for gpt-4o-mini, 49.1 words for gpt-4.1-mini under peer framing with a wide spread, 27.2 under authority, and 26.4 and 26.3 for gpt-5.6."
              />
              <figcaption>Mean justification length (words) in incorrect-majority trials.</figcaption>
            </Reveal>
            <Reveal className="copy-block" delay={0.1}>
              <h3>One condition argued back</h3>
              <p>
                Five of six conditions wrote justifications of about 25–27 words. The exception was
                gpt-4.1-mini under peer framing, which resisted and averaged{' '}
                <strong>49.1 words</strong> — the one condition where the agent actively argued
                against the visible group position. It is not a rule that resistance needs more
                words: gpt-5.6 resisted throughout with ordinary-length answers.
              </p>
            </Reveal>
          </div>
          <Reveal>
            <p className="pull">
              A justification citing consensus can look like careful, well-evidenced reasoning{' '}
              <span className="soft">while adding no independent information.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- Statement ---------- */}
      <section className="dark-section statement-band grain">
        <div className="glow" aria-hidden="true" />
        <div className="wrap">
          <Reveal as="h2">
            The Finding<span className="accent">.</span>
          </Reveal>
          <Reveal as="p" delay={0.15}>
            Within this setup, conformity in language models is{' '}
            <span className="accent">not a fixed or universal behaviour</span>. It varies across
            models, and it can depend on something as small as{' '}
            <span className="accent">how the majority is introduced</span>.
          </Reveal>
        </div>
      </section>

      {/* ---------- Implications ---------- */}
      <section className="commitments grain">
        <div className="wrap">
          <Reveal>
            <h2>Implications for Multi-Agent Systems</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead">
              The reliability of a group decision may depend not only on a model’s reasoning, but on
              its <span className="accent">susceptibility to confident, incorrect consensus</span>.
            </p>
          </Reveal>
          <Stagger className="commit-grid">
            <StaggerItem>
              <div className="n">01</div>
              <h4>Test before trusting the vote</h4>
              <p>
                Susceptibility to a wrong majority is worth testing before relying on multi-agent
                systems for judgement calls where a wrong majority could go unchallenged.
              </p>
            </StaggerItem>
            <StaggerItem>
              <div className="n">02</div>
              <h4>Roles are not neutral</h4>
              <p>
                The number of agents and their stated roles may shape the outcome. A rank label
                alone was enough to flip one model.
              </p>
            </StaggerItem>
            <StaggerItem>
              <div className="n">03</div>
              <h4>Read the justification</h4>
              <p>
                An agent that never references the group never followed it into an error here.
                Consensus-citing reasoning deserves scrutiny, not reassurance.
              </p>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* ---------- Limitations ---------- */}
      <section className="open">
        <div className="wrap">
          <Reveal>
            <h2 className="section-title">Limitations and Future Work</h2>
          </Reveal>
          <Stagger className="open-grid">
            <StaggerItem className="iter-panel grain">
              <h4>One domain, three trials</h4>
              <p>
                A single technical decision-making context isolates majority influence but limits
                generalisation. The same trial structure could be applied to other judgement tasks.
              </p>
            </StaggerItem>
            <StaggerItem className="iter-panel grain">
              <h4>Models differ in many ways</h4>
              <p>
                Scale, training data and capability all differ, so the patterns cannot be attributed
                to one factor. Checkpoints from one family and other providers could separate them.
              </p>
            </StaggerItem>
            <StaggerItem className="iter-panel grain">
              <h4>Two points on a spectrum</h4>
              <p>
                Peer and Senior Principal Engineer are two framings among many. Intermediate ones
                could separate seniority, expertise and institutional standing.
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
            An agent can be fully capable on its own
            <br />
            and still be <span className="accent">wrong in a confident crowd.</span>
          </Reveal>
        </div>
      </section>

      <ProjectNav slug="llm-conformity" />
    </article>
  );
}
