import React, { useState } from "react";
import { Header } from "@/components/Header";
import { UploadForm } from "@/components/UploadForm";
import { Loader } from "@/components/Loader";
import { SummaryResult } from "@/components/SummaryResult";
import { ErrorResult } from "@/components/ErrorResult";
import { DocumentIllustration, WavyBackground } from "@/components/IllustrationSVG";
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
    <div className="min-h-screen flex flex-col items-center justify-start p-4 md:p-8 bg-gradient-to-br from-blue-50 via-white to-purple-50 font-inter overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden -z-20">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-50 to-transparent opacity-80"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 -left-24 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 right-1/3 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] -z-10"></div>
      
      {/* Header */}
      <Header language={language} onLanguageChange={(lang) => setLanguage(lang)} />
      
      {/* Main content with two-column layout for desktop */}
      <main className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-12 pt-4 md:pt-8">
        {/* Left column - Illustration (only visible on desktop) */}
        <div className="hidden lg:flex lg:w-5/12 flex-col items-center justify-center">
          <div className="relative">
            {/* Circle background for illustration */}
            <div className="absolute -inset-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-70 blur-md"></div>
            {/* Import the custom illustration */}
            <div className="relative z-10">
              {/* Display the illustration component */}
              <div className="transform hover:scale-105 transition-transform duration-500 ease-in-out">
                <DocumentIllustration />
              </div>
            </div>
          </div>
          
          {/* Feature list */}
          <div className="mt-8 space-y-3 text-left">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="ml-3 text-gray-600">Advanced AI-powered document analysis</p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="ml-3 text-gray-600">Quick summaries and relevant answers</p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="ml-3 text-gray-600">100% secure and private processing</p>
            </div>
          </div>
        </div>
        
        {/* Right column - Main content area */}
        <div className="w-full lg:w-7/12">
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
        </div>
      </main>
      
      {/* Footer */}
      <footer className="w-full max-w-5xl text-center mt-auto py-8">
        <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm px-6 py-4 border border-gray-100">
          <p className="text-gray-600 font-medium">EasyLearner.ai — Powered by GPT-4o</p>
          <p className="mt-1 text-sm text-gray-500">Upload limits: PDF files up to 10MB. Your files are processed securely and not stored permanently.</p>
        </div>
      </footer>
    </div>
  );
}
