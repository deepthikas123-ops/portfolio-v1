/**
 * Guards the "URL follows the title" rule. Runs automatically before `npm run build` (see package.json).
 *
 * For every entry in components/projects.ts the public URL is /projects/<slug> or /research/<slug>, where the
 * slug is generated from the entry's title. This script fails the build if:
 *  - a live entry has no page at app/<projects|research>/<slug>/page.tsx
 *  - a page folder exists that no entry in the registry produces (e.g. a title was renamed but the folder was not)
 *  - a page's getProject('...') or <ProjectNav slug="..." /> does not match its own folder (or its collection)
 *  - two entries in one collection produce the same slug
 */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const ts = require('typescript');

const src = readFileSync(join(root, 'components/projects.ts'), 'utf8');
const js = ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } }).outputText;
const { projects } = await import('data:text/javascript;base64,' + Buffer.from(js).toString('base64'));

const dirs = { project: 'projects', research: 'research' };
const problems = [];
const seen = new Set();

for (const p of projects) {
  const key = `${p.collection}/${p.slug}`;
  if (seen.has(key)) problems.push(`Two ${p.collection} entries produce the slug "${p.slug}". Give one of them a different title.`);
  seen.add(key);
  const dir = join(root, 'app', dirs[p.collection], p.slug);
  if (p.live && !existsSync(join(dir, 'page.tsx'))) {
    problems.push(`"${p.title}" is live but app/${dirs[p.collection]}/${p.slug}/page.tsx does not exist. The folder name must be the slug generated from the title.`);
  }
}

for (const [collection, dirName] of Object.entries(dirs)) {
  const base = join(root, 'app', dirName);
  if (!existsSync(base)) continue;
  for (const name of readdirSync(base)) {
    const full = join(base, name);
    if (!statSync(full).isDirectory() || !existsSync(join(full, 'page.tsx'))) continue;
    const owner = projects.find((p) => p.collection === collection && p.slug === name);
    if (!owner) {
      const expected = projects.find((p) => p.collection === collection && !existsSync(join(base, p.slug, 'page.tsx')) && p.live);
      problems.push(`app/${dirName}/${name}/ matches no ${collection} title in components/projects.ts.${expected ? ` Did you mean to rename it to "${expected.slug}" (from "${expected.title}")?` : ''}`);
      continue;
    }
    const page = readFileSync(join(full, 'page.tsx'), 'utf8');
    for (const m of page.matchAll(/getProject\(\s*['"]([^'"]+)['"]\s*(?:,\s*['"]([^'"]+)['"])?\s*\)|<ProjectNav\s+slug=["']([^"']+)["'](?:\s+collection=["']([^"']+)["'])?/g)) {
      const used = m[1] ?? m[3];
      const usedCollection = m[2] ?? m[4];
      if (used !== name) problems.push(`app/${dirName}/${name}/page.tsx refers to slug "${used}" but its folder (and title slug) is "${name}".`);
      if (usedCollection && usedCollection !== collection) problems.push(`app/${dirName}/${name}/page.tsx passes collection "${usedCollection}" but lives under app/${dirName}/ (${collection}).`);
    }
  }
}

if (problems.length) {
  console.error('\nURL / title mismatch. URLs must be generated from each entry\'s title in components/projects.ts:\n');
  for (const msg of problems) console.error('  - ' + msg);
  console.error('');
  process.exit(1);
}
console.log(`check-routes: ${projects.length} entries OK (URLs match titles).`);
