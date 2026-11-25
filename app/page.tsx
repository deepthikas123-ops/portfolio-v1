import Link from 'next/link';
import { Reveal, Stagger, StaggerItem } from '@/components/Motion';
import { projects } from '@/components/projects';

function Cards({ items, prefix }: { items: typeof projects; prefix: string }) {
  return <Stagger className={`index-card-grid ${prefix}-grid`}>{items.map((p, i) => (
    <StaggerItem key={p.slug}>
      <Link href={`/projects/${p.slug}`} className="index-card">
        <div className="index-card-head">
          <span className="index-card-number">{p.index}</span>
          <span className="index-card-title">{p.title}</span>
        </div>
        <div className={`index-card-image ${p.coverClass ?? ''}`}>
          {p.cover ? <img src={p.cover} alt={p.title} loading="lazy" /> : <span className="index-card-placeholder">IMAGE<br />DOCUMENTATION<br />IN PROGRESS</span>}
          <span className="index-card-arrow" aria-hidden="true">↗</span>
        </div>
        <div className="index-card-copy">
          <p className="index-card-hook">{p.subtitle}</p>
          <span className="index-card-discipline">{p.discipline}</span>
        </div>
      </Link>
    </StaggerItem>
  ))}</Stagger>;
}

export default function Home() {
  const liveProjects = projects.filter((p) => p.live && p.collection === 'project');
  const research = projects.filter((p) => p.live && p.collection === 'research');
  const archived = projects.filter((p) => !p.live);
  return <>
    <section className="index-hero">
      <div className="index-hero-top"><span>PERSONAL COLLECTION / EST. 2026</span><span>COIMBATORE, INDIA</span></div>
      <div className="index-hero-main">
        <Reveal className="index-hero-copy">
          <p className="index-eyebrow">THE DEEPTHIKA INDEX <span>— NO. 001</span></p>
          <h1>An index of<br /><em>things that make me.</em></h1>
          <p className="index-intro">A growing collection of objects, ideas, experiments and questions. Part design practice, part engineering notebook, part personal archive. Curated by Deepthika S.</p>
          <div className="index-hero-actions"><a href="#projects" className="index-primary-link">View selected work <span>↓</span></a><Link href="/about" className="index-secondary-link">Read the curator’s note ↗</Link></div>
        </Reveal>
        <Reveal className="index-hero-art" delay={0.18}>
          <div className="index-art-frame"><span className="index-art-label label-top">A STUDY IN CURIOSITY</span><div className="index-art-orbit orbit-one" /><div className="index-art-orbit orbit-two" /><div className="index-art-object"><span>DS</span></div><span className="index-art-label label-bottom">ART × DESIGN × ENGINEERING</span></div>
          <p className="index-art-caption">FIG. 01 — A MIND IN SEVERAL DIRECTIONS</p>
        </Reveal>
      </div>
      <div className="index-hero-foot"><span>ART × DESIGN × ENGINEERING</span><span>SCROLL TO EXPLORE ↓</span></div>
    </section>

    <section className="index-note" id="collection"><div className="wrap index-note-grid">
      <Reveal><p className="index-section-kicker">00 / THE COLLECTION</p><h2>Not quite a portfolio.<br /><em>Not quite a diary.</em></h2></Reveal>
      <Reveal className="index-note-copy" delay={0.12}><p>I’m an electronics engineering student drawn to the space where useful things meet thoughtful experiences. I move between making, observing and asking questions: building physical prototypes, exploring digital interactions, and studying how people respond to technology.</p><p>This index brings those different threads together. There is no particular order to the exhibition. Neither is there to my brain.</p><Link href="/about" className="text-link">A little more about the curator ↗</Link></Reveal>
    </div></section>

    <section className="index-collection-section" id="projects"><div className="wrap">
      <div className="index-section-heading"><div><p className="index-section-kicker">01 / SELECTED WORK</p><h2>Projects</h2></div><p>Products, prototypes and playful attempts at making an idea tangible.</p></div>
      <Cards items={liveProjects} prefix="projects" />
      {archived.length > 0 && <div className="index-archive"><p className="index-section-kicker">IN THE WORKSHOP / DOCUMENTATION IN PROGRESS</p>{archived.map((p) => <Link href={`/projects/${p.slug}`} className="index-archive-row" key={p.slug}><span>{p.index}</span><strong>{p.title}</strong><span>{p.subtitle}</span><span>VIEW ENTRY ↗</span></Link>)}</div>}
    </div></section>

    <section className="index-research-section" id="research"><div className="wrap">
      <div className="index-section-heading"><div><p className="index-section-kicker">02 / INVESTIGATIONS</p><h2>Research</h2></div><p>Studies into perception, interaction, creativity and the ways people relate to AI.</p></div>
      <Cards items={research} prefix="research" />
    </div></section>

    <section className="index-maker-section" id="maker"><div className="wrap">
      <p className="index-section-kicker">03 / THE MAKER</p><div className="index-maker-grid"><div><h2>Somewhere between<br /><em>art, design & engineering.</em></h2><p className="index-maker-intro">I like ideas that can be felt, tested, questioned and made real. My work often begins with a human observation, takes shape through design, and finds its way into the world through technology.</p><Link href="/about" className="text-link">Meet the maker ↗</Link></div>
      <div className="index-intersection" aria-label="Art, design and engineering overlap in my practice"><div className="intersection-circle circle-art"><span>ART</span></div><div className="intersection-circle circle-design"><span>DESIGN</span></div><div className="intersection-circle circle-engineering"><span>ENGINEERING</span></div><span className="intersection-centre">ME</span></div></div>
    </div></section>

    <section className="index-curiosities" id="curiosities"><div className="wrap">
      <div className="index-section-heading"><div><p className="index-section-kicker">04 / CABINET OF CURIOSITIES</p><h2>Things I keep close.</h2></div><p>A few interests that find their way into the way I think and make.</p></div>
      <div className="curiosity-grid">
        <article className="curiosity-card curiosity-large"><span>COLLECTING / 001</span><h3>Visual stories</h3><p>Graphic design, composition, colour, and the small details that make an image stay with you.</p></article>
        <article className="curiosity-card curiosity-green"><span>COLLECTING / 002</span><h3>Making by hand</h3><p>Art, calligraphy, journaling and the pleasure of working things out on paper.</p></article>
        <article className="curiosity-card curiosity-photo"><span>COLLECTING / 003</span><h3>Growing things</h3><p>Gardening, slow observations and learning to be patient with a process.</p></article>
        <article className="curiosity-card curiosity-small"><span>COLLECTING / 004</span><h3>How things work</h3><p>Everyday objects, mechanisms, interfaces and the decisions hiding inside them.</p></article>
      </div><p className="index-curiosity-foot">Some exhibits are unfinished. The curator insists they’re works in progress.</p>
    </div></section>

    <section className="index-endnote"><div className="wrap index-endnote-inner"><p className="index-section-kicker">05 / CONTACT</p><h2>Have something<br /><em>interesting in mind?</em></h2><p>I’m always happy to talk about design, research, making, and ideas that refuse to sit in one category.</p><a href="mailto:deepthikas123@gmail.com" className="index-primary-link">Get in touch ↗</a></div></section>
  </>;
}
