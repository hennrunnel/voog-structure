
import { useState } from "react";
import { PageItem } from "@/types/pages";
import { mockPages } from "@/constants/pages";

export type ViewMode = 'desktop' | 'mobile';

export const usePageManagement = () => {
  const [pages, setPages] = useState<PageItem[]>(mockPages);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [pageToDelete, setPageToDelete] = useState<PageItem | null>(null);
  const [homeVisibilityDialogOpen, setHomeVisibilityDialogOpen] = useState(false);
  const [homeVisibilityAction, setHomeVisibilityAction] = useState<'show' | 'hide'>('hide');
  const [viewMode, setViewMode] = useState<ViewMode>('desktop');

  const togglePageExpansion = (pageId: string) => {
    setPages(prevPages => prevPages.map(page => 
      page.id === pageId ? { ...page, isExpanded: !page.isExpanded } : page
    ));
  };

  const togglePageVisibility = (pageId: string) => {
    if (pageId === "1") {
      const homePage = pages.find(p => p.id === "1");
      setHomeVisibilityAction(homePage?.isVisible ? 'hide' : 'show');
      setHomeVisibilityDialogOpen(true);
      return;
    }

    const updatePageVisibility = (pages: PageItem[]): PageItem[] => {
      return pages.map(page => {
        if (page.id === pageId) {
          return { ...page, isVisible: !page.isVisible };
        }
        if (page.children) {
          return { ...page, children: updatePageVisibility(page.children) };
        }
        return page;
      });
    };

    setPages(prevPages => updatePageVisibility(prevPages));
  };

  const handleDeletePage = (page: PageItem) => {
    setPageToDelete(page);
    setDeleteDialogOpen(true);
  };

  const confirmDeletePage = () => {
    if (pageToDelete) {
      const deletePageRecursive = (pages: PageItem[]): PageItem[] => {
        return pages.filter(page => page.id !== pageToDelete.id).map(page => ({
          ...page,
          children: page.children ? deletePageRecursive(page.children) : undefined
        }));
      };
      setPages(prevPages => deletePageRecursive(prevPages));
      setDeleteDialogOpen(false);
      setPageToDelete(null);
    }
  };

  const confirmHomeVisibilityToggle = () => {
    const updatePageVisibility = (pages: PageItem[]): PageItem[] => {
      return pages.map(page => {
        if (page.id === "1") {
          return { ...page, isVisible: !page.isVisible };
        }
        return page;
      });
    };
    setPages(prevPages => updatePageVisibility(prevPages));
    setHomeVisibilityDialogOpen(false);
  };

  const handleDuplicatePage = (page: PageItem) => {
    const newPage = {
      ...page,
      id: Date.now().toString(),
      title: `${page.title} (Copy)`,
      slug: `${page.slug}-copy`,
      isVisible: true
    };
    setPages(prevPages => [...prevPages, newPage]);
  };

  return {
    pages,
    setPages,
    deleteDialogOpen,
    setDeleteDialogOpen,
    pageToDelete,
    homeVisibilityDialogOpen,
    setHomeVisibilityDialogOpen,
    homeVisibilityAction,
    viewMode,
    setViewMode,
    togglePageExpansion,
    togglePageVisibility,
    handleDeletePage,
    confirmDeletePage,
    confirmHomeVisibilityToggle,
    handleDuplicatePage
  };
};
