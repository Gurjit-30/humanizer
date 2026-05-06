import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const port = 3001;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json({ limit: '5mb' }));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

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

const humanizeChunk = async (chunk) => {
  // Stage 1: Critique
  const critiquePrompt = `Analyze the following academic/professional text for "robotic" patterns, lack of sentence variety (burstiness), and overly consistent AI-style transitions.
Input Text: "${chunk}"

Provide a brief critique of what specifically needs humanizing to make it indistinguishable from a high-level human writer. Also detect and note the intended tone.`;

  const critiqueResult = await model.generateContent(critiquePrompt);
  const critiqueText = critiqueResult.response.text();

  // Stage 2: Refine
  const refinePrompt = `Rewrite the original text below using the provided critique to make it sound completely human. 
Original Text: "${chunk}"
Critique: "${critiqueText}"

Instructions:
1. Vary sentence length significantly (short and punchy vs long and complex).
2. Use natural transitions that fit the detected tone.
3. Remove any "AI fingerprints" (e.g., "In summary", "It is important to note", "Moreover").
4. Maintain the exact original meaning and level of sophistication.
5. Return ONLY the humanized text, no headers or explanations.`;

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
    res.json({ output: finalOutput });
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
  res.json({ status: 'ok', engine: 'Gemini 2.0 Flash' });
});

app.listen(port, () => {
  console.log(`Core Engine running at http://localhost:${port}`);
});
