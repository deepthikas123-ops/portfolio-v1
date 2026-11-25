/**
 * Single source of truth for the portfolio index and case-study navigation.
 */
export type Project = {
  index: string;
  collection: 'project' | 'research';
  slug: string;
  title: string;
  subtitle: string;
  discipline: string;
  live: boolean;
  cover?: string;
  coverClass?: string;
  featured?: boolean;
};
type ProjectInput = Omit<Project, 'index'>;

const list: ProjectInput[] = [
  {
    slug: 'tactile-trails', collection: 'project', title: 'Tactile Trails',
    subtitle: 'A mat that grows with your child',
    discipline: 'Product Design', live: true,
  },
  {
    slug: 'setu', collection: 'project', title: 'SETU',
    subtitle: 'Emergency Logistics System',
    discipline: 'Mechanical Design', live: true, cover: '/images/setucover.png', featured: true,
  },
  {
    slug: 'morse-code-vault', collection: 'project', title: 'Morse Logic Game',
    subtitle: 'A game of signals, switches & logic',
    discipline: 'Circuit Design', live: true, cover: '/images/morse-cover.jpg', featured: true,
  },
  {
    slug: 'eco-shield', collection: 'project', title: 'ECO-SHIELD',
    subtitle: 'Biomimetic UV Coating',
    discipline: 'Material Design', live: true, cover: '/images/ecoshieldcover.png', featured: true,
  },
  {
    slug: 'kaaya', collection: 'project', title: 'KAAYA',
    subtitle: 'Body movement to abstract art',
    discipline: 'Interaction Design', live: true, cover: '/images/kaaya-cover-placeholder.png',
  },
  {
    slug: 'vapours', collection: 'project', title: 'VAPOURS',
    subtitle: 'Sculpting fog in VR to find the form before the form',
    discipline: 'Creative AI · Immersive', live: true, cover: '/images/vapour-cover-placeholder.png',
  },
  {
    slug: 'atomic-user-model', collection: 'research', title: 'Atomic User Model',
    subtitle: 'A structured representation for personality-aware LLM interaction',
    discipline: 'AI Research', live: true, cover: '/images/aum-atom.png',
  },
  {
    slug: 'aesthetic-fingerprint', collection: 'research', title: 'Aesthetic Fingerprint',
    subtitle: 'Immersive VR eye-tracking that reads taste from where the gaze lingers',
    discipline: 'Immersive Interaction', live: true, cover: '/images/gaze-instrument.png',
  },
  {
    slug: 'flavovr', collection: 'research', title: 'FLAVOVR',
    subtitle: 'Gaze-driven product generation and generational preference study',
    discipline: 'Design Research', live: true, cover: '/images/flavovr-system-architecture.png', coverClass: 'fit-contain', featured: true,
  },
  {
    slug: 'calculator-fallacy', collection: 'research', title: 'The Calculator Fallacy',
    subtitle: 'Learners blindly trust confident AI, even when it is wrong',
    discipline: 'Human–AI Trust', live: true, cover: '/images/calculator-fallacy-cover-placeholder.png',
  },
  {
    slug: 'llm-conformity', collection: 'research', title: 'When the Majority Is Wrong',
    subtitle: 'Would AI still follow the crowd? Conformity in multi-agent LLMs',
    discipline: 'AI Research', live: true, cover: '/images/llm-conformity-cover-placeholder.png',
  },
];

export const projects: Project[] = list.map((p, i) => ({ ...p, index: String(i + 1).padStart(2, '0') }));

export function getProject(slug: string): Project {
  const p = projects.find((x) => x.slug === slug);
  if (!p) throw new Error(`Unknown project slug: ${slug}`);
  return p;
}

/** Previous / next project, wrapping around the registry. */
export function getNeighbours(slug: string) {
  const idx = projects.findIndex((p) => p.slug === slug);
  return {
    prev: projects[(idx - 1 + projects.length) % projects.length],
    next: projects[(idx + 1) % projects.length],
  };
}
