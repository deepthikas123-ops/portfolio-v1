import type { Metadata } from 'next';
import { Reveal, Stagger, StaggerItem } from '@/components/Motion';
import ProjectNav from '@/components/ProjectNav';
import { getProject } from '@/components/projects';

const p = getProject('when-a-hundred-machines-agree-to-disagree');

export const metadata: Metadata = {
  title:
    'When a Hundred Machines Agree to Disagree — Synthetic Consensus in AI-Assisted Design Ideation | Deepthika S',
  description:
    'Five panels of 50 AI agents, one smartphone brief, 7,500 ideas. Agents of one model with one role converged on the same themes, often unanimously; ten designer personas more than doubled the variety, and agreement did not predict judged quality.',
  openGraph: {
    title: 'When a Hundred Machines Agree to Disagree',
    description:
      'Visualising synthetic consensus, conflict and compromise among agents in AI-assisted design ideation.',
    images: ['/images/hundred-machines-meaning-space.png'],
  },
};

const stages = [
  {
    n: '1',
    k: 'Define',
    h: 'Requirements and weights',
    b: 'A brief is split into weighted requirements, each met through attributes such as low weight or replaceable parts.',
  },
  {
    n: '2',
    k: 'Generate',
    h: 'Many agents, one requirement each',
    b: 'Ten designer agents per requirement each write ten one-sentence ideas, without seeing each other’s work.',
  },
  {
    n: '3',
    k: 'Group',
    h: 'Cluster by meaning',
    b: 'Every idea becomes a text embedding; ideas that say the same thing in different words fall into one theme.',
  },
  {
    n: '4',
    k: 'Measure',
    h: 'Consensus per theme',
    b: 'Consensus is the share of the ten agents who reached a theme. Agents are counted, not sentences, so repeating oneself cannot pass for agreement.',
  },
  {
    n: '5',
    k: 'Resolve',
    h: 'Conflicts and feasibility',
    b: 'The three best-supported themes per requirement are scored for conflict, cost and readiness, and one compatible product profile is chosen.',
  },
];

const panels = [
  ['Clone', 'gemini-3.8-flash', 'one generic role', 'model default'],
  ['High temperature', 'gemini-3.8-flash', 'one generic role', '1.8'],
  ['Model mix only', 'four models in rotation', 'one generic role', 'model default'],
  ['Personas only', 'gemini-3.8-flash', 'ten designer personas', 'model default'],
  ['Diverse', 'four models in rotation', 'ten designer personas', 'model default'],
];

const measures = [
  ['Clone', '22.7', '90.5', '10.0', '3.1', '8.3'],
  ['High temperature', '22.1', '91.2', '10.0', '3.4', '7.3'],
  ['Model mix only', '34.9', '78.5', '9.7', '0.9', '16.1'],
  ['Personas only', '53.9', '51.3', '6.7', '0.0', '34.5'],
  ['Diverse', '58.0', '46.7', '6.5', '0.0', '38.0'],
];

const lessons = [
  {
    n: '01',
    h: 'Report independence with agreement',
    b: '“8 of 10 agents” should say how many distinct models and roles those agents represent. Unanimity among agents of one model and one role is a warning sign, not strong support.',
  },
  {
    n: '02',
    h: 'Diversify roles before adding agents',
    b: 'Personas on one model added 31 clusters per 100 ideas, more than twice the 12 added by mixing four models. Turning up the temperature added nothing detectable.',
  },
  {
    n: '03',
    h: 'Keep the trade-off stage contestable',
    b: 'Conflict judgements could override consensus, and a second judge changed the profile in five of six cascades. Show which judgements drove a choice and offer the next-best combinations.',
  },
  {
    n: '04',
    h: 'Design the display for doubt',
    b: 'A semantic map where near-identical ideas stack on one spot, a cascade drawn idea by idea, and a conflict matrix each show where agreement came from, so viewers can question it.',
  },
];

