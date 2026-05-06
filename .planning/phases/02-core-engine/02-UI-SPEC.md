# UI Specification: Core Engine Components

**Phase:** 02
**Goal:** Enhance the Humanizer AI interface with high-precision engine feedback and trust indicators.
**Aesthetic:** Academic, Minimalist, High-Trust.

## 1. Progress Status Indicators
- **Context:** Displayed during the "Critique & Refine" loop (10-20s duration).
- **Placement:** Inside the `Humanize` button (replacing text) or directly above the output textarea.
- **States & Copy:**
  1. `Analyzing robotic patterns...`
  2. `Mapping human linguistic variance...`
  3. `Applying academic nuances...`
  4. `Finalizing undetectable flow...`
- **Visuals:** 
  - **Font:** 13px Inter, Semi-bold.
  - **Color:** `text-slate-500`.
  - **Animation:** `animate-pulse` (subtle opacity breathing) on the text.
  - **Progress Bar:** A hairline indeterminate loader (2px) at the top of the output Card.

## 2. Privacy Trust Banner
- **Context:** Reassure academic users that their text is secure.
- **Placement:** Bottom of the main Card (CardFooter).
- **Style:**
  - **Icon:** Lucide `ShieldCheck` or `Lock` (12px).
  - **Font:** 11px Inter, Font-weight: 400.
  - **Color:** `text-slate-400` (muted).
  - **Copy:** "Privacy First: Your text is processed securely and is never stored on our servers."

## 3. History Component (LocalStorage)
- **Component:** `Sheet` or `Popover` from Shadcn.
- **Trigger:** Small "History" icon (Lucide `History`) in the top-right of the input area.
- **List Item:** 
  - Title: Snippet of input text (first 40 chars).
  - Subtitle: Date/Time (e.g., "2m ago").
  - Interaction: Click to restore both input and output to state.

## 4. Copywriting & Micro-interactions
- **Success Toast:** "Humanization Complete" (with a summary of changes, e.g., "3 patterns refined").
- **Error Toast:** "Refinement Failed" (with clear "Retry" action).
- **Button Hover:** Subtle glow effect when hovering over the "Humanize" button to signify "ready to process."

## Spacing & Dimensions
- **Trust Banner Margin:** `mt-6` from the text areas.
- **Status Message Gap:** `gap-2` between icon and text.

---
*UI-SPEC Approved: 2026-05-06*
