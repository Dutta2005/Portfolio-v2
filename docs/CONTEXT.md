# Raj Dutta portfolio: continuation context

Last updated: 2026-11-11 (Asia/Calcutta).

## Current status and user direction

The original ornate portfolio was rebuilt into a restrained résumé-style website.
Raj then requested a more visual hero/project section using the seven supplied
images and corrected the project order. That revision is implemented locally.
The coding logo, light/dark themes, and saffron footer revision are also complete.
The complete redesign is prepared for GitHub review on branch feat/resume-portfolio-redesign. No deployment was performed.

Preserve the professional ink-and-brass design, readable experience timeline,
and clear, persistent navigation. The latest request explicitly adds photographic identity
and a richer, image-led project gallery; do not revert to the earlier text-only
project list or hide projects behind a disclosure.

## Review handoff

- User explicitly requested committing, pushing, and creating a PR for all work.
- Repository: Dutta2005/Portfolio-v2. Target branch: main.
- Review branch: feat/resume-portfolio-redesign. Commit/PR details are available in Git and GitHub.
- Include site source, required screenshots/ source assets, lockfile/dependency cleanup, README, AGENTS.md, and this context.
- Local .env, .qa/ outputs, and pre-existing .claude/settings.local.json are not part of the changeset.
- Final production build and ESLint passed before commit. Staged whitespace checks passed; browser verification is recorded below.

## Latest refinement: streamlined mobile content

- Hide the resume-sidebar (A little about me and Technical toolkit) on screens
  up to 700px, using the existing mobile breakpoint and a screen-only media query.
