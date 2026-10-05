import type { Metadata } from "next";
import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";
import { projects } from "@/components/projects";

export const metadata: Metadata = {
  title: "Atomic User Model — Personality-Aware LLM Interaction | Deepthika S",
  description:
    "The Atomic User Model (AUM) — a structured representation that models a person as a stable identity Nucleus surrounded by four interpretable shells, queried by a personality-aware retrieval pipeline at generation time.",
};

const users = [
  {
    who: "User 1",
    trait: "Organised, meticulous",
    prompt:
      "“…Current deadline: Friday 5pm; requested: Monday 5pm. Reason: data validation overran scope. Offer: draft by Saturday.”",
    generic:
      "Structured email with a bulleted timeline and explicit dates; tone formal.",
    mediated:
      "As at left, plus a one-line acknowledgement of Ravi’s review effort — drawn from the user’s stable habit of crediting collaborators.",
  },
  {
    who: "User 2",
    trait: "Empathetic, verbose",
    prompt:
      "“Hey! Could you help me write a friendly email to Ravi? I feel a bit bad asking, but maybe we could push the Q3 deadline… I really appreciate his patience.”",
    generic: "Warm, apologetic email with multiple thank-yous; tone effusive.",
    mediated:
      "The apology is calibrated against the user’s actual relationship, avoiding self-deprecation that the user’s Nucleus values do not endorse.",
  },
  {
    who: "User 3",
    trait: "Concise, unconventional",
    prompt:
      "“email to ask for more time on a report, colleague named Ravi, Q3 stuff, deadline issue. make it not too formal”",
    generic: "Short, casual email; tone breezy.",
    mediated:
      "Casual tone preserved, but the model fills in the scope the user habitually omits — a specific deadline and brief reason — that they always find useful in retrospect.",
  },
];

const shells = [
  {
    tier: "Nucleus",
    color: "#F2B705",
    title: "Core Identity",
    body: "Core values, fundamental beliefs, identity anchors (“I am the kind of person who…”), moral framework and existential orientation. If the Nucleus changes, the person no longer behaves as the same agent.",
  },
  {
    tier: "Shell 1",
    color: "#E4574C",
    title: "Psychological",
    body: "How the Nucleus is expressed: personality structure (Big Five, MBTI as fields — not substitutes), emotional architecture, attachment system, motivational drivers and fear map.",
  },
  {
    tier: "Shell 2",
    color: "#5B8DEF",
    title: "Cognitive & Experiential",
    body: "Life history applied to cognition: formative experiences, trauma and pain record, learning and knowledge, cognitive style, and the personal narrative the user tells about their life.",
  },
  {
    tier: "Shell 3",
    color: "#4CA36B",
    title: "Behavioural",
    body: "The layer observers see, and the one most often mistaken for personality: habits, communication patterns, decision behaviour, coping mechanisms and relationship behaviour.",
  },
  {
    tier: "Shell 4",
    color: "#C9B23A",
    title: "Social & Contextual",
    body: "The interface to the world: social roles, cultural conditioning, physiological traits, social mask, digital identity and reputation — where most personalisation operates today.",
  },
];

const stages = [
  {
    num: "i",
    label: "Task Identification",
    body: "A prompt is classified as simple (a factual lookup) or complex (writing, planning, communication, design). Simple tasks bypass AUM; complex tasks proceed.",
  },
  {
    num: "ii",
    label: "Component Selection",
    body: "The system identifies which shells and fields matter — a communication task draws on Shells 3 and 4; a creative task draws on Shells 1 and 2.",
  },
  {
    num: "iii",
    label: "Retrieval",
    body: "A RAG-style query hits the local AUM store, returning a small, structured payload of the fields relevant to the task at hand.",
  },
  {
    num: "iv",
    label: "Generation",
    body: "The LLM receives the original prompt and the AUM payload, producing a response that reflects the user’s personality — not only the surface of the prompt.",
  },
];

const commitments = [
  {
    n: "01",
    title: "Local Residence",
    body: "AUM holds intimate personal data and must live on the user’s device or a user-controlled vault — never in a third-party log. Privacy by architecture, not by policy.",
  },
  {
    n: "02",
    title: "User Authorship",
    body: "Every field is human-inspectable, editable and deletable. The user can read exactly what the model believes about them, and change it.",
  },
  {
    n: "03",
    title: "Purpose Restriction",
    body: "AUM is intended for task-style personalisation under user direction — not profiling, advertising, surveillance, or persuasion against the user’s interest.",
  },
];

