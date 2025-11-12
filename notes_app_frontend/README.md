# Ocean Notes (Vue 3 + Vite)

A simple, fast notes application with an Ocean Professional theme. Create, search, edit, and delete notes with automatic local persistence (LocalStorage). Built with Vue 3, Pinia, and Vue Router.

## Features
- Themed UI with Top Bar, Sidebar, and main content area
- Create, select, edit, and delete notes
- Real-time search across titles and content
- Local persistence via LocalStorage (safe fallback if unavailable)
- Accessible labels and focus styles
- Environment variables via `import.meta.env`

## Quick start
```bash
npm install
npm run dev
```

Vite dev server runs on port 3000 (already configured). To preview a production build:
```bash
npm run build
npm run preview
```

## Environment variables
Copy `.env.example` to `.env` and adjust if needed. Notable keys:
- `VITE_LOG_LEVEL`: controls console log verbosity (silent, error, warn, info, debug)
- `VITE_FEATURE_FLAGS`: displayed in the sidebar (e.g., `search,local-persistence`)
- `VITE_NODE_ENV`: environment indicator shown in the top bar

## Project scripts
- `npm run dev` - start dev server (port 3000)
- `npm run build` - type-check, compile, and minify
- `npm run preview` - preview production build
- `npm run test:unit` - run unit tests (if present)
- `npm run lint` - lint codebase

## Notes on data
All notes are stored in your browser’s LocalStorage under the key `notes_app_v1`. Clearing browser storage will remove notes.

## Tech
- Vue 3 + Vite
- Pinia (state)
- Vue Router
- TypeScript
