import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '5mb' }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../dist')));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

// Utility to split text into chunks by paragraph
const chunkText = (text, maxLength = 3000) => {
  const paragraphs = text.split(/\n+/);
  const chunks = [];
  let currentChunk = "";

  for (const p of paragraphs) {
    if ((currentChunk + p).length > maxLength && currentChunk.length > 0) {
      chunks.push(currentChunk.trim());
      currentChunk = p + "\n\n";
    } else {
      currentChunk += p + "\n\n";
    }
  }
  if (currentChunk.trim().length > 0) {
    chunks.push(currentChunk.trim());
  }
  return chunks;
};

const calculateHumanityScore = (text) => {
  if (!text) return 0;
  
  // Basic pseudo-logic for humanity score
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const sentenceLengths = sentences.map(s => s.trim().split(/\s+/).length);
  
  // 1. Calculate Burstiness (standard deviation of sentence lengths)
  const avgLength = sentenceLengths.reduce((a, b) => a + b, 0) / sentenceLengths.length;
  const variance = sentenceLengths.reduce((a, b) => a + Math.pow(b - avgLength, 2), 0) / sentenceLengths.length;
  const burstiness = Math.sqrt(variance);
  
  // 2. Check for "AI Fingerprints" (Common connectors we want to avoid)
  const forbidden = ["furthermore", "moreover", "in conclusion", "it is important to note", "consequently", "additionally"];
  let fingerprintPenalty = 0;
  const lowerText = text.toLowerCase();
  forbidden.forEach(word => {
    if (lowerText.includes(word)) fingerprintPenalty += 5;
  });

  // Base score 80 + burstiness bonus (up to 15) - penalty
  let score = 80 + (burstiness > 10 ? 15 : (burstiness / 10) * 15) - fingerprintPenalty;
  
  return Math.min(Math.max(Math.round(score), 0), 100);
};

const humanizeChunk = async (chunk) => {
  // Stage 1: Critique
  const critiquePrompt = `Analyze the following academic/professional text for "robotic" patterns, lack of sentence variety (burstiness), and overly consistent AI-style transitions.
Input Text: "${chunk}"

Provide a brief critique of what specifically needs humanizing to make it indistinguishable from a high-level human writer. Also detect and note the intended tone.`;

  const critiqueResult = await model.generateContent(critiquePrompt);
  const critiqueText = critiqueResult.response.text();

  // Stage 2: Refine (V3 - Academic Mastery)
  const refinePrompt = `Rewrite the original text below using the provided critique to make it sound completely human. 
Original Text: "${chunk}"
Critique: "${critiqueText}"

Instructions for HUMAN-LIKE flow:
1. **NO ROBOTIC CONNECTORS:** Absolutely do not use "Furthermore", "Moreover", "Additionally", "In conclusion", or "Consequently".
2. **USE ACADEMIC HEDGING:** Instead of absolute statements, use "intellectual hesitation" like "suggests that", "might indicate", "one could argue", or "it is plausible that".
3. **BURSTINESS:** Vary sentence length dramatically. Mix short, impactful observations with longer, nuanced explanations.
4. **NATURAL TRANSITIONS:** Use context-aware transitions like "This shift in perspective...", "Beyond these initial findings...", or "Crucially, however...".
5. Maintain the exact original meaning and level of sophistication.
6. Return ONLY the humanized text, no headers or explanations.`;

  const refineResult = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: refinePrompt }] }],
    generationConfig: {
      temperature: 0.95,
      topP: 0.95,
    },
  });

  return refineResult.response.text().trim();
};

app.post('/api/humanize', async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  try {
    const chunks = chunkText(text);
    const humanizedChunks = [];

    for (let i = 0; i < chunks.length; i++) {
      const result = await humanizeChunk(chunks[i]);
      humanizedChunks.push(result);
    }

    const finalOutput = humanizedChunks.join('\n\n');
    const humanityScore = calculateHumanityScore(finalOutput);
    
    res.json({ 
      output: finalOutput,
      humanityScore: humanityScore
    });
  } catch (error) {
    console.error('Humanization Error:', error);
    
    // Check for safety filter blocks
    if (error.message?.includes('SAFETY')) {
      return res.status(422).json({ error: 'SAFETY_BLOCKED' });
    }

    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', engine: 'Gemini 2.5 Flash', version: '1.2.0' });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, () => {
  console.log(`Core Engine running at http://localhost:${port}`);
});
