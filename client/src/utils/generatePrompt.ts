/**
 * Generates prompts for the OpenAI API to process PDF content.
 */

export interface PromptOptions {
  language: "english" | "hungarian";
}

/**
 * Generates a system prompt for the AI based on language
 */
export function generateSystemPrompt(options: PromptOptions): string {
  const { language } = options;
  
  if (language === "hungarian") {
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
 * Generates a user prompt with document content and optional question
 */
export function generateUserPrompt(
  content: string, 
  question?: string, 
  options: PromptOptions = { language: "english" }
): string {
  const { language } = options;
  const trimmedContent = content.slice(0, 15000); // Limit document size for API
  
  if (question && question.trim()) {
    if (language === "hungarian") {
      return `Dokumentum tartalma:\n\n${trimmedContent}\n\nKérdés: ${question}`;
    }
    return `Document content:\n\n${trimmedContent}\n\nQuestion: ${question}`;
  }
  
  if (language === "hungarian") {
    return `Add meg ennek a dokumentumnak a rövid, tömör összefoglalását:\n\n${trimmedContent}`;
  }
  return `Provide a brief, concise summary of this document:\n\n${trimmedContent}`;
}
