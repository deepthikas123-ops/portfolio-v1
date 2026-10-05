import Link from 'next/link';
import { Reveal } from '@/components/Motion';
import { projects } from '@/components/projects';

export default function ComingSoon({ slug }: { slug: string }) {
  const p = projects.find((x) => x.slug === slug)!;
  return (
    <section className="coming">
      <span className="ghost-num" aria-hidden="true">
        {p.index}
      </span>
      <div className="wrap inner">
        <Reveal>
          <span className="pill">Case study in progress</span>
          <h1>{p.title}</h1>
          <p>{p.subtitle}. This case study is being documented and will be published here soon.</p>
          <Link href="/" className="back">
            ← Back to selected work
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
