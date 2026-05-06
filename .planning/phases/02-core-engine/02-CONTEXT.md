# Phase Context: Core Engine & Integration

**Phase:** 02
**Goal:** Implement the high-precision AI humanization engine and integrate it with the frontend.
**Date:** 2026-05-06

## Domain Boundary
This phase focuses on building the backend text processing engine using the Google Gemini API and wiring it to the React frontend. It delivers the actual humanization capability while maintaining security and academic precision.

## Decisions

### Humanization Strategy
- **Logic:** Implement a **Critique & Refine** loop. A "Critic" prompt first identifies robotic patterns, followed by a "Refiner" prompt that rewrites only the identified sections.
- **Tone:** **Adaptive**. The engine must detect and match the original tone of the input text.
- **Variability:** **High Temperature**. Focus on variety to better evade pattern-based AI detectors.
- **Chunking:** **Seamless Parallel Chunking**. Long texts are split, processed independently, and stitched back together to maintain quality.

### AI Engine
- **Provider:** **Google Gemini**.
- **Model:** **Gemini 2.0 Flash**.
- **Credentials:** Managed via **System Environment Variables** (`.env` file on the server).
- **Safety:** **Direct Feedback**. If safety filters trigger, the UI must explicitly inform the user to revise the content.

### Architecture & Integration
- **Backend:** Separate **Express.js** server to secure API keys and handle multi-stage processing logic.
- **Communication:** **Standard JSON Response**. The frontend waits for the full processing loop to finish.
- **Progress Tracking:** **Step-by-Step Status**. The UI must display dynamic messages (e.g., "Analyzing...", "Refining...") during the wait.
- **Security:** **CORS Restriction**. The backend will only accept requests from the verified frontend domain.
- **Persistence:** **Browser LocalStorage**. User humanization history is saved locally in the browser, not on the server.

### Safety & Trust
- **Interaction:** **Frontend Debouncing**. Disable the "Humanize" button during processing to prevent duplicate calls.
- **Error Handling:** **Hard Error**. If any stage of the refinement fails, return a clear error instead of a partial result.
- **Privacy:** **Trust Banner**. A subtle note in the UI confirming that text is never stored on the server.

## Deferred Ideas
- **Custom Model Training:** fine-tuning a bespoke model on academic datasets.
- **AI Detection Check:** built-in scoring against detectors like GPTZero.
- **Streaming Output:** real-time word-by-word generation.

## Canonical Refs
- [ROADMAP.md](file:///c:/Users/gurji/Desktop/humanizer/.planning/ROADMAP.md)
- [REQUIREMENTS.md](file:///c:/Users/gurji/Desktop/humanizer/.planning/REQUIREMENTS.md)

## Code Context
- **Frontend Components:** Already built in Phase 1 (`App.tsx`, `textarea.tsx`, `card.tsx`).
- **State Management:** Need to extend `App.tsx` state to handle multi-stage status messages and LocalStorage history.
- **Server:** Need to initialize `server/index.js` with Express and `@google/generative-ai`.