const openProblems = [
  {
    title: "Data acquisition",
    body: "AUM specifies the fields, not how they are populated. Self-report may be unreliable, passive observation raises privacy concerns, and clinical assessment is impractical at scale.",
  },
  {
    title: "Reliability of inference",
    body: "It is not yet known how faithfully a general-purpose LLM can turn a structured AUM payload into personality-faithful output — nor how to evaluate it.",
  },
  {
    title: "Periodic update",
    body: "The Nucleus is stable across years, inner shells across months, outer shells across weeks. AUM must be refreshed at differential rates.",
  },
  {
    title: "Modality",
    body: "The current specification is text-based. Many personality cues are non-verbal — tone, expression, pacing — and would need multimodal fields.",
  },
  {
    title: "Cultural breadth",
    body: "AUM draws on frameworks developed in specific populations. Cross-cultural validity, especially for the Nucleus, requires further work.",
  },
  {
    title: "Lifespan",
    body: "AUM assumes an adult user with an articulable identity; it does not represent infants, young children, or persons with significant cognitive impairment.",
  },
];

export default function AtomicUserModelPage() {
  const idx = projects.findIndex((p) => p.slug === "atomic-user-model");
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];

  return (
    <article>
      {/* ---------- Hero ---------- */}
      <section className="paper-hero grain">
        <div className="glow" aria-hidden="true" />
        <span className="ghost" aria-hidden="true">
          06
        </span>
        <div className="hero-grid">
          <Reveal as="figure" className="card" delay={0.15}>
            <img
              src="/images/aum-atom.png"
              alt="The Atomic User Model — a Nucleus of core identity surrounded by four concentric shells"
            />
            <figcaption>
              Figure 1 — A Nucleus of core identity, surrounded by four
              interpretable shells.
            </figcaption>
          </Reveal>
          <div className="copy">
            <Reveal delay={0.3}>
              <p className="kicker">Position Paper · EMNLP 2026</p>
              <h1>
                AUM.
                <span className="small">Atomic User Model</span>
              </h1>
              <p className="sub">Personality-Aware LLM Interaction</p>
            </Reveal>
            <Reveal delay={0.45}>
              <p className="desc">
                Large language models are increasingly expected to behave as
                personalised assistants — yet today they personalise on a single
                channel, re-inserting past preferences into context. AUM inverts
                that order: it models the person as a stable identity{" "}
                <strong>Nucleus</strong> wrapped in four interpretable shells,
                queried by a personality-aware retrieval pipeline at generation
                time.
              </p>
            </Reveal>
            <Reveal delay={0.6}>
              <div className="tags">
                <span>Position Paper</span>
                <span>Human–AI Interaction</span>
                <span>LLM Personalisation</span>
                <span>User Modelling</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- The missing layer ---------- */}
      <section className="paper-narrative">
        <div className="wrap">
          <Reveal>
            <h2 className="section-title">The Missing Layer</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="intro">
              Consider a user who planned a six-day conference trip to Paris and
              discussed costs and itineraries with an AI assistant. Two weeks
              later they privately decide not to travel; the assistant is never
              told. A month on, while drafting a project timeline, the assistant
              marks the original travel week as a <strong>user absence</strong>.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="intro">
              The system is not wrong about its <strong>source</strong> — it
              remembers the preference. It is wrong about the{" "}
              <strong>person</strong>. It has no representation of the user as a
              decision-maker whose plans can be revised, and no way to flag a
              stale assumption against a broader identity. The missing layer is
              not better memory or better retrieval, but a more structured
              representation of the user.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- Dark pull-quote ---------- */}
      <section className="dark-section quote-band grain">
        <div className="glow" aria-hidden="true" />
        <div className="wrap">
          <Reveal as="p">
            People do not have preferences first and personalities second.
            Preferences are the{" "}
            <span className="accent">surface expressions</span> of an underlying
            personality that is stable across tasks.
          </Reveal>
        </div>
      </section>

      {/* ---------- Personality seepage ---------- */}
      <section className="seepage">
        <div className="wrap">
          <Reveal>
            <h2 className="section-title">Personality Seepage</h2>
            <p className="intro">
              When users phrase prompts, their linguistic style carries a
              personality fingerprint into the model — and the model mirrors
              that surface without accessing the personality beneath it. The
              same request, phrased by three users, produces three different
              generic responses. An AUM-mediated response fills the gaps instead
              of amplifying the surface.
            </p>
          </Reveal>
          <Stagger className="seep-grid">
            {users.map((u) => (
              <StaggerItem key={u.who} className="seep-col">
                <div className="who">{u.who}</div>
                <div className="trait">{u.trait}</div>
                <div className="seep-row">
                  <h4>Prompt surface</h4>
                  <p>{u.prompt}</p>
                </div>
                <div className="seep-row">
                  <h4>Generic LLM response</h4>
                  <p>{u.generic}</p>
                </div>
                <div className="seep-row mediated">
                  <h4>AUM-mediated (intended)</h4>
                  <p>{u.mediated}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---------- Statement / inversion ---------- */}
      <section className="dark-section statement-band grain">
        <div className="glow" aria-hidden="true" />
        <div className="wrap">
          <Reveal as="h2">
            The Inversion<span className="accent">.</span>
          </Reveal>
          <Reveal as="p" delay={0.15}>
            Rather than inferring <span className="accent">personality</span>{" "}
            from preferences, systems should model{" "}
            <span className="accent">personality</span> and use it to deduce{" "}
            <span className="accent">preferences</span>. A stale preference is
            re-interpretable against a stable structure; stored alone, it is
            brittle.
          </Reveal>
        </div>
      </section>

      {/* ---------- The Atomic User Model ---------- */}
      <section className="shells">
        <div className="wrap">
          <Reveal>
            <h2 className="section-title">The Atomic User Model</h2>
          </Reveal>

          <Reveal className="atom-figure" y={0}>
            <figure className="frame">
              <img
                src="/images/aum-atom.png"
                alt="AUM diagram — Nucleus surrounded by psychological, cognitive, behavioural and social shells, with observability increasing and stability decreasing outward"
              />
              <figcaption>
                Identity is stable while behaviour adapts. The Nucleus is
                visible only to the self; outer shells are progressively visible
                to strangers, colleagues and close relations — mirroring the
                onion model of social penetration theory.
              </figcaption>
            </figure>
          </Reveal>

          <Stagger className="shell-grid">
            {shells.map((s) => (
              <StaggerItem
                key={s.tier}
                className="shell-col"
                style={{ borderTopColor: s.color }}
              >
                <div className="tier">{s.tier}</div>
                <h4>{s.title}</h4>
                <p>{s.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---------- Generation pipeline ---------- */}
      <section className="pipeline">
        <div className="wrap">
          <Reveal>
            <h2 className="section-title">
              Personality-Aware Generation Pipeline
            </h2>
          </Reveal>
          <Reveal className="pipe-figure" y={0}>
            <img
              src="/images/aum-pipeline.png"
              alt="Pipeline — user prompt, task classifier, component selection, RAG query to a local AUM store, LLM generation, and a personality-aware response"
            />
          </Reveal>
          <Stagger className="stage-grid">
            {stages.map((s) => (
              <StaggerItem key={s.label} className="stage-item">
                <div className="num">{s.num}</div>
                <div className="label">{s.label}</div>
                <p>{s.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---------- Design commitments ---------- */}
      <section className="commitments grain">
        <div className="wrap">
          <Reveal>
            <h2>Design Commitments</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead">
              A model that captures fears, traumas and core values is among the
              most sensitive artefacts a person can hold. AUM is bound by three
              constraints —{" "}
              <span className="accent">
                architecture, authorship and purpose.
              </span>
            </p>
          </Reveal>
          <Stagger className="commit-grid">
            {commitments.map((c) => (
              <StaggerItem key={c.n}>
                <div className="n">{c.n}</div>
                <h4>{c.title}</h4>
                <p>{c.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---------- Open problems ---------- */}
      <section className="open">
        <div className="wrap">
          <Reveal>
            <h2 className="section-title">Open Problems</h2>
          </Reveal>
          <Stagger className="open-grid">
            {openProblems.map((o) => (
              <StaggerItem key={o.title} className="iter-panel grain">
                <h4>{o.title}</h4>
                <p>{o.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---------- Closing quote ---------- */}
      <section
        className="dark-section closing grain"
        style={{ background: "var(--dark-3)" }}
      >
        <div className="glow" aria-hidden="true" />
        <div className="wrap">
          <Reveal as="p">
            The next step in personalisation is not better memory.
            <br />
            It is a better <span className="accent">model of the person.</span>
          </Reveal>
        </div>
      </section>

      {/* ---------- Prev / next ---------- */}
      <nav className="proj-nav" aria-label="Project navigation">
        <div className="wrap row">
          <div>
            <p className="hint">Previous project</p>
            {prev.live ? (
              <Link href={`/projects/${prev.slug}`} className="name">
                {prev.title}
              </Link>
            ) : (
              <p className="name">
                {prev.title}
                {!prev.live && <span className="soon-mark">coming soon</span>}
              </p>
            )}
          </div>
          <div style={{ textAlign: "right" }}>
            <p className="hint">Next project</p>
            {next.live ? (
              <Link href={`/projects/${next.slug}`} className="name">
                {next.title}
              </Link>
            ) : (
              <p className="name">
                {next.title}
                <span className="soon-mark">coming soon</span>
              </p>
            )}
          </div>
        </div>
      </nav>
    </article>
  );
}
