
import React from "react";
import { Info } from "lucide-react";

interface InfoBoxProps {
  children: React.ReactNode;
  className?: string;
}

export const InfoBox = ({ children, className = "" }: InfoBoxProps) => {
  return (
    <div className={`w-full relative overflow-hidden ${className}`}>
      <div className="w-full h-full left-0 top-0 absolute opacity-10 bg-indigo-600 rounded-[5px]"></div>
      <div className="w-full py-3 px-3 relative inline-flex justify-start items-center gap-3">
        <div className="w-4 h-4 relative flex-shrink-0">
          <div className="w-4 h-4 left-0 top-0 absolute overflow-hidden">
            <Info className="w-4 h-4 text-indigo-600" />
          </div>
        </div>
        <div className="flex-1 text-neutral-800 text-xs font-medium font-sans leading-4">
          {children}
        </div>
      </div>
    </div>
  );
};
