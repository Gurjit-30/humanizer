---
wave: 1
depends_on: []
files_modified:
  - server/index.js
  - src/App.tsx
  - src/components/History.tsx
  - src/components/TrustBanner.tsx
autonomous: true
requirements: [ENG-01, ENG-02, ENG-03, ENG-04]
---

# Phase 2: Core Engine & Integration

Implement the high-precision AI humanization engine and integrate it with the React frontend.

<task>
<read_first>
- .planning/phases/02-core-engine/02-CONTEXT.md
- .planning/phases/02-core-engine/02-RESEARCH.md
- .planning/phases/02-core-engine/02-UI-SPEC.md
</read_first>
<acceptance_criteria>
- Express server runs on port 3001.
- CORS is restricted to localhost:5173.
- POST /api/humanize endpoint successfully processes text using Gemini 2.0 Flash.
- Environment variables for API keys are correctly handled (.env).
</acceptance_criteria>
<action>
1. Initialize a Node.js project in the `server/` directory.
2. Install dependencies: `express`, `cors`, `dotenv`, `@google/generative-ai`.
3. Create `server/index.js` with Express setup, CORS config, and a health check.
4. Implement the Gemini API client initialization using `gemini-2.0-flash`.
</action>
</task>

<task>
<read_first>
- .planning/phases/02-core-engine/02-RESEARCH.md
- .planning/phases/02-core-engine/02-CONTEXT.md
</read_first>
<acceptance_criteria>
- Humanization logic uses a two-stage "Critique & Refine" loop.
- Stage 1 (Critic) identifies AI-like patterns and **detects input tone** for adaptive rewriting.
- Stage 2 (Refiner) rewrites based on the critique, injecting academic burstiness while **matching the original tone**.
- **Seamless Chunking:** Logic successfully splits long text (e.g. 5000+ chars) by paragraphs, processes in parallel, and merges correctly.
- Temperature is set to 0.9 for optimal variability.
</acceptance_criteria>
<action>
1. Implement Stage 1: Critic prompt that analyzes input for robotic structures and captures tone context.
2. Implement Stage 2: Refiner prompt that applies human nuances and academic hedging while maintaining the captured tone.
3. Implement a `chunkText` utility that splits input by paragraph boundaries if text exceeds 3,000 characters.
4. Update the endpoint to handle array-based chunk processing and stitching.
</action>
</task>

<task>
<read_first>
- src/App.tsx
</read_first>
<acceptance_criteria>
- Frontend sends text to the backend via POST /api/humanize.
- "Humanize" button is disabled during processing (debouncing).
- **Safety Filter Feedback:** If backend returns a `SAFETY_BLOCKED` error, show a specific toast: "The AI safety filters blocked this text. Please try revising."
- "Hard Error" handling: clear error toast if any other stage fails.
</acceptance_criteria>
<action>
1. Update `src/App.tsx` to use `fetch` to call the backend.
2. Implement loading state and button debouncing to prevent double-clicks.
3. Implement specific catch logic for 403/422 status codes indicating safety filter blocks.
4. Add global error toast for failed humanization attempts.
</action>
</task>

<task>
<read_first>
- src/App.tsx
- .planning/phases/02-core-engine/02-UI-SPEC.md
</read_first>
<acceptance_criteria>
- Dynamic progress messages appear during the "Humanize" wait time.
- Messages: "Analyzing text patterns...", "Identifying robotic structures...", "Drafting humanized version...", "Refining academic nuances...", "Polishing final response...".
</acceptance_criteria>
<action>
1. Implement a state-based status message cycle in `App.tsx` during the loading phase.
2. Style the progress indicator according to the UI-SPEC (minimalist, academic).
</action>
</task>

<task>
<read_first>
- src/App.tsx
</read_first>
<acceptance_criteria>
- Humanization history is saved to LocalStorage.
- History persists after page refresh.
- History objects include: id, original, humanized, and timestamp.
</acceptance_criteria>
<action>
1. Implement a LocalStorage utility for saving/retrieving history in `App.tsx` or a new component.
2. Update the humanization success handler to save results.
3. Implement a "History" UI component (e.g., `src/components/History.tsx`) as per UI-SPEC.
</action>
</task>

<task>
<read_first>
- .planning/phases/02-core-engine/02-UI-SPEC.md
</read_first>
<acceptance_criteria>
- Privacy Trust Banner is visible in the UI footer or near the action button.
- Text: "Your text is processed securely and is never stored on our servers."
</acceptance_criteria>
<action>
1. Create `src/components/TrustBanner.tsx`.
2. Add the banner to the main layout as specified in the UI-SPEC.
</action>
</task>

## Verification & Must Haves

### Verification Plan
1. Start backend: `cd server && node index.js`.
2. Start frontend: `npm run dev`.
3. Input AI-generated text and verify progress status messages appear.
4. Verify output appears in the history sidebar.
5. Refresh page and verify history persists.
6. Test error handling by simulating a backend failure (e.g., stopping the server).

### Must Haves
- Gemini 2.0 Flash integration.
- Two-stage humanization (Critic + Refiner).
- LocalStorage persistence.
- CORS security.
- "Hard Error" failure mode.
- Professional "Trust Banner".
