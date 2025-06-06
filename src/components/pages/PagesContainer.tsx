import { useState } from "react";
import { Plus, MoreVertical, Download, Trash, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { PagesHeader } from "@/components/pages/PagesHeader";
import { PagesContent } from "@/components/pages/PagesContent";
import { PageDialogs } from "@/components/pages/PageDialogs";
import { AddPageSidebar } from "@/components/AddPageSidebar";
import { PageSettings } from "@/components/PageSettings";
import { AddLanguageSidebar } from "@/components/pages/AddLanguageSidebar";
import { LanguageSettingsSidebar } from "@/components/pages/LanguageSettingsSidebar";
import { usePageManagement } from "@/hooks/usePageManagement";
import { usePageActions } from "@/hooks/usePageActions";
import { useLanguageManagement } from "@/hooks/useLanguageManagement";

export const PagesContainer = () => {
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

  const {
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
  } = usePageActions(setPages);

  const {
    activeTab,
    setActiveTab,
    availableTabs,
    englishWebsiteTitle,
    setEnglishWebsiteTitle,
    englishNameInMenu,
    setEnglishNameInMenu,
    englishLanguageVisible,
    estonianWebsiteTitle,
    setEstonianWebsiteTitle,
    estonianNameInMenu,
    setEstonianNameInMenu,
    estonianLanguageVisible,
    languageDeleteDialogOpen,
    setLanguageDeleteDialogOpen,
    languageVisibilityDialogOpen,
    setLanguageVisibilityDialogOpen,
    languageVisibilityAction,
    handleLanguageDelete,
    confirmLanguageDelete,
    handleEnglishLanguageVisibilityToggle,
    handleEstonianLanguageVisibilityToggle,
    confirmLanguageVisibilityToggle
  } = useLanguageManagement();

  const [addLanguageSidebarOpen, setAddLanguageSidebarOpen] = useState(false);
  const [languageSettingsOpen, setLanguageSettingsOpen] = useState(false);

  const handleDownloadSite = () => {
    console.log("Download entire site functionality");
  };

  const handleDeleteLanguage = () => {
    handleLanguageDelete();
  };

  const handleToggleLanguagePublish = () => {
    if (activeTab === "english") {
      handleEnglishLanguageVisibilityToggle(!englishLanguageVisible);
    } else if (activeTab === "estonian") {
      handleEstonianLanguageVisibilityToggle(!estonianLanguageVisible);
    }
  };

  const handleAddLanguage = (languageData: any) => {
    console.log("Adding new language:", languageData);
    setAddLanguageSidebarOpen(false);
  };

  const getCurrentLanguageSettings = () => {
    if (activeTab === "english") {
      return {
        websiteTitle: englishWebsiteTitle,
        setWebsiteTitle: setEnglishWebsiteTitle,
        nameInMenu: englishNameInMenu,
        setNameInMenu: setEnglishNameInMenu,
        languageVisible: englishLanguageVisible,
        onLanguageVisibilityToggle: handleEnglishLanguageVisibilityToggle
      };
    } else {
      return {
        websiteTitle: estonianWebsiteTitle,
        setWebsiteTitle: setEstonianWebsiteTitle,
        nameInMenu: estonianNameInMenu,
        setNameInMenu: setEstonianNameInMenu,
        languageVisible: estonianLanguageVisible,
        onLanguageVisibilityToggle: handleEstonianLanguageVisibilityToggle
      };
    }
  };

  const currentSettings = getCurrentLanguageSettings();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-start mb-8">
          <PagesHeader />
          
          <div className="flex gap-3">
            <Button
              onClick={handleAddPageClick}
              className="bg-[#5A4FFF] hover:bg-[#4A3FFF] text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add page
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="p-2">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={handleDownloadSite}>
                  <Download className="w-4 h-4 mr-2" />
                  Download entire site
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleToggleLanguagePublish}>
                  {getCurrentLanguageVisible() ? (
                    <>
                      <EyeOff className="w-4 h-4 mr-2" />
                      Unpublish this language
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 mr-2" />
                      Publish this language
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDeleteLanguage} className="text-red-600">
                  <Trash className="w-4 h-4 mr-2" />
                  Delete language
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <PagesContent 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          availableTabs={availableTabs}
          pages={pages}
          englishWebsiteTitle={englishWebsiteTitle}
          setEnglishWebsiteTitle={setEnglishWebsiteTitle}
          englishNameInMenu={englishNameInMenu}
          setEnglishNameInMenu={setEnglishNameInMenu}
          englishLanguageVisible={englishLanguageVisible}
          estonianWebsiteTitle={estonianWebsiteTitle}
          setEstonianWebsiteTitle={setEstonianWebsiteTitle}
          estonianNameInMenu={estonianNameInMenu}
          setEstonianNameInMenu={setEstonianNameInMenu}
          estonianLanguageVisible={estonianLanguageVisible}
          handleLanguageDelete={handleLanguageDelete}
          handleEnglishLanguageVisibilityToggle={handleEnglishLanguageVisibilityToggle}
          handleEstonianLanguageVisibilityToggle={handleEstonianLanguageVisibilityToggle}
          onAddPageClick={handleAddPageClick}
          onToggleExpansion={togglePageExpansion}
          onToggleVisibility={togglePageVisibility}
          onDeletePage={handleDeletePage}
          onDuplicatePage={handleDuplicatePage}
          onAddNestedPage={handleAddNestedPage}
          onPageSettings={handlePageSettings}
          onEditPage={handleEditPage}
          onTranslatePage={handleTranslatePage}
        />

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

        <AddPageSidebar
          isOpen={addPageSidebarOpen}
          onClose={handleCloseAddPageSidebar}
          selectedLayout={selectedLayout}
          onCreatePage={handleCreatePage}
        />

        <PageSettings
          page={selectedPage}
          isOpen={pageSettingsOpen}
          onClose={handleClosePageSettings}
        />

        <AddLanguageSidebar
          isOpen={addLanguageSidebarOpen}
          onClose={() => setAddLanguageSidebarOpen(false)}
          onAddLanguage={handleAddLanguage}
        />

        <LanguageSettingsSidebar
          isOpen={languageSettingsOpen}
          onClose={() => setLanguageSettingsOpen(false)}
          websiteTitle={currentSettings.websiteTitle}
          setWebsiteTitle={currentSettings.setWebsiteTitle}
          nameInMenu={currentSettings.nameInMenu}
          setNameInMenu={currentSettings.setNameInMenu}
          languageVisible={currentSettings.languageVisible}
          onLanguageVisibilityToggle={currentSettings.onLanguageVisibilityToggle}
          onLanguageDelete={handleLanguageDelete}
          activeTab={activeTab}
        />
      </div>
    </div>
  );
};
