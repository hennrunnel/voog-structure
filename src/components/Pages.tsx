
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageSettings } from "@/components/PageSettings";
import { AddPageSidebar } from "@/components/AddPageSidebar";
import { usePageManagement } from "@/hooks/usePageManagement";
import { PageRow } from "@/components/pages/PageRow";
import { PageDialogs } from "@/components/pages/PageDialogs";
import { LanguageSettings } from "@/components/pages/LanguageSettings";
import { PageItem } from "@/types/pages";
import { layoutOptions } from "@/constants/pages";
import { Button } from "@/components/ui/button";

export const Pages = () => {
  const [activeTab, setActiveTab] = useState("english");
  const [languageDeleteDialogOpen, setLanguageDeleteDialogOpen] = useState(false);
  const [languageVisibilityDialogOpen, setLanguageVisibilityDialogOpen] = useState(false);
  const [languageVisibilityAction, setLanguageVisibilityAction] = useState<'enable' | 'disable'>('disable');
  const [addPageSidebarOpen, setAddPageSidebarOpen] = useState(false);
  const [selectedLayout, setSelectedLayout] = useState<string | null>(null);
  const [pageSettingsOpen, setPageSettingsOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<PageItem | null>(null);
  const [websiteTitle, setWebsiteTitle] = useState("Finn & Cross");
  const [nameInMenu, setNameInMenu] = useState("Eng");
  const [languageVisible, setLanguageVisible] = useState(true);
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

  const handleLanguageVisibilityToggle = (newValue: boolean) => {
    setLanguageVisibilityAction(newValue ? 'enable' : 'disable');
    setLanguageVisibilityDialogOpen(true);
  };

  const confirmLanguageVisibilityToggle = () => {
    setLanguageVisible(languageVisibilityAction === 'enable');
    setLanguageVisibilityDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-12 font-sans">
      <div className="w-full" style={{ maxWidth: '992px' }}>
        {/* Header outside the card */}
        <h1 
          className="text-[#1A1A1A] mb-6"
          style={{
            fontFamily: '"Avenir Next"',
            fontSize: '40px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '39px'
          }}
        >
          Pages
        </h1>
        
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
          {/* Language Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex items-center justify-between mb-6 px-6 pt-6">
              <TabsList className="bg-transparent h-auto p-0 border-b border-gray-200 rounded-none">
                {availableTabs.includes("english") && (
                  <TabsTrigger 
                    value="english" 
                    className="text-sm px-4 py-3 text-[#666] data-[state=active]:text-[#5A4FFF] data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#5A4FFF] data-[state=active]:shadow-none rounded-none border-b-2 border-transparent"
                  >
                    English
                  </TabsTrigger>
                )}
                {availableTabs.includes("estonian") && (
                  <TabsTrigger 
                    value="estonian" 
                    className="text-sm px-4 py-3 text-[#666] data-[state=active]:text-[#5A4FFF] data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#5A4FFF] data-[state=active]:shadow-none rounded-none border-b-2 border-transparent"
                  >
                    Estonian
                  </TabsTrigger>
                )}
              </TabsList>
              
              <button className="text-[#5A4FFF] text-sm font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded px-2">
                Add language
              </button>
            </div>

            {/* Border line that spans full width */}
            <div className="border-b border-gray-200 -mx-6"></div>

            <TabsContent value="english" className="mt-0 px-0">
              <div className="px-8">
                <div className="flex items-center justify-between mb-6">
                  <LanguageSettings
                    websiteTitle={websiteTitle}
                    setWebsiteTitle={setWebsiteTitle}
                    nameInMenu={nameInMenu}
                    setNameInMenu={setNameInMenu}
                    languageVisible={languageVisible}
                    onLanguageVisibilityToggle={handleLanguageVisibilityToggle}
                    onLanguageDelete={handleLanguageDelete}
                  />
                  
                  <Button 
                    onClick={handleAddPageClick}
                    className="text-white font-semibold hover:bg-[#4A3FFF] focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    style={{
                      padding: '8px 16px',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '8px',
                      borderRadius: '8px',
                      background: '#453DFF',
                      color: '#FFF',
                      textAlign: 'center',
                      fontFamily: '"Avenir Next"',
                      fontSize: '14px',
                      fontStyle: 'normal',
                      fontWeight: 600,
                      lineHeight: '24px'
                    }}
                  >
                    Add page
                  </Button>
                </div>
              </div>

              {/* Page Structure Table */}
              <div className="overflow-hidden">
                {/* Table Header */}
                <div className="bg-gray-50 px-3 py-3 border-b border-gray-200">
                  <div className="flex items-center text-xs font-medium text-[#8d9091]" style={{ paddingLeft: '32px' }}>
                    <div className="flex-1 min-w-0 mr-4">Menu title</div>
                    <div className="w-48 px-4">Slug</div>
                    <div className="w-32 px-4">Layout</div>
                    <div className="w-24 px-4 text-center">SEO</div>
                    <div className="w-24 px-4 text-center">In menu</div>
                    <div className="w-8 px-1"></div>
                    <div className="w-16"></div>
                  </div>
                </div>

                {/* Page Rows */}
                <div role="table" aria-label="Pages list">
                  {pages.map(page => (
                    <PageRow
                      key={page.id}
                      page={page}
                      level={0}
                      onToggleExpansion={togglePageExpansion}
                      onToggleVisibility={togglePageVisibility}
                      onDeletePage={handleDeletePage}
                      onDuplicatePage={handleDuplicatePage}
                      onAddNestedPage={handleAddNestedPage}
                      onPageSettings={handlePageSettings}
                      onEditPage={handleEditPage}
                      onTranslatePage={handleTranslatePage}
                    />
                  ))}
                  
                  {/* Download entire site link */}
                  <div className="px-3 py-4 border-t border-gray-200">
                    <div className="flex justify-end" style={{ paddingRight: '12px' }}>
                      <button className="text-[#5A4FFF] text-sm font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded">
                        Download entire site
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="estonian" className="mt-0 px-0">
              <div className="px-8">
                <div className="text-[#1B2124] text-sm">
                  Estonian tab content will be displayed here.
                </div>
              </div>
            </TabsContent>
          </Tabs>
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
