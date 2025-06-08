
import { PageSettings } from "@/components/PageSettings";
import { AddPageSidebar } from "@/components/AddPageSidebar";
import { usePageManagement } from "@/hooks/usePageManagement";
import { useLanguageManagement } from "@/hooks/useLanguageManagement";
import { usePageActions } from "@/hooks/usePageActions";
import { PageDialogs } from "@/components/pages/PageDialogs";
import { PagesHeader } from "@/components/pages/PagesHeader";
import { PagesContent } from "@/components/pages/PagesContent";
import { Card, CardContent } from "@/components/ui/card";

export const PagesContainer = () => {
  const {
    pages,
    setPages,
    deleteDialogOpen,
    setDeleteDialogOpen,
    pageToDelete,
    togglePageExpansion,
    togglePageVisibility,
    handleDeletePage,
    confirmDeletePage,
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
    handleLanguagePublishToggle,
    handleEnglishLanguageVisibilityToggle,
    handleEstonianLanguageVisibilityToggle,
    confirmLanguageVisibilityToggle,
    addLanguage
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
    <div className="min-h-screen bg-gray-50 flex justify-center px-4 font-sans" style={{ paddingTop: '80px' }}>
      <div className="w-full" style={{ maxWidth: '992px' }}>
        <div style={{ marginBottom: '48px' }}>
          <PagesHeader />
        </div>
        
        <Card 
          className="bg-white"
          style={{
            borderRadius: '10px',
            border: '0.5px solid rgba(24, 24, 27, 0.10)',
            background: 'var(--Primary-White, #FFF)',
            boxShadow: '0px 0.5px 1px 0px var(--shadow-dark, rgba(24, 24, 27, 0.05)), 0px 2px 5px 0px rgba(0, 0, 0, 0.05), 0px 17px 17.7px 0px rgba(0, 0, 0, 0.01)',
            paddingBottom: '0px',
            marginBottom: '32px'
          }}
        >
          <CardContent className="p-0">
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
              handleLanguageDelete={handleLanguageDelete}
              handleLanguagePublishToggle={handleLanguagePublishToggle}
              handleEnglishLanguageVisibilityToggle={handleEnglishLanguageVisibilityToggle}
              handleEstonianLanguageVisibilityToggle={handleEstonianLanguageVisibilityToggle}
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
              addLanguage={addLanguage}
            />
          </CardContent>
        </Card>

        <PageDialogs
          deleteDialogOpen={deleteDialogOpen}
          setDeleteDialogOpen={setDeleteDialogOpen}
          pageToDelete={pageToDelete}
          onConfirmDelete={confirmDeletePage}
          languageDeleteDialogOpen={languageDeleteDialogOpen}
          setLanguageDeleteDialogOpen={setLanguageDeleteDialogOpen}
          onConfirmLanguageDelete={confirmLanguageDelete}
          languageVisibilityDialogOpen={languageVisibilityDialogOpen}
          setLanguageVisibilityDialogOpen={setLanguageVisibilityDialogOpen}
          languageVisibilityAction={languageVisibilityAction}
          onConfirmLanguageVisibilityToggle={confirmLanguageVisibilityToggle}
        />

        <PageSettings 
          isOpen={pageSettingsOpen} 
          onClose={handleClosePageSettings}
        />

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
