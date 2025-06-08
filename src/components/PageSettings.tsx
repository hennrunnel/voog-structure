
import { useState } from "react";
import { X, Edit } from "lucide-react";
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

  const handleEditPage = () => {
    // This would open the page editor
    console.log("Opening page editor...");
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        className="w-[400px] sm:w-[540px] p-0 bg-background border-l border-border shadow-lg"
        side="right"
        role="dialog"
        aria-labelledby="page-settings-title"
      >
        {/* Header */}
        <div className="px-6 py-6 border-b border-border">
          <div className="flex items-center justify-between mb-6">
            <h2 id="page-settings-title" className="text-xl font-semibold text-foreground">Page settings</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-opacity-50"
              aria-label="Close page settings"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Edit Page Button */}
          <div className="mb-6">
            <Button 
              onClick={handleEditPage}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg font-medium flex items-center gap-2 justify-center"
            >
              <Edit className="w-4 h-4" />
              Edit page
            </Button>
          </div>
          
          {/* Tabs */}
          <div className="flex space-x-8" role="tablist">
            <button
              onClick={() => setActiveTab("general")}
              className={`pb-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-opacity-50 rounded-t ${
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
              className={`pb-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-opacity-50 rounded-t ${
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

        {/* Content */}
        <div className="px-6 py-6 flex-1 overflow-y-auto">
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
                <Label htmlFor="url-slug" className="text-sm font-medium text-foreground">
                  URL slug
                </Label>
                <Input
                  id="url-slug"
                  value={urlSlug}
                  onChange={(e) => setUrlSlug(e.target.value)}
                  className="w-full border-border rounded-lg mt-2 border-2 border-primary"
                  aria-describedby="url-slug-description"
                />
                <p id="url-slug-description" className="text-sm text-muted-foreground mt-1">The unique location slug for this page.</p>
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
                <Label className="text-sm font-medium text-foreground mb-4 block">
                  Social media image
                </Label>
                <div className="relative">
                  <img 
                    src="/lovable-uploads/01d5297b-673d-4f82-8bf5-fac4d352b073.png" 
                    alt="Social media preview" 
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button 
                    className="absolute top-2 right-2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-1.5 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                    aria-label="Remove social media image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-8 bg-white bg-opacity-80 rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-muted rounded-full"></div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
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

        {/* Action buttons */}
        <div className="px-6 py-6 border-t border-border flex space-x-3">
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
      </SheetContent>
    </Sheet>
  );
};
