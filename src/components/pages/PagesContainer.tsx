
import { PageSettings } from "@/components/PageSettings";
import { AddPageSidebar } from "@/components/AddPageSidebar";
import { usePageManagement } from "@/hooks/usePageManagement";
import { useLanguageManagement } from "@/hooks/useLanguageManagement";
import { usePageActions } from "@/hooks/usePageActions";
import { PageDialogs } from "@/components/pages/PageDialogs";
import { PagesHeader } from "@/components/pages/PagesHeader";
import { PagesContent } from "@/components/pages/PagesContent";

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

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-12 font-sans">
      <div className="w-full" style={{ maxWidth: '992px' }}>
        <PagesHeader />
        
        <PagesContent
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          availableTabs={availableTabs}
          englishLanguageVisible={englishLanguageVisible}
          estonianLanguageVisible={estonianLanguageVisible}
          englishWebsiteTitle={englishWebsiteTitle}
          setEnglishWebsiteTitle={setEnglishWebsiteTitle}
          englishNameInMenu={englishNameInMenu}
          setEnglishNameInMenu={setEnglishNameInMenu}
          estonianWebsiteTitle={estonianWebsiteTitle}
          setEstonianWebsiteTitle={setEstonianWebsiteTitle}
          estonianNameInMenu={estonianNameInMenu}
          setEstonianNameInMenu={setEstonianNameInMenu}
          handleEnglishLanguageVisibilityToggle={handleEnglishLanguageVisibilityToggle}
          handleEstonianLanguageVisibilityToggle={handleEstonianLanguageVisibilityToggle}
          handleLanguageDelete={handleLanguageDelete}
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

        <PageSettings isOpen={pageSettingsOpen} onClose={handleClosePageSettings} />

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
