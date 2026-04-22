# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start Vite dev server with HMR
npm run build      # Type-check (tsc -b) then bundle for production
npm run lint       # ESLint across all files
npm run preview    # Preview the production build locally
```

No test runner is configured — there are no test files in the project.

## Architecture

**mk-voxel** is a browser-based 3D voxel sprite editor. It has two clear layers:

### Engine Layer (`src/engine/`)
Framework-agnostic voxel data and rendering logic.

- **`core/MkVoxel.ts`** — The main engine class. Owns all sprite/animation/frame/voxel operations. All mutations go through the utils here.
- **`core/utils/`** — Pure functions for sprite, animation, frame, voxel, palette, and logging operations.
- **`renderers/SpriteRendererBabylon.ts`** — Babylon.js 3D renderer implementing `ISpriteRenderer`. Converts voxel data into Babylon meshes and manages camera/materials.
- **`types/SpriteData.ts`** — The canonical data interfaces: `SpriteData`, `Animation`, `Frame`, `Material`, `Palette`, `Dimensions`. Frames store voxels as `Uint8Array`.

### Editor Layer (`src/editor/`)
React UI on top of the engine.

- **`EditorApp.tsx`** — Root layout using Mantine `AppShell`. Splits into: Header (60px), Navbar (400px, collapsible), main content (split panes), and Timeline (bottom).
- **`store/useEditorStore.ts`** — Single Zustand store with `persist` and `subscribeWithSelector` middleware. All sprite state, current selections, and UI preferences live here. Persisted to `localStorage` with custom `Uint8Array` serialization via `Buffer.from/toString('hex')`.
- **`components/`** — React components. The main editing surfaces are:
  - `View.tsx` — wraps the Babylon.js canvas (3D preview)
  - `frameEdit/SliceEdit.tsx` — 2D grid painter for the current XZ slice
  - `Timeline.tsx` — animation and frame browser

### Data Flow
User paints in `SliceEdit` → Zustand store mutation → Babylon renderer is notified via `rendererNotifier` utility → re-renders the 3D mesh. Layout auto-switches between vertical (width/height > 1.7) and horizontal split panes based on viewport aspect ratio.

## Key Conventions

- **Voxel storage**: `Uint8Array` indexed as `x + z * dimX + y * dimX * dimZ`. Material index `0` = empty voxel.
- **Immutable updates**: `structuredClone` is used for deep-copying voxel data before mutation; do not mutate `Uint8Array` in place without cloning first.
- **Stroke batching**: Multiple voxel paint operations during a single mouse drag are batched before committing to the store.
- **Renderer abstraction**: `ISpriteRenderer` interface allows swapping renderers; Babylon.js is the only current implementation.
- **Styling**: CSS Modules (`.module.scss`) for component-scoped styles; global styles in `src/editor/utils/styles.scss`.
- **Formatting**: Prettier enforces tab width 2, print width 100, trailing commas (`all`).
