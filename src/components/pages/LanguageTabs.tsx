
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PageTable } from "@/components/pages/PageTable";
import { AddLanguageSidebar } from "@/components/pages/AddLanguageSidebar";
import { LanguageTabsHeader } from "./LanguageTabsHeader";
import { LanguageTabsActions } from "./LanguageTabsActions";
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
  onLanguagePublishToggle?: (language: string, published: boolean) => void;
  onLanguageDelete?: (language: string) => void;
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
  onLanguagePublishToggle,
  onLanguageDelete
}: LanguageTabsProps) => {
  const [addLanguageSidebarOpen, setAddLanguageSidebarOpen] = useState(false);

  const handleAddLanguageClick = () => {
    setAddLanguageSidebarOpen(true);
  };

  const handleAddLanguage = (languageData: any) => {
    onAddLanguage(languageData);
    setAddLanguageSidebarOpen(false);
  };

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
            onLanguagePublishToggle={onLanguagePublishToggle}
            onLanguageDelete={onLanguageDelete}
          />

          {availableTabs.map(tab => (
            <TabsContent key={tab} value={tab} className="mt-0">
              <PageTable 
                pages={pages} 
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
    </TooltipProvider>
  );
};
