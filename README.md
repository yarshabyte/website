# YarshaByte

A modern personal portfolio and demo site built with Next.js (app router), React and TypeScript showcasing 3D visuals and smooth interactions.

## Highlights
- Next.js 16 (app directory) + React 19 + TypeScript
- 3D scenes with three.js and @react-three/fiber
- Interactive WebGL content via React Three Fiber and Three.js
- Smooth scrolling and timelines with lenis and gsap
- Tailwind CSS for utility-first styling

## Tech stack (selected)
- next: 16.2.6
- react / react-dom: 19.2.4
- typescript, tailwindcss, postcss
- three, @react-three/fiber
- gsap, framer-motion, lenis

## Requirements
- Node.js 18 or newer recommended
- pnpm (recommended) or npm/yarn. This repo contains pnpm-lock.yaml so pnpm gives reproducible installs.

## Quickstart
1. Install dependencies (pnpm recommended):

```bash
pnpm install
# or npm install
```

2. Run development server:

```bash
pnpm run dev
# or npm run dev
```

3. Open http://localhost:3000

## Scripts
- dev: next dev
- build: next build
- start: next start
- lint: eslint

Run scripts with pnpm (pnpm run dev), or npm (npm run dev).

## Project layout (detailed)

This section lists top-level folders and important files to help contributors locate code quickly.

- app/  Next.js app directory (routes, layouts, global styles)
  - app/layout.tsx  Root layout (shared providers, metadata)
  - app/page.tsx  Home page
  - app/head.tsx / app/meta  Document head / metadata
  - app/(routes)/*  Additional route folders and nested routes
  - app/globals.css  Global CSS + Tailwind entry

- components/  Reusable UI and animation components
  - components/ui/  Small primitives (Button, Icon, Link)
  - components/layout/  Header, Footer, Navigation
  - components/three/  React Three Fiber hero scene and shaders

- hooks/  Custom React hooks
  - hooks/use-lenis-scroll.ts  smooth scroll integration
  - hooks/usePagePointer.ts  pointer tracking helpers
  - hooks/useReducedMotion.ts  respects user reduced-motion preferences

- data/  Serialized content used by pages (hero, projects, copy)
  - data/hero.ts, data/projects.ts  central content for pages

- public/  Static assets served directly (images, favicons, svgs, models)
  - public/work/, public/icons/, public/*.svg

- styles/ and tailwind config
  - tailwind.config.js, postcss.config.mjs  Tailwind/PostCSS setup
  - app/globals.css  includes @tailwind base/components/utilities

- config & tooling files
  - next.config.ts  Next.js configuration
  - tsconfig.json  TypeScript configuration
  - package.json, pnpm-lock.yaml / package-lock.json  dependencies & scripts
  - eslint.config.mjs  lint rules

- misc
  - scripts/  project scripts or dev helpers (if present)
  - .github/ or CI configs  deployment and workflow files

Guidance:
- Place 3D scene components under components/three and keep scene-specific assets in public/ or data/.
- Prefer small, focused components with clear folder names; add types in TypeScript files.
- Respect reduced-motion hooks when adding timeline animations (gsap/framer-motion).

(If you want, these entries can be expanded to show exact file examples and conventions used in this repo.)

## Development notes
- App uses the app/ router and TypeScript. Edit `app/page.tsx` and components under `components/`.
- There are several custom hooks (hooks/) for smooth scrolling and pointer interactions. Respect reduced-motion settings when adding animations.

## Building & Deployment
- Build: `pnpm run build` (or `npm run build`)
- Start production server: `pnpm run start`

Recommended: deploy to Vercel for zero-config Next.js hosting.


## Author
Team YarshaByte
---
