
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { KebabIcon } from "./LanguageTabsIcons";

interface LanguageTabsActionsProps {
  activeTab: string;
  englishVisible?: boolean;
  estonianVisible?: boolean;
  onLanguageSettings?: () => void;
  onAddPageClick: () => void;
  onLanguagePublishToggle?: (language: string, published: boolean) => void;
  onLanguageDelete?: (language: string) => void;
}

export const LanguageTabsActions = ({
  activeTab,
  englishVisible = true,
  estonianVisible = true,
  onLanguageSettings,
  onAddPageClick,
  onLanguagePublishToggle,
  onLanguageDelete
}: LanguageTabsActionsProps) => {
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
    <div 
      className="flex items-center justify-between px-8" 
      style={{ 
        paddingTop: '16px',
        paddingBottom: '16px'
      }}
    >
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
            color: '#5A4FFF',
            height: '24px'
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
            lineHeight: '24px',
            height: '24px'
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
  );
};
