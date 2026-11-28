# Deepthika S — Portfolio (2026 update)

A Next.js 14 + TypeScript portfolio covering product design, human-centred design,
electronics, immersive interaction and AI research. It is a static site
(`output: 'export'`), so the production build is a folder of plain HTML, CSS, JS and images.

> **This is an independent project.** It is meant to live in a **new** GitHub repository and
> a **new** Vercel project with its **own** URL. It does not reference, replace or deploy over
> the existing portfolio repository or its Vercel deployment. Nothing in this folder is
> connected to any existing remote — there is no `.git` directory and no `.vercel` directory.

---

## 1. Install dependencies

Requires Node.js 18.17 or newer (Node 20 LTS recommended).

```bash
npm install
```

## 2. Run locally

```bash
npm run dev
```

Open http://localhost:3000.

## 3. Build for production

```bash
npm run build
```

The static site is written to `./out`. To preview it locally:

```bash
npx serve out
```

---

## 4. Create a new GitHub repository

1. On GitHub, click **New repository**.
2. Give it a **new name** (for example `deepthika-portfolio-2026`). Do **not** reuse the name
   of your existing portfolio repository.
3. Leave “Add a README”, “.gitignore” and “license” **unticked** — this folder already has a
   README and `.gitignore`.
4. Click **Create repository** and copy the repository URL it shows you.

## 5. Push this project to that repository

From inside this folder (the one containing `package.json`):

```bash
git init
git add .
git commit -m "Initial commit: 2026 portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/<new-repo-name>.git
git push -u origin main
```

Check that `origin` points at the **new** repository before pushing:

```bash
git remote -v
```

(Alternatively, on the empty new repository page choose **uploading an existing file** and drag
in the contents of this folder — but not `node_modules`, `.next` or `out` if you have built
locally.)

## 6. Import the new repository into Vercel

1. Go to https://vercel.com/new.
2. Under **Import Git Repository**, choose the **new** repository you just created. If it
   isn’t listed, use **Adjust GitHub App Permissions** to grant Vercel access to it.
3. Vercel will offer to create a **new project**. Give it a new project name (for example
   `deepthika-portfolio-2026`). Do not select or link your existing portfolio project.

## 7. Create the deployment

Vercel detects Next.js automatically. The defaults are correct:

| Setting          | Value           |
| ---------------- | --------------- |
| Framework Preset | Next.js         |
| Build Command    | `npm run build` |
| Output           | handled automatically for `output: 'export'` |
| Install Command  | `npm install`   |
| Root Directory   | `./`            |

Optional environment variable, used for absolute Open Graph image URLs:

| Name                   | Value                                  |
| ---------------------- | -------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | your final URL, e.g. `https://deepthika-portfolio-2026.vercel.app` |

If it is not set, the build falls back to Vercel’s production domain automatically.

Click **Deploy**.

## 8. A separate portfolio URL

The first deployment is served at a new address such as
`https://<new-project-name>.vercel.app`, completely separate from the existing site. Every push
to `main` on the new repository redeploys only this new project.

To use a custom domain later: **Project → Settings → Domains → Add**. Only attach a domain that
is not already used by the existing portfolio, unless you deliberately want to move it.

---

## Project structure

```
app/
  page.tsx                         Home: hero, selected work, project index
  about/page.tsx                   About, including a research list
  projects/<slug>/page.tsx         One case study per project
  globals.css                      All design tokens and styles
components/
  projects.ts                      Single source of truth for all projects
  Header.tsx  Footer.tsx           Site chrome
  ProjectNav.tsx                   Previous / next project links
  Motion.tsx                       Reveal / Stagger / ParallaxBg animation helpers
  ComingSoon.tsx                   Template for projects still being documented
public/images/                     All images, including figures extracted from the papers
```

## Projects and research

URLs are always generated from each entry's **title** in `components/projects.ts`: the title is lower-cased and
hyphenated, then used as `/projects/<title-slug>` (Projects) or `/research/<title-slug>` (Research). Nobody types a
slug by hand.

| Collection | Title                       | Route                                   |
| ---------- | --------------------------- | --------------------------------------- |
| Project    | Tactile Trails              | `/projects/tactile-trails`              |
| Project    | SETU                        | `/projects/setu`                        |
| Project    | Morse Code Logic Game       | `/projects/morse-code-logic-game`       |
| Project    | ECO-SHIELD                  | `/projects/eco-shield`                  |
| Project    | KAAYA                       | `/projects/kaaya`                       |
| Research   | Atomic User Model           | `/research/atomic-user-model`           |
| Research   | Aesthetic Fingerprint       | `/research/aesthetic-fingerprint`       |
| Research   | FLAVOVR                     | `/research/flavovr`                     |
| Research   | KAAYA                       | `/research/kaaya`                       |
| Research   | VAPOURS                     | `/research/vapours`                     |
| Research   | The Calculator Fallacy      | `/research/the-calculator-fallacy`      |
| Research   | When the Majority Is Wrong  | `/research/when-the-majority-is-wrong`  |

## Adding or publishing a project or research entry

1. In `components/projects.ts`, add the entry (no slug) with `collection: 'project'` or `'research'`, a `title`, and a
   `cover` image. Use `coverClass: 'fit-contain'` for charts and diagrams so they are not cropped.
2. Work out its slug from the title (e.g. "When the Majority Is Wrong" gives `when-the-majority-is-wrong`) and build the
   page at `app/projects/<slug>/page.tsx` or `app/research/<slug>/page.tsx`. Use the same slug in
   `getProject('<slug>')` and end the page with `<ProjectNav slug="<slug>" />`.
3. Set `live: true`.

`npm run build` runs `scripts/check-routes.mjs` first (also `npm run check:routes`). It stops with a clear message if a
page folder, `getProject()` call or `ProjectNav` slug does not match the title, so a URL can never drift from its title.

If you rename a title, its URL changes: rename the page folder to match and add a redirect from the old URL in
`vercel.json`.

Numbers come from the order of the array, separately for Projects and Research. The header dropdown, mobile menu,
home grid, index and previous/next links all update automatically.

## Research figures

Figures on the research case studies were extracted directly from the source papers, using the
original embedded images where available (`pdfimages -all`, without re-encoding the JPEGs).
The VAPOURS paper contains no finished figures yet, so that page uses visuals derived from its
written specification — a decay chart computed from the stated half-lives and an architecture
diagram — each labelled as such.

## Design tokens

| Token         | Value     | Use                                  |
| ------------- | --------- | ------------------------------------ |
| `--paper`     | `#FEFFFB` | page background                      |
| `--ink`       | `#2D2D26` | headings and body text               |
| `--dark`      | `#3A3A33` | dark olive sections                  |
| `--dark-2`    | `#36362F` | statement sections                   |
| `--dark-3`    | `#2F2F2A` | closing quote and footer             |
| `--lime`      | `#8FBE08` | accent on dark backgrounds           |
| `--lime-soft` | `#D1E59A` | pale lime pills and highlights       |
| `--panel`     | `#ECEDEA` | textured panels and figure bands     |

Typography: Inter / Inter Tight from Google Fonts. Motion respects `prefers-reduced-motion`.
