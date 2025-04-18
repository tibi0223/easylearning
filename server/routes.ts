import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { ZodError } from "zod";
import { summarizeRequestSchema, SummarizeRequest } from "@shared/schema";
import { extractTextFromPDF, generateSummaryOrAnswer } from "./api/summarize";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Create a folder for demo documents if it doesn't exist
const demoDocumentsDir = path.join(__dirname, "demo_documents");
if (!fs.existsSync(demoDocumentsDir)) {
  fs.mkdirSync(demoDocumentsDir, { recursive: true });
}

// Sample demo text about artificial intelligence
const demoText = `# Introduction to Artificial Intelligence

Artificial Intelligence (AI) is a branch of computer science that aims to create systems capable of performing tasks that would typically require human intelligence. These tasks include learning, reasoning, problem-solving, perception, and language understanding.

## Key Areas of AI

1. **Machine Learning**: Algorithms that improve through experience
2. **Natural Language Processing**: Enabling computers to understand human language
3. **Computer Vision**: Allowing machines to interpret and make decisions based on visual input
4. **Robotics**: Creating machines that can perform physical tasks
5. **Expert Systems**: Programs designed to mimic human experts in specific domains

## Applications of AI

AI has transformed numerous industries, including:

- **Healthcare**: Disease diagnosis, drug discovery, and personalized treatment
- **Finance**: Fraud detection, algorithmic trading, and risk assessment
- **Transportation**: Self-driving vehicles and traffic optimization
- **Retail**: Recommendation systems and inventory management
- **Education**: Personalized learning and automated grading

## Ethical Considerations

The rapid advancement of AI raises important ethical questions:

- Privacy concerns with data collection
- Potential job displacement due to automation
- Algorithmic bias and fairness
- Safety and security risks
- Long-term impact on society

## Future Directions

As AI continues to evolve, researchers are exploring:

- General artificial intelligence that can perform any intellectual task
- Improved human-AI collaboration
- More transparent and explainable AI systems
- AI that can operate with limited computational resources
- Systems that combine multiple AI capabilities

The field of artificial intelligence remains one of the most dynamic and promising areas of technology, with the potential to solve complex problems and transform how we live and work.`;

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint for summarizing PDFs or text
  app.post("/api/summarize", upload.single("file"), async (req: Request, res: Response) => {
    try {
      // Parse form data
      const question = req.body.question || "";
      const language = req.body.language || "english";
      let text = "";
      
      try {
        // Check if user wants to use the demo document
        if (req.body.useDemo === "true") {
          console.log("Using demo document...");
          text = demoText;
        }
        // Check if there's a direct text content provided
        else if (req.body.content) {
          console.log("Using provided content...");
          text = req.body.content;
        }
        // Otherwise check if there's a file uploaded
        else if (req.file) {
          console.log("Processing uploaded file:", req.file.originalname);
          text = await extractTextFromPDF(req.file.buffer);
        } else {
          return res.status(400).json({ 
            message: "Either a PDF file or content must be provided." 
          });
        }
        
        // Call OpenAI API to generate summary/answer
        if (text.length > 0) {
          console.log(`Calling OpenAI API with ${text.length} characters, language: ${language}`);
          const response = await generateSummaryOrAnswer(text, question, language);
          
          // Return the summary/answer
          return res.json({ 
            summary: response,
            question: question || undefined
          });
        } else {
          return res.status(400).json({ 
            message: "Could not extract text from the provided PDF." 
          });
        }
        
      } catch (error) {
        if (error instanceof ZodError) {
          return res.status(400).json({ 
            message: "Invalid request data", 
            errors: error.errors 
          });
        }
        throw error;
      }
    } catch (error: any) {
      console.error("Error processing document:", error);
      return res.status(500).json({ 
        message: error.message || "Failed to process document." 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
