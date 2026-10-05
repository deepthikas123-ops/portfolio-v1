import type { Metadata } from 'next';
import { Reveal, Stagger, StaggerItem } from '@/components/Motion';
import ProjectNav from '@/components/ProjectNav';
import { getProject } from '@/components/projects';
import './eco-shield.css';

const p = getProject('eco-shield');

export const metadata: Metadata = {
  title: 'ECO-SHIELD — A Biomimetic UV Protective Coating | Deepthika S',
  description:
    'ECO-SHIELD is a nature-inspired surface system that protects solar cells from prolonged UV exposure while improving the transmission of useful light — combining the moth eye’s anti-reflective structure with the edelweiss’s UV-dissipating micro-hairs.',
  openGraph: {
    title: 'ECO-SHIELD — A Biomimetic UV Protective Coating',
    description:
      'One surface, two functions: let useful light in, keep harmful UV out. Inspired by the moth eye and the alpine edelweiss.',
    images: ['/images/eco-shield-render.jpg'],
  },
};

const stats = [
  {
    v: '11.8%',
    k: 'Power loss',
    d: 'in modern high-efficiency solar cells after accelerated UV exposure testing',
  },
  {
    v: '4–7%',
    k: 'Efficiency loss',
    d: 'in industrial PV modules after ~25 sunny days of equivalent UV exposure',
  },
  {
    v: '−4.5%',
    k: 'Field degradation / year',
    d: 'for panels installed in high-UV climates',
  },
];

const applications = [
  {
    n: '01',
    t: 'Architecture',
    items: 'Glass façades · Skylights · Windows · Public infrastructure',
    img: '/images/eco-shield-app-architecture.jpg',
    alt: 'A glass-fronted building catching warm evening sunlight',
  },
  {
    n: '02',
    t: 'Optical surfaces',
    items: 'Eyewear · Camera lenses · Displays · Optical instruments',
    img: '/images/eco-shield-app-optics.jpg',
    alt: 'A pair of glasses resting on a table in warm light',
  },
  {
    n: '03',
    t: 'UV-sensitive equipment',
    items: 'Medical devices · Laboratory equipment · Electronic enclosures · Outdoor systems',
    img: '/images/eco-shield-app-equipment.jpg',
    alt: 'Laboratory equipment inside a transparent enclosure',
  },
];

