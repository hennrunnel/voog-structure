
import { Button } from "@/components/ui/button";

interface TranslatePageSidebarFooterProps {
  title: string;
  address: string;
  handleCreateTranslation: () => void;
}

export const TranslatePageSidebarFooter = ({
  title,
  address,
  handleCreateTranslation
}: TranslatePageSidebarFooterProps) => {
  return (
    <div className="sticky bottom-0 bg-background border-t border-border">
      <div className="px-6 py-6 flex flex-col gap-4">
        <Button 
          onClick={handleCreateTranslation}
          disabled={!title || !address}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg font-medium"
          aria-describedby={!title || !address ? "create-translation-button-help" : undefined}
        >
          Create translation
        </Button>
        
        {!title || !address ? (
          <p id="create-translation-button-help" className="sr-only">
            Please fill in both page title and address
          </p>
        ) : null}
      </div>
    </div>
  );
};
