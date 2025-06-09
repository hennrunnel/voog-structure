
import { useState } from "react";
import { PageItem } from "@/types/pages";

export const useTranslatePageActions = (setPages: React.Dispatch<React.SetStateAction<PageItem[]>>) => {
  const [translatePageSidebarOpen, setTranslatePageSidebarOpen] = useState(false);
  const [pageToTranslate, setPageToTranslate] = useState<PageItem | null>(null);

  const handleTranslatePage = (page: PageItem) => {
    setPageToTranslate(page);
    setTranslatePageSidebarOpen(true);
  };

  const handleCloseTranslatePageSidebar = () => {
    setTranslatePageSidebarOpen(false);
    setPageToTranslate(null);
  };

  const handleCreateTranslation = (translationData: { 
    title: string; 
    slug: string; 
    duplicateFrom: string;
    layout: string;
    visibility: string;
  }) => {
    if (translationData.title && translationData.slug && pageToTranslate) {
      const newPage = {
        id: Date.now().toString(),
        title: translationData.title,
        slug: translationData.slug.startsWith('/') ? translationData.slug : `/${translationData.slug}`,
        pageType: "Common Page",
        seoScore: "Good" as const,
        isVisible: translationData.visibility === "visible",
        translationStatus: "Translated" as const
      };
      setPages(prevPages => [...prevPages, newPage]);
      setTranslatePageSidebarOpen(false);
      setPageToTranslate(null);
    }
  };

  return {
    translatePageSidebarOpen,
    pageToTranslate,
    handleTranslatePage,
    handleCloseTranslatePageSidebar,
    handleCreateTranslation
  };
};