- Desktop/tablet sidebar and print content remain available. The dedicated
  Technical skills section (#skills) remains visible on mobile.

Validation: production build and lint passed. Browser checks at 320, 390, 700, 701, and 1440px confirmed the sidebar visibility breakpoint, all 45 dedicated skills, and preserved print visibility. This refinement is local on the existing PR branch.

## Previous refinement: Monaco code wordmark

- Raj requested the exact logo text <raj/> in Monaco with coding/development styling.
- Logo.tsx now renders the wordmark in a Monaco-first monospace stack, with brass
  punctuation and the theme's foreground for raj. Cascadia Mono, Consolas, Liberation
  Mono, and monospace provide system fallbacks when Monaco is not installed. No
  proprietary font file was downloaded or bundled.
- Removed the redundant Raj Dutta text beside the wordmark; the home link retains
  its descriptive accessible name. Logo scales to 24px on mobile and 27px on desktop.
- public/favicon.svg now uses the same code wordmark and brass/ink identity.
- Removed former SVG-specific dimensions and old wordmark child rules so the new
  text logo remains readable in both themes and fits the 320px header.

Validation: build and lint passed. Browser checks confirmed the exact wordmark, Monaco-first font stack, accessible home link, matching favicon, and no header overflow at 320, 390, 768, and 1440px in both themes. Desktop dark and mobile light header screenshots were visually reviewed. QA artifacts: .qa/header-dark-1440-v6.png and .qa/header-light-320-v6.png.

## Previous refinement: Resume link and icon-only theme toggle

- Hero action is now labeled **Resume**, uses a document icon, and opens
  import.meta.env.VITE_RESUME_URL in a new tab. It no longer calls window.print().
- Configure VITE_RESUME_URL in .env; .env.example documents the variable. Restart
  Vite after changing it. Do not overwrite or expose the user's .env contents.
- Theme control is an unframed Sun/Moon icon with transparent background in normal
  and hover states. It retains its touch target, accessible name, and keyboard focus
  outline. Preference/system synchronization behavior is unchanged.
- Existing print CSS remains available through the browser's print command. Prior
  notes/QA scripts describing a Print résumé button are historical and superseded.

Validation: production build passed. A focused browser check confirmed the configured URL, new-tab behavior, borderless/transparent hover state, keyboard focus outline, and working theme switching at desktop and 320px mobile widths.

## Previous revision: coding identity and light/dark themes

Raj requested a coding/development logo, a working light mode, and a distinct
footer color for “Har Har Mahadev.”

Implemented:

- Replaced the initials badge with a custom inline SVG terminal-window / code
  bracket logo in Logo.tsx. Matching geometry is used in public/favicon.svg.
  This is a code-native vector mark; no raster generation or new dependency.
- Added a Sun/Moon theme toggle beside the header email action, visible at desktop
  and mobile widths. Its accessible label describes the action (“Switch to light
  mode” / “Switch to dark mode”).
- Uses system color preference until a visitor chooses a theme. Explicit choices
  are saved under localStorage key **raj-portfolio-theme** and synchronized across
  tabs. If storage is unavailable, the toggle still works for that visit.
- A tiny startup script in index.html resolves the theme before application render
  and sets the root data-theme attribute and theme-color metadata. Matching initial
  canvas styles avoid a bright/dark background flash while React/CSS loads.
- ThemeToggle.tsx keeps system preference changes active until an explicit choice,
  handles browser storage events, and updates the theme-color metadata.
- Theme colors are centralized in src/index.css. Dark keeps the original ink and
  brass palette. Light uses canvas #f6f7f3, surface #ffffff, text #20271f, muted
  #55614f, rules #d4dacb, brass #786035.
- Replaced hard-coded dark-only frame, hover, badge, preview, modal, header, and
  mobile-nav colors in App.css with semantic CSS variables. Project artwork and
  the original portrait retain their original pixels/colors.
- Footer sign-off: saffron #eca36b in dark mode, deeper saffron #9a4d16 in light.
  Text is 12px and semibold, without glow or animation.
- Print theme explicitly targets :root[data-theme] as well as :root so the selected
  screen theme cannot override white-paper résumé colors.

Validation:

- Production TypeScript/Vite build and ESLint passed.
- Both themes checked at widths 1920, 1440, 1024, 768, 700, 390, 320.
- Verified initial OS preference, live OS changes, manual override, reload
  persistence, cross-tab updates, blocked-storage fallback, keyboard activation,
  theme-color metadata, logo/favicon, responsive header controls, mobile bottom bar,
  anchor clearance, skills and image-viewer behavior. No runtime errors or overflow.
- Footer contrast against canvas: 8.97:1 dark, 5.66:1 light. Main text exceeds 7:1.
- White print styling still produces two A4 pages, including all 45 skills.
- Dark/light desktop, light mobile, and light footer screenshots visually reviewed.
- Local QA: .qa/verify-v4.cjs, .qa/light-home-v4.png, .qa/dark-home-v4.png,
  .qa/light-mobile-v4.png, .qa/dark-mobile-v4.png, .qa/light-skills-v4.png,
  .qa/light-footer-v4.png, .qa/light-viewer-v4.png, .qa/dark-viewer-v4.png,
  .qa/resume-v4.pdf.

Design review: preserve the current structure and typography. The small terminal
mark expresses engineering, while pale warm surfaces and deeper brass adapt the
existing identity for light mode. Saffron highlights the personal sign-off without
reintroducing decorative color or effects.

## Previous revision: social icons, skills, and persistent navigation

Raj requested icon links for GitHub, LinkedIn, X, Instagram, and Email in the hero
and Contact; a complete technical skills section; a smaller sidebar toolkit with
important skills/icons; and Home/Skills navigation with fixed desktop/mobile UI.

Implemented:

- Shared SocialLinks component in hero, Contact, and footer. All five accessible
  links use recognizable monochrome icons, descriptive names, visible focus, and
  appropriate external-link attributes. Contact retains prominent email + phone.
- Instagram: https://www.instagram.com/raj_rd_001
- X: https://x.com/RajDutta2005
- personalInfo/socialLinks in src/data/portfolio.ts are the single social URL source.
- Dedicated #skills section after projects: 45 skills across seven categories.
  Restored the original 37 skills from Git HEAD and added eight tools explicitly
  supported by existing project/experience content. No skill ratings or proficiency
  claims were invented.
- TechnicalToolkit is the sidebar component, with ten highlighted skills and small
  icons: React, Next.js, TypeScript, Python, Node.js, PostgreSQL, LangChain, LangGraph,
  Docker, Git. It links to the complete skills section. Only the full section has
  id="skills"; no duplicate anchors.
- SkillIcon maps brand icons from installed react-icons to skill names. Concepts
  without an available brand glyph use meaningful generic icons, always with text.
- Desktop: fixed header with Home, Experience, Projects, Skills, Contact.
- Mobile (700px and below): fixed compact brand/email header plus a fixed bottom
  navigation bar with five labeled icons. Experience is visually shortened to Work,
  with the accessible name Experience. Touch targets and bottom safe-area inset
  are accommodated; page bottom padding keeps the footer above the bar.
- Active navigation follows scrolling via a requestAnimationFrame-throttled
  passive scroll listener. Anchor offsets leave headings visible below the header.
- Important CSS detail: mobile header backdrop-filter is disabled so it cannot
  become a containing block for its fixed bottom-nav descendant.
- Print omits social rows/fixed chrome and includes all 45 skills compactly after
  the six project descriptions. The generated résumé remains two A4 pages.

Validation for this revision:

- TypeScript/Vite build and lint passed.
- Browser checks passed at widths 1920, 1440, 1024, 768, 700, 390, 320.
- Verified exact social URLs, five social icons in each of three regions, seven
  skill groups, 45 unique icon-labeled skills, ten sidebar skills, one #skills id.
- Verified all five nav anchors and active states, fixed positions, visible anchor
  headings, bottom-nav viewport placement, no footer overlap, no horizontal overflow.
- Project order/repositories CTA and image-viewer navigation/Escape still pass.
- No page runtime errors. Two-page A4 PDF includes the complete skills content. The temporary dev server was stopped after verification.
- Desktop home/skills/contact and mobile home/skills/contact screenshots reviewed.
- Local QA: .qa/verify-v3.cjs, .qa/desktop-home-v3.png, .qa/skills-v3.png,
  .qa/contact-v3.png, .qa/mobile-home-v3.png, .qa/mobile-skills-v3.png,
  .qa/mobile-contact-v3.png, .qa/resume-v3.pdf.

Design review: keep the established palette and typography. Use quiet monochrome
icons, text skill rows, and a compact core toolkit. The mobile bar provides direct,
thumb-friendly navigation without adding a menu panel or duplicating five links
in the small top header.

## Confirmed content

- InterviewSurge: **AI Engineer Intern, September 2026–Present**, supplied by Raj.
  Responsibilities: AI-powered features, intelligent agents, automated workflows,
  UI/UX and functionality improvements, AI-driven marketing, SEO, GEO, and content
  automation. This is the current role and appears first.
- **Neuxa Global must remain removed.**
- DeepDuoFoundation (Feb–Apr 2026) and JGEC Winter of Code (Feb–Mar 2026) were
  retained from the original repository. Plain descriptions replace poetic filler.
- Do not invent metrics, education, credentials, work arrangements, or technologies
  for InterviewSurge. Education details were not supplied.

## Required project order (latest user instruction)

All six projects are visible on the page in this exact order:

1. **Jeevan Verse**
2. **Daily Tech News Agent** (Raj also refers to it as “Daily AI agent”)
3. **Orbit CLI**
4. **PortfolioAI**
5. **Mini Kubernetes**
6. **Streamify**

Jeevan Verse and PortfolioAI have wide image/text layouts; the other four form
paired rows. DOM order matches visual order and mobile reading order.

**ReadmeEasy, Droply, and PixelFlow were removed** and must not be reintroduced.
Streamify's actual GitHub/live URL spelling is `stremify`; preserve those links.

### Sources and accuracy

Daily Tech News Agent and Mini Kubernetes scope/technologies/URLs were supplied
by Raj in this conversation. Other project links, technologies, descriptions,
and recognition were inherited from the original repository.

- Daily Tech News Agent: multi-source tech news, AI curation and summaries for
  AI/software/cybersecurity, automated email digest. Node.js, Vercel AI SDK, Gemini,
  OpenRouter, PostgreSQL (NeonDB), Resend, GitHub Actions.
  Source: https://github.com/Dutta2005/daily-tech-news-agent
- Mini Kubernetes: simplified control plane, API server, scheduling, Docker
  execution, controller/watcher reconciliation. Node.js, Express, BullMQ, Docker,
  PostgreSQL, Drizzle ORM, Valkey. Lifecycle:
  SUBMITTED → RUNNABLE → RUNNING → SUCCEEDED or FAILED.
  Source: https://github.com/Dutta2005/mini-k8s
- These two have source links only; no live URLs were supplied.
- Do not infer extra implemented capabilities or metrics from project artwork.
  In particular, mini-k8s.png is a general Kubernetes concept diagram, not proof
  that the simplified implementation includes every illustrated component.
- Existing external destinations have not been independently audited.

## Supplied assets: required source files

The root **screenshots/** directory now contains required website source assets.
Do not delete or ignore it as temporary QA output. Originals remain unchanged.
Vite imports and fingerprints the images; no absolute deployment paths are used.

| Source asset                   | Usage                                         |
| ------------------------------ | --------------------------------------------- |
| screenshots/raj.jpeg           | Hero portrait; high fetch priority; 400 × 400 |
| screenshots/jeevan-verse.png   | Jeevan Verse project preview                  |
| screenshots/daily-ai-agent.png | Daily Tech News Agent project illustration    |
| screenshots/orbit-cli.png      | Orbit CLI project illustration                |
| screenshots/portfolio-ai.png   | PortfolioAI project preview                   |
| screenshots/mini-k8s.png       | Mini Kubernetes concept diagram               |
| screenshots/streamify.png      | Streamify project preview                     |

Project image imports/alt text/intrinsic dimensions live in src/data/portfolio.ts.
The portrait is imported in Hero.tsx. Project images are lazy loaded and displayed
with object-fit: contain so diagrams and screenshots stay uncropped. The portrait
uses its original square crop. No AI-generated image changes were made.

## Design and interaction decisions

- Palette: canvas #11120f, surface #191a17, text #f0eee7, secondary #b4b4a9,
  rule #34362e, brass #c5aa72.
- Newsreader for display/name, Manrope for body/interface, with system fallbacks.
- Hero: large name and summary, two actions, supplied monochrome portrait, and
  InterviewSurge caption. Mobile uses a compact portrait/caption row.
- Résumé body: profile/toolkit sidebar; experience and recognition in the main
  column. A fine timeline connects experience entries.
- Projects follow the résumé body at full page width, so images have useful space.
  Wide treatments for the two full-stack product websites alternate with paired
  AI/developer-tool and infrastructure/communication rows. Mobile is one column.
- Clicking a preview opens a native dialog: full image, title, close button,
  previous/next buttons, left/right arrow navigation with wraparound, Escape,
  backdrop dismissal, body scroll lock, and restored focus on close.
- Bottom invitation: **“Want to see more projects?”**, with **“Browse my repositories”**
  linking directly to **https://github.com/Dutta2005?tab=repositories** in a new tab.
  This replaces the earlier generic GitHub link above the gallery.
- Quiet Har Har Mahadev sign-off remains in the footer.
- No decorative glows, particles, 3D, music, intro loader, badge grids, or fake metrics.
- Print résumé uses the browser dialog. Light print styles omit photos, previews,
  modal, navigation, and CTAs. The projects begin on page two and all six appear
  in their required order in a compact two-column layout. Output is two A4 pages.

Plan review for the visual revision: keep the established six-color palette and
typefaces. The supplied portrait and actual project artwork provide the visual
interest. Full-width projects solve cramped previews without adding ornamental
backgrounds or turning the résumé into a uniform card grid.

## File map

- src/data/portfolio.ts: profile, skills, experience, the single ordered projects
  array (including image metadata and featured flags), recognition.
- src/App.tsx: Hero → sidebar + Experience/Recognition → Projects → Skills → Contact.
- src/components/sections/Hero.tsx: portrait and résumé header.
- src/components/sections/Projects.tsx: gallery, full-size viewer, repositories CTA.
- src/components/layout/: Navbar and Footer.
- src/components/ui/SocialLinks.tsx and SkillIcon.tsx: shared icon components.
- src/components/ui/Logo.tsx and ThemeToggle.tsx: coding mark and persistent theme control.
- src/components/sections/TechnicalToolkit.tsx: core skills sidebar; Skills.tsx is the complete section.
- src/components/sections/: remaining About, Skills, Experience, Achievements,
  Contact components.
- src/index.css: base tokens, reset, focus, selection, reduced motion.
- src/App.css: layout, portrait, gallery, native dialog, mobile and print styles.
- screenshots/: user-supplied source images, required for production builds.
- .qa/: ignored local verification scripts/screenshots/PDFs.
- index.html: metadata, favicon, font requests.
- AGENTS.md: short continuation instructions.

Unused loading/audio/3D modules and animation hooks were removed in the first
redesign, along with Three.js/React Three, Framer Motion, and Tailwind dependencies.
Vite uses the React plugin. Other unused original assets remain unreferenced.

## Skills / environment

- Official anthropics/skills frontend-design was installed and read before the
  first implementation, and re-read for the image-led revision.
- Read find-skills/skill-installer guidance and Sites design/local preview guidance.
  This is local repository work; no Sites registration or publication.
- This is Vite + React + TypeScript, not Next.js.
- Windows PowerShell blocks npm.ps1; use npm.cmd.

```sh
npm.cmd install --ignore-scripts --no-audit --no-fund
npm.cmd run dev -- --host 127.0.0.1 --port 5173 --strictPort
npm.cmd run build
npm.cmd run lint
```

VITE_RESUME_URL in .env supplies the hero Resume link. Restart Vite after changes.
Lucide 1.8 has no GitHub/LinkedIn brand icons; use react-icons/fa for those.

## Verification

First redesign: production build, lint, responsive/browser checks, print, and
visual review passed.

Image-led revision:

- TypeScript/Vite production build and ESLint passed.
- All seven original images loaded successfully, including the hero portrait.
- Confirmed exact six-project order, no disclosure, removed legacy projects,
  retained InterviewSurge date, and source/live labels.
- Native viewer: all six images, previous/next wraparound, keyboard arrows, Escape,
  close button, mobile use, body scroll restoration, focus restoration passed.
- Responsive checks at widths 1920, 1440, 1024, 768, 700, 390, 320 passed.
  No horizontal document overflow. Project body text remains 14px.
- Navigation, print action, and two-page A4 PDF generation passed.
- No runtime errors; no canvas/audio/retired presentation effects.
- Desktop hero/gallery, full 390px mobile page, and 320px image viewer screenshots visually reviewed.
- Repositories CTA text, exact destination, and new-tab behavior checked. The temporary dev server was stopped after QA.
- Final local artifacts: .qa/desktop-v2.png, .qa/hero-v2.png,
  .qa/projects-v2.png, .qa/mobile-390-v2.png, .qa/mobile-320-v2.png,
  .qa/viewer-320.png, .qa/viewer-390.png, .qa/resume-v2.pdf.
- .qa/verify-v2.cjs uses temporary Playwright from this machine's npm cache;
  Playwright is not a project dependency.
- Original PNGs are preserved and lazy loaded, not re-encoded. Combined project
  assets are about 7 MB; the high-priority portrait is only about 19 kB.
- Local browser QA checks rendering/link attributes, not the availability or
  content of the external GitHub/live websites.

## Preservation / future work

The first turn began with a modified package-lock.json and untracked .claude/.
No reset/restore was performed. npm updated the lockfile during dependency cleanup.
The .claude/ directory remains untouched. User-supplied screenshots/ are now used
as source assets. Do not remove other user changes.

Optional future work requires Raj's input: real education details, a separately
verified downloadable résumé, expanded case studies, or deployment target.
