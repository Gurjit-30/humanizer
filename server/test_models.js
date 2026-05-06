import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testModel(modelName) {
  console.log(`Testing ${modelName}...`);
  try {
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent('Say hello');
    console.log(`${modelName} PASSED: ${result.response.text().trim()}`);
    return true;
  } catch (err) {
    console.log(`${modelName} FAILED: ${err.message}`);
    return false;
  }
}

async function run() {
  await testModel('gemini-2.5-flash');
  await testModel('gemini-2.0-flash');
  await testModel('gemini-1.5-flash');
}

run();
