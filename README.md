# Humanizer AI — Academic Engine V1.2

Humanizer AI is a professional-grade text processing tool designed to transform AI-generated content into high-precision, natural-sounding academic prose. It leverages a multi-stage **Critique & Refine** orchestration using **Gemini 2.5 Flash** to bypass pattern-based detection while maintaining scholarly rigor.

![Humanizer UI Mockup](https://raw.githubusercontent.com/Gurjit-30/humanizer/master/public/og-image.png) *(Placeholder for branding)*

## ✨ Key Features

- **Critique & Refine Logic:** A dual-stage orchestration where the AI first identifies robotic patterns and then performs a targeted rewrite.
- **Intellectual Hedging:** Automatically injects academic nuance (e.g., "suggests that", "one might contend") to mimic the cautious tone of peer-reviewed human writing.
- **Humanity Score Gauge:** Visual feedback (0-100%) based on sentence length variation (burstiness) and absence of common AI markers.
- **Live Academic Metrics:** Real-time Word Count and estimated Reading Time tracking.
- **Privacy First:** Text is processed securely and is never stored on our servers.
- **Seamless Chunking:** Supports long-form academic text (3000+ characters) without quality degradation.

## 🛠️ Technology Stack

- **Frontend:** React 19, Vite, Tailwind CSS, Shadcn UI, Lucide Icons.
- **Backend:** Node.js, Express.js.
- **AI Engine:** Google Generative AI (Gemini 2.5 Flash).
- **State Management:** React Hooks & LocalStorage (for session history).

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Gurjit-30/humanizer.git
cd humanizer
```

### 2. Configure Environment Variables
Create a `.env` file in the `server` directory:
```bash
GEMINI_API_KEY=your_google_ai_studio_key_here
PORT=3001
```

### 3. Install Dependencies
```bash
# Install root/frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 4. Run Locally (Development)
```bash
# In the root directory (starts Vite dev server with proxy to port 3001)
npm run dev

# In another terminal
cd server
node index.js
```

## 📦 Production Deployment

The project is configured for a unified deployment (e.g., on Render or Railway).

```bash
# Build the production assets
npm run build

# Start the unified server (serves frontend from port 3001)
npm run start
```

## 📜 Academic Integrity
This tool is intended to assist writers in refining the flow and readability of their drafts. Users are responsible for ensuring their use of the tool complies with the academic integrity policies of their respective institutions.

---
© 2026 HUMANIZER AI ENGINE • ENCRYPTED END-TO-END • ACADEMIC COMPLIANT
