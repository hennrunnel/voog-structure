
import { Button } from "@/components/ui/button";

interface AddPageSidebarFooterProps {
  title: string;
  address: string;
  isLinkMode: boolean;
  handleCreatePage: () => void;
  toggleMode: () => void;
}

export const AddPageSidebarFooter = ({
  title,
  address,
  isLinkMode,
  handleCreatePage,
  toggleMode
}: AddPageSidebarFooterProps) => {
  return (
    <div className="sticky bottom-0 bg-background border-t border-border">
      {/* Action buttons - with 16px spacing */}
      <div className="px-6 py-6 flex flex-col gap-4">
        <Button 
          onClick={handleCreatePage}
          disabled={!title || !address}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg font-medium"
          aria-describedby={!title || !address ? "create-button-help" : undefined}
        >
          {isLinkMode ? "Add it" : "Create this page"}
        </Button>
        
        {!title || !address ? (
          <p id="create-button-help" className="sr-only">
            Please fill in both page title and address
          </p>
        ) : null}

        {/* Toggle mode button with outline style */}
        <Button 
          onClick={toggleMode}
          variant="outline"
          className="w-full text-sm font-normal text-muted-foreground hover:text-foreground px-3 py-2"
        >
          {isLinkMode ? "Add a new page instead" : "Add a link instead"}
        </Button>
      </div>
    </div>
  );
};
