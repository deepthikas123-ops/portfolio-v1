/**
 * Single source of truth for every project and research entry in the portfolio.
 *
 * Adding a case study:
 *  1. Add the entry below. Do NOT write a slug: the URL is generated from `title`
 *     (Projects -> /projects/<title-slug>, Research -> /research/<title-slug>).
 *  2. Build the page at app/projects/<title-slug>/page.tsx (app/research/<title-slug>/page.tsx for Research)
 *     and use the same slug in getProject('<title-slug>') and <ProjectNav slug="<title-slug>" />.
 *  3. Set `live: true` and a `cover` image.
 * Renaming a title changes its URL: rename the page folder to match (and add a redirect in vercel.json
 * from the old URL). `npm run build` runs scripts/check-routes.mjs first and stops with a clear message
 * if any folder, getProject() call or ProjectNav slug does not match the title.
 * The header dropdown, mobile menu, home grid, index and prev/next navigation all update automatically.
 * Exhibit numbers come from the order of this array, separately for Projects and Research, so never
 * hard-code a number or count anywhere else.
 */
/**
 * The URL slug is never typed by hand: it is always the entry's `title`, lower-cased and hyphenated
 * ("The Calculator Fallacy" -> the-calculator-fallacy, "ECO-SHIELD" -> eco-shield).
 * scripts/check-routes.mjs (runs before every build) fails if a page folder does not match.
 */
export function slugify(title: string): string {
  return title
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/['\u2018\u2019]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export type Project = {
  index: string; // display index, e.g. '02'
  collection: 'project' | 'research';
  /** Derived from `title` (see slugify), so the URL always follows the title. */
  slug: string;
  title: string;
  subtitle: string;
  /** Short discipline label shown on cards and in the project index. */
  discipline: string;
  live: boolean;
  cover?: string;
  /** CSS class for a generated cover when no image exists (e.g. 'fog-cover'). */
  coverClass?: string;
};

type ProjectInput = Omit<Project, 'index' | 'slug'>;


const list: ProjectInput[] = [
  // ---- Projects ----
  {
    collection: 'project',
    title: 'Tactile Trails',
    subtitle: 'Cognitive-sensory playmat for neurodivergent children — IIT Madras',
    discipline: 'Human-Centred Design',
    live: true,
    cover: '/images/covers/tactile-trails.jpg',
  },
  {
    collection: 'project',
    title: 'SETU',
    subtitle: 'Rapid Deployment Emergency Logistics System',
    discipline: 'Product Design · Electronics',
    live: true,
    cover: '/images/covers/setu.jpg',
  },
  {
    collection: 'project',
    title: 'Morse Code Logic Game',
    subtitle: 'A game of signals, switches and logic',
    discipline: 'Electronics',
    live: true,
    cover: '/images/covers/morse-code-vault.jpg',
  },
  {
    collection: 'project',
    title: 'ECO-SHIELD',
    subtitle: 'Biomimetic UV protective coating for solar panels',
    discipline: 'Biomimetic Design',
    live: true,
    cover: '/images/covers/eco-shield.jpg',
  },
  {
    collection: 'project',
    title: 'KAAYA',
    subtitle: 'Kinaesthetic Abstract Art using Yaw and Attitude',
    discipline: 'Wearable · Creative AI',
    live: true,
    cover: '/images/covers/kaaya.jpg',
  },
  // ---- Research (live case studies first, then placeholders) ----
  {
    collection: 'research',
    title: 'Atomic User Model',
    subtitle: 'A structured representation for personality-aware LLM interaction',
    discipline: 'AI Research',
    live: true,
    cover: '/images/aum-atom.png',
  },
  {
    collection: 'research',
    title: 'Aesthetic Fingerprint',
    subtitle: 'Immersive VR eye-tracking that reads taste from where the gaze lingers',
    discipline: 'Immersive Interaction',
    live: true,
    cover: '/images/gaze-instrument.png',
  },
  {
    collection: 'research',
    title: 'FLAVOVR',
    subtitle:
      'Gaze-driven product generation, an objective iconicity classifier and a four-generation preference study',
    discipline: 'Design Research',
    live: true,
    cover: '/images/flavovr-system-architecture.png',
    coverClass: 'fit-contain',
  },
  {
    collection: 'research',
    title: 'KAAYA',
    subtitle: 'Blind drawing through the body, interpreted by a machine',
    discipline: 'Creative AI',
    live: true,
    cover: '/images/kaaya-cover-placeholder.png',
  },
  {
    collection: 'research',
    title: 'VAPOURS',
    subtitle: 'Sculpting fog in VR to find the form before the form',
    discipline: 'Creative AI · Immersive',
    live: true,
    cover: '/images/vapour-cover-placeholder.png',
  },
  {
    collection: 'research',
    title: 'The Calculator Fallacy',
    subtitle: 'Learners blindly trust confident AI, even when it is wrong',
    discipline: 'Human–AI Trust',
    live: true,
    cover: '/images/calculator-fallacy-cover-placeholder.png',
    coverClass: 'fit-contain fit-light',
  },
  {
    collection: 'research',
    title: 'When the Majority Is Wrong',
    subtitle: 'Would AI still follow the crowd? Conformity in multi-agent LLMs',
    discipline: 'AI Research',
    live: true,
    cover: '/images/llm-conformity-cover-placeholder.png',
  },
  {
    collection: 'research',
    title: 'When a Hundred Machines Agree to Disagree',
    subtitle: 'Visualising synthetic consensus, conflict and compromise among agents in AI-assisted design ideation',
    discipline: 'Design Research · Information+ 2027',
    live: false,
  },
];

// Projects and Research are separate collections, each numbered 01, 02, … in registry order.
const counters: Record<string, number> = {};
export const projects: Project[] = list.map((p) => {
  counters[p.collection] = (counters[p.collection] ?? 0) + 1;
  return { ...p, slug: slugify(p.title), index: String(counters[p.collection]).padStart(2, '0') };
});

/** Public URL path of a case study: Research lives under /research/, everything else under /projects/. */
export function projectHref(p: Pick<Project, 'collection' | 'slug'>): string {
  return `/${p.collection === 'research' ? 'research' : 'projects'}/${p.slug}`;
}

/**
 * A slug is unique within its collection, not across both: a project and a research paper can share a title
 * (KAAYA), and so the same slug. Pass the collection whenever the slug exists in both; this throws at build time
 * if it is needed but missing.
 */
export function getProject(slug: string, collection?: Project['collection']): Project {
  const matches = projects.filter((x) => x.slug === slug && (!collection || x.collection === collection));
  if (matches.length === 0) throw new Error(`Unknown ${collection ?? 'project or research'} slug: ${slug}`);
  if (matches.length > 1) throw new Error(`Slug "${slug}" exists in both collections; pass 'project' or 'research'.`);
  return matches[0];
}

/**
 * Previous / next entry within the same collection (Projects or Research), wrapping around. Projects that are not
 * live yet are skipped so readers never land on a "coming soon" dead end; the
 * current slug is always kept so a not-yet-live page can still find its place.
 */
export function getNeighbours(slug: string, collection?: Project['collection']) {
  const current = getProject(slug, collection);
  const navigable = projects.filter((p) => p.collection === current?.collection && (p.live || p.slug === slug));
  const idx = navigable.findIndex((p) => p.slug === slug);
  return {
    prev: navigable[(idx - 1 + navigable.length) % navigable.length],
    next: navigable[(idx + 1) % navigable.length],
  };
}
