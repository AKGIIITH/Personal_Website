# Personal Website

Rebuilt with React + Vite + Tailwind v4 + Framer Motion. No backend, no database —
all content lives in JSON files you edit directly.

## Run it locally

```bash
npm install
npm run dev
```

## Edit content

Everything you'll want to change lives in `src/data/`:

- **`profile.json`** — name, bio, links, skills, current roles. Has a few
  `TODO:` placeholders (LinkedIn URL, Codeforces URL) — fill those in.
- **`timeline.json`** — the main timeline. `preCollege` holds your Class 10 /
  JEE / Class 12 / UGEE milestones (also has `TODO:` placeholders for your
  percentages). `years` holds each academic year, split into `monsoon`,
  `winterbreak`, `spring`, `summerbreak` sections, each with `courses`,
  `projects`, `roles`, and `achievements`. Add or remove entries freely —
  the timeline UI adapts automatically.
- **`projects.json`** — the curated grid shown in the Projects section.
- **`blog.json`** — blog posts. Add a new object (`id`, `title`, `date`,
  `excerpt`, `body`) to publish; delete one to remove it.

No other files need to change for routine content updates.

## A few things worth doing before you publish

1. Fill in the `TODO:` fields in `profile.json` and `timeline.json` (marks,
   LinkedIn, Codeforces, a couple of course lists I wasn't certain about).
2. Double check the semester I placed each project/course in — I classified
   everything from your GitHub repo creation dates and your resume, but you
   know the real timeline better than a commit timestamp does.
3. Swap `public/resume.pdf` for your latest resume whenever it changes.

## Deploy to GitHub Pages

Already configured (`vite.config.js` `base`, and `homepage`/`deploy` in
`package.json`) assuming deployment at
`https://AKGIIITH.github.io/Personal_Website/`. If your repo name or GitHub
username ever changes, update both of those.

```bash
npm run deploy
```

This builds the site and pushes `dist/` to a `gh-pages` branch. In the GitHub
repo settings → Pages, set the source to the `gh-pages` branch (only needed
once).

## Project structure

```
src/
  data/             edit these to update content
  components/
    layout/         Nav, Hero, Footer
    timeline/       the S-curve timeline (Timeline, TimelineNode, TimelineConnector)
    projects/       Projects grid + card
    blog/           Blog list (posts expand inline, no routing needed)
  index.css         design tokens (colors, fonts) live in the @theme block
```

Only the expanded timeline card's content mounts its detail markup, so the
page stays light even as you keep adding years.
