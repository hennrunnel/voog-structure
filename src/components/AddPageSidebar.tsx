
import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

interface AddPageSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePage: (pageData: { title: string; slug: string }) => void;
  selectedLayout: string | null;
}

export const AddPageSidebar = ({ isOpen, onClose, onCreatePage, selectedLayout }: AddPageSidebarProps) => {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [layout, setLayout] = useState("2023-front-page");
  const [showInMenu, setShowInMenu] = useState(true);
  const [isLinkMode, setIsLinkMode] = useState(false);
  const [hasManuallyEditedAddress, setHasManuallyEditedAddress] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Reset form when opening
      setTitle("");
      setAddress("");
      setLayout("2023-front-page");
      setShowInMenu(true);
      setIsLinkMode(false);
      setHasManuallyEditedAddress(false);
    }
  }, [isOpen]);

  // Auto-generate address from title
  useEffect(() => {
    if (title && !hasManuallyEditedAddress && !isLinkMode) {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setAddress(slug ? `/${slug}` : "");
    }
  }, [title, hasManuallyEditedAddress, isLinkMode]);

  const handleAddressChange = (value: string) => {
    setAddress(value);
    setHasManuallyEditedAddress(true);
  };

  const handleCreatePage = () => {
    if (title && address) {
      onCreatePage({ title, slug: address });
      onClose();
    }
  };

  const toggleMode = () => {
    setIsLinkMode(!isLinkMode);
    setTitle("");
    setAddress("");
    setHasManuallyEditedAddress(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        className="w-[400px] sm:w-[540px] p-0 bg-background border-l border-border shadow-lg"
        side="right"
        role="dialog"
        aria-labelledby="add-page-title"
      >
        {/* Header */}
        <div className="px-6 py-6 border-b border-border">
          <h2 id="add-page-title" className="text-xl font-semibold text-foreground">
            {isLinkMode ? "Add a custom link" : "Add new page"}
          </h2>
        </div>

        {/* Content */}
        <div className="px-6 py-6 flex-1 overflow-y-auto">
          <div className="space-y-6">
            {/* Page title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium text-foreground">
                Page title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter page title..."
                className="w-full border-border rounded-lg"
                aria-required="true"
              />
            </div>

            {/* URL slug */}
            <div className="space-y-2">
              <Label htmlFor="address" className="text-sm font-medium text-foreground">
                {isLinkMode ? "Address" : "URL slug"}
              </Label>
              <Input
                id="address"
                value={address}
                onChange={(e) => handleAddressChange(e.target.value)}
                placeholder={isLinkMode ? "https://example.com" : "/page-slug"}
                className="w-full border-border rounded-lg"
                aria-required="true"
              />
              {!isLinkMode && (
                <p className="text-sm text-muted-foreground mt-2">
                  The unique location slug for this page.
                </p>
              )}
            </div>

            {!isLinkMode && (
              <>
                {/* Layout */}
                <div className="space-y-2">
                  <Label htmlFor="layout" className="text-sm font-medium text-foreground">
                    Layout
                  </Label>
                  <Select value={layout} onValueChange={setLayout}>
                    <SelectTrigger className="w-full border-border rounded-lg" id="layout">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2023-front-page">2023 front page</SelectItem>
                      <SelectItem value="common-page">Common page</SelectItem>
                      <SelectItem value="blog-layout">Blog layout</SelectItem>
                      <SelectItem value="shop-layout">Shop layout</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Menu title and Show in menu - using same pattern as Page Settings */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="menu-title" className="text-sm font-medium text-foreground">
                      Menu title
                    </Label>
                    <Input
                      id="menu-title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full border-border rounded-lg"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">
                      Show in menu
                    </Label>
                    <div className="flex items-center mt-4">
                      <Switch
                        checked={showInMenu}
                        onCheckedChange={setShowInMenu}
                        aria-describedby="show-in-menu-description"
                      />
                      <span className="sr-only" id="show-in-menu-description">
                        Toggle whether this page appears in the navigation menu
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Info Box - moved above the button */}
            {!isLinkMode && (
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  After creating your page, manage SEO, access, and social images in Page settings.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>

        {/* Action button - full width */}
        <div className="px-6 py-6 border-t border-border">
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
        </div>

        {/* Toggle mode link */}
        <div className="px-6 pb-6 text-center">
          <button 
            onClick={toggleMode}
            className="text-sm text-muted-foreground hover:text-foreground hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-opacity-50 rounded"
          >
            {isLinkMode ? "Add a new page instead" : "Add a link instead"}
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
