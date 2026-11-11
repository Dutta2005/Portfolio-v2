# Portfolio working agreement

Read `docs/CONTEXT.md` before changing this project. Update its implementation
status, validation, and remaining questions at handoff.

- This is Raj Dutta's Vite + React + TypeScript portfolio, not Next.js.
- Use `src/data/portfolio.ts` as the content source of truth.
- Preserve the restrained ink-and-brass design, readable body text, simple résumé
  structure, fine experience timeline, and quiet personal sign-off.
- Hero uses `screenshots/raj.jpeg`. All six supplied project images are required
  source assets in `screenshots/`; preserve originals and do not ignore that folder.
- Project order: **Jeevan Verse → Daily Tech News Agent → Orbit CLI → PortfolioAI
  → Mini Kubernetes → Streamify**. All six are visible, each with an image.
- Keep the gallery full width, with a responsive image viewer and the bottom
  “Want to see more projects?” link to GitHub's Repositories tab.
- InterviewSurge is the current AI Engineer Intern role, **Sep 2026–Present**.
  Neuxa Global must not reappear. Do not invent metrics, education, or credentials.
- ReadmeEasy, Droply, and PixelFlow were explicitly removed.
- Do not restore glows, particles, 3D, music, intro loaders, or decorative filler.
- Work locally unless the user requests deployment. Use `npm.cmd` on Windows.
- Verify material changes with build, lint, and relevant browser checks.
- Keep temporary QA artifacts under the ignored `.qa/` directory.
- Preserve unrelated work. Initially `package-lock.json` was modified and
  `.claude/` was untracked; no reset or restore is authorized.

- Keep the 45-skill section separate from the ten-skill sidebar toolkit; icon labels
  and social URLs live in shared components/data. Only the full section uses #skills.
- Navigation: fixed desktop header, compact fixed mobile header and five-item bottom
  bar. Preserve anchor clearance, safe-area padding, active state, and keyboard access.
- GitHub, LinkedIn, X, Instagram, and Email icons appear in hero, Contact, and footer.
- Support both light and dark mode through semantic tokens in src/index.css. Keep
  theme startup in index.html consistent with ThemeToggle.tsx; storage key is
  raj-portfolio-theme. Preserve system fallback, saved choice, and white print output.
- Coding logo geometry is shared visually by Logo.tsx and public/favicon.svg; update
  both together. Keep the footer sign-off saffron with readable contrast in each theme.
- The hero Resume action links to import.meta.env.VITE_RESUME_URL; do not replace
  it with printing. The theme control stays icon-only with no border or hover box.
- The brand is the literal <raj/> wordmark in a Monaco-first monospace stack, with
  brass punctuation. Keep it readable in both themes and use matching favicon text.
- Hide the About/Technical toolkit sidebar on mobile screens up to 700px; retain
  it on larger screens and in print. The full #skills section stays visible.
