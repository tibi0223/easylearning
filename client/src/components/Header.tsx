import React from "react";
import { BlobShape } from "./IllustrationSVG";

interface HeaderProps {
  language: "english" | "hungarian";
  onLanguageChange: (language: "english" | "hungarian") => void;
}

export const Header: React.FC<HeaderProps> = ({ language, onLanguageChange }) => {
  return (
    <header className="w-full max-w-5xl mb-12 text-center relative">
      {/* Decorative blobs */}
      <div className="absolute -top-14 -left-12 w-28 h-28 text-purple-200 opacity-60 -z-10">
        <BlobShape />
      </div>
      <div className="absolute -bottom-10 -right-12 w-24 h-24 text-blue-200 opacity-70 -z-10">
        <BlobShape />
      </div>
      
      {/* Logo and title */}
      <div className="flex items-center justify-center space-x-3 mb-4">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full blur-sm transform -translate-y-1 translate-x-1"></div>
          <div className="relative bg-gradient-to-br from-blue-500 to-purple-500 rounded-full p-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
            </svg>
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 font-inter tracking-tight">
          Easy<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Learner</span>
          <span className="text-purple-600">.ai</span>
        </h1>
      </div>
      
      {/* Tagline with highlight */}
      <h2 className="text-xl md:text-2xl font-bold text-gray-700 mb-4 font-inter">
        {language === "english" 
          ? "Transform Documents into Knowledge in Seconds"
          : "Alakítsd át dokumentumaidat tudássá másodpercek alatt"}
      </h2>
      
      <p className="text-gray-600 max-w-2xl mx-auto font-opensans text-lg">
        {language === "english" 
          ? "Upload a PDF to get a smart AI-powered summary or ask specific questions about your document."
          : "Töltsön fel egy PDF-et, hogy intelligens, MI-alapú összefoglalót kapjon, vagy tegyen fel konkrét kérdéseket a dokumentumról."}
      </p>
      
      {/* Language Selector */}
      <div className="flex justify-center mt-6">
        <div className="inline-flex rounded-md shadow-lg" role="group">
          <button 
            type="button" 
            className={`px-5 py-3 text-sm font-medium border border-gray-200 rounded-l-lg transition-all duration-200 ${
              language === "english"
                ? "text-white bg-gradient-to-r from-blue-500 to-blue-600 border-blue-500 shadow-lg shadow-blue-500/30"
                : "text-gray-900 bg-white hover:bg-gray-50 hover:text-blue-600"
            }`}
            onClick={() => onLanguageChange("english")}
          >
            <div className="flex items-center space-x-2">
              <span>🇬🇧</span>
              <span>English</span>
            </div>
          </button>
          <button 
            type="button" 
            className={`px-5 py-3 text-sm font-medium border border-gray-200 rounded-r-lg transition-all duration-200 ${
              language === "hungarian"
                ? "text-white bg-gradient-to-r from-purple-500 to-purple-600 border-purple-500 shadow-lg shadow-purple-500/30"
                : "text-gray-900 bg-white hover:bg-gray-50 hover:text-purple-600"
            }`}
            onClick={() => onLanguageChange("hungarian")}
          >
            <div className="flex items-center space-x-2">
              <span>🇭🇺</span>
              <span>Magyar</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
