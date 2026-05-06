---
wave: 1
depends_on: []
files_modified:
  - server/index.js
  - src/App.tsx
  - src/components/History.tsx
  - package.json
autonomous: true
---

# Phase 3: Polish & Deployment

**Phase Goal:** Final Polish, Optimization, and Deployment Readiness.

<task>
<read_first>
- server/index.js
- .planning/phases/03-polish-deployment/03-CONTEXT.md
</read_first>
<acceptance_criteria>
- The "Refiner" prompt in `server/index.js` explicitly forbids "Furthermore", "Moreover", and "In conclusion".
- The prompt encourages "Intellectual Hedging" (e.g., "suggests", "might indicate").
- Test output from the engine does not contain forbidden robotic transitions.
</acceptance_criteria>
<action>
1. Update `server/index.js` prompt templates.
2. Add a negative constraint list to the Refiner prompt: "Avoid robotic transitions like: Furthermore, Moreover, Additionally, In conclusion, Consequently."
3. Add a positive constraint: "Use nuanced academic hedging such as 'It is plausible that', 'evidence suggests', 'one might argue'."
</action>
</task>

<task>
<read_first>
- server/index.js
</read_first>
<acceptance_criteria>
- Backend returns a `humanityScore` (0-100) in the `/api/humanize` response.
- The score is calculated based on sentence length variation (burstiness) and absence of common AI markers.
- The score is not a static 100%.
</acceptance_criteria>
<action>
1. Implement a `calculateHumanityScore(text)` utility in `server/index.js`.
2. Logic: Base score of 85. Add/subtract based on:
   - Standard deviation of sentence lengths.
   - Deduction for any remaining AI-like connectors.
3. Include `humanityScore` in the JSON response of `/api/humanize`.
</action>
</task>

<task>
<read_first>
- src/App.tsx
- .planning/phases/03-polish-deployment/03-CONTEXT.md
</read_first>
<acceptance_criteria>
- Loading state in the output card displays a pulsing skeleton loader instead of just text.
- The skeleton loader has a subtle gradient animation.
</acceptance_criteria>
<action>
1. Create a `SkeletonLoader` component or add inline styles to `App.tsx` for a pulsing div.
2. Use CSS keyframes for the "pulse" effect.
3. Replace the current `isLoading` placeholder in the output card with the skeleton component.
</action>
</task>

<task>
<read_first>
- src/App.tsx
</read_first>
<acceptance_criteria>
- Real-time Word Count and Reading Time are visible below the input textarea.
- Values update as the user types.
- Reading Time is calculated at ~225 wpm.
</acceptance_criteria>
<action>
1. Implement word count and reading time derived state in `App.tsx`.
2. Add a "Metrics Bar" below the input card to display these stats.
</action>
</task>

<task>
<read_first>
- src/App.tsx
</read_first>
<acceptance_criteria>
- A visual "Humanity Gauge" appears near the output text.
- The gauge value matches the `humanityScore` from the backend.
- The gauge uses a color gradient (e.g., Red -> Amber -> Emerald).
</acceptance_criteria>
<action>
1. Implement a simple CSS/SVG gauge component in `App.tsx` or a new component.
2. Animate the gauge filling when the response arrives.
3. Map the `humanityScore` to the gauge's percentage and color.
</action>
</task>

<task>
<read_first>
- package.json
- server/index.js
</read_first>
<acceptance_criteria>
- Root `package.json` contains a `build` script that builds the frontend and moves it to the server's public folder (or configures the server to serve it).
- `server/index.js` serves static files from `../dist` in production mode.
- Running `npm run build` and then `node server/index.js` results in a working full-stack app on one port.
</acceptance_criteria>
<action>
1. Add `build` and `start` scripts to the root `package.json`.
2. Update `server/index.js` to use `express.static` for the `dist` directory.
3. Ensure `process.env.PORT` is used for deployment.
</action>
</task>

## Verification & Must Haves

### Verification Plan
1. Run `npm run build` and verify `dist/` is created.
2. Start server in production mode: `NODE_ENV=production node server/index.js`.
3. Open browser and verify everything (gauge, metrics, humanization) works on the single port.
4. Test with a 3000+ word text to verify chunking + metrics performance.

### Must Haves
- AI must NOT use "Furthermore" or "Moreover".
- Dynamic Humanity Score (pseudo-logic).
- Pulsing Skeleton Loaders.
- Unified Build (Frontend + Backend on one port).
