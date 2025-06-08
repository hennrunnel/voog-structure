
import React from "react";
import { PageRowColumns } from "./PageRowColumns";
import { PageRowActions } from "./PageRowActions";
import { PageItem } from "@/types/pages";

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
  return (
    <div 
      role="row" 
      aria-label={`Page: ${page.title}`}
      className="flex items-center py-3 hover:bg-gray-50 transition-colors border-b border-gray-100"
      style={{ 
        paddingLeft: '24px',
        paddingRight: '24px'
      }}
    >
      <PageRowColumns
        page={page}
        currentLanguage={currentLanguage}
        level={level}
        onToggleExpansion={onToggleExpansion}
        onToggleVisibility={onToggleVisibility}
      />
      
      <PageRowActions
        page={page}
        currentLanguage={currentLanguage as "en" | "et"}
        onDeletePage={onDeletePage}
        onDuplicatePage={onDuplicatePage}
        onAddNestedPage={onAddNestedPage}
        onPageSettings={onPageSettings}
        onEditPage={onEditPage}
        onTranslatePage={onTranslatePage}
      />
    </div>
  );
};
