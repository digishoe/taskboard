# Architecture

## Overview

Taskboard is a SvelteKit application that provides a kanban board UI. It is a frontend-only project that depends on `taskboard-api` for all data persistence.

## Component Hierarchy

```
+layout.svelte (app shell, header)
  +page.svelte (board list)
    Card (board card, clickable)
  boards/[id]/+page.svelte (board detail)
    BoardView
      Column
        TaskCard
        Add task form
```

## Data Flow

1. **Server loads** (`+page.server.ts`) fetch data from `taskboard-api` using the API client
2. Data is passed to page components via SvelteKit's `data` prop
3. Client-side mutations (create task, delete task) call local API routes or directly reload
4. `API_BASE_URL` is read from `$env/dynamic/private` on the server side

## API Contract

The frontend depends on these `taskboard-api` endpoints:

| Method | Path | Description |
|--------|------|-------------|
| GET | `/boards` | List all boards |
| GET | `/boards/:id` | Get board with columns and tasks |
| POST | `/boards` | Create a board |
| POST | `/boards/:id/columns` | Create a column |
| POST | `/columns/:id/tasks` | Create a task |
| PATCH | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |

## Key Design Decisions

- **Server-side data loading**: All initial data fetching happens in `+page.server.ts` files to keep API credentials server-side
- **Manual shadcn components**: UI primitives are hand-written rather than using `npx shadcn-svelte` to keep dependencies minimal
- **Svelte 5 runes**: All components use `$props()`, `$state()`, and `$derived()` instead of legacy reactive declarations
- **API client with injectable fetch**: The API module accepts a `fetch` parameter, making it testable and compatible with SvelteKit's server-side fetch
