import type { Metadata } from 'next';
import { Reveal, Stagger, StaggerItem } from '@/components/Motion';
import ProjectNav from '@/components/ProjectNav';
import { getProject } from '@/components/projects';

const p = getProject('calculator-fallacy');

export const metadata: Metadata = {
  title: 'The Calculator Fallacy — Learners Blindly Trust Confident AI | Deepthika S',
  description:
    'A within-subjects study of 32 learners and five assistants built on one language model, secretly briefed with 0–100% falsified facts. Quiz scores fell from 7.4 to 2.9 out of 10, yet acceptance of each stated falsehood stayed near 65% and rated accuracy barely moved.',
  openGraph: {
    title: 'The Calculator Fallacy — Learners Blindly Trust Confident AI, Even When It Is Wrong',
    description:
      'Scores collapsed as an AI assistant got worse; trust did not. A study of trust calibration in conversational learning.',
    images: ['/images/calculator-fallacy-scores-absorption.jpg'],
  },
};

const levels = [
  { name: 'Assistant · 0%', pct: '0%', f: 0, score: '7.4' },
  { name: 'Assistant · 25%', pct: '25%', f: 3, score: '6.7' },
  { name: 'Assistant · 50%', pct: '50%', f: 6, score: '5.7' },
  { name: 'Assistant · 75%', pct: '75%', f: 9, score: '4.1' },
  { name: 'Assistant · 100%', pct: '100%', f: 12, score: '2.9' },
];

const table = [
  ['0%', '21', '7.4 (3.0)', '—', '13%', '8.9', '6.8', '0.70', '5.1', '4.6', '1.6'],
  ['25%', '19', '6.7 (2.1)', '51%', '12%', '8.6', '7.5', '0.62', '4.8', '4.9', '1.5'],
  ['50%', '20', '5.7 (2.1)', '55%', '8%', '8.6', '7.8', '0.61', '5.2', '4.6', '1.7'],
  ['75%', '22', '4.1 (2.2)', '61%', '5%', '8.6', '8.6', '0.52', '4.9', '4.8', '2.6'],
  ['100%', '22', '2.9 (2.9)', '62%', '—', '8.1', '7.9', '0.53', '4.5', '4.9', '2.4'],
];

