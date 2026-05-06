# Humanizer AI

## What This Is
A web application featuring an expert text humanization engine designed for students and academics. It takes AI-generated essays and rewrites them to read naturally and authentically, bypassing strict AI detection tools like Turnitin and GPTZero.

## Core Value
The output must consistently bypass academic AI detectors by eliminating structural, language, and vocabulary patterns typical of AI while preserving 100% of the original meaning.

## Requirements

### Validated

<!-- Shipped and confirmed valuable. -->

(None yet — ship to validate)

### Active

<!-- Current scope. Building toward these. -->

- [ ] Implement the text humanization engine using the expert prompt provided by the user.
- [ ] Build a simple, fast web interface with a text box for pasting input text.
- [ ] Provide a one-click "Humanize" button to process the text.
- [ ] Provide a way to easily copy the humanized result.
- [ ] Ensure the engine applies academic domain awareness (subtle humanization, preserving formality).

### Out of Scope

<!-- Explicit boundaries. Includes reasoning to prevent re-adding. -->

- File uploads (Word/PDF) — keeping v1 simple and focused purely on text-in/text-out.
- User accounts and payment gateways — v1 is focused on validating the core engine utility without SaaS overhead.

## Context

- Primary users are students and academics who need to safely submit work.
- The core engine relies on a highly detailed system prompt that uses techniques like perplexity boosting, burstiness, semantic shifting, context anchoring, and tonal inconsistency to evade detection.
- The tone should match the academic domain: semi-formal but with subtle humanizations to bypass detectors.

## Constraints

- **Format**: Text-based only — Keeps the initial build fast and focuses entirely on the AI rewrite quality.
- **Integrity**: Must NEVER change facts, data, or core meaning of the input text.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Text-only interface | Fastest path to validate the core humanization engine without dealing with file parsing | — Pending |
| Focus on Academic users | Allows tuning the prompt specifically for Turnitin/GPTZero evasion | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-05-06 after initialization*
