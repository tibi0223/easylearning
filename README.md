# EasyLearner.AI

EasyLearner.AI is a web application that uses OpenAI's GPT-4o to summarize and answer questions from PDF documents.

## Features

- Upload PDF files for analysis (up to 10MB)
- Enter text content directly for summarization
- Ask specific questions about your documents
- Try with a demo document about Artificial Intelligence
- Support for both English and Hungarian languages
- Chat with your documents after summarizing

## Technical Stack

- **Backend**: Node.js with Express.js
- **Frontend**: React with modern UI components (Shadcn/UI, Tailwind CSS)
- **AI**: OpenAI GPT-4o for document analysis and question answering
- **PDF Processing**: pdf-parse for text extraction from PDF files

## Prerequisites

- Node.js (v16+)
- OpenAI API key

## Setup and Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```
4. Start the development server:
   ```
   npm run dev
   ```
5. Open your browser and navigate to http://localhost:5000

## Building for Production

```
npm run build
npm start
```

## Deployment

### Vercel Deployment

The easiest way to deploy this application is using Vercel:

1. Sign up for a [Vercel account](https://vercel.com/signup) if you don't have one
2. Install the Vercel CLI:
   ```
   npm install -g vercel
   ```
3. Login to Vercel:
   ```
   vercel login
   ```
4. Deploy the application:
   ```
   vercel
   ```
5. When prompted, add your OpenAI API key as an environment variable named `OPENAI_API_KEY`

### Sharing with Friends

After deployment, you'll get a URL like `https://easylearner-ai.vercel.app` that you can share with your friends.

Important notes for sharing:
- The application uses your OpenAI API key for all requests
- Each summarization or chat request will count against your OpenAI API usage quota
- For security, consider setting up usage limits on your OpenAI API key

## How It Works

1. Users upload a PDF file or enter text content
2. The application extracts text from PDFs or uses the provided content
3. Users can optionally specify a question about the content
4. The content is sent to OpenAI's GPT-4o API with appropriate prompts
5. The summary or answer is displayed to the user
6. Users can then chat with the AI about the document content

## Notes

- No data is stored permanently on the server
- OpenAI API key is required for functionality
- Files are processed securely and privately