export default function CalculatorFallacyPage() {
  return (
    <article>
      {/* ---------- Hero ---------- */}
      <section className="paper-hero grain">
        <div className="glow" aria-hidden="true" />
        <span className="ghost" aria-hidden="true">
          {p.index}
        </span>
        <div className="hero-grid">
          <Reveal as="figure" className="card type-card" delay={0.15}>
            <div className="tc-row">
              <p className="tc-k">Quiz score, out of 10</p>
              <div className="tc-vals">
                <span>
                  <b>7.4</b>accurate assistant
                </span>
                <span className="tc-arrow" aria-hidden="true">
                  →
                </span>
                <span>
                  <b className="drop">2.9</b>every fact false
                </span>
              </div>
            </div>
            <div className="tc-row">
              <p className="tc-k">“The information was accurate”, out of 7</p>
              <div className="tc-vals">
                <span>
                  <b>5.1</b>accurate assistant
                </span>
                <span className="tc-arrow" aria-hidden="true">
                  →
                </span>
                <span>
                  <b>4.5</b>every fact false
                </span>
              </div>
            </div>
            <figcaption>
              One language model, five briefs. Learning collapsed as the assistant got worse; rated
              accuracy barely moved. (Means from 104 quizzes.)
            </figcaption>
          </Reveal>
          <div className="copy">
            <Reveal delay={0.3}>
              <p className="kicker">Research · Human–AI Trust</p>
              <h1>
                The Calculator Fallacy.
                <span className="small">Learners blindly trust confident AI, even when it is wrong</span>
              </h1>
            </Reveal>
            <Reveal delay={0.45}>
              <p className="desc">
                We trust a calculator because we can check it. Conversational AI invites the same
                trust without offering the same check. In a controlled experiment, learners studied
                science topics with five assistants built on the same language model — each secretly
                briefed with between 0% and 100% falsified facts, and always speaking with full
                confidence. The question was simple: does trust follow reliability?
              </p>
            </Reveal>
            <Reveal delay={0.6}>
              <div className="tags">
                <span>Trust Calibration</span>
                <span>Conversational AI</span>
                <span>Misinformation</span>
                <span>Automation Bias</span>
                <span>Information Design</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- The calculator analogy ---------- */}
      <section className="paper-narrative">
        <div className="wrap">
          <Reveal>
            <h2 className="section-title">2 + 2 = 4</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="intro">
              We expect a calculator to return 4 for 2 + 2, an ATM to dispense the right amount and
              a lift to stop at the chosen floor. Trust in such systems is earned: the function is
              defined, the output is verifiable, and <strong>reliability is observable</strong>{' '}
              across repeated use.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="intro">
              Conversational AI breaks that arrangement. It can be wrong while sounding coherent and
              certain, and learners usually ask about a topic precisely because they do not know the
              answer. With a calculator the user checks whether a function was performed. With an AI
              assistant, the user must judge whether <strong>the information itself</strong> is
              accurate enough to rely on.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="dark-section statement-band grain">
        <div className="glow" aria-hidden="true" />
        <div className="wrap">
          <Reveal as="h2">
            The Question<span className="accent">.</span>
          </Reveal>
          <Reveal as="p" delay={0.15}>
            How does the <span className="accent">accuracy</span> of a conversational AI assistant
            shape the <span className="accent">trust</span> learners place in it — and does that
            trust respond when the assistant confidently tells them things that are false?
          </Reveal>
        </div>
      </section>

      {/* ---------- Setup ---------- */}
      <section className="pipeline" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">Experimental setup</p>
            <h2 className="section-title">Five Assistants, One Model</h2>
            <p className="lead">
              Every assistant was the same model — <strong>GPT-5-mini</strong> — inside a
              purpose-built web app. Only the briefing differed. Each topic had twelve facts, each
              written as a verified true statement and a plausible false twin. The assistant was
              told to treat its briefing as absolute ground truth, to explain conversationally, and
              never to hedge, contradict the briefing or suggest checking elsewhere.
            </p>
          </Reveal>

          <Stagger className="levels">
            {levels.map((l) => (
              <StaggerItem key={l.pct} className="lv">
                <p className="name">Briefing falsified</p>
                <p className="pct">{l.pct}</p>
                <div className="facts" aria-label={`${l.f} of 12 facts false`}>
                  {Array.from({ length: 12 }, (_, i) => (
                    <i key={i} className={i < l.f ? 'f' : ''} />
                  ))}
                </div>
                <p className="sub">
                  {l.f} of 12 facts served false
                </p>
                <p className="score">
                  <b>{l.score}</b>mean quiz score / 10
                </p>
              </StaggerItem>
            ))}
          </Stagger>
          <p className="figure-note">
            Levels were assigned by a 5 × 5 Latin square; the falsified subset was drawn at random
            for each task. Scores are the means reported in the paper.
          </p>

          <Reveal className="fig-card" y={0}>
            <img
              src="/images/calculator-fallacy-study-procedure.jpg"
              alt="Study procedure. Consent with no mention of errors or a quiz; background survey; then, repeated for five topics with assistants A to E in Latin-square order: topic intro, learning chat with GPT-5-mini briefed with 12 facts, a surprise quiz of 10 multiple-choice questions with confidence ratings, and trust ratings. Free returns to the chat during the quiz were logged. Final ranking of most and least trusted assistant, then a mandatory debrief."
            />
            <figcaption>
              Study procedure. Each participant completed up to five learning tasks, each with a
              different assistant whose hidden falsification level was set by Latin square. The quiz
              could be interleaved freely with further chat, and every switch was logged.
            </figcaption>
          </Reveal>

          <div className="split" style={{ marginTop: 20 }}>
            <Reveal className="copy-block">
              <h3>A surprise quiz with a planted option</h3>
              <p>
                When a participant clicked “I’ve finished learning”, a ten-item quiz appeared. Every
                item offered the <strong>correct fact</strong>, the{' '}
                <strong>exact planted falsehood</strong> and two plausible distractors, with a
                confidence rating from 1 (“just guessing”) to 10 (“completely sure”).
              </p>
              <p>
                Choosing the planted option after being taught it falsely is a direct signature of
                absorbed misinformation; choosing it after being taught correctly gives the baseline.
              </p>
            </Reveal>
            <Reveal className="copy-block" delay={0.1}>
              <h3>Topics nobody already knew</h3>
              <p>
                How an ECG measures the heartbeat, how carbon-14 dating works, how GPS finds a
                location, how fireflies produce light and how noise-cancelling headphones work.
                Prior familiarity was low (2.1 on a 1–5 scale).
              </p>
              <p>
                A mandatory debrief afterwards revealed the design and corrected every false claim
                each participant had been exposed to.
              </p>
            </Reveal>
          </div>

          <Stagger className="stat-row">
            <StaggerItem className="stat">
              <div className="v">32</div>
              <div className="k">adult participants, 84% daily AI chat users</div>
            </StaggerItem>
            <StaggerItem className="stat">
              <div className="v">104</div>
              <div className="k">completed quizzes</div>
            </StaggerItem>
            <StaggerItem className="stat">
              <div className="v">1,040</div>
              <div className="k">answers reaching at least one quiz</div>
            </StaggerItem>
            <StaggerItem className="stat">
              <div className="v">5</div>
              <div className="k">assistants, from 0% to 100% falsified</div>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* ---------- RQ1 ---------- */}
      <section className="band">
        <div className="wrap">
          <Reveal className="band-head">
            <p className="tag">Finding 01 · Misinformation absorption</p>
            <h2 className="section-title">Scores Fell. Acceptance Did Not.</h2>
            <p>
              Quiz scores fell steadily, from <strong>7.4</strong> to <strong>2.9</strong> out of
              10 — about 1.2 points for every 25-point step in falsification. The planted falsehood
              was chosen on 60% of falsified items against 11% of correctly taught ones.
            </p>
          </Reveal>
          <Reveal className="fig-card" y={0}>
            <img
              src="/images/calculator-fallacy-scores-absorption.jpg"
              alt="Three panels. (a) Mean quiz score falls from 7.4 at 0% falsified to 6.7, 5.7, 4.1 and 2.9 at 100%. (b) The planted falsehood is chosen 51 to 62% of the time when falsified in the chat, versus 5 to 13% when taught correctly. (c) Acceptance per stated falsehood is flat at 64, 64, 65 and 67%, against 22% for falsified facts never mentioned and 11% for correctly taught facts."
            />
            <figcaption>
              (a) Mean quiz score with 95% bootstrap intervals. (b) Share choosing the planted
              falsehood when it was falsified in the chat versus taught correctly. (c) Acceptance of
              falsehoods the assistant actually stated.
            </figcaption>
          </Reveal>
        </div>
      </section>

      <section className="finding">
        <div className="wrap">
          <div className="split narrow-fig" style={{ margin: 0 }}>
            <Reveal className="copy-block">
              <h3>Separating hearing from believing</h3>
              <p>
                Coding every transcript showed the assistant voiced 89% of the falsified facts that
                were later quizzed. When it had stated only the false version, participants adopted
                it <strong>65% of the time</strong>. When a falsified fact never came up, they chose
                it only 22% of the time.
              </p>
              <p>
                Most strikingly, acceptance per stated falsehood was flat across levels: 64%, 64%,
                65% and 67%. A learner facing an assistant wrong about everything accepted each
                false claim as readily as one facing an assistant wrong about a quarter of things.
              </p>
            </Reveal>
            <Reveal>
              <p className="pull" style={{ margin: 0 }}>
                There was no threshold at which{' '}
                <span className="soft">vigilance switched on.</span>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- RQ2 ---------- */}
      <section className="finding">
        <div className="wrap">
          <Reveal>
            <p className="tag">Finding 02 · Confidence vs. correctness</p>
            <h2 className="section-title">It Felt Like Knowledge</h2>
          </Reveal>
            <Reveal className="split copy-pair" y={20}>
              <div className="copy-block">
              <h3>Confidence stopped telling right from wrong</h3>
              <p>
                Half of all answers (49.5%) were given at the maximum confidence of 10 — and those
                answers were correct only 60% of the time.
              </p>
              </div>
              <div className="copy-block">
              <p>
                With an accurate assistant, confidence still discriminated: 8.9 for correct answers
                against 6.8 for wrong ones. As falsification rose, confidence in wrong answers climbed
                to meet it. Discrimination fell from an AUROC of <strong>0.70</strong> to{' '}
                <strong>0.52</strong> at 75%, indistinguishable from chance, and expected
                calibration error quadrupled from 0.13 to 0.52.
              </p>
              <p>
                Participants were more confident in the falsehoods they absorbed (8.4) than in the
                correct answers they gave on falsified items (7.9).
              </p>
              </div>
            </Reveal>
            <Reveal className="fig-card" y={0}>
              <img
                src="/images/calculator-fallacy-confidence.png"
                alt="Two panels. (a) Mean confidence when right stays near 8.6 to 8.9 while confidence when wrong climbs from 6.8 at 0% to 8.6 at 75%. (b) AUROC of confidence for correctness falls from 0.70 to 0.62, 0.61, 0.52 and 0.53, reaching chance."
              />
              <figcaption>
                (a) Stated confidence for correct and wrong answers. (b) How well confidence
                discriminates right from wrong (AUROC; 0.5 is chance).
              </figcaption>
            </Reveal>
        </div>
      </section>

      {/* ---------- RQ3 ---------- */}
      <section className="dark-section dark-fig grain">
        <div className="glow" aria-hidden="true" />
        <div className="wrap">
          <Reveal>
            <p className="finding-tag">Finding 03 · Trust vs. actual reliability</p>
            <h2 className="section-title">Reported Trust Stayed Put</h2>
            <p className="lead">
              Ratings hovered around 5 on a seven-point scale at every level. Rated accuracy fell
              only from 5.1 to 4.5 (not significant), willingness to rely on the assistant again did
              not change, and rated accuracy was unrelated to the participant’s own quiz score for
              that assistant. Indexed to the accurate condition, the fully falsified assistant
              delivered:
            </p>
          </Reveal>
          <Stagger className="ladder c3">
            <StaggerItem className="rung">
              <div className="v">
                39<small>%</small>
              </div>
              <div className="bar" style={{ width: '39%' }} />
              <div className="k">
                <strong>of the learning outcome</strong>
                quiz score relative to 0%
              </div>
            </StaggerItem>
            <StaggerItem className="rung">
              <div className="v">
                89<small>%</small>
              </div>
              <div className="bar" style={{ width: '89%' }} />
              <div className="k">
                <strong>of the rated accuracy</strong>
                “the information was accurate”
              </div>
            </StaggerItem>
            <StaggerItem className="rung">
              <div className="v">
                106<small>%</small>
              </div>
              <div className="bar" style={{ width: '100%' }} />
              <div className="k">
                <strong>of the willingness to rely</strong>
                “I would rely on it again”
              </div>
            </StaggerItem>
          </Stagger>
          <Reveal className="fig-card" y={0}>
            <img
              src="/images/calculator-fallacy-trust.png"
              alt="Two panels. (a) Indexed to 100 at 0% falsified, actual quiz score falls to 39 at 100%, while rated accuracy ends at 89 and willingness to rely again at 106. (b) Final most-trusted and least-trusted votes by falsification level of the chosen assistant, with the 25% and 100% assistants collecting the most most-trusted votes."
            />
            <figcaption>
              (a) Quiz score and the two trust ratings indexed to the 0% condition. (b) Final most-
              and least-trusted votes — no departure from a uniform spread across levels.
            </figcaption>
          </Reveal>
        </div>
      </section>

      {/* ---------- RQ4 ---------- */}
      <section className="finding">
        <div className="wrap">
          <Reveal>
            <p className="tag">Finding 04 · Checking behaviour</p>
            <h2 className="section-title">Checking by Asking Again</h2>
            <p className="lead">
              Participants returned to the chat more during the quiz when the assistant was worse —
              1.6 times on average at 0–50% falsification, 2.6 at 75% and 2.4 at 100%, a trend that
              did not reach significance. But the checking went to the same source.{' '}
              <strong>More returns went with more absorption, not less</strong> (ρ = 0.48).
            </p>
          </Reveal>
          <Reveal className="fig-card" y={0}>
            <img
              src="/images/calculator-fallacy-checking.png"
              alt="Three panels. (a) Mean returns to the chat during the quiz: 1.62, 1.53, 1.65, 2.64 and 2.41 by falsification level. (b) Scatter of returns against absorption rate for falsified tasks with an upward fit, Spearman rho 0.48. (c) The planted falsehood was chosen on 92% of falsified items pasted into the chat versus 78% of those not pasted."
            />
            <figcaption>
              (a) Returns to the chat during the quiz. (b) Returns versus absorption for falsified
              tasks. (c) Choice of the planted falsehood on items pasted into the chat versus not.
            </figcaption>
          </Reveal>
          <Stagger className="stat-row">
            <StaggerItem className="stat">
              <div className="v">107</div>
              <div className="k">of 358 user turns were quiz questions pasted into the chat</div>
            </StaggerItem>
            <StaggerItem className="stat">
              <div className="v">92%</div>
              <div className="k">planted falsehood chosen on pasted falsified items (78% unpasted)</div>
            </StaggerItem>
            <StaggerItem className="stat">
              <div className="v">7</div>
              <div className="k">challenges by participants themselves, in 327 turns</div>
            </StaggerItem>
            <StaggerItem className="stat">
              <div className="v">0</div>
              <div className="k">times the assistant conceded when challenged</div>
            </StaggerItem>
          </Stagger>
          <Reveal>
            <p className="lead">
              Participants delegated the check to the source being checked. Explicit doubt was rare,
              usually aimed at claims that really were false, and without an independent source it
              displaced belief but rarely recovered the truth.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- Human deference ---------- */}
      <section className="finding">
        <div className="wrap">
          <Reveal>
            <p className="tag">Sycophancy in reverse</p>
            <h2 className="section-title">The Deference Was Human</h2>
          </Reveal>
          <div className="split rev">
            <Reveal className="fig-card" y={0}>
              <img
                src="/images/calculator-fallacy-deference.png"
                alt="Scatter of Human Deference Index against confidence in absorbed falsehoods for participants with at least three quizzes, divided into confident resisters, confident deferrers, hesitant resisters and hesitant deferrers; most points fall in the confident deferrers quadrant."
              />
              <figcaption>
                Human Deference Index (uptake of the planted option above its baseline) against
                confidence in absorbed falsehoods, for participants with at least three quizzes.
              </figcaption>
            </Reveal>
            <Reveal className="copy-block" delay={0.1}>
              <h3>The model did not flatter. People deferred.</h3>
              <p>
                Coding all 104 transcripts showed an assistant that was assertive in every task but
                almost never sycophantic: <strong>89% of tasks</strong> showed no praise,
                excitement, obsequiousness or uncritical agreement.
              </p>
              <p>
                The adaptation ran the other way. The Human Deference Index averaged{' '}
                <strong>0.47</strong>; 12 of 20 participants took up planted falsehoods at least 50
                points above baseline, and 10 of 19 were “confident deferrers”. Deference was not
                predicted by general trust in AI.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- All measures ---------- */}
      <section className="finding">
        <div className="wrap">
          <Reveal>
            <p className="tag">At a glance</p>
            <h2 className="section-title">Every Measure, by Level</h2>
          </Reveal>
          <Reveal className="table-wrap" y={0}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Falsified</th>
                  <th>Quizzes</th>
                  <th>Score (SD)</th>
                  <th>Planted · falsified</th>
                  <th>Planted · taught right</th>
                  <th>Conf. correct</th>
                  <th>Conf. wrong</th>
                  <th>AUROC</th>
                  <th>Rated accuracy</th>
                  <th>Rely again</th>
                  <th>Returns</th>
                </tr>
              </thead>
              <tbody>
                {table.map((r) => (
                  <tr key={r[0]}>
                    {r.map((c, i) => (
                      <td key={i}>{c}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
              <caption>
                Main measures by falsification level (104 quizzes), as reported in the paper.
                Confidence on 1–10; AUROC 0.5 = chance; ratings on 1–7; returns = mean returns to
                the chat during the quiz.
              </caption>
            </table>
          </Reveal>
        </div>
      </section>

      {/* ---------- Statement ---------- */}
      <section className="dark-section statement-band grain">
        <div className="glow" aria-hidden="true" />
        <div className="wrap">
          <Reveal as="h2">
            The Calculator Fallacy<span className="accent">.</span>
          </Reveal>
          <Reveal as="p" delay={0.15}>
            Extending to a fluent, <span className="accent">probabilistic</span> system the kind of
            trust that <span className="accent">deterministic</span> tools earn through
            verification. The learners could not see the assistant’s errors claim by claim, so
            trust fell back on the cues that were available — fluency, coherence and certainty —
            and those were identical at every level.
          </Reveal>
        </div>
      </section>

      {/* ---------- Design implications ---------- */}
      <section className="commitments grain">
        <div className="wrap">
          <Reveal>
            <h2>Designing for Warranted Distrust</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead">
              Trust cannot be calibrated where reliability <span className="accent">cannot be
              seen</span>. The design task is what the learner can see.
            </p>
          </Reveal>
          <Stagger className="commit-grid two">
            <StaggerItem>
              <div className="n">01</div>
              <h4>Make reliability legible per claim</h4>
              <p>
                Misinformation operated claim by claim, so provenance, confidence and contestability
                belong on individual statements — not in global reassurance about the system.
              </p>
            </StaggerItem>
            <StaggerItem>
              <div className="n">02</div>
              <h4>Route verification outward</h4>
              <p>
                An “ask again” affordance is a verification trap. Linked primary sources, a second
                model or a retrieval check can make independent verification the easy path.
              </p>
            </StaggerItem>
            <StaggerItem>
              <div className="n">03</div>
              <h4>Add friction where the stakes are epistemic</h4>
              <p>
                In learning the goal is understanding, not speed. Asking learners to commit before
                the assistant confirms gives doubt somewhere to go.
              </p>
            </StaggerItem>
            <StaggerItem>
              <div className="n">04</div>
              <h4>Evaluate trust behaviourally</h4>
              <p>
                Self-reported trust suggested mild, stable trust. Absorption, acceptance given
                exposure and confidence discrimination showed it was not calibrated at all.
              </p>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* ---------- Limitations ---------- */}
      <section className="open">
        <div className="wrap">
          <Reveal>
            <h2 className="section-title">Limitations</h2>
          </Reveal>
          <Stagger className="open-grid">
            <StaggerItem className="iter-panel grain">
              <h4>A small, specific sample</h4>
              <p>
                Young, highly educated and mostly daily AI users, recruited through university and
                personal networks — which may increase deference and limits generalisability.
              </p>
            </StaggerItem>
            <StaggerItem className="iter-panel grain">
              <h4>A deliberately extreme assistant</h4>
              <p>
                It never hedged or departed from its briefing; real systems err less
                systematically.
              </p>
            </StaggerItem>
            <StaggerItem className="iter-panel grain">
              <h4>No outside sources</h4>
              <p>
                Participants were asked to rely only on the assistant, so “checking by asking again”
                must be read in that light. Transcripts were coded by an LLM, and the Human
                Deference Index needs further validation.
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
            Asked “who or what do we really trust?”, the participants gave a sobering answer:
            <br />
            <span className="accent">whatever sounds sure.</span>
          </Reveal>
        </div>
      </section>

      <ProjectNav slug="calculator-fallacy" />
    </article>
  );
}
