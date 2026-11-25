import Link from 'next/link';
import { Reveal, Stagger, StaggerItem } from '@/components/Motion';
import BadgeHero from '@/components/BadgeHero';
import Corkboard from '@/components/Corkboard';
import { projects } from '@/components/projects';

function Cards({ items }: { items: typeof projects }) {
  return <Stagger as="ul" className="index-card-grid">{items.map((p) => (
    <StaggerItem as="li" key={p.slug}>
      {p.live ? (
        <Link href={`/projects/${p.slug}`} className="index-card">
          <div className={`index-card-image ${p.coverClass ?? ''}`}>
            {p.cover ? <img src={p.cover} alt="" loading="lazy" /> : <span aria-hidden="true">{p.title}</span>}
            <span className="index-card-number">EXHIBIT {p.index}</span>
          </div>
          <div className="index-card-copy">
            <span className="index-card-discipline">{p.discipline}</span>
            <h3>{p.title}</h3><p>{p.subtitle}</p>
            <span className="index-card-link">Explore case study ↗</span>
          </div>
        </Link>
      ) : (
        <div className="index-card is-placeholder">
          <div className={`index-card-image ${p.coverClass ?? ''}`}>
            {p.cover ? <img src={p.cover} alt="" loading="lazy" /> : <span aria-hidden="true">{p.title}</span>}
            <span className="index-card-number">EXHIBIT {p.index}</span>
            <span className="index-card-soon">COMING SOON</span>
          </div>
          <div className="index-card-copy">
            <span className="index-card-discipline">{p.discipline}</span>
            <h3>{p.title}</h3><p>{p.subtitle}</p>
            <span className="index-card-link is-soon">Documentation in progress</span>
          </div>
        </div>
      )}
    </StaggerItem>
  ))}</Stagger>;
}

export default function Home() {
  // registry order decides the sequence (and the exhibit numbers) inside each collection
  const inCollection = (c: 'project' | 'research') => projects.filter((p) => p.collection === c);
  const liveProjects = inCollection('project');
  const research = inCollection('research');
  return <>
    <BadgeHero />

    <section className="index-note" id="collection"><div className="wrap index-note-grid">
      <Reveal><p className="index-section-kicker">01 / THE COLLECTION</p><h2>Not quite a portfolio.<br /><em>Not quite a diary.</em></h2></Reveal>
      <Reveal className="index-note-copy" delay={0.12}><p>I’m an electronics engineering student drawn to the space where useful things meet thoughtful experiences. I move between making, observing and asking questions: building physical prototypes, exploring digital interactions, and studying how people respond to technology.</p><p>This index brings those different threads together. There is no particular order to the exhibition. Neither is there to my brain.</p><Link href="/about" className="text-link">A little more about the curator ↗</Link></Reveal>
    </div></section>

    <section className="index-collection-section" id="projects"><div className="wrap">
      <div className="index-section-heading"><div><p className="index-section-kicker">02 / THINGS I HAVE MADE</p><h2>Projects</h2></div><p>Prototypes, products and playful attempts at making an idea tangible.</p></div>
      <Cards items={liveProjects} />
    </div></section>

    <section className="index-research-section" id="research"><div className="wrap">
      <div className="index-section-heading"><div><p className="index-section-kicker">03 / QUESTIONS I KEEP FOLLOWING</p><h2>Research</h2></div><p>Investigations into perception, interaction, creativity and the ways people relate to AI.</p></div>
      <Cards items={research} />
    </div></section>

    <section className="index-maker-section" id="maker"><div className="wrap">
      <p className="index-section-kicker">04 / THE MAKER</p><div className="index-maker-grid"><div><h2>Somewhere between<br /><em>art, design & engineering.</em></h2><p className="index-maker-intro">I like ideas that can be felt, tested, questioned and made real. My work often begins with a human observation, takes shape through design, and finds its way into the world through technology.</p><Link href="/about" className="text-link">Meet the maker ↗</Link></div>
      <div className="index-intersection" aria-label="Art, design and engineering overlap in my practice"><div className="intersection-circle circle-art"><span>ART</span></div><div className="intersection-circle circle-design"><span>DESIGN</span></div><div className="intersection-circle circle-engineering"><span>ENGINEERING</span></div><span className="intersection-centre">ME</span></div></div>
    </div></section>

    <section className="index-curiosities" id="curiosities"><div className="wrap">
      <div className="index-section-heading"><div><p className="index-section-kicker">05 / CABINET OF CURIOSITIES</p></div><p>A few interests that find their way into the way I think and make.</p></div>
      <Corkboard />
    </div></section>

    <section className="index-endnote"><div className="wrap index-endnote-inner"><p className="index-section-kicker">06 / BEFORE YOU LEAVE</p><h2>Have something<br /><em>interesting in mind?</em></h2><p>I’m always happy to talk about design, research, making, and ideas that refuse to sit in one category.</p><a href="mailto:deepthikas123@gmail.com" className="index-primary-link">Get in touch ↗</a></div></section>
  </>;
}
