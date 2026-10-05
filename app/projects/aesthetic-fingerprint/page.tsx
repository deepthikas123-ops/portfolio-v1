import type { Metadata } from "next";
import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";
import { projects } from "@/components/projects";

export const metadata: Metadata = {
  title:
    "Aesthetic Fingerprint — Immersive Gaze & Visual Taste in VR | Deepthika S",
  description:
    "An immersive VR eye-tracking study of 136 people. In a theme-less field of images, what the eye lingers on is driven by personal attraction — not visual saliency — and that residue is individual enough to serve as an aesthetic fingerprint.",
};

const steps = [
  {
    num: "01",
    label: "Projective Field",
    body: "The participant sits at the centre of a cylinder lined with a dense grid of randomly arranged, theme-less images — a field built to strip away shared meaning and semantic anchoring.",
  },
  {
    num: "02",
    label: "Gaze-Contingent Approach",
    body: "A ray cast from the point of gaze detects the image being viewed. Hold a gaze for over a second and the image glides closer and enlarges; look away and it returns.",
  },
  {
    num: "03",
    label: "Gaze Loci",
    body: "Raw binocular gaze is converted to fixations, aggregated per image into dwell and counts, and the densest fixation regions are cropped as per-person “gaze loci”.",
  },
  {
    num: "04",
    label: "Aesthetic Signature",
    body: "Loci are read two ways — low-level dominant colour and texture, and a high-level worded signature from a vision-language model describing recurring colour, material and mood.",
  },
];

const facts = [
  { v: "136", k: "participants, free-viewing for 2–5 minutes each" },
  { v: "560", k: "image pool — a randomised 280 shown per person" },
  {
    v: "Quest\u00A0Pro",
    k: "Meta headset with built-in binocular eye tracking",
  },
  { v: "3", k: "analyses — allocation, saliency vs. preference, signature" },
];

