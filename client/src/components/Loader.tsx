import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export const Loader: React.FC = () => {
  return (
    <Card className="w-full bg-white rounded-xl shadow-lg p-8 mb-8 text-center animate-in fade-in slide-in-from-bottom-5 duration-300">
      <CardContent className="p-0">
        <div className="flex flex-col items-center">
          <div className="rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mb-4 animate-spin"></div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2 font-inter">Analyzing your document...</h3>
          <p className="text-gray-600 max-w-md mx-auto font-opensans">
            We're extracting text and processing your content with AI. This will take just a moment.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
