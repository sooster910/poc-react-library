# Repository Guidelines

## Project Structure & Module Organization
This repository is a Vite 8 single-page app built with React 19 and TypeScript. Main code lives in `src/` with feature-oriented folders:

- `src/app/`: app bootstrap, router, and shared providers
- `src/pages/`: route-level screens such as `home` and `learning`
- `src/features/`: feature-scoped UI, model, and lib code
- `src/components/`: reusable layout and presentational components
- `src/shared/`: cross-cutting config and utilities
- `src/test/`: test setup for Vitest
- `src/assets/`: static assets

Use the `@/` alias for imports from `src/`.

## Build, Test, and Development Commands
- `pnpm install`: install dependencies
- `pnpm dev`: start the Vite dev server
- `pnpm build`: run TypeScript project checks and create a production build
- `pnpm preview`: serve the built app locally
- `pnpm test`: run Vitest once in `jsdom`
- `pnpm test:watch`: run Vitest in watch mode
- `pnpm check`: run Biome formatting, lint, and import checks
- `pnpm lint:fix`: apply Biome fixes
- `pnpm format`: rewrite formatting only

## Coding Style & Naming Conventions
Biome is the source of truth. Use spaces for indentation, keep lines under 100 columns, prefer single quotes, and omit semicolons unless required. Let Biome organize imports.

Use `PascalCase` for React components, `camelCase` for functions and variables, and `kebab-case` for folder names when adding new modules. Keep route UI under `ui/`, state or domain logic under `model/`, and helpers under `lib/`.

## Testing Guidelines
Vitest and Testing Library are configured in [`vite.config.ts`](/Users/hensley/Documents/poc-react-library/vite.config.ts). Place tests next to the component or page they cover using `*.test.tsx`, for example `src/pages/home/ui/home-page.test.tsx`. Favor user-visible assertions over implementation details.

Run `pnpm test` before opening a PR. Add or update tests for routing changes, component behavior, and feature logic.

## Commit & Pull Request Guidelines
This repository currently has no commit history, so use short imperative commit subjects such as `Add race condition loading state`. Keep commits focused and easy to review.

PRs should include a clear summary, linked issue when applicable, and screenshots or recordings for UI changes. Include the commands you ran, typically `pnpm check`, `pnpm test`, and `pnpm build`.

## Configuration Tips
Copy `.env.example` to `.env` and set `VITE_APP_TITLE` as needed. Husky is prepared through `scripts/prepare-husky.mjs` and is safe to ignore until the project is initialized as a Git repository.
