
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LanguageTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  availableTabs: string[];
  children: React.ReactNode;
  englishVisible?: boolean;
  estonianVisible?: boolean;
  onEnglishVisibilityToggle?: (visible: boolean) => void;
  onEstonianVisibilityToggle?: (visible: boolean) => void;
}

const EyeVisibleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-100 hover:opacity-50 transition-opacity ml-2">
    <path d="M3 12C3 12 5.45455 6 12 6C16.9091 6 21 12 21 12C21 12 16.9091 18 12 18C5.45455 18 3 12 3 12Z" fill="#1B2124"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15Z" fill="white"/>
  </svg>
);

const EyeHiddenIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-100 hover:opacity-50 transition-opacity ml-2">
    <path d="M19.2079 9.84839C20.3304 11.0179 21 12 21 12C21 12 16.9091 18 12 18C11.1894 18 10.3879 17.8865 9.59549 17.6609L19.2079 9.84839Z" fill="#1B2124"/>
    <path d="M14.505 6.49483L12 9C10.3431 9 9 10.3431 9 12L5.52661 15.4734C3.75006 13.8335 3 12 3 12C3 12 5.45455 6 12 6C12.8665 6 13.7076 6.18695 14.505 6.49483Z" fill="#1B2124"/>
    <path opacity="0.3" d="M18.535 5.00003L5.09998 18.435L6.51498 19.85L19.95 6.41523L18.535 5.00003Z" fill="#1B2124"/>
  </svg>
);

export const LanguageTabs = ({ 
  activeTab, 
  setActiveTab, 
  availableTabs, 
  children,
  englishVisible = true,
  estonianVisible = true,
  onEnglishVisibilityToggle,
  onEstonianVisibilityToggle
}: LanguageTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="flex items-center justify-between mb-6 px-8 pt-6">
        <TabsList className="bg-transparent h-auto p-0 border-b border-gray-200 rounded-none">
          {availableTabs.includes("english") && (
            <div className="flex items-center">
              <TabsTrigger 
                value="english" 
                className="text-sm px-4 py-3 text-[#666] data-[state=active]:text-[#5A4FFF] data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#5A4FFF] data-[state=active]:shadow-none rounded-none border-b-2 border-transparent"
              >
                English
              </TabsTrigger>
              {onEnglishVisibilityToggle && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEnglishVisibilityToggle(!englishVisible);
                  }}
                  className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded"
                  aria-label={englishVisible ? "Hide English language" : "Show English language"}
                >
                  {englishVisible ? <EyeVisibleIcon /> : <EyeHiddenIcon />}
                </button>
              )}
            </div>
          )}
          {availableTabs.includes("estonian") && (
            <div className="flex items-center">
              <TabsTrigger 
                value="estonian" 
                className="text-sm px-4 py-3 text-[#666] data-[state=active]:text-[#5A4FFF] data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#5A4FFF] data-[state=active]:shadow-none rounded-none border-b-2 border-transparent"
              >
                Estonian
              </TabsTrigger>
              {onEstonianVisibilityToggle && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEstonianVisibilityToggle(!estonianVisible);
                  }}
                  className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded"
                  aria-label={estonianVisible ? "Hide Estonian language" : "Show Estonian language"}
                >
                  {estonianVisible ? <EyeVisibleIcon /> : <EyeHiddenIcon />}
                </button>
              )}
            </div>
          )}
        </TabsList>
        
        <button className="text-[#5A4FFF] text-sm font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded px-2">
          Add language
        </button>
      </div>

      {/* Border line that spans full width */}
      <div className="border-b border-gray-200 -mx-6"></div>

      {children}
    </Tabs>
  );
};
