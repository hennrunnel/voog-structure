
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PageTable } from "@/components/pages/PageTable";
import { AddLanguageSidebar } from "@/components/pages/AddLanguageSidebar";
import { LanguageReorderSidepanel } from "@/components/pages/LanguageReorderSidepanel";
import { LanguageTabsHeader } from "./LanguageTabsHeader";
import { LanguageTabsActions } from "./LanguageTabsActions";
import { EmptyLanguageState } from "./EmptyLanguageState";
import { PageItem } from "@/types/pages";
import { useState } from "react";

interface LanguageTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  availableTabs: string[];
  englishVisible?: boolean;
  estonianVisible?: boolean;
  onLanguageSettings?: () => void;
  onAddPageClick: () => void;
  pages: PageItem[];
  onToggleExpansion: (pageId: string) => void;
  onToggleVisibility: (pageId: string) => void;
  onDeletePage: (page: PageItem) => void;
  onDuplicatePage: (page: PageItem) => void;
  onAddNestedPage: (page: PageItem) => void;
  onPageSettings: (page: PageItem) => void;
  onEditPage: (page: PageItem) => void;
  onTranslatePage: (page: PageItem) => void;
  onAddLanguage: (languageData: any) => void;
  onLanguageVisibilityToggle?: (action: 'enable' | 'disable') => void;
  onLanguageDelete?: (language: string) => void;
  onReorderLanguages?: () => void;
  languageReorderOpen?: boolean;
  onSaveLanguageOrder?: (reorderedLanguages: { id: string; name: string }[]) => void;
  getLanguagesForReorder?: () => { id: string; name: string }[];
  onCloseLanguageReorder?: () => void;
}

export const LanguageTabs = ({
  activeTab,
  setActiveTab,
  availableTabs,
  englishVisible = true,
  estonianVisible = true,
  onLanguageSettings,
  onAddPageClick,
  pages,
  onToggleExpansion,
  onToggleVisibility,
  onDeletePage,
  onDuplicatePage,
  onAddNestedPage,
  onPageSettings,
  onEditPage,
  onTranslatePage,
  onAddLanguage,
  onLanguageVisibilityToggle,
  onLanguageDelete,
  onReorderLanguages,
  languageReorderOpen = false,
  onSaveLanguageOrder,
  getLanguagesForReorder,
  onCloseLanguageReorder
}: LanguageTabsProps) => {
  const [addLanguageSidebarOpen, setAddLanguageSidebarOpen] = useState(false);

  const handleAddLanguageClick = () => {
    setAddLanguageSidebarOpen(true);
  };

  const handleAddLanguage = (languageData: any) => {
    onAddLanguage(languageData);
    setAddLanguageSidebarOpen(false);
  };

  // If no languages exist, show empty state without tabs or headers
  if (availableTabs.length === 0) {
    return (
      <TooltipProvider>
        <div className="w-full">
          <EmptyLanguageState onAddLanguageClick={handleAddLanguageClick} />
        </div>

        <AddLanguageSidebar 
          isOpen={addLanguageSidebarOpen} 
          onClose={() => setAddLanguageSidebarOpen(false)} 
          onAddLanguage={handleAddLanguage} 
        />
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <div className="w-full">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <LanguageTabsHeader
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            availableTabs={availableTabs}
            englishVisible={englishVisible}
            estonianVisible={estonianVisible}
            onAddLanguageClick={handleAddLanguageClick}
          />

          <LanguageTabsActions
            activeTab={activeTab}
            englishVisible={englishVisible}
            estonianVisible={estonianVisible}
            onLanguageSettings={onLanguageSettings}
            onAddPageClick={onAddPageClick}
            onLanguageVisibilityToggle={onLanguageVisibilityToggle}
            onLanguageDelete={onLanguageDelete}
            onReorderLanguages={onReorderLanguages}
          />

          {availableTabs.map(tab => (
            <TabsContent key={tab} value={tab} className="mt-0">
              <PageTable 
                pages={pages}
                currentLanguage={activeTab}
                onToggleExpansion={onToggleExpansion} 
                onToggleVisibility={onToggleVisibility} 
                onDeletePage={onDeletePage} 
                onDuplicatePage={onDuplicatePage} 
                onAddNestedPage={onAddNestedPage} 
                onPageSettings={onPageSettings} 
                onEditPage={onEditPage} 
                onTranslatePage={onTranslatePage} 
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <AddLanguageSidebar 
        isOpen={addLanguageSidebarOpen} 
        onClose={() => setAddLanguageSidebarOpen(false)} 
        onAddLanguage={handleAddLanguage} 
      />

      {languageReorderOpen && getLanguagesForReorder && onSaveLanguageOrder && onCloseLanguageReorder && (
        <LanguageReorderSidepanel
          open={languageReorderOpen}
          onClose={onCloseLanguageReorder}
          languages={getLanguagesForReorder()}
          onSave={onSaveLanguageOrder}
        />
      )}
    </TooltipProvider>
  );
};
