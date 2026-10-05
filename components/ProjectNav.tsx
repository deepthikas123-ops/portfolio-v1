import Link from 'next/link';
import { getNeighbours, type Project } from '@/components/projects';

function Side({ label, p, align }: { label: string; p: Project; align: 'left' | 'right' }) {
  return (
    <div style={{ textAlign: align }}>
      <p className="hint">{label}</p>
      {p.live ? (
        <Link href={`/projects/${p.slug}`} className="name">
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
export default function ProjectNav({ slug }: { slug: string }) {
  const { prev, next } = getNeighbours(slug);
  return (
    <nav className="proj-nav" aria-label="Project navigation">
      <div className="wrap row">
        <Side label="Previous project" p={prev} align="left" />
        <Side label="Next project" p={next} align="right" />
      </div>
    </nav>
  );
}
