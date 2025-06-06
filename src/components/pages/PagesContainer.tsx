import { useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { PageSettings } from "@/components/PageSettings";
import { AddPageSidebar } from "@/components/AddPageSidebar";
import { usePageManagement } from "@/hooks/usePageManagement";
import { PageDialogs } from "@/components/pages/PageDialogs";
import { PageItem } from "@/types/pages";
import { layoutOptions } from "@/constants/pages";
import { PagesHeader } from "@/components/pages/PagesHeader";
import { LanguageTabs } from "@/components/pages/LanguageTabs";
import { EnglishTabContent } from "@/components/pages/EnglishTabContent";
import { EstonianTabContent } from "@/components/pages/EstonianTabContent";

export const PagesContainer = () => {
  const [activeTab, setActiveTab] = useState("english");
  const [languageDeleteDialogOpen, setLanguageDeleteDialogOpen] = useState(false);
  const [languageVisibilityDialogOpen, setLanguageVisibilityDialogOpen] = useState(false);
  const [languageVisibilityAction, setLanguageVisibilityAction] = useState<'enable' | 'disable'>('disable');
  const [addPageSidebarOpen, setAddPageSidebarOpen] = useState(false);
  const [selectedLayout, setSelectedLayout] = useState<string | null>(null);
  const [pageSettingsOpen, setPageSettingsOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<PageItem | null>(null);
  
  // English language settings
  const [englishWebsiteTitle, setEnglishWebsiteTitle] = useState("Finn & Cross");
  const [englishNameInMenu, setEnglishNameInMenu] = useState("Eng");
  const [englishLanguageVisible, setEnglishLanguageVisible] = useState(true);
  
  // Estonian language settings
  const [estonianWebsiteTitle, setEstonianWebsiteTitle] = useState("Finn & Cross");
  const [estonianNameInMenu, setEstonianNameInMenu] = useState("Est");
  const [estonianLanguageVisible, setEstonianLanguageVisible] = useState(false);
  
  const [availableTabs, setAvailableTabs] = useState(["english", "estonian"]);

  const {
    pages,
    setPages,
    deleteDialogOpen,
    setDeleteDialogOpen,
    pageToDelete,
    homeVisibilityDialogOpen,
    setHomeVisibilityDialogOpen,
    homeVisibilityAction,
    togglePageExpansion,
    togglePageVisibility,
    handleDeletePage,
    confirmDeletePage,
    confirmHomeVisibilityToggle,
    handleDuplicatePage
  } = usePageManagement();

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
      setSelectedLayout("common-page");
      setAddPageSidebarOpen(true);
    } else {
      handlePageSettings(page);
    }
  };

  const handleTranslatePage = (page: PageItem) => {
    setSelectedLayout("common-page");
    setAddPageSidebarOpen(true);
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

  const handleLanguageDelete = () => {
    setLanguageDeleteDialogOpen(true);
  };

  const confirmLanguageDelete = () => {
    const currentTabIndex = availableTabs.indexOf(activeTab);
    const newTabs = availableTabs.filter(tab => tab !== activeTab);
    setAvailableTabs(newTabs);
    if (newTabs.length > 0) {
      const nextTab = newTabs[Math.max(0, currentTabIndex - 1)];
      setActiveTab(nextTab);
    }
    setLanguageDeleteDialogOpen(false);
  };

  const handleEnglishLanguageVisibilityToggle = (newValue: boolean) => {
    setLanguageVisibilityAction(newValue ? 'enable' : 'disable');
    setLanguageVisibilityDialogOpen(true);
  };

  const handleEstonianLanguageVisibilityToggle = (newValue: boolean) => {
    setLanguageVisibilityAction(newValue ? 'enable' : 'disable');
    setLanguageVisibilityDialogOpen(true);
  };

  const confirmLanguageVisibilityToggle = () => {
    if (activeTab === "english") {
      setEnglishLanguageVisible(languageVisibilityAction === 'enable');
    } else if (activeTab === "estonian") {
      setEstonianLanguageVisible(languageVisibilityAction === 'enable');
    }
    setLanguageVisibilityDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-12 font-sans">
      <div className="w-full" style={{ maxWidth: '992px' }}>
        <PagesHeader />
        
        <div 
          className="bg-white"
          style={{
            width: '992px',
            borderRadius: '10px',
            border: 'none',
            background: 'var(--Primary-White, #FFF)',
            boxShadow: '0px 0.5px 1px 0px var(--shadow-dark, rgba(24, 24, 27, 0.05)), 0px 2px 5px 0px rgba(0, 0, 0, 0.05), 0px 17px 17.7px 0px rgba(0, 0, 0, 0.01)'
          }}
        >
          <LanguageTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            availableTabs={availableTabs}
            englishVisible={englishLanguageVisible}
            estonianVisible={estonianLanguageVisible}
            onEnglishVisibilityToggle={handleEnglishLanguageVisibilityToggle}
            onEstonianVisibilityToggle={handleEstonianLanguageVisibilityToggle}
          >
            <EnglishTabContent
              websiteTitle={englishWebsiteTitle}
              setWebsiteTitle={setEnglishWebsiteTitle}
              nameInMenu={englishNameInMenu}
              setNameInMenu={setEnglishNameInMenu}
              languageVisible={englishLanguageVisible}
              onLanguageVisibilityToggle={handleEnglishLanguageVisibilityToggle}
              onLanguageDelete={handleLanguageDelete}
              onAddPageClick={handleAddPageClick}
              pages={pages}
              onToggleExpansion={togglePageExpansion}
              onToggleVisibility={togglePageVisibility}
              onDeletePage={handleDeletePage}
              onDuplicatePage={handleDuplicatePage}
              onAddNestedPage={handleAddNestedPage}
              onPageSettings={handlePageSettings}
              onEditPage={handleEditPage}
              onTranslatePage={handleTranslatePage}
            />

            <EstonianTabContent
              websiteTitle={estonianWebsiteTitle}
              setWebsiteTitle={setEstonianWebsiteTitle}
              nameInMenu={estonianNameInMenu}
              setNameInMenu={setEstonianNameInMenu}
              languageVisible={estonianLanguageVisible}
              onLanguageVisibilityToggle={handleEstonianLanguageVisibilityToggle}
              onLanguageDelete={handleLanguageDelete}
              onAddPageClick={handleAddPageClick}
              pages={pages}
              onToggleExpansion={togglePageExpansion}
              onToggleVisibility={togglePageVisibility}
              onDeletePage={handleDeletePage}
              onDuplicatePage={handleDuplicatePage}
              onAddNestedPage={handleAddNestedPage}
              onPageSettings={handlePageSettings}
              onEditPage={handleEditPage}
              onTranslatePage={handleTranslatePage}
            />
          </LanguageTabs>
        </div>

        {/* All Dialogs */}
        <PageDialogs
          deleteDialogOpen={deleteDialogOpen}
          setDeleteDialogOpen={setDeleteDialogOpen}
          pageToDelete={pageToDelete}
          onConfirmDelete={confirmDeletePage}
          homeVisibilityDialogOpen={homeVisibilityDialogOpen}
          setHomeVisibilityDialogOpen={setHomeVisibilityDialogOpen}
          homeVisibilityAction={homeVisibilityAction}
          onConfirmHomeVisibilityToggle={confirmHomeVisibilityToggle}
          languageDeleteDialogOpen={languageDeleteDialogOpen}
          setLanguageDeleteDialogOpen={setLanguageDeleteDialogOpen}
          onConfirmLanguageDelete={confirmLanguageDelete}
          languageVisibilityDialogOpen={languageVisibilityDialogOpen}
          setLanguageVisibilityDialogOpen={setLanguageVisibilityDialogOpen}
          languageVisibilityAction={languageVisibilityAction}
          onConfirmLanguageVisibilityToggle={confirmLanguageVisibilityToggle}
        />

        {/* Page Settings Side Panel */}
        <PageSettings isOpen={pageSettingsOpen} onClose={handleClosePageSettings} />

        {/* Add Page Sidebar */}
        <AddPageSidebar 
          isOpen={addPageSidebarOpen} 
          onClose={handleCloseAddPageSidebar} 
          onCreatePage={handleCreatePage} 
          selectedLayout={selectedLayout} 
        />
      </div>
    </div>
  );
};
