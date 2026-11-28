import Link from 'next/link';
import { getNeighbours, projectHref, type Project } from '@/components/projects';

function Side({ label, p, align }: { label: string; p: Project; align: 'left' | 'right' }) {
  return (
    <div style={{ textAlign: align }}>
      <p className="hint">{label}</p>
      {p.live ? (
        <Link href={projectHref(p)} className="name">
          <span className="nav-idx">{p.index}</span>
          {p.title}
        </Link>
      ) : (
        <p className="name">
          <span className="nav-idx">{p.index}</span>
          {p.title}
          <span className="soon-mark">coming soon</span>
        </p>
      )}
    </div>
  );
}

/** Previous / next project links, derived from the project registry. */
export default function ProjectNav({ slug, collection }: { slug: string; collection?: Project['collection'] }) {
  const { prev, next } = getNeighbours(slug, collection);
  const noun = prev.collection === 'research' ? 'research' : 'project';
  return (
    <nav className="proj-nav" aria-label="Project navigation">
      <div className="wrap row">
        <Side label={`Previous ${noun}`} p={prev} align="left" />
        <Side label={`Next ${noun}`} p={next} align="right" />
      </div>
    </nav>
  );
}
