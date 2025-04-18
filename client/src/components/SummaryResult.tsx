import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface SummaryResultProps {
  summary: string;
  question?: string;
  language: "english" | "hungarian";
  onNewQuery: () => void;
}

export const SummaryResult: React.FC<SummaryResultProps> = ({ 
  summary, 
  question, 
  language,
  onNewQuery 
}) => {
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  
  // Translations
  const translations = {
    english: {
      documentSummary: "Document Summary",
      answerToQuestion: "Answer to Your Question",
      questionAsked: "Question asked:",
      copy: "Copy",
      newQuery: "New Query",
      copiedToClipboard: "Summary copied to clipboard!"
    },
    hungarian: {
      documentSummary: "Dokumentum Összefoglaló",
      answerToQuestion: "Válasz a Kérdésére",
      questionAsked: "Feltett kérdés:",
      copy: "Másolás",
      newQuery: "Új Lekérdezés",
      copiedToClipboard: "Összefoglaló a vágólapra másolva!"
    }
  };
  
  const t = language === "english" ? translations.english : translations.hungarian;
  
  // Format summary with proper React elements
  const formatSummary = (text: string) => {
    // Split by paragraphs and preserve line breaks
    return text.split("\n").map((paragraph, index) => {
      // If paragraph is a bullet point list
      if (paragraph.trim().startsWith("- ") || paragraph.trim().startsWith("* ")) {
        return <li key={index} className="ml-4">{paragraph.trim().substring(2)}</li>;
      }
      // Regular paragraph
      return paragraph.trim() ? <p key={index} className="mb-3">{paragraph}</p> : null;
    });
  };
  
  // Handle copying summary to clipboard
  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setShowCopySuccess(true);
      setTimeout(() => setShowCopySuccess(false), 3000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };
  
  return (
    <Card className="w-full bg-white rounded-xl shadow-lg overflow-hidden mb-8 animate-in fade-in slide-in-from-bottom-5 duration-300">
      {/* Result Header */}
      <div className="bg-gradient-to-r from-primary-600 to-violet-500 px-6 py-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-white font-inter">
            {question ? t.answerToQuestion : t.documentSummary}
          </h3>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              className="h-8 px-3 py-1.5 bg-transparent border-white/30 text-white hover:bg-white/10"
              onClick={handleCopySummary}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              {t.copy}
            </Button>
            <Button 
              variant="outline" 
              className="h-8 px-3 py-1.5 bg-transparent border-white/30 text-white hover:bg-white/10"
              onClick={onNewQuery}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {t.newQuery}
            </Button>
          </div>
        </div>
        {question && (
          <div className="mt-2 text-sm text-white/80 font-opensans">
            <span className="font-medium">{t.questionAsked}</span> {question}
          </div>
        )}
      </div>
      
      {/* Result Content */}
      <div className="p-6">
        <div className="prose prose-sm max-w-none font-opensans leading-relaxed text-gray-700">
          {formatSummary(summary)}
        </div>
        
        {/* Copy Success Message */}
        {showCopySuccess && (
          <div className="mt-4 p-2 bg-green-50 text-green-800 text-sm rounded-md flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {t.copiedToClipboard}
          </div>
        )}
      </div>
    </Card>
  );
};
