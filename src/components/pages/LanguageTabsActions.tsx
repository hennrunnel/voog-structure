
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { KebabIcon } from "@/components/icons/KebabIcon";

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
    <div className="flex items-center justify-between py-4 px-6">
      <div className="flex items-center gap-3">
        {/* Empty div to push buttons to the right */}
      </div>
      
      <div className="flex items-center gap-3">
        <Button
          onClick={onLanguageSettings}
          variant="outline"
          className="text-primary-brand border-none font-semibold outline-none focus:outline-none bg-primary-brand/10 px-4 py-2 text-sm font-semibold leading-6"
        >
          Language settings
        </Button>
        
        <Button 
          onClick={onAddPageClick} 
          className="text-white font-semibold hover:bg-primary-brand-hover outline-none focus:outline-none bg-primary-brand px-4 py-2 text-sm font-semibold leading-6 rounded-lg"
        >
          New page
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-1 h-auto hover:bg-transparent outline-none focus:outline-none focus:ring-0 text-primary" 
              aria-label="More options"
            >
              <KebabIcon size={24} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-white shadow-md border font-sans">
            <DropdownMenuItem 
              onClick={handleLanguagePublishToggle} 
              className="cursor-pointer text-sm text-primary"
            >
              {isCurrentLanguagePublished() ? 'Unpublish this language' : 'Publish this language'}
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={handleDownloadSite} 
              className="cursor-pointer text-sm text-primary"
            >
              Download entire site
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
