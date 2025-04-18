import React from "react";

export const DocumentIllustration: React.FC = () => {
  return (
    <svg
      width="320"
      height="260"
      viewBox="0 0 320 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="max-w-full h-auto"
    >
      <g id="document-ai-illustration">
        {/* Background elements */}
        <circle cx="160" cy="120" r="120" fill="#f0f9ff" opacity="0.6" />
        <circle cx="160" cy="120" r="90" fill="#e0f2fe" opacity="0.4" />
        
        {/* Document */}
        <path
          d="M110 60H210C215.523 60 220 64.4772 220 70V210C220 215.523 215.523 220 210 220H110C104.477 220 100 215.523 100 210V70C100 64.4772 104.477 60 110 60Z"
          fill="white"
          stroke="#94a3b8"
          strokeWidth="2"
        />
        
        {/* Document fold */}
        <path
          d="M190 60L220 90H190V60Z"
          fill="#e2e8f0"
          stroke="#94a3b8"
          strokeWidth="2"
        />
        
        {/* Document lines */}
        <rect x="120" y="100" width="80" height="4" rx="2" fill="#cbd5e1" />
        <rect x="120" y="115" width="80" height="4" rx="2" fill="#cbd5e1" />
        <rect x="120" y="130" width="60" height="4" rx="2" fill="#cbd5e1" />
        <rect x="120" y="145" width="80" height="4" rx="2" fill="#cbd5e1" />
        <rect x="120" y="160" width="40" height="4" rx="2" fill="#cbd5e1" />
        <rect x="120" y="175" width="70" height="4" rx="2" fill="#cbd5e1" />
        
        {/* Brain icon */}
        <circle cx="220" cy="70" r="30" fill="#3b82f6" opacity="0.8" />
        <path
          d="M220 50C214 50 209 55 209 61C209 63.8 210.3 66.3 212.3 68C211.5 69.2 210.3 70 208.9 70.4C209.8 71.1 210.9 71.5 212 71.5C212.7 71.5 213.3 71.3 213.9 71.1C215.8 72.3 218.1 73 220.5 73C226.5 73 231.5 68 231.5 62C231.5 56 226.5 50 220.5 50H220ZM215.5 67.8C214.5 67.1 213.8 66.1 213.4 65H214.5C215.4 65 216.2 64.7 216.9 64.2C217.5 64.8 218.4 65.1 219.3 65.1H221.1C222.3 65.1 223.5 64.4 223.5 63.3C223.5 62.6 223.1 62 222.5 61.6C223.1 61.3 223.5 60.7 223.5 60C223.5 58.9 222.6 58.1 221.5 58.1C221.1 58.1 220.7 58.2 220.4 58.4C220.1 57.6 219.3 57 218.4 57C217.3 57 216.4 57.8 216.4 58.9C216.4 59.1 216.5 59.3 216.5 59.5C216.1 59.7 215.7 60 215.5 60.4C214.9 60 214.1 59.8 213.4 59.8C211.5 59.8 210 61.3 210 63.2C210 65.1 211.5 66.6 213.4 66.6C214.2 66.6 214.9 66.3 215.5 65.9V67.8Z"
          fill="white"
        />
        
        {/* Floating elements */}
        <circle cx="90" cy="80" r="10" fill="#60a5fa" opacity="0.5" />
        <circle cx="240" cy="180" r="15" fill="#a78bfa" opacity="0.6" />
        <circle cx="60" cy="150" r="8" fill="#34d399" opacity="0.4" />
        <circle cx="270" cy="100" r="6" fill="#fb7185" opacity="0.4" />
        
        {/* Plus symbol */}
        <path d="M80 120L80 140" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
        <path d="M70 130L90 130" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
        
        {/* Check mark */}
        <path d="M250 130L260 140L270 120" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
};

export const WavyBackground: React.FC = () => {
  return (
    <svg
      className="absolute top-0 left-0 w-full h-full -z-10 opacity-30"
      viewBox="0 0 1000 1000"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0,1000 C300,800 400,600 500,600 C600,600 700,800 1000,1000"
        fill="none"
        stroke="#e0f2fe"
        strokeWidth="120"
      />
      <path
        d="M0,800 C200,700 300,600 500,600 C700,600 800,700 1000,800"
        fill="none"
        stroke="#bfdbfe"
        strokeWidth="100"
      />
      <path
        d="M0,600 C200,500 300,400 500,400 C700,400 800,500 1000,600"
        fill="none"
        stroke="#ddd6fe"
        strokeWidth="80"
      />
    </svg>
  );
};

export const BlobShape: React.FC<{className?: string}> = ({className}) => {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fill="currentColor"
        d="M47.5,-67.2C59.9,-56.7,67.3,-40.3,71.6,-23.6C75.9,-6.9,77,10.1,71.8,24.3C66.5,38.5,54.9,49.9,41.4,57.6C27.9,65.2,14,69,-1.2,70.7C-16.5,72.3,-32.9,71.7,-45.5,64C-58.1,56.2,-66.9,41.3,-70.9,25.3C-74.9,9.3,-74.2,-7.7,-68.6,-22.3C-63,-36.8,-52.5,-48.9,-40,-58.8C-27.4,-68.7,-13.7,-76.4,2.4,-79.8C18.5,-83.1,37,-77.7,47.5,-67.2Z"
        transform="translate(100 100)"
      />
    </svg>
  );
};