export default function HundredMachinesPage() {
  return (
    <article>
      {/* ---------- Hero ---------- */}
      <section className="paper-hero grain">
        <div className="glow" aria-hidden="true" />
        <span className="ghost" aria-hidden="true">
          {p.index}
        </span>
        <div className="hero-grid">
          <Reveal as="figure" className="card" delay={0.15}>
            <img
              src="/images/hundred-machines-study-design.png"
              alt="Study design: five panels of 50 agents on one brief. Two factors, role (one generic role or ten personas) and model (one or four), give four panels: Clone, Model mix only, Personas only and Diverse. A fifth, High temperature, repeats the clone settings at temperature 1.8 as a control for randomness."
            />
            <figcaption>
              Five panels of 50 agents, one brief. Each panel: 5 requirements × 10 agents × 10 ideas
              = 500 ideas per run, three independent runs.
            </figcaption>
          </Reveal>
          <div className="copy">
            <Reveal delay={0.3}>
              <p className="kicker">Research · AI-Assisted Design Ideation</p>
              <h1>
                When a Hundred Machines Agree to Disagree.
                <span className="small">
                  Visualising synthetic consensus, conflict and compromise among agents
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.45}>
              <p className="desc">
                Design tools increasingly ask many AI agents for ideas and treat agreement among
                them as a sign of a strong idea. This study tests that assumption with the Semantic
                Consensus Cascade: five panels of 50 agents worked on the same smartphone brief
                three times each, producing 7,500 ideas.
              </p>
            </Reveal>
            <Reveal delay={0.6}>
              <div className="tags">
                <span>AI-Assisted Ideation</span>
                <span>Multi-Agent Systems</span>
                <span>Consensus</span>
                <span>Idea Diversity</span>
                <span>Design Decision Making</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- The assumption ---------- */}
      <section className="paper-narrative">
        <div className="wrap">
          <Reveal>
            <h2 className="section-title">Counting Votes Is Not Counting Evidence</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="intro">
              Newer ideation tools run many AI agents at once, each with its own role, and then
              summarise what they produced. The summary usually rests on counting:{' '}
              <strong>directions many agents propose are treated as strong, and directions
              proposed once as weak.</strong> Among people that habit is reasonable, because
              independent people who reach the same answer have each reached it by a separate
              route.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="intro">
              That reasoning depends on <strong>independence</strong>. Agents built on the same
              model share training data, defaults and habits of phrasing, and earlier studies report
              that LLM ideas resemble each other far more than people’s do. If many agents of one
              model agree, their agreement may say more about the model than about the idea.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="intro">
              There is a second reason to doubt raw agreement. A brief has several requirements,
              and the best idea for one can work against another. Agreement <strong>within</strong>{' '}
              a requirement says nothing about fit <strong>across</strong> requirements.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="dark-section quote-band grain">
        <div className="glow" aria-hidden="true" />
        <div className="wrap">
          <Reveal as="p">
            When a hundred agents of one model agree, have they found the same good idea —{' '}
            <span className="accent">or are they the same mind?</span>
          </Reveal>
        </div>
      </section>

      {/* ---------- The instrument ---------- */}
      <section className="pipeline" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">The instrument</p>
            <h2 className="section-title">The Semantic Consensus Cascade</h2>
            <p className="lead">
              A five-stage procedure that turns many machine-generated ideas into one product
              profile, used here as a probe. The running example is a smartphone with five weighted
              requirements: <strong>Portability 80, Usability 70, Modularity 60, Flexibility 50
              and Sustainability 20</strong>.
            </p>
          </Reveal>
          <Stagger className="sequence cols-5">
            {stages.map((s) => (
              <StaggerItem key={s.k}>
                <div className="s-n">{s.n}</div>
                <div className="s-k">{s.k}</div>
                <h4>{s.h}</h4>
                <p>{s.b}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <Reveal className="fig-card" y={0}>
            <img
              src="/images/hundred-machines-design-spaces.png"
              alt="Requirement-level and attribute-level design spaces. Left: five overlapping regions for Portability (80/100), Flexibility (50), Sustainability (20), Usability (70) and Modularity (60), with the ideal product region where they overlap, and importance-weight bars. Right: the attribute-level space for Portability, made of low weight, compact dimensions and thin profile."
            />
            <figcaption>
              Each requirement is a region of the design space; the ideal product lies where the
              regions overlap, and the weights say which regions matter most.
            </figcaption>
          </Reveal>
          <div className="split" style={{ marginBottom: 0 }}>
            <Reveal className="fig-card" y={0}>
              <img
                src="/images/hundred-machines-agent-architecture.png"
                alt="Multi-agent architecture for product ideation: one Portability requirement agent briefs ten designer agents, each proposing ten numbered ideas, for 100 candidate ideas, with four example ideas below: reduced weight, compact dimensions, alternative materials and component layout change."
              />
              <figcaption>
                Architecture for one requirement: a requirement agent briefs ten designer agents,
                each proposing ten ideas. Each idea is one sentence of at most 25 words.
              </figcaption>
            </Reveal>
            <Reveal className="fig-card" y={0} delay={0.1}>
              <img
                src="/images/hundred-machines-cascade-workflow.png"
                alt="End-to-end workflow: define requirements and attributes, multi-agent ideation, semantic clustering, semantic consensus, conflict resolution, constraint checking, ideal product profile, then two applications: engineering selection and product selection."
              />
              <figcaption>
                From requirements to the ideal profile and its two uses: selecting ideas for
                engineers, and scoring existing products for buyers.
              </figcaption>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Study ---------- */}
      <section className="finding" style={{ borderTop: 'none' }}>
        <div className="wrap">
          <Reveal>
            <p className="tag">Study design</p>
            <h2 className="section-title">Five Panels, One Brief</h2>
            <p className="lead">
              Every panel had 50 agents, ten per requirement, and was run three times. The panels
              differ only in where their variety could come from: the <strong>role</strong> each
              agent is given, the <strong>model</strong> behind it, or the sampling{' '}
              <strong>temperature</strong>.
            </p>
          </Reveal>
          <Reveal className="table-wrap" y={0}>
            <table className="data-table text-cols">
              <caption>
                The five panels. Each has 50 agents (10 per requirement) and was run three times.
                The four models were gemini-3.8-flash, gemini-3.5-flash, gemini-3.1-flash-lite and
                gemma-4-31b-it.
              </caption>
              <thead>
                <tr>
                  <th>Panel</th>
                  <th>Models</th>
                  <th>Role given to agents</th>
                  <th>Sampling temperature</th>
                </tr>
              </thead>
              <tbody>
                {panels.map((r) => (
                  <tr key={r[0]} className={r[0] === 'Clone' || r[0] === 'Diverse' ? 'hi' : undefined}>
                    {r.map((c, i) => (
                      <td key={i}>{c}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
          <Stagger className="stat-row">
            <StaggerItem className="stat">
              <div className="v">7,500</div>
              <div className="k">ideas generated across 15 runs</div>
            </StaggerItem>
            <StaggerItem className="stat">
              <div className="v">750</div>
              <div className="k">agent calls, all returning valid ideas</div>
            </StaggerItem>
            <StaggerItem className="stat">
              <div className="v">0.18</div>
              <div className="k">clustering distance, fixed before the panels were compared</div>
            </StaggerItem>
            <StaggerItem className="stat">
              <div className="v">4</div>
              <div className="k">research questions: echo, source of variety, trade-offs, quality</div>
            </StaggerItem>
          </Stagger>
          <p className="figure-note">
            Agreement and variety are measured per idea set, the 100 ideas of one requirement in one
            run; each panel gives 15 sets, reported with 95% bootstrap intervals.
          </p>
        </div>
      </section>

      {/* ---------- RQ1 ---------- */}
      <section className="dark-section dark-fig grain">
        <div className="glow" aria-hidden="true" />
        <div className="wrap">
          <div className="split narrow-fig" style={{ margin: 0 }}>
            <Reveal className="copy-block">
              <p className="finding-tag">RQ1 · Echo or agreement?</p>
              <h2 className="section-title">The Clones Wrote the Same List</h2>
              <p>
                In every one of its 15 idea sets, <strong>all ten clone agents reached the top
                theme</strong>, and 90.5% of their ideas had a near copy from another agent. Many
                clusters held exactly ten ideas from exactly ten agents: each clone had written
                nearly the same list.
              </p>
              <p>
                The diverse panel, given the same brief, produced{' '}
                <strong>58.0 clusters per 100 ideas against 22.7</strong>, only 46.7% near copies,
                and no unanimous theme in any set. The pattern held at every clustering threshold
                and with a second embedding model.
              </p>
            </Reveal>
            <Reveal className="fig-card" y={0}>
              <img
                src="/images/hundred-machines-meaning-space.png"
                alt="All 1,000 ideas of run 1 placed by meaning. Left, the clone panel: 23 distinct clusters per 100 ideas and 91% near copies, with ideas in tight stacks and several themes reached by all ten agents. Right, the diverse panel: 59 clusters per 100 ideas and 45% near copies, with ideas spread more evenly."
              />
              <figcaption>
                Run 1, every idea placed by meaning. Rings mark one most-agreed theme per
                requirement. Left: clone panel. Right: diverse panel.
              </figcaption>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="finding">
        <div className="wrap">
          <Stagger className="compare">
            <StaggerItem className="cmp">
              <p className="cmp-k">Clone panel · one model, one role</p>
              <p className="cmp-v">10 of 10 agents on the top theme</p>
              <p className="cmp-d">
                3.1 unanimous themes per set; in 7 of 15 sets more than three.
              </p>
            </StaggerItem>
            <StaggerItem className="cmp auth">
              <p className="cmp-k">Diverse panel · ten personas, four models</p>
              <p className="cmp-v">6.5 of 10 agents on the top theme</p>
              <p className="cmp-d">No theme in any set was unanimous.</p>
            </StaggerItem>
          </Stagger>

          <Reveal>
            <h3 className="sub-title">Even diverse agreement is not proof</h3>
            <p className="lead">
              The diverse panel’s most-agreed portability theme, high-density battery technology,
              was reached by eight of ten agents across personas and models. That agreement crosses
              roles and models, so it is more informative, but it is not proof of independence: the
              eight included all four models, and their shared interest in silicon-anode batteries
              may reflect a real industry trend or simply knowledge the models have in common.
            </p>
          </Reveal>
          <Reveal className="fig-card" y={0}>
            <img
              src="/images/hundred-machines-threshold-sensitivity.png"
              alt="Line chart of clusters per 100 ideas at five clustering thresholds from 0.12 to 0.24. In order from lowest to highest: Clone and Clone at temperature 1.8 together, Model mix only, Personas only, Diverse. The order is the same at every threshold; the threshold used, 0.18, is marked."
            />
            <figcaption>
              The ordering holds at every clustering threshold. Clone and high-temperature panels
              stay lowest throughout; the dotted line marks the threshold used.
            </figcaption>
          </Reveal>
        </div>
      </section>

      {/* ---------- RQ2 ---------- */}
      <section className="finding">
        <div className="wrap">
          <Reveal>
            <p className="tag">RQ2 · Where does variety come from?</p>
            <h2 className="section-title">Roles Did the Work, Temperature Did Nothing</h2>
            <p className="lead">
              Against the clone panel’s 22.7 clusters per 100 ideas, <strong>ten personas on one
              model added 31.3</strong>, while <strong>four models with one generic role added
              12.3</strong>. Raising the sampling temperature to 1.8 changed nothing detectable:
              22.1 clusters, 91.2% near copies, and all ten agents on the top theme in every set.
            </p>
          </Reveal>
          <Stagger className="stat-row">
            <StaggerItem className="stat">
              <div className="v">
                <span className="accent">+31.3</span>
              </div>
              <div className="k">clusters per 100 ideas from ten personas on one model (53.9)</div>
            </StaggerItem>
            <StaggerItem className="stat">
              <div className="v">+12.3</div>
              <div className="k">from four models with one generic role (34.9)</div>
            </StaggerItem>
            <StaggerItem className="stat">
              <div className="v">0.0</div>
              <div className="k">unanimous themes per set in both persona panels, against 3.1 for clones</div>
            </StaggerItem>
            <StaggerItem className="stat">
              <div className="v">22.1</div>
              <div className="k">clusters at temperature 1.8, against 22.7 for clones (p = 0.85)</div>
            </StaggerItem>
          </Stagger>
          <Reveal className="table-wrap" y={0}>
            <table className="data-table">
              <caption>
                Agreement and variety by panel: mean of 15 idea sets (3 runs × 5 requirements).
                Full 95% bootstrap intervals are in the paper.
              </caption>
              <thead>
                <tr>
                  <th>Panel</th>
                  <th>Clusters per 100 ideas</th>
                  <th>Near copies (%)</th>
                  <th>Agents on top theme (of 10)</th>
                  <th>Unanimous themes per set</th>
                  <th>One-off ideas per 100</th>
                </tr>
              </thead>
              <tbody>
                {measures.map((r) => (
                  <tr key={r[0]} className={r[0] === 'Clone' || r[0] === 'Diverse' ? 'hi' : undefined}>
                    {r.map((c, i) => (
                      <td key={i}>{c}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
          <Reveal className="fig-card" y={0}>
            <img
              src="/images/hundred-machines-agreement-variety.png"
              alt="Four dot-and-interval charts across the five panels: distinct clusters per 100 ideas, ideas with a near copy from another agent, agents on the top theme out of ten, and unanimous themes per idea set. Clone and high-temperature panels sit at the low-variety end of each; personas only and diverse sit at the high-variety end; model mix only lies between."
            />
            <figcaption>
              Large markers show panel means with 95% bootstrap intervals; small dots are the 15
              individual idea sets.
            </figcaption>
          </Reveal>
          <Reveal>
            <p className="lead">
              Models still added something once personas were present: the full diverse panel
              produced 4.1 more clusters than personas alone, not significant when idea sets were
              treated as independent but consistent within requirements. Only role differences
              broke the near-total agreement of the clone panel.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- RQ3 ---------- */}
      <section className="dark-section dark-fig grain">
        <div className="glow" aria-hidden="true" />
        <div className="wrap">
          <Reveal>
            <p className="finding-tag">RQ3 · Does consensus survive trade-offs?</p>
            <h2 className="section-title">Agree Within, Disagree Across</h2>
            <p className="lead">
              The most-agreed theme for each requirement is not automatically a good product. The
              cascade keeps the three best-supported themes per requirement, 15 candidates, and a
              judge model scores all <strong>90 cross-requirement pairs</strong> from strong
              conflict (−2) to strong synergy (+2), plus cost, manufacturing readiness and time to
              market. It then tries all 243 combinations and keeps the feasible one with the
              highest value.
            </p>
          </Reveal>
          <Reveal className="fig-card" y={0}>
            <img
              src="/images/hundred-machines-cascade-run1.png"
              alt="The cascade for run 1 of the diverse panel: 500 ideas, 294 meaning clusters, 15 candidate themes, one profile. Each requirement is a row of idea blocks grouped by cluster and sorted by agent support, with the kept theme in solid colour: High-Density Battery Technology for Portability, Integrated Multi-Angle Kickstand for Flexibility, Adhesive-free mechanical fasteners for Sustainability, Non-Slip Matte Textured Materials for Usability and Tool-Free Screen Replacement for Modularity. 108 of 243 combinations passed the feasibility check, and the most-agreed theme was replaced in 4 of 5 requirements."
            />
            <figcaption>
              The cascade for run 1 of the diverse panel under the first judge. Pale colour marks
              the three candidate themes per requirement; solid colour marks the theme kept.
            </figcaption>
          </Reveal>
        </div>
      </section>

      <section className="finding">
        <div className="wrap">
          <Stagger className="stat-row">
            <StaggerItem className="stat">
              <div className="v">3 of 30</div>
              <div className="k">most-agreed themes failed the feasibility check</div>
            </StaggerItem>
            <StaggerItem className="stat">
              <div className="v">3 of 6</div>
              <div className="k">cascades where the naive top-theme profile was infeasible</div>
            </StaggerItem>
            <StaggerItem className="stat">
              <div className="v">7 and 4</div>
              <div className="k">of 15 diverse requirement-runs moved off the most-agreed theme, by judge 1 and 2</div>
            </StaggerItem>
            <StaggerItem className="stat">
              <div className="v">5 of 6</div>
              <div className="k">cascades where the two judges chose different profiles</div>
            </StaggerItem>
          </Stagger>

          <div className="split" style={{ marginTop: 46, marginBottom: 0 }}>
            <Reveal className="copy-block">
              <h3>A popular theme gave way to a better fit</h3>
              <p>
                For sustainability in run 1, a recycled aluminium chassis reached by eight agents
                gave way to adhesive-free mechanical fasteners reached by seven, because the
                fasteners scored strong synergy with all three modularity themes. Under the second
                judge, the same run kept the aluminium chassis.
              </p>
              <p>
                The judges agreed reasonably (quadratic weighted kappa 0.71, the same direction on
                79% of pairs), yet their profiles shared on average only{' '}
                <strong>2.3 of 5 themes</strong>. Whether a popular theme survives depends
                noticeably on who judges the fit.
              </p>
              <p>
                Among clones the trade-off stage had little to work with: several themes were
                unanimous for one requirement, so consensus could not tell them apart and ties were
                broken only by cluster size or order.
              </p>
            </Reveal>
            <Reveal className="fig-card" y={0} delay={0.1}>
              <img
                src="/images/hundred-machines-conflict-matrix.png"
                alt="Agree within, disagree across: a 15 by 15 matrix of conflicts and synergies among the 15 consensus themes of run 1, diverse panel, coloured from strong conflict (red, −2) through independent to strong synergy (blue, +2). Five bold labels mark the themes kept in the profile; grey blocks mark same-requirement pairs that were not compared. 21 conflicts and 40 synergies among the 90 pairs."
              />
              <figcaption>
                The 15 candidate themes of run 1 (diverse panel), scored by the first judge: 21
                conflicts and 40 synergies. Bold labels mark the five themes in the profile.
              </figcaption>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- RQ4 ---------- */}
      <section className="finding">
        <div className="wrap">
          <Reveal>
            <p className="tag">RQ4 · Does agreement predict quality?</p>
            <h2 className="section-title">Agreement Is Not a Quality Signal</h2>
            <p className="lead">
              A judge rated 120 named themes from run 1 on novelty, usefulness and feasibility,
              without knowing how many agents supported each. <strong>Consensus showed no
              detectable relation with any of them</strong>: Spearman correlations of −0.14 with
              novelty, +0.13 with usefulness and −0.005 with feasibility (all p &gt; 0.1). If
              anything, more-agreed themes were slightly less novel.
            </p>
          </Reveal>
          <Reveal className="fig-card" y={0}>
            <img
              src="/images/hundred-machines-agreement-quality.png"
              alt="Three scatter plots of judged score from 1 to 7 against consensus (share of agents) for 120 themes, clone and diverse panels: novelty (Spearman −0.142), usefulness (+0.130) and feasibility (−0.005). No visible trend in any."
            />
            <figcaption>
              Consensus against judged novelty, usefulness and feasibility. Each marker is one
              theme.
            </figcaption>
          </Reveal>
          <Reveal>
            <p className="pull">
              A tool that ranks ideas by how many agents proposed them{' '}
              <span className="soft">is ranking by the wrong property.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- Whose ideal ---------- */}
      <section className="finding">
        <div className="wrap">
          <div className="split narrow-fig" style={{ margin: 0 }}>
            <Reveal className="copy-block">
              <p className="tag">Illustration · The second use of the profile</p>
              <h2 className="section-title">Whose Ideal?</h2>
              <p>
                Three invented phones show how a profile ranks products. Phone A scored 95 on
                portability but 2 on modularity; Phone B scored between 60 and 90 on every
                requirement; Phone C scored 75 on sustainability but 20 on portability.
              </p>
              <p>
                B came first however it was measured. But measured by shortfall from a perfect
                score, <strong>A and C swapped places</strong> between the brief’s weights and a
                buyer who puts sustainability first. A product ranking depends both on whose
                weights are used and on what counts as ideal.
              </p>
            </Reveal>
            <Reveal className="fig-card" y={0} delay={0.1}>
              <img
                src="/images/hundred-machines-whose-ideal.png"
                alt="Three hypothetical phones scored on each requirement from 0 to 100 (left), and their ranking under two sets of user priorities, stated priorities and sustainability first, by distance from the cascade profile and by shortfall from a perfect score (right). Phone B ranks first in all four; A and C swap second and third place only under the shortfall measure."
              />
              <figcaption>
                Phones scored on each requirement (left), and their ranking under two sets of
                priorities (right).
              </figcaption>
            </Reveal>
          </div>
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
            Agreement among agents of one model is largely{' '}
            <span className="accent">an echo, not evidence</span>. Machine consensus should be
            treated as <span className="accent">a hypothesis to test</span>, and tools should show
            where the agreement came from.
          </Reveal>
        </div>
      </section>

      {/* ---------- Implications ---------- */}
      <section className="commitments grain">
        <div className="wrap">
          <Reveal>
            <h2>Implications for Designers and Tool Builders</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead">
              Keep the final trade-offs in human hands: ask where the agreement came from and look
              at <span className="accent">what was left out</span>.
            </p>
          </Reveal>
          <Stagger className="commit-grid two-up">
            {lessons.map((l) => (
              <StaggerItem key={l.n}>
                <div className="n">{l.n}</div>
                <h4>{l.h}</h4>
                <p>{l.b}</p>
              </StaggerItem>
            ))}
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
              <h4>One brief, one provider</h4>
              <p>
                A single product brief, and models, judges and embeddings from one provider, so the
                effect of mixing models may be underestimated. Future work should use models from
                several providers.
              </p>
            </StaggerItem>
            <StaggerItem className="iter-panel grain">
              <h4>Judges are models</h4>
              <p>
                Conflict scores were checked with a second judge, but feasibility, quality and
                product scores came from one, and no judge was checked against human experts.
              </p>
            </StaggerItem>
            <StaggerItem className="iter-panel grain">
              <h4>No human panel</h4>
              <p>
                The study shows how machine panels differ from each other, not how they compare
                with people. Next: the same briefs with human design teams, and tests of whether
                displays built for doubt lead designers to better choices.
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
            Many agents agreeing feels like evidence.
            <br />
            Often, <span className="accent">it is the same mind, repeated.</span>
          </Reveal>
        </div>
      </section>

      <ProjectNav slug="when-a-hundred-machines-agree-to-disagree" />
    </article>
  );
}
