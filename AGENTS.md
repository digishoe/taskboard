# Taskboard Frontend - Agent Guide

## What This Is
SvelteKit kanban-style taskboard UI that consumes the `taskboard-api` backend.

## Stack
- SvelteKit (adapter-auto), Svelte 5 runes mode
- Tailwind CSS v4 with dark theme
- shadcn-svelte style UI primitives (manually created, not via npx init)
- Vitest + @testing-library/svelte + jsdom
- Node.js 22

## Project Structure
```
src/
  lib/
    types.ts          # Board, Column, Task interfaces
    api.ts            # Typed fetch wrapper for taskboard-api
    api.test.ts       # API client tests (mock fetch)
    utils.ts          # cn() helper for class merging
    components/
      ui/             # shadcn-style primitives (card, button, badge)
      task-card.svelte + test
      column.svelte   + test
      board-view.svelte + test
  routes/
    +layout.svelte    # App shell with header
    +page.svelte      # Board list
    +page.server.ts   # Server load: fetch boards
    boards/[id]/
      +page.svelte    # Board detail with columns
      +page.server.ts # Server load: fetch single board
```

## Testing
- TDD: tests are written first, then implementation
- Run all tests: `make test` or `npm test`
- Watch mode: `npm run test:watch`
- Tests use jsdom environment with @testing-library/svelte
- API tests mock the fetch function
- Component tests use @testing-library/svelte render/screen/fireEvent

## Key Files
- `src/lib/api.ts` - All API calls go through here
- `src/lib/types.ts` - Shared TypeScript interfaces
- `vite.config.ts` - Tailwind + vitest config

## API Dependency
This frontend requires `taskboard-api` running. Set `API_BASE_URL` env var (defaults to `http://localhost:8080`).

## Commands
```bash
make test   # Run tests
make dev    # Start dev server
make build  # Production build
```
