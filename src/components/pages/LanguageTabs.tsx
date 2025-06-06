import { Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PageItem } from "@/types/pages";

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
}

const EyeHiddenIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-50 ml-2">
    <path d="M19.2079 9.84839C20.3304 11.0179 21 12 21 12C21 12 16.9091 18 12 18C11.1894 18 10.3879 17.8865 9.59549 17.6609L19.2079 9.84839Z" fill="#1B2124"/>
    <path d="M14.505 6.49483L12 9C10.3431 9 9 10.3431 9 12L5.52661 15.4734C3.75006 13.8335 3 12 3 12C3 12 5.45455 6 12 6C12.8665 6 13.7076 6.18695 14.505 6.49483Z" fill="#1B2124"/>
    <path opacity="0.3" d="M18.535 5.00003L5.09998 18.435L6.51498 19.85L19.95 6.41523L18.535 5.00003Z" fill="#1B2124"/>
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
  onTranslatePage
}: LanguageTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="flex items-center justify-between mb-6 px-8 pt-6">
        <TabsList className="bg-transparent h-auto p-0 border-b border-gray-200 rounded-none">
          {availableTabs.includes("english") && (
            <TabsTrigger 
              value="english" 
              className="text-sm px-4 py-3 text-[#666] data-[state=active]:text-[#5A4FFF] data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#5A4FFF] data-[state=active]:shadow-none rounded-none border-b-2 border-transparent"
            >
              English
            </TabsTrigger>
          )}
          {availableTabs.includes("estonian") && (
            <TabsTrigger 
              value="estonian" 
              className="text-sm px-4 py-3 text-[#666] data-[state=active]:text-[#5A4FFF] data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#5A4FFF] data-[state=active]:shadow-none rounded-none border-b-2 border-transparent flex items-center"
            >
              Estonian
              {!estonianVisible && <EyeHiddenIcon />}
            </TabsTrigger>
          )}
        </TabsList>
        
        <div className="flex items-center gap-3">
          <button className="text-[#5A4FFF] text-sm font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded px-2">
            Add language
          </button>
          <button
            onClick={onLanguageSettings}
            className="text-[#5A4FFF] text-sm font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded px-2"
          >
            Settings
          </button>
        </div>
      </div>

      {/* Border line that spans full width */}
      <div className="border-b border-gray-200 -mx-6"></div>

      {/* Add page button section */}
      <div className="px-8 py-6">
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

      <TabsContent value="english" className="mt-0">
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

      <TabsContent value="estonian" className="mt-0">
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
    </Tabs>
  );
};
