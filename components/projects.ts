/**
 * Single source of truth for every project in the portfolio.
 *
 * When a new case-study page is ready:
 *  1. Build the page under app/projects/<slug>/page.tsx
 *  2. Add / flip the entry here (`live: true` plus a `cover` image)
 * The header dropdown, mobile menu, home grid, project index and prev/next
 * navigation all update automatically. Project numbers are derived from the
 * order of this array, so never hard-code a count anywhere else.
 */
export type Project = {
  index: string; // display index, e.g. '02'
  slug: string;
  title: string;
  subtitle: string;
  /** Short discipline label shown on cards and in the project index. */
  discipline: string;
  live: boolean;
  cover?: string;
  /** CSS class for a generated cover when no image exists (e.g. 'fog-cover'). */
  coverClass?: string;
  /** Feature this project as a full-width card on the home page. */
  featured?: boolean;
};

type ProjectInput = Omit<Project, 'index'>;

const list: ProjectInput[] = [
  {
    slug: 'tactile-trails',
    title: 'Tactile Trails',
    subtitle: 'Cognitive-sensory playmat for neurodivergent children — IIT Madras',
    discipline: 'Human-Centred Design',
    live: false,
  },
  {
    slug: 'setu',
    title: 'SETU',
    subtitle: 'Rapid Deployment Emergency Logistics System',
    discipline: 'Product Design · Electronics',
    live: true,
    cover: '/images/flood.jpg',
    featured: true,
  },
  {
    slug: 'eco-shield',
    title: 'ECO-SHIELD',
    subtitle: 'Biomimetic UV protective coating for solar panels',
    discipline: 'Biomimetic Design',
    live: false,
  },
  {
    slug: 'morse-code-vault',
    title: 'Morse Code Logic Vault',
    subtitle: 'Multi-level secure-access logic vault game',
    discipline: 'Electronics',
    live: false,
  },
  {
    slug: 'chain-snatch-alert',
    title: 'Chain-Snatch Alert',
    subtitle: 'IoT wearable for chain-snatching detection and alerts',
    discipline: 'Electronics',
    live: false,
  },
  {
    slug: 'atomic-user-model',
    title: 'Atomic User Model',
    subtitle: 'A structured representation for personality-aware LLM interaction',
    discipline: 'AI Research',
    live: true,
    cover: '/images/aum-atom.png',
  },
  {
    slug: 'aesthetic-fingerprint',
    title: 'Aesthetic Fingerprint',
    subtitle: 'Immersive VR eye-tracking that reads taste from where the gaze lingers',
    discipline: 'Immersive Interaction',
    live: true,
    cover: '/images/gaze-instrument.png',
  },
  {
    slug: 'flavovr',
    title: 'FLAVOVR',
    subtitle:
      'Gaze-driven product generation, an objective iconicity classifier and a four-generation preference study',
    discipline: 'Design Research',
    live: true,
    cover: '/images/flavovr-system-architecture.png',
    coverClass: 'fit-contain',
    featured: true,
  },
  {
    slug: 'kaaya',
    title: 'KAAYA',
    subtitle: 'Blind drawing through the body, interpreted by a machine',
    discipline: 'Creative AI',
    live: true,
    cover: '/images/kaaya-cover-placeholder.png',
  },
  {
    slug: 'vapours',
    title: 'VAPOURS',
    subtitle: 'Sculpting fog in VR to find the form before the form',
    discipline: 'Creative AI · Immersive',
    live: true,
    cover: '/images/vapour-cover-placeholder.png',
  },
  {
    slug: 'calculator-fallacy',
    title: 'The Calculator Fallacy',
    subtitle: 'Learners blindly trust confident AI, even when it is wrong',
    discipline: 'Human–AI Trust',
    live: true,
    cover: '/images/calculator-fallacy-cover-placeholder.png',
  },
  {
    slug: 'llm-conformity',
    title: 'When the Majority Is Wrong',
    subtitle: 'Would AI still follow the crowd? Conformity in multi-agent LLMs',
    discipline: 'AI Research',
    live: true,
    cover: '/images/llm-conformity-cover-placeholder.png',
  },
];

export const projects: Project[] = list.map((p, i) => ({
  ...p,
  index: String(i + 1).padStart(2, '0'),
}));

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