export default function AestheticFingerprintPage() {
  const idx = projects.findIndex((p) => p.slug === "aesthetic-fingerprint");
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];

  return (
    <article>
      {/* ---------- Hero ---------- */}
      <section className="paper-hero grain">
        <div className="glow" aria-hidden="true" />
        <span className="ghost" aria-hidden="true">
          07
        </span>
        <div className="hero-grid">
          <Reveal as="figure" className="card" delay={0.15}>
            <img
              src="/images/gaze-instrument.png"
              alt="A participant in a VR headset seated at the centre of a cylindrical field of hundreds of small images; one image is drawn closer into view"
            />
            <figcaption>
              The immersive gaze instrument — a cylinder of randomly arranged,
              theme-less images explored freely while eye tracking records the
              gaze.
            </figcaption>
          </Reveal>
          <div className="copy">
            <Reveal delay={0.3}>
              <p className="kicker">Research · VRST 2026</p>
              <h1>
                Aesthetic Fingerprint.
                <span className="small">Where the gaze lingers</span>
              </h1>
              <p className="sub">
                Immersive free-viewing → a stable signature of taste
              </p>
            </Reveal>
            <Reveal delay={0.45}>
              <p className="desc">
                People look longer at what they are drawn to — and countless
                systems read preference from exactly this behaviour. But is a
                long look <strong>taste</strong>, or just an{" "}
                <strong>eye-grabbing</strong> stimulus? Inside an immersive VR
                field stripped of meaning, this study shows that what the eye
                chooses is governed by personal attraction, and that residue is
                individual enough to identify a person.
              </p>
            </Reveal>
            <Reveal delay={0.6}>
              <div className="tags">
                <span>Virtual Reality</span>
                <span>Eye Tracking</span>
                <span>Visual Attention</span>
                <span>Aesthetic Preference</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- The museum corridor ---------- */}
      <section className="paper-narrative">
        <div className="wrap">
          <Reveal>
            <h2 className="section-title">When the Eye Lingers</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="intro">
              Imagine a visitor in a museum corridor stopping before a painting.
              Some are taken by the whole; some are pulled to a single stroke or
              colour; some merely glance and move on. The longer we look, the
              more we seem to be drawn in —{" "}
              <strong>more gaze tends to go with more liking.</strong> This
              intuition, formalised as the gaze cascade effect, underpins a
              large family of gaze-based preference and recommendation systems.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="intro">
              Yet a long look has two competing explanations. It may be{" "}
              <strong>top-down preference</strong> — we looked because we liked
              — or <strong>bottom-up saliency</strong>: the stimulus was bright,
              high-contrast or colourful on its own. And there is a second
              confound: <strong>semantic anchoring</strong>, where prior
              knowledge shapes preference before we even meet a stimulus. What
              would preference look like if that anchoring were stripped away?
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- Dark pull-quote ---------- */}
      <section className="dark-section quote-band grain">
        <div className="glow" aria-hidden="true" />
        <div className="wrap">
          <Reveal as="p">
            A gaze-based system that is in fact reading{" "}
            <span className="accent">saliency</span> is measuring the stimulus —{" "}
            <span className="accent">not the person.</span>
          </Reveal>
        </div>
      </section>

      {/* ---------- The instrument ---------- */}
      <section className="pipeline">
        <div className="wrap">
          <Reveal>
            <h2 className="section-title">The Immersive Gaze Instrument</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead">
              Real-world settings are full of distractions and prior
              associations. VR offers a way around it: a carefully built virtual
              field of diverse, theme-less stimuli that prevents preconceived
              meaning and lets attention behave freely while eye tracking
              watches.
            </p>
          </Reveal>
          <Stagger className="stage-grid">
            {steps.map((s) => (
              <StaggerItem key={s.num} className="stage-item">
                <div className="num">{s.num}</div>
                <div className="label">{s.label}</div>
                <p>{s.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <Stagger className="stat-row">
            {facts.map((f) => (
              <StaggerItem key={f.k} className="stat">
                <div className="v">{f.v}</div>
                <div className="k">{f.k}</div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---------- Analysis 1 ---------- */}
      <section className="finding">
        <div className="wrap">
          <Reveal>
            <p className="tag">Analysis 01 · Attention</p>
            <h2 className="section-title">Fiercely Selective, Steadily Deep</h2>
            <p className="lead">
              In a dense field, attention is not merely selective — it is
              severe. Of every 100 images shown, about 25 were ever glanced at,
              only 3–4 held real dwell, and about 2 pulled the person in enough
              to trigger an approach. Dwell is overwhelmingly concentrated (Gini
              0.90). Over a session, the discovery of new images decelerates —
              but the <strong>depth of engagement does not</strong>, holding
              near 4.5 seconds throughout.
            </p>
          </Reveal>

          <Reveal className="fig-card" y={0}>
            <img
              src="/images/gaze-funnel.png"
              alt="Attention funnel: shown 100%, glanced 25.0%, engaged 3.4%, approached 2.1%"
            />
            <figcaption>
              The immersive attention funnel, averaged across participants — a
              steep fall from shown to glanced to engaged to approached.
            </figcaption>
          </Reveal>

          <div className="two-fig">
            <Reveal className="fig-card" y={0}>
              <img
                src="/images/gaze-discovery.png"
                alt="Cumulative distinct images discovered rises quickly then flattens, above a constant-discovery line"
              />
              <figcaption>
                Discovery of new images saturates — the curve bows well above a
                constant-discovery line.
              </figcaption>
            </Reveal>
            <Reveal className="fig-card" y={0}>
              <img
                src="/images/gaze-approach.png"
                alt="Scatter showing the distance an image was approached is positively associated with the dwell it received, mean r = 0.35"
              />
              <figcaption>
                The gaze-contingent mechanic is moderately coupled to dwell
                (mean r = 0.35) — a feedback loop between looking and being
                drawn in.
              </figcaption>
            </Reveal>
          </div>

          <Stagger className="stat-row">
            <StaggerItem className="stat">
              <div className="v">25%</div>
              <div className="k">of shown images ever glanced at</div>
            </StaggerItem>
            <StaggerItem className="stat">
              <div className="v">3.4%</div>
              <div className="k">engaged with real dwell</div>
            </StaggerItem>
            <StaggerItem className="stat">
              <div className="v">0.90</div>
              <div className="k">Gini — dwell is highly concentrated</div>
            </StaggerItem>
            <StaggerItem className="stat">
              <div className="v">~4.5s</div>
              <div className="k">per-image dwell, flat across the session</div>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* ---------- Analysis 2 ---------- */}
      <section className="finding">
        <div className="wrap">
          <Reveal>
            <p className="tag">Analysis 02 · Saliency vs. Preference</p>
            <h2 className="section-title">Attraction Beats Eye-Catch</h2>
            <p className="lead">
              Bottom-up saliency barely accounts for where the immersive gaze
              lands — normalised scanpath saliency sits at its zero baseline,
              and area-under-Judd is only a whisper above a coin toss. Splitting
              each person’s gaze into a salient set and a non-salient{" "}
              <strong>residual</strong>, the residual identifies individuals at{" "}
              <strong>44.1%</strong> rank-1 — about <strong>three times</strong>{" "}
              the 14.7% of the salient gaze, and far above the 0.74% chance. The
              part saliency cannot explain is precisely the part that carries
              who a person is.
            </p>
          </Reveal>

          <Reveal className="fig-card" y={0}>
            <img
              src="/images/gaze-heatmaps.png"
              alt="Example stimuli with DeepGaze saliency heatmaps overlaid with gaze points, showing gaze often lands off the most salient region"
            />
            <figcaption>
              Saliency maps (heatmaps) with overlaid gaze points for example
              stimuli — gaze often sits off the most salient object.
            </figcaption>
          </Reveal>

          <div className="two-fig">
            <Reveal className="fig-card" y={0}>
              <img
                src="/images/gaze-saliency.png"
                alt="Per-participant NSS sits at zero baseline and AUC-Judd sits just above 0.5 chance"
              />
              <figcaption>
                How saliency-driven is the gaze? NSS is at chance; AUC-Judd sits
                just above 0.5.
              </figcaption>
            </Reveal>
            <Reveal className="fig-card" y={0}>
              <img
                src="/images/gaze-fingerprint.png"
                alt="Rank-1 identification: residual loci 44.1% versus salient loci 14.7%, chance 0.7%"
              />
              <figcaption>
                The fingerprint — residual, non-salient gaze individuates a
                person roughly three times better than salient gaze.
              </figcaption>
            </Reveal>
          </div>

          <Stagger className="stat-row">
            <StaggerItem className="stat">
              <div className="v">
                <span className="accent">3×</span>
              </div>
              <div className="k">
                residual gaze identifies better than salient
              </div>
            </StaggerItem>
            <StaggerItem className="stat">
              <div className="v">44.1%</div>
              <div className="k">rank-1 identity from residual loci</div>
            </StaggerItem>
            <StaggerItem className="stat">
              <div className="v">14.7%</div>
              <div className="k">rank-1 identity from salient loci</div>
            </StaggerItem>
            <StaggerItem className="stat">
              <div className="v">≈0</div>
              <div className="k">NSS — saliency near chance in this field</div>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* ---------- Analysis 3 ---------- */}
      <section className="finding">
        <div className="wrap">
          <Reveal>
            <p className="tag">Analysis 03 · The Signature</p>
            <h2 className="section-title">A Signature You Can Read</h2>
            <p className="lead">
              Read at a higher level, a vision-language model turns each
              person’s gaze loci into a worded aesthetic signature of colour,
              texture, material and mood. A person’s two independent
              half-signatures resemble each other (<strong>0.85</strong>) far
              more than they resemble other people (<strong>0.45</strong>) — the
              textbook pattern of a stable, individual trait. One caveat: the
              recovered vocabulary skews architectural, a stylistic bias of the
              model rather than ground truth.
            </p>
          </Reveal>

          <div className="two-fig">
            <Reveal className="fig-card" y={0}>
              <img
                src="/images/gaze-signature.png"
                alt="Within-person signature similarity near 0.85 versus between-person near 0.45, with little overlap"
              />
              <figcaption>
                Aesthetic signatures are stable within a person and distinct
                between people.
              </figcaption>
            </Reveal>
            <Reveal className="fig-card" y={0}>
              <img
                src="/images/gaze-terms.png"
                alt="Bar chart of most common aesthetic-signature terms: brutalist, raw concrete, geometric, monochromatic, minimalist"
              />
              <figcaption>
                The most common signature terms skew architectural — read as the
                model’s lexicon, not the person’s own words.
              </figcaption>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Synthesis ---------- */}
      <section className="finding">
        <div className="wrap">
          <Reveal>
            <p className="tag">Synthesis · Two Signals, One Person</p>
            <h2 className="section-title">The Whole Beats Either Half</h2>
            <p className="lead">
              If the low-level residual gaze and the high-level worded signature
              both read the same underlying person, fusing them should recover
              individuals more accurately than either alone. It does: residual
              reaches 40%, signature 55%, and the two fused reach{" "}
              <strong>70%</strong>. The lift means the numeric and the worded
              channels carry partly independent facets of the individual — a
              real, personal quantity is being measured.
            </p>
          </Reveal>

          <Reveal className="fig-card" y={0}>
            <img
              src="/images/gaze-fusion.png"
              alt="Identification accuracy: residual 40%, signature 55%, fused 70%, chance 0.7%"
            />
            <figcaption>
              Two independent gaze signals recover the same individuals — fusing
              them lifts identification to 70%.
            </figcaption>
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
            In a field stripped of shared meaning, what the eyes choose is
            governed by <span className="accent">personal attraction</span> —
            not by what is objectively <span className="accent">salient</span> —
            and that residue is individual enough to serve as an{" "}
            <span className="accent">aesthetic fingerprint.</span>
          </Reveal>
        </div>
      </section>

      {/* ---------- Implications ---------- */}
      <section className="commitments grain">
        <div className="wrap">
          <Reveal>
            <h2>What It Means</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead">
              A signal individual enough to{" "}
              <span className="accent">recommend from</span> is individual
              enough to <span className="accent">identify from.</span>
            </p>
          </Reveal>
          <Stagger className="commit-grid">
            <StaggerItem>
              <div className="n">01</div>
              <h4>Don’t trust the long look</h4>
              <p>
                In a cluttered, high-saliency layout, a long look may report
                eye-catch, not taste. Separating the salient from the residual
                gaze is what recovers the personal signal.
              </p>
            </StaggerItem>
            <StaggerItem>
              <div className="n">02</div>
              <h4>Read the residue</h4>
              <p>
                The non-salient part of the gaze — the part saliency cannot
                explain — is where individual aesthetic preference lives, and it
                is stable enough to personalise from.
              </p>
            </StaggerItem>
            <StaggerItem>
              <div className="n">03</div>
              <h4>Mind the privacy edge</h4>
              <p>
                Because the same residue identifies a person about three times
                better than salient gaze, aesthetic gaze is a biometric — a
                recommendation signal and an identifier at once.
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
              <h4>Saliency, cautiously</h4>
              <p>
                A coordinate-mapping offset, a screen-trained saliency model,
                and the curved geometry mean the near-chance saliency result is
                a backdrop, not a standalone claim.
              </p>
            </StaggerItem>
            <StaggerItem className="iter-panel grain">
              <h4>Approach coupling</h4>
              <p>
                Dwell is logged as a single total per image, so the mechanic’s
                coupling with dwell is an entanglement — not proof that
                approaching causes more looking.
              </p>
            </StaggerItem>
            <StaggerItem className="iter-panel grain">
              <h4>Anchoring by design</h4>
              <p>
                The theme-less field minimises shared meaning as a design
                rationale; with no separately anchored control, the anchoring
                effect is not directly measured.
              </p>
            </StaggerItem>
            <StaggerItem className="iter-panel grain">
              <h4>Model-worded signatures</h4>
              <p>
                The worded signatures carry a vision-language model’s stylistic
                vocabulary, so their exact words are model-mediated and the
                reading prompt is worth refining.
              </p>
            </StaggerItem>
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
            Strip away the meaning, and the eye stops performing.
            <br />
            What is left is <span className="accent">the person.</span>
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
                <span className="soon-mark">coming soon</span>
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
