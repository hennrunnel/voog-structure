
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

const EyeHiddenIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-50 ml-2">
    <path d="M19.2079 9.84839C20.3304 11.0179 21 12 21 12C21 12 16.9091 18 12 18C11.1894 18 10.3879 17.8865 9.59549 17.6609L19.2079 9.84839Z" fill="#1B2124"/>
    <path d="M14.505 6.49483L12 9C10.3431 9 9 10.3431 9 12L5.52661 15.4734C3.75006 13.8335 3 12 3 12C3 12 5.45455 6 12 6C12.8665 6 13.7076 6.18695 14.505 6.49483Z" fill="#1B2124"/>
    <path opacity="0.3" d="M18.535 5.00003L5.09998 18.435L6.51498 19.85L19.95 6.41523L18.535 5.00003Z" fill="#1B2124"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CogIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.22 2H11.78C11.2496 2 10.8183 2.42131 10.8086 2.95146L10.7584 5.02332C10.2809 5.19072 9.82475 5.40707 9.39633 5.66747L7.59084 4.59084C7.14084 4.31084 6.54084 4.46084 6.26084 4.91084L6.03084 5.33084C5.75084 5.78084 5.90084 6.38084 6.35084 6.66084L8.18084 7.75084C7.94084 8.21084 7.73084 8.68084 7.55084 9.17084L5.61001 9.22015C5.07987 9.22984 4.65856 9.66115 4.65856 10.1916V11.8084C4.65856 12.3388 5.07987 12.7701 5.61001 12.7798L7.55084 12.8291C7.73084 13.3191 7.94084 13.7891 8.18084 14.2491L6.35084 15.3391C5.90084 15.6191 5.75084 16.2191 6.03084 16.6691L6.26084 17.0891C6.54084 17.5391 7.14084 17.6891 7.59084 17.4091L9.39633 16.3325C9.82475 16.5929 10.2809 16.8093 10.7584 16.9767L10.8086 19.0485C10.8183 19.5787 11.2496 20 11.78 20H12.22C12.7504 20 13.1817 19.5787 13.1914 19.0485L13.2416 16.9767C13.7191 16.8093 14.1752 16.5929 14.6037 16.3325L16.4092 17.4091C16.8592 17.6891 17.4592 17.5391 17.7392 17.0891L17.9692 16.6691C18.2492 16.2191 18.0992 15.6191 17.6492 15.3391L15.8192 14.2491C16.0592 13.7891 16.2692 13.3191 16.4492 12.8291L18.39 12.7798C18.9201 12.7701 19.3414 12.3388 19.3414 11.8084V10.1916C19.3414 9.66115 18.9201 9.22984 18.39 9.22015L16.4492 9.17084C16.2692 8.68084 16.0592 8.21084 15.8192 7.75084L17.6492 6.66084C18.0992 6.38084 18.2492 5.78084 17.9692 5.33084L17.7392 4.91084C17.4592 4.46084 16.8592 4.31084 16.4092 4.59084L14.6037 5.66747C14.1752 5.40707 13.7191 5.19072 13.2416 5.02332L13.1914 2.95146C13.1817 2.42131 12.7504 2 12.22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
          <TabsList className="bg-transparent h-auto p-0 border-b border-gray-200 rounded-none">
            {availableTabs.map((tab) => (
              <TabsTrigger 
                key={tab}
                value={tab} 
                className="text-sm px-4 py-3 text-[#666] data-[state=active]:text-[#5A4FFF] data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#5A4FFF] data-[state=active]:shadow-none rounded-none border-b-2 border-transparent flex items-center capitalize"
              >
                {tab}
                {tab === "estonian" && !estonianVisible && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <EyeHiddenIcon />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Language hidden</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <div className="flex items-center gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  onClick={handleAddLanguageClick}
                  className="text-[#666] hover:text-[#5A4FFF] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded p-2 transition-colors"
                  aria-label="Add language"
                >
                  <PlusIcon />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add language</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={onLanguageSettings}
                  className="text-[#666] hover:text-[#5A4FFF] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded p-2 transition-colors"
                  aria-label="Language settings"
                >
                  <CogIcon />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Language settings</p>
              </TooltipContent>
            </Tooltip>
            
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
