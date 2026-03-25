# Taskboard

A kanban-style taskboard frontend built with SvelteKit. Consumes the `taskboard-api` backend to manage boards, columns, and tasks.

## Quick Start

```bash
npm install
make dev
```

## Connect to API

The frontend expects `taskboard-api` to be running. Configure the backend URL:

```bash
API_BASE_URL=http://localhost:8080 make dev
```

Defaults to `http://localhost:8080` if not set.

## Testing

```bash
make test
```

Tests use Vitest with @testing-library/svelte in a jsdom environment. The project follows TDD -- tests are written before implementation.

## Project Structure

```
src/
  lib/
    types.ts            - Board, Column, Task interfaces
    api.ts              - Typed fetch wrapper for the backend API
    utils.ts            - Tailwind class merge utility
    components/
      ui/               - Reusable UI primitives (card, button, badge)
      task-card.svelte  - Individual task display
      column.svelte     - Column with tasks and add-task form
      board-view.svelte - Full board with horizontal column layout
  routes/
    +page.svelte        - Board list (home page)
    boards/[id]/        - Board detail view
```

## Stack

- SvelteKit with adapter-auto
- Svelte 5 (runes mode)
- Tailwind CSS v4
- Vitest + @testing-library/svelte
- Node.js 22
