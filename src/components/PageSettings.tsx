
import { useState } from "react";
import { X, Edit, Copy, Trash2 } from "lucide-react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface PageSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PageSettings = ({ isOpen, onClose }: PageSettingsProps) => {
  const [activeTab, setActiveTab] = useState("general");
  const [title, setTitle] = useState("Products");
  const [urlSlug, setUrlSlug] = useState("/products");
  const [menuTitle, setMenuTitle] = useState("Home");
  const [showInMenu, setShowInMenu] = useState(true);
  const [access, setAccess] = useState("public");
  const [layout, setLayout] = useState("front-page");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDuplicateDialog, setShowDuplicateDialog] = useState(false);

  // Mock data to simulate if page has children - this would come from props in real implementation
  const pageHasChildren = false;

  const handleEditPage = () => {
    // This would open the page editor
    console.log("Opening page editor...");
  };

  const handleDuplicatePage = () => {
    setShowDuplicateDialog(true);
  };

  const handleDeletePage = () => {
    if (!pageHasChildren) {
      setShowDeleteDialog(true);
    }
  };

  const confirmDeletePage = () => {
    console.log("Deleting page...");
    setShowDeleteDialog(false);
    onClose();
  };

  const confirmDuplicatePage = () => {
    console.log("Duplicating page...");
    setShowDuplicateDialog(false);
    onClose();
  };

  return (
    <>
      <TooltipProvider>
        <Sheet open={isOpen} onOpenChange={onClose}>
          <SheetContent 
            className="w-[400px] sm:w-[540px] p-0 bg-background border-l border-border shadow-lg flex flex-col"
            side="right"
            role="dialog"
            aria-labelledby="page-settings-title"
          >
            {/* Header */}
            <div className="px-6 py-6 border-b border-border flex-shrink-0">
              <div className="flex items-center justify-between mb-6">
                <h2 id="page-settings-title" className="text-xl font-semibold text-foreground">Page settings</h2>
                <Button 
                  onClick={handleEditPage}
                  variant="ghost"
                  className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit page
                </Button>
              </div>
              
              {/* Tabs */}
              <div className="flex space-x-8" role="tablist">
                <button
                  onClick={() => setActiveTab("general")}
                  className={`pb-2 text-sm font-medium transition-colors rounded-t ${
                    activeTab === "general"
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  role="tab"
                  aria-selected={activeTab === "general"}
                  aria-controls="general-panel"
                >
                  General
                </button>
                <button
                  onClick={() => setActiveTab("seo")}
                  className={`pb-2 text-sm font-medium transition-colors rounded-t ${
                    activeTab === "seo"
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  role="tab"
                  aria-selected={activeTab === "seo"}
                  aria-controls="seo-panel"
                >
                  SEO
                </button>
              </div>
            </div>

            {/* Content - scrollable */}
            <div className="px-6 py-6 flex-1 overflow-y-auto pb-24">
              {activeTab === "general" && (
                <div id="general-panel" role="tabpanel" className="space-y-4">
                  {/* Page title */}
                  <div>
                    <Label htmlFor="title" className="text-sm font-medium text-foreground">
                      Page title
                    </Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full border-border rounded-lg mt-2"
                      aria-describedby="title-description"
                    />
                  </div>

                  {/* URL slug */}
                  <div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Label htmlFor="url-slug" className="text-sm font-medium text-foreground cursor-help">
                          URL slug
                        </Label>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs text-muted-foreground">The unique location slug for this page.</p>
                      </TooltipContent>
                    </Tooltip>
                    <Input
                      id="url-slug"
                      value={urlSlug}
                      onChange={(e) => setUrlSlug(e.target.value)}
                      className="w-full border-border rounded-lg mt-2"
                      aria-describedby="url-slug-description"
                    />
                  </div>

                  {/* Menu title and Show in menu */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="menu-title" className="text-sm font-medium text-foreground">
                        Menu title
                      </Label>
                      <Input
                        id="menu-title"
                        value={menuTitle}
                        onChange={(e) => setMenuTitle(e.target.value)}
                        className="w-full border-border rounded-lg mt-2"
                      />
                    </div>
                    
                    <div>
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

                  {/* Access */}
                  <div>
                    <Label htmlFor="access" className="text-sm font-medium text-foreground">
                      Access
                    </Label>
                    <Select value={access} onValueChange={setAccess}>
                      <SelectTrigger className="w-full border-border rounded-lg mt-2" id="access">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                        <SelectItem value="password">Password protected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Layout */}
                  <div>
                    <Label htmlFor="layout" className="text-sm font-medium text-foreground">
                      Layout
                    </Label>
                    <Select value={layout} onValueChange={setLayout}>
                      <SelectTrigger className="w-full border-border rounded-lg mt-2" id="layout">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="front-page">Front page</SelectItem>
                        <SelectItem value="common-page">Common page</SelectItem>
                        <SelectItem value="blog">Blog</SelectItem>
                        <SelectItem value="shop">Shop</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Social media image */}
                  <div>
                    <Label className="text-sm font-medium text-foreground">
                      Social media image
                    </Label>
                    <div className="relative mt-2 group">
                      <img 
                        src="/lovable-uploads/a3993143-33a0-4b8f-9cf9-3d7e86d827a7.png" 
                        alt="Social media preview" 
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <button 
                        className="absolute top-2 right-2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-1.5 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                        aria-label="Remove social media image"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      The image is usually presented when sharing the link. For example, if you post a link on Facebook, there is an image of the website.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "seo" && (
                <div id="seo-panel" role="tabpanel" className="py-4">
                  <p className="text-muted-foreground">SEO settings would go here...</p>
                </div>
              )}
            </div>

            {/* Sticky bottom row */}
            <div className="absolute bottom-0 left-0 right-0 px-6 py-6 border-t border-border bg-background flex items-center justify-between">
              <div className="flex space-x-3">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg font-medium">
                  Save
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={onClose} 
                  className="px-6 py-2 rounded-lg font-medium text-muted-foreground hover:text-foreground hover:bg-muted"
                >
                  Cancel
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleDuplicatePage} 
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
                      onClick={handleDeletePage} 
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
          </SheetContent>
        </Sheet>
      </TooltipProvider>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete page</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this page? This action cannot be undone and will remove all content for this page.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row justify-start space-x-2 space-y-0">
            <AlertDialogAction onClick={confirmDeletePage} className="bg-destructive hover:bg-destructive/90">
              Delete page
            </AlertDialogAction>
            <AlertDialogCancel className="border border-border bg-background hover:bg-accent hover:text-accent-foreground mt-0">
              Cancel
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Duplicate Confirmation Dialog */}
      <AlertDialog open={showDuplicateDialog} onOpenChange={setShowDuplicateDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Duplicate page</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to duplicate this page? This will create a copy of the page with all its content.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row justify-start space-x-2 space-y-0">
            <AlertDialogAction onClick={confirmDuplicatePage} className="bg-primary hover:bg-primary/90">
              Duplicate page
            </AlertDialogAction>
            <AlertDialogCancel className="border border-border bg-background hover:bg-accent hover:text-accent-foreground mt-0">
              Cancel
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
