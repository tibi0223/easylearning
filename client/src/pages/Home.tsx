import React, { useState } from "react";
import { Header } from "@/components/Header";
import { UploadForm } from "@/components/UploadForm";
import { Loader } from "@/components/Loader";
import { SummaryResult } from "@/components/SummaryResult";
import { ErrorResult } from "@/components/ErrorResult";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

type ViewState = "upload" | "loading" | "result" | "error";

export default function Home() {
  const [viewState, setViewState] = useState<ViewState>("upload");
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [question, setQuestion] = useState<string>("");
  const [language, setLanguage] = useState<"english" | "hungarian">("english");
  const [result, setResult] = useState<{ summary: string; question?: string }>({
    summary: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  
  // Mutation for processing the document
  const mutation = useMutation({
    mutationFn: async () => {
      if (!currentFile && !useDemoDocument) {
        throw new Error("No file selected");
      }
      
      // Create form data for the file upload
      const formData = new FormData();
      
      if (currentFile) {
        formData.append("file", currentFile);
      }
      
      formData.append("language", language);
      
      if (question.trim()) {
        formData.append("question", question);
      }
      
      // If using demo document, indicate it
      if (useDemoDocument) {
        formData.append("useDemo", "true");
      }
      
      // Send request
      const response = await apiRequest("POST", "/api/summarize", formData);
      return await response.json();
    },
    onSuccess: (data) => {
      setResult({
        summary: data.summary,
        question: data.question,
      });
      setViewState("result");
    },
    onError: (error) => {
      setErrorMessage(error instanceof Error ? error.message : "Unknown error occurred");
      setViewState("error");
    },
  });
  
  const [useDemoDocument, setUseDemoDocument] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (file: File | null, question: string, language: "english" | "hungarian") => {
    setCurrentFile(file);
    setQuestion(question);
    setLanguage(language);
    setViewState("loading");
    
    // If no file is selected, show option to use demo document
    if (!file && !useDemoDocument) {
      setUseDemoDocument(true);
    }
    
    // Start processing
    mutation.mutate();
  };

  // Function to handle using demo document
  const handleUseDemoDocument = () => {
    setUseDemoDocument(true);
    setViewState("loading");
    mutation.mutate();
  };

  // Function to try again
  const handleTryAgain = () => {
    setViewState("upload");
    setErrorMessage("");
  };

  // Function to start a new query
  const handleNewQuery = () => {
    setViewState("upload");
    setResult({ summary: "" });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-6 bg-gradient-to-br from-gray-50 to-gray-100 font-inter">
      <Header language={language} onLanguageChange={(lang) => setLanguage(lang)} />
      
      <main className="w-full max-w-3xl flex flex-col items-center">
        {viewState === "upload" && (
          <UploadForm 
            onSubmit={handleSubmit} 
            onUseDemoDocument={handleUseDemoDocument}
            language={language}
          />
        )}
        
        {viewState === "loading" && <Loader />}
        
        {viewState === "result" && (
          <SummaryResult 
            summary={result.summary} 
            question={result.question}
            language={language}
            onNewQuery={handleNewQuery}
          />
        )}
        
        {viewState === "error" && (
          <ErrorResult 
            errorMessage={errorMessage} 
            onTryAgain={handleTryAgain} 
            onUseDemoDocument={handleUseDemoDocument}
          />
        )}
      </main>
      
      <footer className="w-full max-w-4xl text-center text-gray-500 text-sm mt-8 mb-10 font-opensans">
        <p>EasyLearner.ai — Powered by GPT-4o</p>
        <p className="mt-1 text-xs">Upload limits: PDF files up to 10MB. Your files are processed securely and not stored permanently.</p>
      </footer>
    </div>
  );
}
