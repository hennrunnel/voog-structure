
import { Copy, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useTranslation } from "@/hooks/useTranslation";

interface PageSettingsFooterProps {
  onClose: () => void;
  onDuplicatePage: () => void;
  onDeletePage: () => void;
  pageHasChildren: boolean;
  currentLanguage?: "en" | "et";
}

export const PageSettingsFooter = ({
  onClose,
  onDuplicatePage,
  onDeletePage,
  pageHasChildren,
  currentLanguage = "en"
}: PageSettingsFooterProps) => {
  const { t } = useTranslation(currentLanguage);

  return (
    <div className="absolute bottom-0 left-0 right-0 px-6 py-6 border-t border-border bg-background flex items-center justify-between">
      <div className="flex space-x-3">
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg font-medium">
          {t("page_settings.general_tab.save_button")}
        </Button>
        <Button 
          variant="ghost" 
          onClick={onClose} 
          className="px-6 py-2 rounded-lg font-medium text-muted-foreground hover:text-foreground hover:bg-muted"
        >
          {t("page_settings.general_tab.cancel_button")}
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onDuplicatePage} 
              className="text-muted-foreground hover:text-foreground p-2" 
              aria-label="Duplicate page"
            >
              <Copy className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">Duplicate page</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onDeletePage} 
              disabled={pageHasChildren}
              className="text-muted-foreground hover:text-foreground p-2 disabled:opacity-50 disabled:cursor-not-allowed" 
              aria-label="Delete page"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">
              {pageHasChildren 
                ? "Cannot delete page with sub-pages. Delete or move sub-pages first." 
                : "Delete page"
              }
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};
