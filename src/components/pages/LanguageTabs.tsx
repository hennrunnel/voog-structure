
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LanguageTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  availableTabs: string[];
  children: React.ReactNode;
}

export const LanguageTabs = ({ activeTab, setActiveTab, availableTabs, children }: LanguageTabsProps) => {
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
              className="text-sm px-4 py-3 text-[#666] data-[state=active]:text-[#5A4FFF] data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#5A4FFF] data-[state=active]:shadow-none rounded-none border-b-2 border-transparent"
            >
              Estonian
            </TabsTrigger>
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
