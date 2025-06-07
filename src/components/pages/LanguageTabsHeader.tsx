
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EyeHiddenIcon } from "@/components/icons/EyeHiddenIcon";

interface LanguageTabsHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  availableTabs: string[];
  englishVisible?: boolean;
  estonianVisible?: boolean;
  onAddLanguageClick: () => void;
}

export const LanguageTabsHeader = ({
  activeTab,
  setActiveTab,
  availableTabs,
  englishVisible = true,
  estonianVisible = true,
  onAddLanguageClick
}: LanguageTabsHeaderProps) => {
  return (
    <div 
      className="flex items-center justify-between pt-6 pb-0 mx-0 border-b border-subtle"
    >
      <div className="flex items-center">
        <TabsList 
          className="bg-transparent h-auto p-0 border-none rounded-none ml-8"
        >
          {availableTabs.map((tab, index) => (
            <div key={tab} className="flex items-center" style={{ marginRight: index < availableTabs.length - 1 ? '24px' : '0px' }}>
              <TabsTrigger 
                value={tab} 
                className="text-sm text-black data-[state=active]:text-primary-blue data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary-blue data-[state=active]:shadow-none rounded-none border-b-2 border-transparent flex items-center capitalize outline-none focus:outline-none focus-visible:outline-none pb-4 pt-0 px-2"
              >
                <span className="flex items-center gap-2">
                  {tab}
                  {tab === "estonian" && !estonianVisible && (
                    <EyeHiddenIcon className={activeTab === "estonian" ? "text-primary-blue" : "text-muted"} />
                  )}
                  {tab === "english" && !englishVisible && (
                    <EyeHiddenIcon className={activeTab === "english" ? "text-primary-blue" : "text-muted"} />
                  )}
                </span>
              </TabsTrigger>
            </div>
          ))}
        </TabsList>
      </div>
      
      <button 
        onClick={onAddLanguageClick} 
        className="text-sm text-primary-blue hover:underline outline-none focus:outline-none mr-8 pb-4 pt-0 font-medium"
      >
        Add language
      </button>
    </div>
  );
};
