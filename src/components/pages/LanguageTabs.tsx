
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

const EyeHiddenIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60">
    <path d="M19.2079 9.84839C20.3304 11.0179 21 12 21 12C21 12 16.9091 18 12 18C11.1894 18 10.3879 17.8865 9.59549 17.6609L19.2079 9.84839Z" fill="#666"/>
    <path d="M14.505 6.49483L12 9C10.3431 9 9 10.3431 9 12L5.52661 15.4734C3.75006 13.8335 3 12 3 12C3 12 5.45455 6 12 6C12.8665 6 13.7076 6.18695 14.505 6.49483Z" fill="#666"/>
    <path opacity="0.3" d="M18.535 5.00003L5.09998 18.435L6.51498 19.85L19.95 6.41523L18.535 5.00003Z" fill="#666"/>
  </svg>
);

const PreferencesIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_85_13)">
      <path opacity="0.3" fillRule="evenodd" clipRule="evenodd" d="M4.5 7H9.5C10.3284 7 11 7.67157 11 8.5C11 9.32843 10.3284 10 9.5 10H4.5C3.67157 10 3 9.32843 3 8.5C3 7.67157 3.67157 7 4.5 7ZM13.5 15H18.5C19.3284 15 20 15.6716 20 16.5C20 17.3284 19.3284 18 18.5 18H13.5C12.6716 18 12 17.3284 12 16.5C12 15.6716 12.6716 15 13.5 15Z" fill="#666" />
      <path fillRule="evenodd" clipRule="evenodd" d="M17 11C15.3431 11 14 9.65685 14 8C14 6.34315 15.3431 5 17 5C18.6569 5 20 6.34315 20 8C20 9.65685 18.6569 11 17 11ZM6 19C4.34315 19 3 17.6569 3 16C3 14.3431 4.34315 13 6 13C7.65685 13 9 14.3431 9 16C9 17.6569 7.65685 19 6 19Z" fill="#666" />
    </g>
    <defs>
      <clipPath id="clip0_85_13">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
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
                      className="text-sm px-4 py-3 text-[#666] data-[state=active]:text-[#5A4FFF] data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#5A4FFF] data-[state=active]:shadow-none rounded-none border-b-2 border-transparent flex items-center capitalize"
                    >
                      <span className="flex items-center gap-2">
                        {tab}
                        {tab === "estonian" && !estonianVisible && (
                          <EyeHiddenIcon />
                        )}
                      </span>
                    </TabsTrigger>
                  </div>
                ))}
              </TabsList>
              
              <button 
                onClick={handleAddLanguageClick}
                className="text-sm px-4 py-3 text-[#666] hover:text-[#5A4FFF] rounded transition-colors"
              >
                + Add language
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={onLanguageSettings}
                  className="text-[#666] hover:text-[#5A4FFF] rounded p-1 transition-colors"
                  aria-label="Language settings"
                >
                  <PreferencesIcon />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Language settings</p>
              </TooltipContent>
            </Tooltip>
            
            <Button 
              onClick={onAddPageClick}
              className="text-white font-semibold hover:bg-[#4A3FFF]"
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
