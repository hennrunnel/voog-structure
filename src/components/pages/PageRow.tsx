
import React from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { PageItem } from "@/types/pages";
import { ChevronIcon, EyeVisibleIcon, EyeHiddenIcon, MoveIcon } from "./PageRowIcons";
import { PageTitleSection } from "./PageTitleSection";
import { PageRowActions } from "./PageRowActions";
import { getTranslatedPageTitle, getTranslatedPageSlug } from "@/constants/translations";

interface PageRowProps {
  page: PageItem;
  currentLanguage: string;
  level: number;
  onToggleExpansion: (pageId: string) => void;
  onToggleVisibility: (pageId: string) => void;
  onDeletePage: (page: PageItem) => void;
  onDuplicatePage: (page: PageItem) => void;
  onAddNestedPage: (page: PageItem) => void;
  onPageSettings: (page: PageItem) => void;
  onEditPage: (page: PageItem) => void;
  onTranslatePage: (page: PageItem) => void;
}

const renderSeoScore = (score: "Good" | "Medium" | "Poor") => {
  const color = score === "Good" ? "bg-green-500" : score === "Medium" ? "bg-yellow-500" : "bg-red-500";
  return (
    <div className="flex items-center justify-center">
      <div className={`w-2 h-2 rounded-full ${color}`} />
    </div>
  );
};

export const PageRow: React.FC<PageRowProps> = ({
  page,
  currentLanguage,
  level = 0,
  onToggleExpansion,
  onToggleVisibility,
  onDeletePage,
  onDuplicatePage,
  onAddNestedPage,
  onPageSettings,
  onEditPage,
  onTranslatePage
}) => {
  const hasChildren = page.children && page.children.length > 0;
  const paddingLeft = level * 24;
  const isHomePage = page.id === "1";
  const isUntranslated = page.translationStatus === "Untranslated";

  // Get translated content
  const translatedTitle = getTranslatedPageTitle(page.title, currentLanguage, isUntranslated);
  const translatedSlug = getTranslatedPageSlug(page.slug, currentLanguage, isUntranslated);

  const handleRowClick = () => {
    if (page.translationStatus === "Untranslated") {
      onEditPage(page);
    } else {
      onPageSettings(page);
    }
  };

  const handleSlugClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Slug clicked:', translatedSlug);
  };

  const handleVisibilityToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleVisibility(page.id);
  };

  // Create page object with translated content for PageTitleSection
  const translatedPage = {
    ...page,
    title: translatedTitle
  };

  return (
    <TooltipProvider>
      <div key={page.id} className="font-sans">
        <div 
          className="group flex items-center border-l-2 border-l-transparent hover:bg-[#FBFBFF] hover:border-l-[#5A4FFF] transition-colors cursor-pointer" 
          style={{ 
            paddingLeft: `${paddingLeft + 24}px`, 
            paddingRight: '24px',
            height: '64px',
            borderBottom: '1px solid #EFEFEF'
          }} 
          role="row" 
          tabIndex={0} 
          aria-label={`${translatedTitle} page row`}
          onClick={handleRowClick}
        >
          {/* Expand/collapse button */}
          <div className="w-5 flex justify-center mr-2">
            {hasChildren ? (
              <button 
                onClick={e => {
                  e.stopPropagation();
                  onToggleExpansion(page.id);
                }} 
                className="text-gray-400 hover:text-gray-600 outline-none focus:outline-none focus:ring-0 rounded" 
                aria-label={page.isExpanded ? `Collapse ${translatedTitle}` : `Expand ${translatedTitle}`} 
                aria-expanded={page.isExpanded}
              >
                <ChevronIcon isExpanded={page.isExpanded} />
              </button>
            ) : null}
          </div>

          {/* Title */}
          <PageTitleSection page={translatedPage} />

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
                aria-label={page.isVisible ? `Hide ${translatedTitle} from menu` : `Show ${translatedTitle} in menu`}
                className="outline-none focus:outline-none focus:ring-0 rounded"
              >
                {page.isVisible ? <EyeVisibleIcon /> : <EyeHiddenIcon />}
              </button>
            ) : null}
          </div>

          {/* Move handle - invisible placeholder for Home page to maintain spacing */}
          <div className={`${isHomePage ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'} transition-opacity mr-2`}>
            <MoveIcon />
          </div>

          {/* Actions */}
          <PageRowActions
            page={page}
            onDeletePage={onDeletePage}
            onDuplicatePage={onDuplicatePage}
            onAddNestedPage={onAddNestedPage}
            onPageSettings={onPageSettings}
            onEditPage={onEditPage}
            onTranslatePage={onTranslatePage}
          />
        </div>

        {/* Render children if expanded */}
        {hasChildren && page.isExpanded && page.children?.map(child => (
          <PageRow
            key={child.id}
            page={child}
            currentLanguage={currentLanguage}
            level={level + 1}
            onToggleExpansion={onToggleExpansion}
            onToggleVisibility={onToggleVisibility}
            onDeletePage={onDeletePage}
            onDuplicatePage={onDuplicatePage}
            onAddNestedPage={onAddNestedPage}
            onPageSettings={onPageSettings}
            onEditPage={onEditPage}
            onTranslatePage={onTranslatePage}
          />
        ))}
      </div>
    </TooltipProvider>
  );
};
