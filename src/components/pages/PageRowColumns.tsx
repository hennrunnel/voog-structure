
import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { PageItem } from "@/types/pages";
import { EyeVisibleIcon, EyeHiddenIcon } from "./PageRowIcons";
import { getTranslatedPageSlug } from "@/constants/translations";

interface PageRowColumnsProps {
  page: PageItem;
  currentLanguage: string;
  onToggleVisibility: (pageId: string) => void;
}

const renderSeoScore = (score: "Good" | "Medium" | "Poor") => {
  const color = score === "Good" ? "bg-green-500" : score === "Medium" ? "bg-yellow-500" : "bg-red-500";
  return (
    <div className="flex items-center justify-center">
      <div className={`w-2 h-2 rounded-full ${color}`} />
    </div>
  );
};

export const PageRowColumns: React.FC<PageRowColumnsProps> = ({
  page,
  currentLanguage,
  onToggleVisibility
}) => {
  const isUntranslated = page.translationStatus === "Untranslated";
  const translatedSlug = getTranslatedPageSlug(page.slug, currentLanguage, isUntranslated);

  const handleSlugClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Slug clicked:', translatedSlug);
  };

  const handleVisibilityToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleVisibility(page.id);
  };

  return (
    <>
      {/* Slug */}
      <div className="w-48 px-4">
        {!isUntranslated ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleSlugClick}
                className="text-[#1B2124] hover:text-[#5A4FFF] hover:underline truncate block max-w-full text-left transition-colors cursor-pointer outline-none focus:outline-none focus:ring-0 rounded"
                style={{ fontSize: '14px' }}
              >
                {translatedSlug}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{translatedSlug}</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          <span 
            className="text-gray-400"
            style={{ fontSize: '14px' }}
          >
            -
          </span>
        )}
      </div>

      {/* Layout */}
      <div className="w-32 px-4">
        {!isUntranslated ? (
          <span className="text-sm text-[#1B2124]">{page.pageType}</span>
        ) : (
          <span className="text-sm text-gray-400">-</span>
        )}
      </div>

      {/* SEO Score */}
      <div className="w-24 px-4">
        {!isUntranslated ? (
          <div aria-label={`SEO Score: ${page.seoScore}`}>
            {renderSeoScore(page.seoScore)}
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-gray-300" />
          </div>
        )}
      </div>

      {/* Menu Visibility Toggle */}
      <div className="w-24 px-4 flex justify-center">
        {!isUntranslated ? (
          <button
            onClick={handleVisibilityToggle}
            aria-label={page.isVisible ? `Hide ${page.title} from menu` : `Show ${page.title} in menu`}
            className="outline-none focus:outline-none focus:ring-0 rounded"
          >
            {page.isVisible ? <EyeVisibleIcon /> : <EyeHiddenIcon />}
          </button>
        ) : null}
      </div>
    </>
  );
};
