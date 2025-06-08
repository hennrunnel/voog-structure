
import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { PageItem } from "@/types/pages";
import { LockIcon, ExternalLinkIcon } from "./PageRowIcons";

interface PageTitleSectionProps {
  page: PageItem;
}

export const PageTitleSection: React.FC<PageTitleSectionProps> = ({ page }) => {
  const isUntranslated = page.translationStatus === "Untranslated";
  const isExternalLink = page.pageType === "Link";

  return (
    <div className="flex-1 min-w-0 mr-4">
      <div className="flex items-center gap-2 mb-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <span 
              className={`text-sm font-medium truncate max-w-[300px] inline-block ${isUntranslated ? 'text-gray-400' : 'text-[#1B2124]'}`}
            >
              {page.title}
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>{page.title}</p>
          </TooltipContent>
        </Tooltip>
        
        {page.isPasswordProtected && (
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
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
              <span>
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
            className="text-xs px-2 py-0 text-black font-medium text-center"
            style={{
              borderRadius: '5px',
              background: 'rgba(255, 215, 75, 0.3)',
              fontSize: '12px',
              fontWeight: 500,
              lineHeight: '16px'
            }}
          >
            Untranslated
          </span>
        )}
      </div>
    </div>
  );
};
