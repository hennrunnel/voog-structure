
import { useState } from "react";
import { PageItem } from "@/types/pages";
import { layoutOptions } from "@/constants/pages";

export const usePageActions = (setPages: React.Dispatch<React.SetStateAction<PageItem[]>>) => {
  const [addPageSidebarOpen, setAddPageSidebarOpen] = useState(false);
  const [selectedLayout, setSelectedLayout] = useState<string | null>(null);
  const [pageSettingsOpen, setPageSettingsOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<PageItem | null>(null);

  const handleAddNestedPage = (parentPage: PageItem) => {
    setSelectedLayout("common-page");
    setAddPageSidebarOpen(true);
  };

  const handleAddPageClick = () => {
    setSelectedLayout("common-page");
    setAddPageSidebarOpen(true);
  };

  const handlePageSettings = (page: PageItem) => {
    setSelectedPage(page);
    setPageSettingsOpen(true);
  };

  const handleEditPage = (page: PageItem) => {
    if (page.translationStatus === "Untranslated") {
      // This will be handled by the translate page functionality
      console.log("Edit untranslated page - should open translate page sidebar");
    } else {
      handlePageSettings(page);
    }
  };

  const handleTranslatePage = (page: PageItem) => {
    // This will be overridden by the parent component
    console.log("Translate page action triggered for:", page.title);
  };

  const handleClosePageSettings = () => {
    setPageSettingsOpen(false);
    setSelectedPage(null);
  };

  const handleCloseAddPageSidebar = () => {
    setAddPageSidebarOpen(false);
    setSelectedLayout(null);
  };

  const handleCreatePage = (pageData: { title: string; slug: string; }) => {
    if (pageData.title && pageData.slug && selectedLayout) {
      const layoutOption = layoutOptions.find(opt => opt.id === selectedLayout);
      const newPage = {
        id: Date.now().toString(),
        title: pageData.title,
        slug: pageData.slug.startsWith('/') ? pageData.slug : `/${pageData.slug}`,
        pageType: layoutOption?.title || "Common Page",
        seoScore: "Good" as const,
        isVisible: true
      };
      setPages(prevPages => [...prevPages, newPage]);
      setAddPageSidebarOpen(false);
      setSelectedLayout(null);
    }
  };

  return {
    addPageSidebarOpen,
    selectedLayout,
    pageSettingsOpen,
    selectedPage,
    handleAddNestedPage,
    handleAddPageClick,
    handlePageSettings,
    handleEditPage,
    handleTranslatePage,
    handleClosePageSettings,
    handleCloseAddPageSidebar,
    handleCreatePage
  };
};
