import type { Metadata } from 'next';
import { Reveal, Stagger, StaggerItem } from '@/components/Motion';
import ProjectNav from '@/components/ProjectNav';
import { getProject } from '@/components/projects';

const p = getProject('flavovr');

export const metadata: Metadata = {
  title: 'FLAVOVR — Neophilic and Neophobic Design Preferences Across Generations | Deepthika S',
  description:
    'FLAVOVR captures implicit aesthetic preference from gaze in immersive VR and generates hyper-personalised, unconventional products; the Iconicity Classification Algorithm (IKA) labels designs as conventional, blended or unconventional; and a 45-participant study finds unconventional preference rising from 19.7% (Gen X) to 40.0% (Gen Alpha).',
  openGraph: {
    title: 'FLAVOVR — Consumer Attraction to Conventional and Unconventional Product Aesthetics',
    description:
      'Gaze-driven hyper-personalised product generation, an objective iconicity classifier, and a four-generation preference study.',
    images: ['/images/flavovr-system-architecture.jpg'],
  },
};

const inspirations = [
  'Bamboo',
  'Bird',
  'Butterfly wing',
  'Cactus',
  'Coral reef',
  'Crystal',
  'Feather',
  'Galaxy spiral',
  'Hibiscus flower',
  'Honeycomb',
  'Jellyfish',
  'Lotus flower',
  'Mountain range',
  'Mushroom',
  'Ocean',
  'Origami crane',
  'Panther',
  'Seashell',
  'Tornado',
  'Tree trunk',
];

const flavovrSteps = [
  {
    k: 'Immersive field',
    h: 'Look freely',
    b: 'The user is surrounded by nearly 300 visually diverse images from a wide range of categories, sharing no common theme, and simply looks at what attracts them.',
  },
  {
    k: 'Gaze',
    h: 'Find the regions of interest',
    b: 'Eye tracking identifies where in each image the user spends more visual attention; gaze becomes an indirect measure of attraction.',
  },
  {
    k: 'Extraction',
    h: 'Colour and texture',
    b: 'The regions of interest pass through a computer-vision pipeline in which vision-language agents extract dominant colours, textures and aesthetic patterns.',
  },
  {
    k: 'Generation',
    h: 'Shape and product',
    b: 'The user picks a nature-derived look-alike inspiration and the product type. A large image model combines all of it into a hyper-personalised design.',
  },
];

const generations = [
  { g: 'Gen X', born: '1965–1980', n: 11, u: 19.7, c: 47.0, b: 33.3 },
  { g: 'Gen Y', born: '1981–1996', n: 12, u: 16.7, c: 26.4, b: 56.9 },
  { g: 'Gen Z', born: '1997–2012', n: 12, u: 34.7, c: 26.4, b: 38.9 },
  { g: 'Gen Alpha', born: '2013–2024', n: 10, u: 40.0, c: 31.7, b: 28.3 },
];

const categoryTrends = [
  { cat: 'Wrist watch', stat: 'Z = 3.32, p < .001', out: 'Supported', yes: true },
  { cat: 'Table lamp', stat: 'Z = 1.99, p = .046', out: 'Supported', yes: true },
  { cat: 'Perfume bottle', stat: 'Z = 1.89, p = .059', out: 'Marginal', yes: false },
  { cat: 'Desk clock', stat: 'Z = 0.87, p = .384', out: 'No trend', yes: false },
  { cat: 'Water bottle', stat: 'Z = 0.89, p = .375', out: 'No trend', yes: false },
  { cat: 'Coffee mug', stat: 'Z = –0.55, p = .583', out: 'No trend', yes: false },
];

