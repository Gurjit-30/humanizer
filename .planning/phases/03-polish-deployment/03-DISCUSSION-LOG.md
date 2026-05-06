# Phase 3 Discussion Log: Polish & Deployment

## Research Findings
- **Academic AI Humanization:** Focus on "burstiness" (varied sentence length) and "perplexity" (structural complexity). Inject "intellectual hesitation" (hedging) to bypass advanced detectors.
- **Academic UI Patterns:** Essential features include Word Count, Reading Time (~225 wpm), and a visual "Humanity Score" gauge.
- **Micro-animations:** Skeleton loaders and subtle pulse effects are preferred for professional academic tools.
- **Deployment:** Render or Railway are recommended for unified monorepo management.

## Questions for Developer
1. **Micro-animations:** Would you prefer a **skeleton loader** for the result box or a **subtle pulsing gradient** overlay on the original text during transformation?
2. **Academic Indicators:** Should we implement a visual **"Humanity Score" gauge** alongside Word Count and Reading Time?
3. **Prompt V2 Refinement:** Should we explicitly instruct the AI to **avoid common robotic transitions** (e.g., "Furthermore", "In conclusion") in favor of context-aware phrasing?
4. **Deployment Target:** Preference for **Render** (unified) vs **Vercel + Railway** (optimized frontend)?
5. **UI Layout:** Would a **side-by-side "Compare" mode** be more valuable than the current sequential layout for the polished version?
