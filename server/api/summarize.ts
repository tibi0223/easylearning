import OpenAI from "openai";
import { createRequire } from "module";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY || ""
});

// Create a require function to load CommonJS modules from ESM
const require = createRequire(import.meta.url);

export interface SummarizeOptions {
  maxTokens?: number;
  temperature?: number;
}

/**
 * Uses OpenAI's GPT-4o model to generate a summary or answer questions
 * about the provided text content.
 */
export async function generateSummaryOrAnswer(
  content: string, 
  question?: string, 
  language: string = "english",
  options: SummarizeOptions = {}
): Promise<string> {
  const maxTokens = options.maxTokens || 600;
  const temperature = options.temperature || 0.7;
  
  // Generate the system prompt based on language
  const systemPrompt = createSystemPrompt(language);
  
  // Generate user prompt with the document content and optional question
  const userPrompt = createUserPrompt(content, question, language);
  
  try {
    console.log("Calling OpenAI API...");
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      max_tokens: maxTokens,
      temperature: temperature,
    });
    
    console.log("OpenAI API response received successfully");
    return response.choices[0].message.content || "";
  } catch (error: any) {
    console.error("Error calling OpenAI API:", error);
    throw new Error(`Failed to generate summary: ${error.message || "Unknown error"}`);
  }
}

/**
 * Creates the system prompt for the AI based on the selected language
 */
function createSystemPrompt(language: string): string {
  if (language.toLowerCase() === "hungarian") {
    return `Válaszolj a felhasználó kérdésére a lehető legvilágosabban és legtömörebben.
    Kezdd **egy-mondatos közvetlen válasszal**, majd adj rövid kontextust, ha szükséges.
    Formázd a válaszodat **rövid bekezdésekbe (max. 3 sor)** vagy **felsoroláspontokba**.
    Kerüld a kérdés megismétlését.`;
  }
  
  return `Answer the user's question as clearly and concisely as possible.
  Begin with a **one-sentence direct answer**, then provide short context if needed.
  Format your response into **short paragraphs (max 3 lines)** or **bullet points**.
  Avoid repeating the question.`;
}

/**
 * Creates the user prompt containing document content and optional question
 */
function createUserPrompt(content: string, question?: string, language: string = "english"): string {
  const trimmedContent = content.slice(0, 15000); // Limit document size for API
  
  if (question && question.trim()) {
    if (language.toLowerCase() === "hungarian") {
      return `Dokumentum tartalma:\n\n${trimmedContent}\n\nKérdés: ${question}`;
    }
    return `Document content:\n\n${trimmedContent}\n\nQuestion: ${question}`;
  }
  
  if (language.toLowerCase() === "hungarian") {
    return `Add meg ennek a dokumentumnak a rövid, tömör összefoglalását:\n\n${trimmedContent}`;
  }
  return `Provide a brief, concise summary of this document:\n\n${trimmedContent}`;
}

/**
 * Extracts text content from a PDF file using pdf-parse library
 */
export async function extractTextFromPDF(pdfBuffer: Buffer): Promise<string> {
  try {
    console.log("Extracting text from PDF...");
    
    // Dynamically load pdf-parse only when needed
    const pdfParse = require('pdf-parse');
    const data = await pdfParse(pdfBuffer);
    
    console.log(`Extracted ${data.text.length} characters from PDF`);
    return data.text;
  } catch (error: any) {
    console.error("Error extracting text from PDF:", error);
    throw new Error(`Failed to extract text from PDF: ${error.message || "Unknown error"}`);
  }
}
