# TrustMesh Handoff

## Current State

- Branch: `main`; remote: `origin` (`https://github.com/ayushkorde-hash/trustmesh.git`)
- The application is a Next.js 16 App Router demo with all existing routes preserved.
- The landing hero uses only `public/images/ai-sculpture.jpg`.
- `human-ai-hand.jpg` remains on disk but is not rendered or referenced by the app.

## Image Recovery

The exact `ai-network-mesh.jpg` was not found in Git history, the project and `.kilo` folders, accessible user image folders, Downloads, Desktop, Documents, Recycle Bin, or detected IDE history folders. It has not been recreated or substituted.

## Token Intelligence Truth Model

`/token-intelligence` is a deterministic, client-side calculator. It supports preset workflows, provider/model selection, optional agent overhead, comparison cards, and configurable client-side budgets.

- **Estimated usage:** Calculated from the selected workload and heuristic token ratios.
- **Catalog-rate projection:** Estimated tokens multiplied by static values in `src/data/token-catalog.ts`.
- **Locally tracked usage:** Not connected.
- **Verified provider-reported usage/quota:** Not connected and intentionally shown as unavailable.

The catalog links to provider pricing pages, but it is not a live billing integration. Verify provider terms and rates before making financial decisions.

## Visual System

The shared style layer maps legacy violet, indigo, and purple utilities to monochrome neutrals and disables gradient fills while individual legacy screens are incrementally refined. The landing page now has a black-and-white hero, white primary actions, and a keyboard-accessible mobile navigation drawer.

## Safe Continuation

1. Run `npm run lint`, `npx tsc --noEmit`, and `npm run build` after each material UI change.
2. Keep generated files, `node_modules`, `.next`, and `.env*` files out of commits.
3. Do not claim provider telemetry, current prices, or live deployment state without direct verification.
4. Before changing Next.js APIs, read the relevant guide in `node_modules/next/dist/docs/` as required by `AGENTS.md`.
