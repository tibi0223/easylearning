import React, { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface UploadFormProps {
  onSubmit: (file: File | null, question: string, language: "english" | "hungarian") => void;
  onUseDemoDocument: () => void;
  language: "english" | "hungarian";
}

export const UploadForm: React.FC<UploadFormProps> = ({ onSubmit, onUseDemoDocument, language }) => {
  const [file, setFile] = useState<File | null>(null);
  const [question, setQuestion] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [showNoFileWarning, setShowNoFileWarning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  // Translations
  const translations = {
    english: {
      uploadTitle: "Upload your document",
      dragDrop: "Drag & Drop PDF here",
      orClickBrowse: "or click to browse",
      selectPdfFile: "Select PDF file",
      question: "Ask a question about the document (optional)",
      questionPlaceholder: "e.g., What are the key points? What is this about?",
      leaveBlank: "Leave blank to get a general summary of the document",
      processButton: "Process Document",
      noFileWarning: "No file selected. We'll use a demo document instead.",
      useDemoDocument: "Use demo document",
      fileName: "document.pdf",
      fileSize: "1.2 MB",
      remove: "Remove"
    },
    hungarian: {
      uploadTitle: "Töltse fel dokumentumát",
      dragDrop: "Húzza ide a PDF fájlt",
      orClickBrowse: "vagy kattintson a böngészéshez",
      selectPdfFile: "PDF fájl kiválasztása",
      question: "Tegyen fel kérdést a dokumentumról (opcionális)",
      questionPlaceholder: "pl. Mik a fő pontok? Miről szól ez?",
      leaveBlank: "Hagyja üresen az általános összefoglalóhoz",
      processButton: "Dokumentum feldolgozása",
      noFileWarning: "Nincs kiválasztott fájl. Ehelyett egy demo dokumentumot használunk.",
      useDemoDocument: "Demo dokumentum használata",
      fileName: "dokumentum.pdf",
      fileSize: "1.2 MB",
      remove: "Eltávolítás"
    }
  };
  
  const t = language === "english" ? translations.english : translations.hungarian;
  
  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
        setShowNoFileWarning(false);
      } else {
        toast({
          title: language === "english" ? "Invalid file type" : "Érvénytelen fájltípus",
          description: language === "english" 
            ? "Please upload a PDF file" 
            : "Kérjük, töltsön fel PDF fájlt",
          variant: "destructive"
        });
      }
    }
  };
  
  // Handle drag and drop
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      if (droppedFile.type === "application/pdf") {
        setFile(droppedFile);
        setShowNoFileWarning(false);
      } else {
        toast({
          title: language === "english" ? "Invalid file type" : "Érvénytelen fájltípus",
          description: language === "english" 
            ? "Please upload a PDF file" 
            : "Kérjük, töltsön fel PDF fájlt",
          variant: "destructive"
        });
      }
    }
  }, [language, toast]);
  
  // Handle clicking on drop zone
  const handleDropZoneClick = () => {
    fileInputRef.current?.click();
  };
  
  // Handle removing selected file
  const handleRemoveFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  
  // Handle form submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      setShowNoFileWarning(true);
    }
    
    onSubmit(file, question, language);
  };
  
  // Format file size for display
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };
  
  return (
    <Card className="w-full bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <CardContent className="p-0">
        <form onSubmit={handleFormSubmit}>
          <h2 className="text-xl font-semibold text-gray-800 mb-4 font-inter">{t.uploadTitle}</h2>
          
          {/* File Drop Zone */}
          <div 
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer mb-6 transition-colors ${
              isDragging ? "border-primary-500 bg-primary-50/30" : "border-gray-300 hover:border-primary-500"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleDropZoneClick}
          >
            <div className="flex flex-col items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-700 mb-1 font-inter">{t.dragDrop}</h3>
              <p className="text-sm text-gray-500 mb-4 font-opensans">{t.orClickBrowse}</p>
              <Button type="button" className="bg-primary-600 hover:bg-primary-700">
                {t.selectPdfFile}
              </Button>
              <input 
                ref={fileInputRef} 
                type="file" 
                className="hidden" 
                accept=".pdf" 
                onChange={handleFileChange}
              />
            </div>
          </div>

          {/* File Details */}
          {file && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 truncate font-inter">{file.name}</h4>
                  <p className="text-xs text-gray-500 font-opensans">{formatFileSize(file.size)}</p>
                </div>
                <button 
                  type="button" 
                  className="ml-4 inline-flex text-sm text-gray-400 hover:text-gray-500"
                  onClick={handleRemoveFile}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <span className="sr-only">{t.remove}</span>
                </button>
              </div>
            </div>
          )}

          {/* No File Selected Warning */}
          {showNoFileWarning && (
            <div className="mb-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <div className="flex">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-amber-700 font-opensans">{t.noFileWarning}</p>
              </div>
              <button 
                type="button"
                className="mt-2 text-sm text-amber-600 hover:text-amber-800 font-medium"
                onClick={onUseDemoDocument}
              >
                {t.useDemoDocument}
              </button>
            </div>
          )}

          {/* Question Input */}
          <div className="mb-6">
            <Label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-1 font-inter">
              {t.question}
            </Label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <Input
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="pl-10 py-3 pr-20 font-opensans"
                placeholder={t.questionPlaceholder}
              />
            </div>
            <p className="mt-1 text-xs text-gray-500 font-opensans">{t.leaveBlank}</p>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button 
              type="submit" 
              className="w-full sm:w-auto px-8 py-6 text-base font-medium bg-primary-600 hover:bg-primary-700 shadow-md transition-all transform hover:-translate-y-0.5 font-inter"
            >
              {t.processButton}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
