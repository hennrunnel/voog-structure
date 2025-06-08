
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
import { X } from "lucide-react";

interface AddPageSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePage: (pageData: { title: string; slug: string }) => void;
  selectedLayout: string | null;
}

export const AddPageSidebar = ({ isOpen, onClose, onCreatePage, selectedLayout }: AddPageSidebarProps) => {
  const [title, setTitle] = useState("");
  const [urlSlug, setUrlSlug] = useState("");
  const [layout, setLayout] = useState("2023-front-page");
  const [visibility, setVisibility] = useState("visible-in-menu");

  useEffect(() => {
    if (isOpen) {
      // Reset form when opening
      setTitle("");
      setUrlSlug("");
      setLayout("2023-front-page");
      setVisibility("visible-in-menu");
    }
  }, [isOpen]);

  const handleCreatePage = () => {
    if (title && urlSlug) {
      onCreatePage({ title, slug: urlSlug });
      onClose();
    }
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
          <div className="flex items-center justify-between">
            <h2 id="add-page-title" className="text-xl font-semibold text-foreground">Add new page</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-opacity-50"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6 flex-1 overflow-y-auto">
          <div className="space-y-4">
            {/* Page title */}
            <div>
              <Label htmlFor="title" className="text-sm font-medium text-foreground">
                Page title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Type here..."
                className="w-full border-border rounded-lg mt-2"
                aria-required="true"
              />
            </div>

            {/* Page URL */}
            <div>
              <Label htmlFor="url-slug" className="text-sm font-medium text-foreground">
                Page URL
              </Label>
              <Input
                id="url-slug"
                value={urlSlug}
                onChange={(e) => setUrlSlug(e.target.value)}
                placeholder="/newpage"
                className="w-full border-border rounded-lg mt-2"
                aria-required="true"
              />
            </div>

            {/* Page layout */}
            <div>
              <Label htmlFor="layout" className="text-sm font-medium text-foreground">
                Page layout
              </Label>
              <Select value={layout} onValueChange={setLayout}>
                <SelectTrigger className="w-full border-border rounded-lg mt-2" id="layout">
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

            {/* Visibility */}
            <div>
              <Label htmlFor="visibility" className="text-sm font-medium text-foreground">
                Visibility
              </Label>
              <Select value={visibility} onValueChange={setVisibility}>
                <SelectTrigger className="w-full border-border rounded-lg mt-2" id="visibility">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="visible-in-menu">Show in menu</SelectItem>
                  <SelectItem value="hidden">Hidden</SelectItem>
                  <SelectItem value="visible-not-in-menu">Visible but not in menu</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="px-6 py-6 border-t border-border flex flex-col space-y-3">
          <Button 
            onClick={handleCreatePage}
            disabled={!title || !urlSlug}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            aria-describedby={!title || !urlSlug ? "create-button-help" : undefined}
          >
            Create this page
          </Button>
          
          {!title || !urlSlug ? (
            <p id="create-button-help" className="sr-only">
              Please fill in both page title and URL to create the page
            </p>
          ) : null}
          
          <div className="text-center">
            <button className="text-muted-foreground hover:text-foreground hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-opacity-50 rounded">
              Add a link instead
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
