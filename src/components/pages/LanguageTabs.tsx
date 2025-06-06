
import { Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { PageTable } from "@/components/pages/PageTable";
import { AddLanguageSidebar } from "@/components/pages/AddLanguageSidebar";
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
}

const KebabIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="2" r="1.5" fill="currentColor"/>
    <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
    <circle cx="8" cy="14" r="1.5" fill="currentColor"/>
  </svg>
);

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
  onAddLanguage
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
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between mb-6 px-8 pt-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center">
              <TabsList className="bg-transparent h-auto p-0 border-b border-gray-200 rounded-none">
                {availableTabs.map((tab) => (
                  <div key={tab} className="flex items-center">
                    <TabsTrigger 
                      value={tab} 
                      className="text-sm px-4 py-3 pr-2 text-[#666] data-[state=active]:text-[#5A4FFF] data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#5A4FFF] data-[state=active]:shadow-none rounded-none border-b-2 border-transparent flex items-center capitalize group"
                    >
                      <span className="flex items-center gap-2">
                        {tab}
                        {tab === "estonian" && !estonianVisible && (
                          <span className="text-sm text-[#666]">(hidden)</span>
                        )}
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onLanguageSettings?.();
                              }}
                              className="text-[#666] hover:text-[#5A4FFF] group-data-[state=active]:hover:text-[#5A4FFF] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded p-1 transition-colors ml-1"
                              aria-label={`${tab} language settings`}
                            >
                              <KebabIcon />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Language settings</p>
                          </TooltipContent>
                        </Tooltip>
                      </span>
                    </TabsTrigger>
                  </div>
                ))}
              </TabsList>
              
              <button 
                onClick={handleAddLanguageClick}
                className="text-[#1B2124] text-sm font-medium hover:text-[#5A4FFF] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded transition-colors ml-6"
              >
                + Add language
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              onClick={onAddPageClick}
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

        {availableTabs.map((tab) => (
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

      <AddLanguageSidebar
        isOpen={addLanguageSidebarOpen}
        onClose={() => setAddLanguageSidebarOpen(false)}
        onAddLanguage={handleAddLanguage}
      />
    </TooltipProvider>
  );
};
