## Overview

This is a React + Vite single-page portfolio that mixes standard UI components with React Three Fiber (R3F) 3D scenes. Use this file to orient AI agents to the project's conventions, build/test workflows, and important implementation patterns.

## Quick start (commands)

- Dev server: `npm run dev` (Vite)
- Build: `npm run build` (Vite build)
- Preview production build: `npm run preview`
- Lint: `npm run lint` (ESLint)

See [package.json](package.json) for scripts and dependencies.

## Big picture

- Entry: [src/main.jsx](src/main.jsx) mounts `App`.
- Router: [src/App.jsx](src/App.jsx) registers top-level routes (`/`, `/projects`, `/blog`, `/tech-stack`, `/contact`).
- Pages: `src/pages/*` are thin route wrappers that compose `src/sections/*` and `src/components/*`.
- 3D: `src/components/HeroModels/*` (R3F + `@react-three/drei`) load models from `public/models/`.
- Styles: Tailwind + a global stylesheet at `src/index.css`; Vite plugin configured in `vite.config.js`.

## Project-specific conventions

- File extensions: `.jsx` used throughout for components and pages.
- Default exports: components are typically default exported (follow the existing style when adding new components).
- Component roles:
  - `src/components/` — reusable UI pieces (NavBar, Buttons, small widgets).
  - `src/sections/` — page sections composed of components (e.g., `Contact` section renders form + `ContactExperience`).
  - `src/pages/` — route-level wrappers that return a single section or layout.
- 3D models: generated GLTF React components created with `gltfjsx` live under `src/components/HeroModels/` and use `useGLTF('/models/<name>.glb')` (see [CollectiveScene.jsx](src/components/HeroModels/CollectiveScene.jsx)).

## Implementation patterns & gotchas (concrete)

- React Router: `BrowserRouter` wraps the app in `App.jsx`; use `NavLink` for active-link styles (see [NavBar.jsx](src/components/NavBar.jsx)).
- R3F model loading:
  - Models are loaded with `useGLTF('/models/…')` and preloaded with `useGLTF.preload(...)`.
  - Animated/skinned meshes are cloned via `SkeletonUtils.clone(scene)` and have `frustumCulled = false` set to prevent disappearing animations (see [CollectiveScene.jsx](src/components/HeroModels/CollectiveScene.jsx)).
  - Animations are started using `useAnimations(animations, group)` and then played/faded in/out; follow the same lifecycle hooks.
- Environment variables: Email sending uses EmailJS with Vite env vars `VITE_APP_EMAILJS_SERVICE_ID`, `VITE_APP_EMAILJS_TEMPLATE_ID`, `VITE_APP_EMAILJS_PUBLIC_KEY` (see [sections/Contact.jsx](src/sections/Contact.jsx)). Ensure these are present in your `.env` when running the contact flow locally.
- Asset paths: static assets are referenced from the root (e.g., `/models/...`, `/images/...`) — place any new public assets in `public/` so paths resolve correctly under Vite.

## Dependencies & integrations to be aware of

- React 19 + Vite; dev tasks rely on Vite dev server and build tooling.
- Three.js ecosystem: `three`, `@react-three/fiber`, `@react-three/drei`, plus `three-stdlib` utilities used by generated GLTF components.
- Animation: `gsap` is used for page/DOM animations alongside R3F animations.
- Email: `@emailjs/browser` is used in the contact form.

## Linting & formatting

- ESLint is configured and available via `npm run lint`. Follow existing patterns (functional components, hooks usage). No TypeScript in the repo.

## Where to look for examples

- App shell & routes: [src/App.jsx](src/App.jsx)
- Entry point: [src/main.jsx](src/main.jsx)
- Nav and link styles: [src/components/NavBar.jsx](src/components/NavBar.jsx)
- 3D model component example: [src/components/HeroModels/CollectiveScene.jsx](src/components/HeroModels/CollectiveScene.jsx)
- Contact/email usage: [src/sections/Contact.jsx](src/sections/Contact.jsx)
- Vite + Tailwind plugin config: [vite.config.js](vite.config.js)

## Guidance for AI agents (short)

- Preserve `.jsx` file style and default exports.
- When editing 3D code, follow `useGLTF` + `SkeletonUtils.clone` + `useAnimations` lifecycle exactly to avoid subtle bugs with skinned meshes.
- Add public static assets to `public/` and reference them with absolute paths starting with `/`.
- When changing routes, update `src/App.jsx` and ensure `NavBar` links from `src/constants/index.js` (used by `NavBar`) remain consistent.

If anything here is unclear or you want additional concrete examples (e.g., a checklist for adding a new 3D model component), tell me which area to expand.
