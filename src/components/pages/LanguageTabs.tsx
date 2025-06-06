
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
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
  onLanguagePublishToggle?: (language: string, published: boolean) => void;
  onLanguageDelete?: (language: string) => void;
}

const EyeHiddenIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60">
    <path d="M19.2079 9.84839C20.3304 11.0179 21 12 21 12C21 12 16.9091 18 12 18C11.1894 18 10.3879 17.8865 9.59549 17.6609L19.2079 9.84839Z" fill="#666" />
    <path d="M14.505 6.49483L12 9C10.3431 9 9 10.3431 9 12L5.52661 15.4734C3.75006 13.8335 3 12 3 12C3 12 5.45455 6 12 6C12.8665 6 13.7076 6.18695 14.505 6.49483Z" fill="#666" />
    <path opacity="0.3" d="M18.535 5.00003L5.09998 18.435L6.51498 19.85L19.95 6.41523L18.535 5.00003Z" fill="#666" />
  </svg>;

const KebabIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="hover:fill-[#5A4FFF] transition-colors" data-ico-name="kebab">
    <g>
      <path d="M12 7C13.1046 7 14 6.10457 14 5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5C10 6.10457 10.8954 7 12 7Z" fill="#1B2124"></path>
      <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" fill="#1B2124"></path>
      <path d="M12 21C13.1046 21 14 20.1046 14 19C14 17.8954 13.1046 17 12 17C10.8954 17 10 17.8954 10 19C10 20.1046 10.8954 21 12 21Z" fill="#1B2124"></path>
    </g>
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

  const handleDownloadSite = () => {
    console.log("Download entire site clicked");
  };

  const handleLanguagePublishToggle = () => {
    const isCurrentlyPublished = activeTab === "english" ? englishVisible : estonianVisible;
    onLanguagePublishToggle?.(activeTab, !isCurrentlyPublished);
  };

  const handleLanguageDelete = () => {
    onLanguageDelete?.(activeTab);
  };

  const isCurrentLanguagePublished = () => {
    if (activeTab === "english") return englishVisible;
    if (activeTab === "estonian") return estonianVisible;
    return true;
  };

  return (
    <TooltipProvider>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Language tabs section - Full width with proper spacing */}
        <div 
          className="flex items-center justify-between border-b border-gray-200"
          style={{ 
            paddingTop: '24px',
            paddingBottom: '0px',
            marginLeft: '0px',
            marginRight: '0px'
          }}
        >
          <div className="flex items-center">
            <TabsList 
              className="bg-transparent h-auto p-0 border-none rounded-none"
              style={{ marginLeft: '32px' }}
            >
              {availableTabs.map((tab, index) => (
                <div key={tab} className="flex items-center" style={{ marginRight: index < availableTabs.length - 1 ? '24px' : '0px' }}>
                  <TabsTrigger 
                    value={tab} 
                    className="text-sm px-0 text-[#666] data-[state=active]:text-[#5A4FFF] data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#5A4FFF] data-[state=active]:shadow-none rounded-none border-b-2 border-transparent flex items-center capitalize outline-none focus:outline-none focus-visible:outline-none"
                    style={{ paddingBottom: '16px', paddingTop: '0px' }}
                  >
                    <span className="flex items-center gap-2">
                      {tab}
                      {tab === "estonian" && !estonianVisible && <EyeHiddenIcon />}
                      {tab === "english" && !englishVisible && <EyeHiddenIcon />}
                    </span>
                  </TabsTrigger>
                </div>
              ))}
            </TabsList>
          </div>
          
          <button 
            onClick={handleAddLanguageClick} 
            className="text-sm text-[#5A4FFF] hover:underline outline-none focus:outline-none capitalize"
            style={{ 
              marginRight: '24px',
              paddingBottom: '16px',
              paddingTop: '0px'
            }}
          >
            Add language
          </button>
        </div>

        {/* Actions row between tabs and content */}
        <div className="flex items-center justify-between px-8 mb-4" style={{ marginTop: '24px' }}>
          <div className="flex items-center gap-3">
            {/* Empty div to push buttons to the right */}
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              onClick={onLanguageSettings}
              variant="outline"
              className="text-[#5A4FFF] border-none font-semibold outline-none focus:outline-none"
              style={{
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: 600,
                lineHeight: '24px',
                backgroundColor: 'rgba(90, 79, 255, 0.1)',
                color: '#5A4FFF'
              }}
            >
              Language settings
            </Button>
            
            <Button 
              onClick={onAddPageClick} 
              className="text-white font-semibold hover:bg-[#4A3FFF] outline-none focus:outline-none" 
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
              New page
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-1 h-auto hover:bg-transparent outline-none focus:outline-none focus:ring-0" 
                  aria-label="More options"
                >
                  <KebabIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-white shadow-md border font-sans">
                <DropdownMenuItem 
                  onClick={handleDownloadSite} 
                  className="cursor-pointer text-sm text-[#1B2124]"
                >
                  Download entire site
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={handleLanguagePublishToggle} 
                  className="cursor-pointer text-sm text-[#1B2124]"
                >
                  {isCurrentLanguagePublished() ? 'Unpublish this language' : 'Publish this language'}
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={handleLanguageDelete} 
                  className="cursor-pointer text-sm text-red-600 focus:text-red-600"
                >
                  Delete language
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

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

      <AddLanguageSidebar 
        isOpen={addLanguageSidebarOpen} 
        onClose={() => setAddLanguageSidebarOpen(false)} 
        onAddLanguage={handleAddLanguage} 
      />
    </TooltipProvider>
  );
};
