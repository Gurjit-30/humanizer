# Phase Research: Core Engine & Integration

**Phase:** 02
**Goal:** Research implementation patterns for a high-precision AI humanization engine.

## Technical Findings

### 1. Google Generative AI SDK (Gemini 2.0 Flash)
- **Library:** `@google/generative-ai` (v1.0.0+).
- **Initialization:** Use `GoogleGenerativeAI` class with an API key from `process.env`.
- **Model:** `gemini-2.0-flash`.
- **Configuration:** Set `temperature: 0.9` to `0.95` for high variability as requested in discussion.
- **Example Usage:**
```javascript
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const result = await model.generateContent(prompt);
const response = await result.response;
const text = response.text();
```

### 2. "Critique & Refine" Prompting Strategy
- **Stage 1 (Critique):**
  - **Prompt:** "Act as a linguistics expert. Analyze the following text for common AI markers (repetitive transitions, uniform sentence structures, robotic vocabulary). List specific areas for improvement."
- **Stage 2 (Refinement):**
  - **Prompt:** "Using the critique provided, rewrite the original text. vary sentence lengths significantly (burstiness) and use more nuanced, human-like vocabulary while maintaining the original academic tone and meaning."

### 3. Text Chunking for Academic Prose
- **Strategy:** Paragraph-first chunking.
- **Library:** `sentence-splitter` or a custom regex-based splitter that respects academic citations (e.g., `(Author, Year)`).
- **Buffer:** Keep chunks around 3,000 characters to allow room for the prompt and generated response within context limits.

### 4. Express API Security & Vite Integration
- **Server Setup:** Use `express`, `cors`, and `dotenv`.
- **Port:** 3001 (to avoid conflict with Vite on 5173).
- **CORS:** Restrict to `http://localhost:5173`.
- **Middleware:** `express.json()` with a larger `limit` (e.g., `5mb`) for long essays.

## Code Patterns & analog Files
- **Backend:** `server/index.js` (main entry), `server/routes/humanize.js` (logic).
- **Frontend Integration:** Create a `src/lib/api.ts` to handle fetch requests with state-based status updates.

## Verification Patterns
- **Unit Tests:** Mock the Gemini API response to test the Critique & Refine orchestration.
- **Integration Tests:** Verify LocalStorage persistence after successful humanization.

---
*Research complete: 2026-05-06*