export default function FlavovrPage() {
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
              src="/images/flavovr-outputs-detail.jpg"
              alt="Nine FLAVOVR-generated products: a lotus-flower desk clock, a tornado coffee mug, a lotus-flower vase, a mountain-range wrist watch, an ocean-wave book shelf, a penguin wrist watch, a jellyfish table lamp, a tornado perfume bottle and a bamboo laptop bag"
            />
            <figcaption>
              FLAVOVR outputs. Each pairs a product type with the nature-derived inspiration its
              user chose, coloured and textured by their gaze.
            </figcaption>
          </Reveal>
          <div className="copy">
            <Reveal delay={0.3}>
              <p className="kicker">Design Research · Journal Submission</p>
              <h1>
                FLAVOVR.
                <span className="small">
                  Neophilic and neophobic design preferences across generations
                </span>
              </h1>
              <p className="sub">Gaze in VR · An objective classifier · A four-generation study</p>
            </Reveal>
            <Reveal delay={0.45}>
              <p className="desc">
                People increasingly choose products that express who they are, not just products that
                work. Yet “conventional” and “unconventional” design have never been measured in a
                way that transfers across product categories. This work builds the tools to do it —
                a system that <strong>generates</strong> unconventional, hyper-personalised products
                from gaze, a classifier that <strong>labels</strong> any design objectively — and
                then asks how four generations respond.
              </p>
            </Reveal>
            <Reveal delay={0.6}>
              <div className="tags">
                <span>Product Aesthetics</span>
                <span>VR + Eye Tracking</span>
                <span>Vision-Language Models</span>
                <span>Generational Cohorts</span>
                <span>Neophilia / Neophobia</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Three connected parts ---------- */}
      <section className="dark-section dark-fig grain" style={{ background: 'var(--dark-2)' }}>
        <div className="glow" aria-hidden="true" />
        <div className="wrap">
          <Reveal>
            <p className="finding-tag">How the work fits together</p>
            <h2 className="section-title">Three Connected Parts</h2>
            <p className="lead">
              One system, one instrument, one study — run in sequence, with two separate groups of
              people.
            </p>
          </Reveal>
          <Stagger className="triad">
            <StaggerItem className="part">
              <span className="t-n">01</span>
              <p className="t-role">The system · generates</p>
              <h3>FLAVOVR</h3>
              <p>
                Captures implicit aesthetic preference through gaze in immersive VR and combines
                colour, texture and form preferences with nature-derived shapes to generate
                hyper-personalised, visually unconventional products.
              </p>
              <p className="who">
                <b>~100</b>participants aged 14–45
              </p>
            </StaggerItem>
            <StaggerItem className="part">
              <span className="t-n">02</span>
              <p className="t-role">The instrument · classifies</p>
              <h3>IKA</h3>
              <p>
                The Iconicity Classification Algorithm: a semantics-aware hybrid of image-embedding
                dissimilarity and an ensemble of vision-language model scores that labels designs as
                conventional, blended or unconventional.
              </p>
              <p className="who">
                <b>147</b>test images, six categories
              </p>
            </StaggerItem>
            <StaggerItem className="part">
              <span className="t-n">03</span>
              <p className="t-role">The study · measures</p>
              <h3>Generational preference</h3>
              <p>
                IKA-classified designs — including FLAVOVR outputs — shown, unlabelled, to people
                from Generation X, Y, Z and Alpha, who chose what they would most likely buy.
              </p>
              <p className="who">
                <b>45</b>participants, four cohorts
              </p>
            </StaggerItem>
          </Stagger>
          <p className="figure-note" style={{ marginTop: 22 }}>
            The ~100 FLAVOVR participants and the 45 study participants are separate groups; they
            did not overlap.
          </p>
        </div>
      </section>

      {/* ---------- From utility to identity ---------- */}
      <section className="paper-narrative">
        <div className="wrap">
          <Reveal>
            <h2 className="section-title">From Utility to Identity</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="intro">
              Consumption began with necessity — wheat traded for milk. It grew into comfort, then
              luxury, and from 2020 onward into a language of identity amplified by social media.
              People now regard possessions as extensions of themselves, and{' '}
              <strong>ownership has become a form of communication.</strong>
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="intro">
              Fifty years of headphones show how “conventional” forms. Read down a column and
              competing brands <strong>converge</strong> within a decade — inter-product similarity.
              Read across a row and each brand <strong>evolves</strong> — intra-product variation
              that slowly redraws what normal looks like.
            </p>
          </Reveal>
          <Reveal className="fig-card" y={0}>
            <img
              src="/images/fv-design-timeline.png"
              alt="Comparative design timeline of Sony and Sennheiser headphones from the 1970s to the 2020s"
            />
            <figcaption>
              Sony and Sennheiser headphones, 1970s–2020s: convergence between competitors down each
              column, evolution of each brand across each row.
            </figcaption>
          </Reveal>
        </div>
      </section>

      <section className="dark-section quote-band grain">
        <div className="glow" aria-hidden="true" />
        <div className="wrap">
          <Reveal as="p">
            The <span className="accent">Selfie Effect</span>: just as a selfie is
            self-representation, consumers reach for products that represent{' '}
            <span className="accent">who they are</span>, not what everyone else owns.
          </Reveal>
        </div>
      </section>

      <section className="paper-narrative">
        <div className="wrap">
          <Reveal>
            <h2 className="section-title">Beyond Customisation</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="intro">
              Customisation layers colour, engravings or accessories onto a standard base.
              Hyper-personalisation works from the ground up: the product is{' '}
              <strong>conceived around the individual</strong> — their preferences, personality
              and aesthetic sensibility. It is not a product made available to be modified; it is a
              product made possible by the person.
            </p>
          </Reveal>
          <div className="two-fig">
            <Reveal className="fig-card" y={0}>
              <img
                src="/images/flavovr-selfie-effect.jpg"
                alt="Conventional ownership, where everyone owns the same headphones, versus identity-driven ownership, where each person owns a distinct pair"
              />
              <figcaption>
                The Selfie Effect: same product for everyone, versus the same category made unique
                to each person.
              </figcaption>
            </Reveal>
            <Reveal className="fig-card" y={0}>
              <img
                src="/images/flavovr-customisation-vs-hyper-personalisation.jpg"
                alt="Customisation modifies a standard sneaker with colour, engraving, accessory and material; hyper-personalisation conceives a unique sneaker around colour, texture and form preference, aesthetic sensibility and personal identity"
              />
              <figcaption>
                Customisation modifies a standard; hyper-personalisation is designed around the
                individual.
              </figcaption>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- What makes a product unconventional ---------- */}
      <section className="band">
        <div className="wrap">
          <Reveal className="band-head">
            <p className="tag">The definition problem</p>
            <h2 className="section-title">What Makes a Product Conventional?</h2>
            <p>
              People classify a product by comparing it, mostly below conscious reflection, with
              everything they have seen before: high similarity reads as conventional, partial
              similarity as blended, low similarity as unconventional.
            </p>
          </Reveal>
          <Reveal className="fig-card fig-wide" y={0}>
            <img
              src="/images/flavovr-classification-process.jpg"
              alt="Cognitive process of product classification in five steps: observe the product, extract aesthetic features, compare with stored examples, evaluate similarity, and classify"
            />
            <figcaption>
              How people classify: observe, extract features, compare with stored exemplars,
              evaluate similarity, assign a class.
            </figcaption>
          </Reveal>
        </div>
      </section>

      <section className="finding" style={{ borderTop: 'none' }}>
        <div className="wrap">
          <div className="split">
            <Reveal className="fig-card" y={0}>
              <img
                src="/images/flavovr-perception-subjectivity.jpg"
                alt="The same plain mug is perceived as conventional by an observer with a minimalist visual history and as unconventional by an observer with an ornate, maximalist visual history"
              />
              <figcaption>
                The same mug, two visual histories, two opposite judgements.
              </figcaption>
            </Reveal>
            <Reveal className="copy-block" delay={0.1}>
              <h3>Human judgement is relative</h3>
              <p>
                Someone raised among minimalist objects sees a plain matte mug as thoroughly
                conventional; someone raised among ornate ones sees it as a departure. Each
                classification reflects not a truth about the product but the{' '}
                <strong>perceptual history of the person</strong> judging it — and adding more
                judges never yields a truly objective standard.
              </p>
              <p>
                Novelty also gets confused with unconventionality. A product can be new and still
                familiar, and repeated exposure normalises the strange, which is why “old and
                unconventional” is theoretically unstable.
              </p>
            </Reveal>
          </div>
          <Reveal className="fig-card" y={0} >
            <img
              src="/images/fv-novelty-matrix.png"
              alt="A two by two matrix of market presence (new or old) against design character (conventional or unconventional); old and unconventional is marked theoretically unstable because familiarity normalises unconventional designs over time"
              style={{ maxWidth: 640 }}
            />
            <figcaption>
              Novelty is not unconventionality. Familiarity normalises unconventional designs over
              time.
            </figcaption>
          </Reveal>
        </div>
      </section>

      {/* ---------- FLAVOVR system ---------- */}
      <section className="dark-section statement-band grain">
        <div className="glow" aria-hidden="true" />
        <div className="wrap">
          <Reveal as="h2">
            Part 01 · FLAVOVR<span className="accent">.</span>
          </Reveal>
          <Reveal as="p" delay={0.15}>
            Truly unconventional products are hard to find in the market: exposure quietly turns
            them conventional. Instead of asking people what they like, FLAVOVR{' '}
            <span className="accent">watches where they look</span> — and designs from there.
          </Reveal>
        </div>
      </section>

      <section className="pipeline">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">Capturing preference through gaze</p>
            <h2 className="section-title">From Gaze to Colour, Texture and Form</h2>
            <p className="lead">
              FLAVOVR integrates eye tracking, immersive virtual reality and AI to find the visual
              elements that naturally attract a person — reading preference{' '}
              <strong>subconsciously, through gaze behaviour</strong>, rather than through what
              people say.
            </p>
          </Reveal>
          <Reveal className="fig-card" y={0}>
            <img
              src="/images/flavovr-system-architecture.jpg"
              alt="FLAVOVR architecture in five steps: a seated user in a VR headset explores a ring of images; regions of interest where the user looked longest become gaze heatmaps; a VLM colour agent extracts five dominant colours and a VLM texture agent extracts texture descriptors, while the user picks a look-alike shape such as a jellyfish plus a product such as a bottle; a large image model generates the product; the output is a jellyfish-inspired water bottle"
            />
            <figcaption>
              Architecture of the FLAVOVR system: gaze heatmaps of regions of interest → colour and
              texture agents → a look-alike shape plus product type → a large image model → the
              hyper-personalised product.
            </figcaption>
          </Reveal>
          <Stagger className="sequence c4">
            {flavovrSteps.map((s, i) => (
              <StaggerItem key={s.k}>
                <div className="s-n">{String(i + 1).padStart(2, '0')}</div>
                <div className="s-k">{s.k}</div>
                <h4>{s.h}</h4>
                <p>{s.b}</p>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="split" style={{ marginBottom: 20 }}>
            <Reveal className="copy-block">
              <h3>Nature as a source of unconventional shape</h3>
              <p>
                Colour and texture are only part of uniqueness — shape carries the rest. Each
                participant chooses a look-alike inspiration from a curated set of nature-derived
                and abstract forms, chosen precisely because their structures{' '}
                <strong>rarely appear in conventional product design</strong>.
              </p>
            </Reveal>
            <Reveal className="tag-cloud" delay={0.1}>
              {inspirations.map((n) => (
                <span key={n}>{n}</span>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <Reveal className="band-head">
            <p className="tag">Hyper-personalised product generation</p>
            <h2 className="section-title">~100 People, One Design Language Each</h2>
            <p>
              Around 100 participants aged 14–45 each experienced FLAVOVR individually. From their
              gaze-derived preferences and their chosen inspiration, the system generated designs
              tailored to them — together forming the dataset of unconventional products used
              later in the study.
            </p>
          </Reveal>
          <Reveal className="fig-card fig-wide" y={0}>
            <img
              src="/images/flavovr-outputs.png"
              alt="Grid of FLAVOVR outputs across categories — desk clocks, coffee mugs, flower vases, wrist watches, table lamps, perfume bottles, shelves and more — each labelled with its look-alike inspiration"
            />
            <figcaption>
              Sample FLAVOVR outputs. Each caption records the product type and the look-alike
              inspiration the participant selected.
            </figcaption>
          </Reveal>
        </div>
      </section>

      {/* ---------- IKA ---------- */}
      <section className="dark-section statement-band grain">
        <div className="glow" aria-hidden="true" />
        <div className="wrap">
          <Reveal as="h2">
            Part 02 · IKA<span className="accent">.</span>
          </Reveal>
          <Reveal as="p" delay={0.15}>
            To study preference for unconventional design, every product first needs a label that
            does not depend on who is looking. That requires a system with{' '}
            <span className="accent">broad exposure</span>, no regional bias, the ability to{' '}
            <span className="accent">see</span> form, colour and texture, and a consistent way to
            compare.
          </Reveal>
        </div>
      </section>

      <section className="pipeline">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">Iconicity Classification Algorithm</p>
            <h2 className="section-title">Four Phases to an Objective Label</h2>
            <p className="lead">
              Every phase scores a product from 0 to 1 and applies the same three classes. Each
              phase’s failure shaped the next.
            </p>
          </Reveal>
          <Reveal className="scale" y={0}>
            <div className="track">
              <div className="c1">Conventional</div>
              <div className="c2">Blended</div>
              <div className="c3">Unconventional</div>
            </div>
            <div className="ticks">
              <span style={{ left: '0%' }}>0</span>
              <span style={{ left: '35%' }}>0.35</span>
              <span style={{ left: '65%' }}>0.65</span>
              <span style={{ left: '100%' }}>1</span>
            </div>
          </Reveal>

          <div className="phase-rail">
            {/* Phase 1 */}
            <Reveal className="phase" y={20}>
              <div className="p-n">1</div>
              <div>
                <p className="p-k">Phase 1</p>
                <h3>Text embedding</h3>
                <p>
                  A reference set of <strong>100 mass-market products per category</strong> was
                  scraped with deliberately conservative queries and cleaned with heuristic and CLIP
                  filters. Gemini 2.5 Flash described every product component by component — shape,
                  colour and texture — and each description became a 3072-dimensional vector.
                </p>
                <p>
                  A product’s score came from its cosine dissimilarity to every reference,
                  calibrated against the spread within the reference set itself.
                </p>
                <p className="verdict">
                  Language flattened the visuals. A plain white mug and a twisted sculptural one
                  could both be “white, smooth, ceramic”. Scores compressed into 0.37–0.64, so
                  almost everything landed in blended.
                </p>
              </div>
              <div className="fig-card phase-fig">
                <img
                  src="/images/flavovr-ika-phase1-text-descriptions.jpg"
                  alt="Component-wise structured JSON descriptions of a two-component and a three-component coffee mug, each with shape, colour and texture fields for body, handle and lid"
                />
                <figcaption>Component-wise descriptions generated for two coffee mugs.</figcaption>
              </div>
            </Reveal>

            {/* Phase 2 */}
            <Reveal className="phase" y={20}>
              <div className="p-n">2</div>
              <div>
                <p className="p-k">Phase 2</p>
                <h3>Image embedding</h3>
                <p>
                  The language step was removed. The image itself went to the same Gemini embedding
                  model, producing one vector of its full visual content; calibration and scoring
                  stayed identical. Scores spread out and responded to real appearance.
                </p>
                <p className="verdict">
                  Still centre-biased. Across 147 test images it labelled about{' '}
                  <strong>78% as blended</strong> — desk clocks 100%, coffee mugs 96%, table lamps
                  95%. It measured distance geometrically, with no sense of which side of a category
                  boundary a product belongs on.
                </p>
              </div>
              <div className="fig-card phase-fig">
                <img
                  src="/images/flavovr-ika-image-embedding-pipeline.jpg"
                  alt="Image embedding pipeline: a common pre-processing and embedding sequence; process 1 builds the 100-image reference set and derives frozen calibration parameters from pairwise cosine dissimilarities; process 2 scores a test image against them and applies the thresholds"
                />
                <figcaption>
                  The image-embedding pipeline: build and calibrate the reference set, then score a
                  test image against it.
                </figcaption>
              </div>
            </Reveal>

            {/* Phase 3 */}
            <Reveal className="phase" y={20}>
              <div className="p-n">3</div>
              <div>
                <p className="p-k">Phase 3</p>
                <h3>Vision-language model scoring</h3>
                <p>
                  Large models carry an implicit sense of familiar archetypes from vast training
                  data. Each test image was scored independently by{' '}
                  <strong>Google Gemini 3 (thinking), OpenAI GPT-5.5 and Anthropic Claude Sonnet
                  4.6</strong> with the same prompt, and the three scores were averaged to reduce
                  any one model’s bias.
                </p>
                <p className="verdict">
                  The opposite failure. Blended fell to about 14%, with 54% unconventional and 33%
                  conventional. With no grounding in a reference set, the models pushed moderately
                  unconventional designs into unconventional.
                </p>
              </div>
              <div className="fig-card phase-fig">
                <img
                  src="/images/flavovr-ika-llm-scoring.jpg"
                  alt="An input image of a sculptural mug scored by Gemini 3 thinking (0.85), GPT-5.5 (0.86) and Claude Sonnet 4.6 (0.82); the mean 0.8433 classifies it as unconventional"
                />
                <figcaption>
                  Three models score each image; the mean is classified with the same thresholds.
                </figcaption>
              </div>
            </Reveal>

            {/* Phase 4 */}
            <Reveal className="phase final" y={20}>
              <div className="p-n">4</div>
              <div>
                <p className="p-k">Phase 4 · the final instrument</p>
                <h3>The hybrid IKA</h3>
                <p>
                  The two pipelines failed in mirror image: one over-assigned blended, the other
                  under-assigned it. So IKA <strong>averages them equally</strong>, letting the
                  opposing biases cancel. Any weighting favouring one side would reintroduce its
                  bias; equal weighting produced the most balanced output of the combinations
                  evaluated.
                </p>
                <p className="verdict good">
                  Blended recovered to about 26% — and the scores stay grounded in a fixed,
                  versioned, inspectable reference dataset.
                </p>
              </div>
              <div className="phase-fig">
                <div className="formula" aria-label="S IKA equals S IE plus S LLM, divided by two">
                  S<sub>IKA</sub>
                  <span className="op">=</span>( S<sub>IE</sub>
                  <span className="op">+</span>S<sub>LLM</sub> )<span className="op">/</span>2
                </div>
                <p className="figure-note">
                  S<sub>IE</sub>: image-embedding score. S<sub>LLM</sub>: mean of the three model
                  scores. The thresholds above are applied unchanged.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- 147-image evaluation ---------- */}
      <section className="dark-section dark-fig grain">
        <div className="glow" aria-hidden="true" />
        <div className="wrap">
          <Reveal>
            <p className="finding-tag">Evaluation · 147 test images, 6 everyday categories</p>
            <h2 className="section-title">The Only Pipeline That Fills All Three Classes</h2>
            <p className="lead">
              The same 147-image pool — web-sourced designs across the full style range plus
              FLAVOVR outputs, with no reference images — was carried unchanged through every phase.
              IKA labelled about <strong>28% conventional, 26% blended and 46% unconventional</strong>.
            </p>
          </Reveal>
          <Reveal className="fig-card" y={0}>
            <img
              src="/images/flavovr-ika-label-distribution.jpg"
              alt="Grouped bar chart of output labels across 147 images. Conventional: image embedding 5%, LLM 33%, IKA 28%. Blended: image embedding 78%, LLM 14%, IKA 26%. Unconventional: image embedding 16%, LLM 54%, IKA 46%."
            />
            <figcaption>
              Output label distribution across all six categories (n = 147), for the
              image-embedding, language-model and IKA pipelines.
            </figcaption>
          </Reveal>
        </div>
      </section>

      <section className="finding">
        <div className="wrap">
          <Reveal className="table-wrap" y={0}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Pipeline</th>
                  <th>Conventional</th>
                  <th>Blended</th>
                  <th>Unconventional</th>
                  <th>Normalised entropy</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Image embedding (IE)</td>
                  <td>5%</td>
                  <td>78%</td>
                  <td>16%</td>
                  <td>0.58</td>
                </tr>
                <tr>
                  <td>Language model (LLM)</td>
                  <td>33%</td>
                  <td>14%</td>
                  <td>54%</td>
                  <td>0.90</td>
                </tr>
                <tr className="hi">
                  <td>Hybrid (IKA)</td>
                  <td>28%</td>
                  <td>26%</td>
                  <td>46%</td>
                  <td>0.97</td>
                </tr>
              </tbody>
              <caption>
                Classification output by pipeline across the 147-image pool. Normalised entropy: 1.00
                is a perfectly even three-class split, 0 a total collapse into one class. The three
                distributions differ significantly, χ²(4) = 144.5, p &lt; .001.
              </caption>
            </table>
          </Reveal>

          <div className="two-fig">
            <Reveal className="fig-card" y={0}>
              <img
                src="/images/flavovr-ika-blended-rate.jpg"
                alt="Six small bar charts of blended assignment rate per category for IE, LLM and IKA: coffee mug 96, 19, 23%; wrist watch 50, 6, 22%; perfume bottle 57, 19, 43%; table lamp 95, 14, 18%; desk clock 100, 18, 27%; water bottle 85, 10, 25%"
              />
              <figcaption>
                Blended assignment rate per category: image embedding over-assigns it, the language
                models under-assign it, IKA recovers the middle band.
              </figcaption>
            </Reveal>
            <Reveal className="fig-card" y={0}>
              <img
                src="/images/flavovr-ika-category-distribution.jpg"
                alt="Stacked bars of the three-class label distribution per category for the IE, LLM and IKA pipelines"
              />
              <figcaption>Three-class distribution per category and pipeline.</figcaption>
            </Reveal>
          </div>

          <Reveal>
            <p className="pull">
              IKA was chosen not for the highest score on any single metric,{' '}
              <span className="soft">
                but because it is the only approach that meaningfully populates all three classes
                while staying grounded in a fixed reference dataset.
              </span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- The study ---------- */}
      <section className="dark-section statement-band grain">
        <div className="glow" aria-hidden="true" />
        <div className="wrap">
          <Reveal as="h2">
            Part 03 · The Question<span className="accent">.</span>
          </Reveal>
          <Reveal as="p" delay={0.15}>
            Do generational cohorts show different preferences for{' '}
            <span className="accent">neophilic</span> — novel, unconventional — versus{' '}
            <span className="accent">neophobic</span> — familiar, conventional — design?
          </Reveal>
        </div>
      </section>

      <section className="pipeline">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">The generational study</p>
            <h2 className="section-title">45 People, Four Generations, Six Products</h2>
            <p className="lead">
              A custom survey website showed each participant, for each of six categories — coffee
              mugs, wrist watches, perfume bottles, desk clocks, table lamps and water bottles —
              three groups of four designs drawn from the IKA-classified pool. They chose the group
              they would most likely buy from, <strong>without ever seeing the labels</strong>, and
              assumed identical functionality throughout. They then rated each product, named the
              factors behind their choice and completed an eight-item Design Personality scale.
            </p>
          </Reveal>
          <div className="two-fig">
            <Reveal className="fig-card" y={0}>
              <img
                src="/images/fv-design-groups.png"
                alt="The table lamp category shown as three unlabelled groups of four lamps: conventional, blended and unconventional"
              />
              <figcaption>
                Table lamps as presented: conventional, blended and unconventional groups, labels
                never shown.
              </figcaption>
            </Reveal>
            <Reveal className="fig-card" y={0}>
              <img
                src="/images/flavovr-survey-flow.jpg"
                alt="Survey flow in six stages: demographic information, design category selection, individual product rating, most preferred product and factors, design personality scale, and closing questions"
                style={{ maxWidth: 420, margin: '0 auto' }}
              />
              <figcaption>The six stages of the survey instrument.</figcaption>
            </Reveal>
          </div>
          <Stagger className="stat-row">
            <StaggerItem className="stat">
              <div className="v">45</div>
              <div className="k">participants — 22 male, 23 female</div>
            </StaggerItem>
            <StaggerItem className="stat">
              <div className="v">72</div>
              <div className="k">stimuli: 4 per class × 3 classes × 6 categories</div>
            </StaggerItem>
            <StaggerItem className="stat">
              <div className="v">270</div>
              <div className="k">design-group choices, six per participant</div>
            </StaggerItem>
            <StaggerItem className="stat">
              <div className="v">8</div>
              <div className="k">Design Personality statements, four reverse-scored</div>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* ---------- Generational result ---------- */}
      <section className="dark-section dark-fig grain">
        <div className="glow" aria-hidden="true" />
        <div className="wrap">
          <Reveal>
            <p className="finding-tag">Finding 01 · The behavioural gradient</p>
            <h2 className="section-title">Generation X → Generation Alpha</h2>
            <p className="lead">
              Share of each cohort’s design-group choices that went to the{' '}
              <strong>unconventional</strong> group.
            </p>
          </Reveal>
          <Stagger className="ladder">
            {generations.map((g) => (
              <StaggerItem key={g.g} className="rung">
                <div className="v">
                  {g.u.toFixed(1)}
                  <small>%</small>
                </div>
                <div className="bar" style={{ width: `${(g.u / 40) * 100}%` }} />
                <div className="k">
                  <strong>{g.g}</strong>
                  born {g.born} · n = {g.n}
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal>
            <p className="lead" style={{ marginTop: 40 }}>
              A Cochran–Armitage test confirms a{' '}
              <strong>statistically significant increasing trend</strong> from oldest to youngest (Z
              = 3.20, p = .001), and it survives a conservative correction for each participant
              contributing six choices (Z = 2.26, p = .024). It is not perfectly monotonic: Gen Y
              sits slightly below Gen X — but Gen Y chose <strong>blended</strong> designs 56.9% of
              the time, the highest of any cohort, channelling novelty within familiar boundaries.
              The matching fall in conventional choices is in the predicted direction but not
              significant (p = .072).
            </p>
          </Reveal>
          <div className="two-fig">
            <Reveal className="fig-card" y={0}>
              <img
                src="/images/flavovr-generational-results.jpg"
                alt="Stacked bars of design preference by generation. Gen X: 47% conventional, 33% blended, 20% unconventional. Gen Y: 26%, 57%, 17%. Gen Z: 26%, 39%, 35%. Gen Alpha: 32%, 28%, 40%."
              />
              <figcaption>
                Design preference by generation, as a percentage of all choices across six
                categories (rounded).
              </figcaption>
            </Reveal>
            <Reveal className="fig-card" y={0}>
              <img
                src="/images/flavovr-design-personality-score.jpg"
                alt="Mean composite Design Personality Score by generation: Gen X 2.66, Gen Y 2.79, Gen Z 3.09, Gen Alpha 3.26, on a scale from 1 strongly neophobic to 5 strongly neophilic"
              />
              <figcaption>
                Mean Design Personality Score: 2.66 → 2.79 → 3.09 → 3.26. The two older cohorts sit
                below the neutral midpoint, the two younger above it.
              </figcaption>
            </Reveal>
          </div>
          <Reveal>
            <p className="lead">
              What people chose and what they said about themselves pointed the same way. The
              self-reported scores rise in exactly the hypothesised order — a probability of 1 in 24
              (p = .042) under no generational effect.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- Category level ---------- */}
      <section className="finding">
        <div className="wrap">
          <Reveal>
            <p className="tag">Finding 02 · Category-level differences</p>
            <h2 className="section-title">Novelty Lives Where Identity Does</h2>
            <p className="lead">
              Product category mattered even more than generation (χ²(10) = 43.64, Cramér’s V =
              0.28). Table lamps were the only category where unconventional designs won an
              absolute majority (51%); desk clocks followed (42%). Water bottles (49%) and coffee
              mugs (40%) leaned conventional, and wrist watches sat in a blended middle (60%).
            </p>
          </Reveal>
          <Reveal className="fig-card" y={0}>
            <img
              src="/images/flavovr-generation-category-heatmap.jpg"
              alt="Heatmap of unconventional selection by generation and category. Wrist watch: Gen X 0%, Gen Y 8%, Gen Z 8%, Gen Alpha 60%. Table lamp: 36%, 25%, 83%, 60%. Coffee mug: 27%, 25%, 17%, 20%. Water bottle: 9%, 8%, 17%, 20%."
            />
            <figcaption>
              Unconventional preference across generations and product categories — the percentage
              of each cohort choosing the unconventional group.
            </figcaption>
          </Reveal>
          <div className="split narrow-fig">
            <Reveal className="copy-block">
              <h3>Strongest where products signal identity</h3>
              <p>
                The generational gradient was strongest in expressive, identity-signalling
                categories. Wrist watches showed the sharpest contrast in the study:{' '}
                <strong>0% unconventional in Gen X, 60% in Gen Alpha</strong>. Gen Z chose
                unconventional table lamps 83% of the time.
              </p>
              <p>
                In high-frequency utilitarian products the gradient was{' '}
                <strong>statistically absent</strong>. Coffee mugs and water bottles stayed low in
                every cohort, where ergonomic familiarity appears to override generational
                disposition.
              </p>
            </Reveal>
            <Reveal>
              <div className="trend-list">
                {categoryTrends.map((c) => (
                  <div key={c.cat} className={`tr ${c.yes ? 'yes' : ''}`}>
                    <span className="cat">{c.cat}</span>
                    <span className="stat">{c.stat}</span>
                    <span className="out">
                      <span>{c.out}</span>
                    </span>
                  </div>
                ))}
              </div>
              <p className="figure-note">
                Cochran–Armitage trend in unconventional choice across cohorts, per category.
              </p>
            </Reveal>
          </div>
          <Reveal className="fig-card" y={0}>
            <img
              src="/images/flavovr-category-preference.jpg"
              alt="Grouped bars of design preference by product category across all respondents: coffee mug 40, 38, 22%; wrist watch 22, 60, 18%; perfume bottle 44, 38, 18%; desk clock 11, 47, 42%; table lamp 29, 20, 51%; water bottle 49, 38, 13% (conventional, blended, unconventional)"
              style={{ maxWidth: 820 }}
            />
            <figcaption>Design preference by product category, all respondents.</figcaption>
          </Reveal>
        </div>
      </section>

      {/* ---------- Drivers ---------- */}
      <section className="finding">
        <div className="wrap">
          <Reveal>
            <p className="tag">Finding 03 · What drives the choice</p>
            <h2 className="section-title">Aesthetics Leads</h2>
            <p className="lead">
              Asked for the single biggest driver, <strong>aesthetics</strong> came first (14 of
              45, 31%), ahead of brand reputation (20%), functionality and personal identity (18%
              each). Among Gen Z and Gen Alpha it was the top driver for six participants in each
              cohort; in Gen X, two of eleven; in Gen Y, none.
            </p>
          </Reveal>
          <div className="two-fig">
            <Reveal className="fig-card" y={0}>
              <img
                src="/images/flavovr-purchase-driver.jpg"
                alt="Primary purchase driver across all respondents: aesthetics 14, brand reputation 9, functionality 8, personal identity expression 8, price 4, trend or social influence 2"
              />
              <figcaption>Primary purchase driver across all respondents (n = 45).</figcaption>
            </Reveal>
            <Reveal className="fig-card" y={0}>
              <img
                src="/images/flavovr-purchase-driver-by-generation.jpg"
                alt="Primary purchase driver by generation: aesthetics is top-cited by 6 in Gen Z and 6 in Gen Alpha, 2 in Gen X and 0 in Gen Y"
              />
              <figcaption>
                Primary purchase driver by generation. Small cell counts — read as indicative.
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
            Aesthetic orientation appears to be less a matter of individual taste than of{' '}
            <span className="accent">the visual environment a cohort was formed in</span> — and it
            shows up where a product <span className="accent">affords expression</span>, not where
            routine utility dominates.
          </Reveal>
        </div>
      </section>

      {/* ---------- Implications ---------- */}
      <section className="commitments grain">
        <div className="wrap">
          <Reveal>
            <h2>What It Means for Product Design</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead">
              Four practical points from the study — indicative, given its size.
            </p>
          </Reveal>
          <Stagger className="commit-grid two">
            <StaggerItem>
              <div className="n">01</div>
              <h4>Segment aesthetics by cohort</h4>
              <p>
                The 23-point spread in unconventional preference between Gen Y and Gen Alpha is
                larger than a single house design language usually allows for.
              </p>
            </StaggerItem>
            <StaggerItem>
              <div className="n">02</div>
              <h4>Treat blended as a position</h4>
              <p>
                Blended designs took 40.0% of all choices — more than either pole — and are the
                option least likely to be rejected by any cohort.
              </p>
            </StaggerItem>
            <StaggerItem>
              <div className="n">03</div>
              <h4>Match aesthetic risk to the category</h4>
              <p>
                Ambient, decorative products sustain unconventional preference; frequently handled
                products such as mugs and bottles do not, in every cohort.
              </p>
            </StaggerItem>
            <StaggerItem>
              <div className="n">04</div>
              <h4>Use the classifier as a tool</h4>
              <p>
                A fixed, versioned pipeline can audit where a portfolio sits against category norms
                and track a signature design drifting into convention over time.
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
              <h4>Sample size and place</h4>
              <p>
                Cohorts of 10–12, drawn mainly from southern India. Enough to detect a large ordered
                effect, not to generalise percentages to other cultures.
              </p>
            </StaggerItem>
            <StaggerItem className="iter-panel grain">
              <h4>Clustered choices</h4>
              <p>
                Each person made six non-independent choices. Corrections bound this, but a
                mixed-effects model needs a larger sample.
              </p>
            </StaggerItem>
            <StaggerItem className="iter-panel grain">
              <h4>Explicit, stated preference</h4>
              <p>
                Self-report is open to social desirability, and choosing under identical
                functionality is not purchase behaviour in a market.
              </p>
            </StaggerItem>
            <StaggerItem className="iter-panel grain">
              <h4>An unvalidated classifier</h4>
              <p>
                IKA is not yet validated against trained human raters, and 100 reference images per
                category is a limited sample of the design space.
              </p>
            </StaggerItem>
            <StaggerItem className="iter-panel grain">
              <h4>Next: the implicit level</h4>
              <p>
                Apply FLAVOVR’s gaze-based method directly to the generational comparison, to see
                whether the gradient also appears pre-consciously.
              </p>
            </StaggerItem>
            <StaggerItem className="iter-panel grain">
              <h4>Next: measure exposure</h4>
              <p>
                Measure each person’s cumulative design exposure directly, and test whether it
                mediates the link between birth cohort and preference.
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
            A generation is defined not by its birth year, but by the world it grew up in.
            <br />
            <span className="accent">FLAVOVR</span> designs for the world each of us learned to
            see.
          </Reveal>
        </div>
      </section>

      <ProjectNav slug="flavovr" />
    </article>
  );
}
