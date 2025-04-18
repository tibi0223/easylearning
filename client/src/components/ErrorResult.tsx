import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ErrorResultProps {
  errorMessage: string;
  onTryAgain: () => void;
  onUseDemoDocument: () => void;
}

export const ErrorResult: React.FC<ErrorResultProps> = ({ 
  errorMessage, 
  onTryAgain, 
  onUseDemoDocument 
}) => {
  return (
    <Card className="w-full bg-white rounded-xl shadow-lg p-8 mb-8 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <CardContent className="p-0">
        <div className="flex flex-col items-center text-center">
          <div className="rounded-full bg-red-100 p-3 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2 font-inter">Error Processing Document</h3>
          <p className="text-gray-600 max-w-md mx-auto mb-4 font-opensans">
            {errorMessage || "We couldn't process this PDF. It might be password-protected or contain unextractable text."}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Button
              variant="outline" 
              className="px-4 py-2 text-primary-700 bg-primary-50 hover:bg-primary-100 border-primary-100"
              onClick={onTryAgain}
            >
              Try Again
            </Button>
            <Button
              variant="outline"
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 border-gray-200"
              onClick={onUseDemoDocument}
            >
              Use Demo Document
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
