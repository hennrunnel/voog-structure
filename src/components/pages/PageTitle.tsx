
import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { LockIcon } from "@/components/icons/LockIcon";
import { ExternalLinkIcon } from "@/components/icons/ExternalLinkIcon";

interface PageTitleProps {
  title: string;
  isUntranslated?: boolean;
  isPasswordProtected?: boolean;
  isExternalLink?: boolean;
}

export const PageTitle: React.FC<PageTitleProps> = ({
  title,
  isUntranslated,
  isPasswordProtected,
  isExternalLink
}) => {
  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <span 
              className={`text-sm font-medium truncate flex-1 ${isUntranslated ? 'text-gray-400' : 'text-black'}`}
            >
              {title}
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>{title}</p>
          </TooltipContent>
        </Tooltip>
        
        {isPasswordProtected && (
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-black">
                <LockIcon />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Password protected</p>
            </TooltipContent>
          </Tooltip>
        )}
        
        {isExternalLink && (
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-black">
                <ExternalLinkIcon />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>External link</p>
            </TooltipContent>
          </Tooltip>
        )}
        
        {isUntranslated && (
          <span 
            style={{ backgroundColor: "rgba(255, 215, 75, 0.34)" }}
            className="text-xs px-2 py-0.5 text-black font-medium rounded-md leading-tight"
          >
            Untranslated
          </span>
        )}
      </div>
    </div>
  );
};
