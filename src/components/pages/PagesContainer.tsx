
import { Plus, MoreVertical, Download, Trash, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { PagesHeader } from "@/components/pages/PagesHeader";
import { LanguageTabs } from "@/components/pages/LanguageTabs";
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
    console.log("Delete language functionality");
  };

  const handleToggleLanguagePublish = () => {
    console.log("Toggle language publish status");
  };

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
                  <Eye className="w-4 h-4 mr-2" />
                  Publish this language
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDeleteLanguage} className="text-red-600">
                  <Trash className="w-4 h-4 mr-2" />
                  Delete language
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <LanguageTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          availableTabs={availableTabs}
          onAddLanguage={() => setAddLanguageSidebarOpen(true)}
          onLanguageSettings={() => setLanguageSettingsOpen(true)}
        />

        <PagesContent 
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
        />

        <LanguageSettingsSidebar
          isOpen={languageSettingsOpen}
          onClose={() => setLanguageSettingsOpen(false)}
          activeTab={activeTab}
          englishWebsiteTitle={englishWebsiteTitle}
          setEnglishWebsiteTitle={setEnglishWebsiteTitle}
          englishNameInMenu={englishNameInMenu}
          setEnglishNameInMenu={setEnglishNameInMenu}
          englishLanguageVisible={englishLanguageVisible}
          onEnglishLanguageVisibilityToggle={handleEnglishLanguageVisibilityToggle}
          estonianWebsiteTitle={estonianWebsiteTitle}
          setEstonianWebsiteTitle={setEstonianWebsiteTitle}
          estonianNameInMenu={estonianNameInMenu}
          setEstonianNameInMenu={setEstonianNameInMenu}
          estonianLanguageVisible={estonianLanguageVisible}
          onEstonianLanguageVisibilityToggle={handleEstonianLanguageVisibilityToggle}
          onLanguageDelete={handleLanguageDelete}
        />
      </div>
    </div>
  );
};