export default function EcoShieldPage() {
  return (
    <article>
      {/* ---------- Hero ---------- */}
      <section className="eco-hero grain">
        <div className="bg" aria-hidden="true" />
        <span className="ghost" aria-hidden="true">
          {p.index}
        </span>
        <div className="hero-grid">
          <Reveal as="figure" className="card" delay={0.15}>
            <img
              src="/images/eco-shield-render.jpg"
              alt="Rendering of the ECO-SHIELD coating as separated layers: a cone-textured anti-reflective layer, a fibrous UV-scattering layer and a base layer above a solar cell"
            />
            <figcaption>
              Coursework · Nature Inspired Engineering
              <br />
              Group project · 2024 | 1 week
            </figcaption>
          </Reveal>
          <div className="copy">
            <Reveal delay={0.3}>
              <p className="kicker">Biomimetic Design</p>
              <h1>ECO-SHIELD.</h1>
              <p className="sub">A Biomimetic UV Protective Coating</p>
            </Reveal>
            <Reveal delay={0.45}>
              <p className="desc">
                A nature-inspired surface system developed to protect solar cells from the damaging
                effects of prolonged UV exposure while improving the transmission of useful light.
              </p>
            </Reveal>
            <Reveal delay={0.6}>
              <div className="sdg-row">
                <img src="/images/eco-shield-sdg-7.png" alt="UN Sustainable Development Goal 7: Affordable and clean energy" />
                <img src="/images/eco-shield-sdg-9.png" alt="UN Sustainable Development Goal 9: Industry, innovation and infrastructure" />
                <img src="/images/eco-shield-sdg-12.png" alt="UN Sustainable Development Goal 12: Responsible consumption and production" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- 01 The problem ---------- */}
      <section className="eco-sun">
        <div className="bg" aria-hidden="true" />
        <div className="inner">
          <Reveal>
            <p className="kicker">01 / The problem</p>
            <h2>
              The sun that powers the solar cells
              <br />
              also slowly breaks them down.
            </h2>
            <p>
              Solar panels spend decades exposed to intense sunlight. Within that spectrum,{' '}
              <strong>UV radiation</strong> gradually attacks the materials protecting the cells,
              initiating degradation that can reduce performance over time.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="finding" style={{ borderTop: 'none', paddingTop: 30 }}>
        <div className="wrap">
          <Stagger className="stat-row eco-stats">
            {stats.map((s) => (
              <StaggerItem key={s.k} className="stat">
                <div className="v">{s.v}</div>
                <div className="k">
                  <strong>{s.k}</strong>
                  {s.d}
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal>
            <p className="pull">
              If sunlight is both the source of energy and the source of degradation,{' '}
              <span className="soft">the surface needs to distinguish between the two.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- 02 Design intent ---------- */}
      <section className="band">
        <div className="wrap">
          <Reveal className="band-head">
            <p className="tag">02 / Design intent</p>
            <h2 className="section-title">One Surface. Two Functions.</h2>
            <p>
              Just as a serum with SPF combines nourishment and sun protection, we asked: what if a
              single surface could combine two complementary functions — letting more light in
              while keeping UV out?
            </p>
          </Reveal>
          <Reveal className="fig-card" y={0}>
            <img
              src="/images/eco-shield-design-intent.png"
              alt="Analogy panel: serum (nourish) plus sunscreen (protect) equals a 2-in-1 benefit. Translated to solar cells as a Venn diagram: Maximise — reduce reflection and increase light transmission; Protect — reduce the amount of UV reaching the cell. The intersection led to ECO-SHIELD."
            />
            <figcaption>
              From a skincare analogy to a surface brief: maximise useful light, protect against
              harmful UV. The intersection led to ECO-SHIELD.
            </figcaption>
          </Reveal>
        </div>
      </section>

      <section className="dark-section quote-band grain">
        <div className="glow" aria-hidden="true" />
        <div className="wrap">
          <Reveal as="p">
            Maximise the <span className="accent">useful</span>. Minimise the{' '}
            <span className="accent">harmful</span>.
          </Reveal>
        </div>
      </section>

      {/* ---------- 03 Nature as inspiration ---------- */}
      <section className="finding" style={{ borderTop: 'none' }}>
        <div className="wrap">
          <Reveal>
            <p className="tag">03 / Nature as inspiration</p>
            <h2 className="section-title">Two Organisms That Already Solved It</h2>
          </Reveal>
          <div className="nature-grid">
            <Reveal className="organism">
              <img
                className="hero-img"
                src="/images/eco-shield-edelweiss.jpg"
                alt="An alpine edelweiss flower with woolly white bracts"
              />
              <h3>Alpine edelweiss</h3>
              <p className="lede">
                Thriving at high altitudes, where UV exposure is intense, the plant’s UV-protective
                fibres shield its cells, dissipating harmful UV energy.
              </p>
              <div className="circles">
                <figure>
                  <img
                    src="/images/eco-shield-edelweiss-flower-detail.jpg"
                    alt="Close-up of the edelweiss flower head"
                  />
                  <figcaption>flower head</figcaption>
                </figure>
                <figure>
                  <img
                    src="/images/eco-shield-edelweiss-micro-hairs.jpg"
                    alt="Magnified micro-hair fibres covering the edelweiss"
                  />
                  <figcaption>micro-hair structures</figcaption>
                </figure>
              </div>
              <p className="mechanism">
                The micro-hairs have a slit width of 0.18 μm, which corresponds to the wavelength of
                UV radiation. UV is dissipated and trapped within the fibres before it reaches the
                cell.
              </p>
            </Reveal>
            <Reveal className="organism" delay={0.1}>
              <img
                className="hero-img"
                src="/images/eco-shield-moth.png"
                alt="A moth photographed head-on, its large compound eyes visible"
              />
              <h3>Moth</h3>
              <p className="lede">
                The compound eyes of moths feature corneal nipples on their facet lenses, enhancing
                light transmission and providing anti-reflective properties.
              </p>
              <div className="circles">
                <figure>
                  <img
                    src="/images/eco-shield-moth-cuticular-protuberances.jpg"
                    alt="Electron micrograph of a regular array of cuticular protuberances"
                  />
                  <figcaption>cuticular protuberances</figcaption>
                </figure>
                <figure>
                  <img
                    src="/images/eco-shield-moth-compound-eye.jpg"
                    alt="Electron micrograph of a moth’s domed compound eye covered in facets"
                  />
                  <figcaption>compound eye</figcaption>
                </figure>
              </div>
              <p className="mechanism">
                A gradual refractive index reduces reflection, allowing more light to enter and
                enhancing vision in low-light conditions.
              </p>
            </Reveal>
          </div>
          <Reveal>
            <p className="pull">
              Two unrelated organisms. One common principle.{' '}
              <span className="soft">Controlling light at the micro scale.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- 04 Ideation & renderings ---------- */}
      <section className="band">
        <div className="wrap">
          <Reveal className="band-head">
            <p className="tag">04 / Ideation &amp; renderings</p>
            <h2 className="section-title">From Sketch to Surface</h2>
            <p>
              Hand sketches explored cone and frustum geometries for the anti-reflective surface,
              modelled on the moth’s corneal nipples, and a mesh of micro-hairs — micro-tubules with
              a 0.18 μm slit — for the UV-scattering layer. The layers were then resolved into an
              exploded and a sectioned rendering.
            </p>
          </Reveal>
          <div className="split eco-ideation">
            <Reveal as="figure" className="photo" y={0}>
              <img
                src="/images/eco-shield-sketches.jpg"
                alt="Hand-drawn sketch sheet: conical, frustum and corneal-nipple geometries; Layer 1 anti-reflective surface; a layered stack with base layer; micro-hairs forming a mesh-like structure; a micro-tubule with a 0.18 μm slit where energy dissipates and gets trapped; Layer 2 UV scattering layer"
              />
              <figcaption>Ideation sketches.</figcaption>
            </Reveal>
            <Reveal as="figure" className="photo" y={0} delay={0.1}>
              <img
                src="/images/eco-shield-renders.jpg"
                alt="Renderings: an exploded view of three layers, a section view of the assembled coating, and close-ups of Layer 1, Layer 2 and Layer 3"
              />
              <figcaption>Exploded view, section view and the three coating layers.</figcaption>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Introducing ECO-SHIELD ---------- */}
      <section className="finding" style={{ borderTop: 'none' }}>
        <div className="wrap">
          <Reveal>
            <p className="tag">05 / Introducing</p>
            <h2 className="section-title eco-title">ECO-SHIELD.</h2>
          </Reveal>
          <div className="split eco-intro">
            <Reveal as="figure" className="photo" y={0}>
              <img
                src="/images/eco-shield-moth-eye-plus-edelweiss.jpg"
                alt="Moth eye — maximum light transmission — plus edelweiss — protect from UV radiation"
              />
            </Reveal>
            <Reveal as="figure" className="photo" y={0} delay={0.1}>
              <img
                src="/images/eco-shield-layer-stack.jpg"
                alt="Exploded rendering of ECO-SHIELD on a solar cell, with four labelled layers: 01 anti-reflective layer, magnesium fluoride; 02 UV scattering layer, polycarbonate micro-hairs; 03 base and adhesion layer, PMMA with cross-linking agents; 04 the substrate to which the coating is applied, solar cells"
              />
            </Reveal>
          </div>
          <Stagger className="sequence c4">
            <StaggerItem>
              <div className="s-n">01</div>
              <div className="s-k">Moth eye</div>
              <h4>Anti-reflective layer</h4>
              <p>Magnesium fluoride (MgF₂)</p>
            </StaggerItem>
            <StaggerItem>
              <div className="s-n">02</div>
              <div className="s-k">Edelweiss</div>
              <h4>UV scattering layer</h4>
              <p>Polycarbonate micro-hairs</p>
            </StaggerItem>
            <StaggerItem>
              <div className="s-n">03</div>
              <div className="s-k">Base</div>
              <h4>Base / adhesion layer</h4>
              <p>PMMA + cross-linking agents</p>
            </StaggerItem>
            <StaggerItem>
              <div className="s-n">04</div>
              <div className="s-k">Substrate</div>
              <h4>Solar cells</h4>
              <p>The surface the coating is applied to</p>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* ---------- How it works ---------- */}
      <section className="dark-section dark-fig grain">
        <div className="glow" aria-hidden="true" />
        <div className="wrap">
          <Reveal>
            <p className="finding-tag">How it works</p>
            <h2 className="section-title">UV Is Trapped. Visible Light Gets Through.</h2>
            <p className="lead">
              By combining two natural strategies, ECO-SHIELD lets useful light through while
              protecting the cell from harmful UV.
            </p>
          </Reveal>
          <Reveal className="fig-card fig-wide" y={0}>
            <img
              src="/images/eco-shield-how-it-works.jpg"
              alt="Two side-by-side sections of the coating. Left: UV light enters and bounces within the fibre layer — trapped and absorbed. Right: visible light passes straight through to the cell — transmitted and utilised."
            />
            <figcaption>
              Left: UV light is scattered within the micro-hair layer — trapped and absorbed. Right:
              visible light passes through — transmitted and utilised.
            </figcaption>
          </Reveal>
        </div>
      </section>

      {/* ---------- 06 Applications ---------- */}
      <section className="finding">
        <div className="wrap">
          <Reveal>
            <p className="tag">06 / Applications</p>
            <h2 className="section-title">Beyond Solar Panels</h2>
            <p className="lead">
              The same surface strategy can be adapted wherever light, reflection and UV exposure
              need to be managed.
            </p>
          </Reveal>
          <Stagger className="apps">
            {applications.map((a) => (
              <StaggerItem key={a.n} className="app">
                <img src={a.img} alt={a.alt} loading="lazy" />
                <div className="app-n">{a.n}</div>
                <h4>{a.t}</h4>
                <p>{a.items}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---------- Closing ---------- */}
      <section className="dark-section closing grain" style={{ background: 'var(--dark-3)' }}>
        <div className="glow" aria-hidden="true" />
        <div className="wrap">
          <Reveal as="p">
            The sun gives solar cells their power.
            <br />
            <span className="accent">ECO-SHIELD</span> helps preserve it over time.
          </Reveal>
        </div>
      </section>

      <ProjectNav slug="eco-shield" />
    </article>
  );
}
