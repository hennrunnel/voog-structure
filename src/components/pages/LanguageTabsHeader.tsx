import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EyeHiddenIcon } from "./LanguageTabsIcons";

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
                className="text-sm text-[#666] data-[state=active]:text-[#5A4FFF] data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#5A4FFF] data-[state=active]:shadow-none rounded-none border-b-2 border-transparent flex items-center capitalize outline-none focus:outline-none focus-visible:outline-none"
                style={{ 
                  paddingBottom: '16px', 
                  paddingTop: '0px',
                  paddingLeft: '8px',
                  paddingRight: '8px'
                }}
              >
                <span className="flex items-center gap-4">
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
        onClick={onAddLanguageClick} 
        className="text-sm text-[#5A4FFF] hover:underline outline-none focus:outline-none"
        style={{ 
          marginRight: '32px',
          paddingBottom: '16px',
          paddingTop: '0px',
          fontWeight: 500
        }}
      >
        Add language
      </button>
    </div>
  );
};
