import { generateSystemPrompt, generateUserPrompt } from "./generatePrompt";

/**
 * Configuration options for the OpenAI API call
 */
export interface OpenAIOptions {
  maxTokens?: number;
  temperature?: number;
  language: "english" | "hungarian";
}

/**
 * The response from OpenAI API after processing
 */
export interface OpenAIResponse {
  summary: string;
  question?: string;
}

/**
 * Calls the OpenAI API through our backend to get a summary or answer
 */
export async function callOpenAI(
  content: string,
  question?: string,
  options: OpenAIOptions = { language: "english" }
): Promise<OpenAIResponse> {
  const { language } = options;
  
  try {
    // In a real implementation, we'd make a fetch request to our API
    // For now, this will be handled by our server/api/summarize endpoint
    const response = await fetch("/api/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
        question,
        language
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to process document");
    }
    
    const data = await response.json();
    return {
      summary: data.summary,
      question: data.question
    };
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw error;
  }
}
