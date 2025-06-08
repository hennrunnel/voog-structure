
import React from "react";
import { PageRowContent } from "./PageRowContent";
import { PageItem } from "@/types/pages";

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
    <>
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
      
      {/* Render nested pages when expanded */}
      {page.isExpanded && page.children && page.children.map((childPage) => (
        <PageRowContainer
          key={childPage.id}
          page={childPage}
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
    </>
  );
};
