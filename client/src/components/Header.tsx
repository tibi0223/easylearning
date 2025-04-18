import React from "react";

interface HeaderProps {
  language: "english" | "hungarian";
  onLanguageChange: (language: "english" | "hungarian") => void;
}

export const Header: React.FC<HeaderProps> = ({ language, onLanguageChange }) => {
  return (
    <header className="w-full max-w-4xl mb-8 text-center">
      <div className="flex items-center justify-center space-x-2 mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
        </svg>
        <h1 className="text-3xl font-bold text-gray-800 font-inter">EasyLearner<span className="text-primary-600">.ai</span></h1>
      </div>
      <p className="text-gray-600 max-w-xl mx-auto font-opensans">
        {language === "english" 
          ? "Upload a PDF to get a smart summary or ask specific questions about your document."
          : "Töltsön fel egy PDF-et, hogy intelligens összefoglalót kapjon, vagy tegyen fel konkrét kérdéseket a dokumentumról."}
      </p>
      
      {/* Language Selector */}
      <div className="flex justify-center mt-4">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button 
            type="button" 
            className={`px-4 py-2 text-sm font-medium border border-gray-200 rounded-l-lg transition-colors ${
              language === "english"
                ? "text-white bg-primary-600 border-primary-600"
                : "text-gray-900 bg-white hover:bg-gray-100 hover:text-primary-600"
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
            className={`px-4 py-2 text-sm font-medium border border-gray-200 rounded-r-lg transition-colors ${
              language === "hungarian"
                ? "text-white bg-primary-600 border-primary-600"
                : "text-gray-900 bg-white hover:bg-gray-100 hover:text-primary-600"
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
