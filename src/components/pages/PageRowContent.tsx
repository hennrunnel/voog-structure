
import React from "react";
import { PageItem } from "@/types/pages";
import { ChevronIcon, MoveIcon } from "./PageRowIcons";
import { PageTitleSection } from "./PageTitleSection";
import { PageRowColumns } from "./PageRowColumns";
import { PageRowActions } from "./PageRowActions";
import { getTranslatedPageTitle } from "@/constants/translations";

interface PageRowContentProps {
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

export const PageRowContent: React.FC<PageRowContentProps> = ({
  page,
  currentLanguage,
  level,
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

  const handleRowClick = () => {
    if (page.translationStatus === "Untranslated") {
      onTranslatePage(page);
    } else {
      onPageSettings(page);
    }
  };

  // Create page object with translated content for PageTitleSection
  const translatedPage = {
    ...page,
    title: translatedTitle
  };

  return (
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
      <div className="w-5 flex justify-center items-center mr-2">
        {hasChildren ? (
          <button 
            onClick={e => {
              e.stopPropagation();
              onToggleExpansion(page.id);
            }} 
            className="flex items-center justify-center text-gray-400 hover:text-gray-600 outline-none focus:outline-none focus:ring-0 rounded" 
            aria-label={page.isExpanded ? `Collapse ${translatedTitle}` : `Expand ${translatedTitle}`} 
            aria-expanded={page.isExpanded}
          >
            <ChevronIcon isExpanded={page.isExpanded} />
          </button>
        ) : null}
      </div>

      {/* Title */}
      <PageTitleSection page={translatedPage} />

      {/* Columns (Slug, Layout, SEO, Menu Visibility) */}
      <PageRowColumns
        page={page}
        currentLanguage={currentLanguage}
        onToggleVisibility={onToggleVisibility}
      />

      {/* Move handle - invisible placeholder for Home page to maintain spacing */}
      <div className={`${isHomePage ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'} transition-opacity mr-2`}>
        <MoveIcon />
      </div>

      {/* Actions */}
      <div className="actions-container">
        <PageRowActions
          page={page}
          onDeletePage={onDeletePage}
          onDuplicatePage={onDuplicatePage}
          onAddNestedPage={onAddNestedPage}
          onPageSettings={onPageSettings}
          onEditPage={onEditPage}
          onTranslatePage={onTranslatePage}
          onToggleVisibility={onToggleVisibility}
        />
      </div>
    </div>
  );
};
