
import React from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PageItem } from "@/types/pages";
import { PageRowContent } from "./PageRowContent";

interface PageRowContainerProps {
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

export const PageRowContainer: React.FC<PageRowContainerProps> = ({
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

  return (
    <TooltipProvider>
      <div key={page.id} className="font-sans">
        <PageRowContent
          page={page}
          currentLanguage={currentLanguage}
          level={level}
          onToggleExpansion={onToggleExpansion}
          onToggleVisibility={onToggleVisibility}
          onDeletePage={onDeletePage}
          onDuplicatePage={onDuplicatePage}
          onAddNestedPage={onAddNestedPage}
          onPageSettings={onPageSettings}
          onEditPage={onEditPage}
          onTranslatePage={onTranslatePage}
        />

        {/* Render children if expanded */}
        {hasChildren && page.isExpanded && page.children?.map(child => (
          <PageRowContainer
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
