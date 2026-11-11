# Raj Dutta — Portfolio

A résumé-style portfolio for Raj Dutta, AI Engineer and Full Stack Developer.
Built with React, TypeScript, and Vite, with a restrained dark palette and a
print-friendly résumé layout.

## Development

```sh
npm install
npm run dev
```

On Windows PowerShell, use `npm.cmd` if script execution policy blocks `npm.ps1`.

## Checks

```sh
npm run build
npm run lint
```

## Content and handoff

- Edit experience, project links, and skills in `src/data/portfolio.ts`.
- Read [docs/CONTEXT.md](docs/CONTEXT.md) for the brief, decisions, content sources,
  verification status, and outstanding questions.
- Read [AGENTS.md](AGENTS.md) before continuing work with another agent.
- Page composition lives in `src/App.tsx`; components are in `src/components/`.
- Base styles are in `src/index.css`, layout and print styles in `src/App.css`.
- Set VITE_RESUME_URL in .env to your resume URL. The hero Resume link opens it in a new tab; restart Vite after changing .env.
- InterviewSurge: September 2026–Present. All six projects appear in the requested order, starting with Jeevan Verse and ending with Streamify.
- User-supplied project images and the hero portrait live in `screenshots/`; these are required source assets.
- The project gallery supports full-size image previews and links to the GitHub Repositories tab.
- Hero and Contact include GitHub, LinkedIn, X, Instagram, and Email icon links.
- A 45-skill section complements the compact sidebar toolkit; navigation stays fixed on desktop and mobile.
- The header Sun/Moon toggle supports light and dark themes, follows system preference initially, and remembers a manual choice.
- Logo.tsx and public/favicon.svg use the `<raj/>` code wordmark with Monaco-first typography. Theme tokens are in src/index.css.
