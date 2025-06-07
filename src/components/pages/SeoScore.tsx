
import React from "react";

interface SeoScoreProps {
  score: "Good" | "Medium" | "Poor";
  isUntranslated?: boolean;
}

export const SeoScore: React.FC<SeoScoreProps> = ({ score, isUntranslated }) => {
  if (isUntranslated) {
    return (
      <div className="flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-gray-300" />
      </div>
    );
  }

  const color = score === "Good" ? "bg-green-500" : score === "Medium" ? "bg-yellow-500" : "bg-red-500";
  
  return (
    <div className="flex items-center justify-center" aria-label={`SEO Score: ${score}`}>
      <div className={`w-2 h-2 rounded-full ${color}`} />
    </div>
  );
};
