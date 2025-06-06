
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
        className="w-[420px] max-w-[420px] p-0 bg-white border-l border-gray-200 shadow-lg"
        side="right"
        role="dialog"
        aria-labelledby="page-settings-title"
      >
        {/* Header */}
        <div className="px-8 py-8 pb-6 border-b border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 id="page-settings-title" className="text-2xl font-semibold text-gray-900">Page settings</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              aria-label="Close page settings"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Edit Page Button */}
          <div className="mb-6">
            <Button 
              onClick={handleEditPage}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 justify-center"
            >
              <Edit className="w-4 h-4" />
              Edit page
            </Button>
          </div>
          
          {/* Tabs */}
          <div className="flex space-x-8" role="tablist">
            <button
              onClick={() => setActiveTab("general")}
              className={`pb-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-t ${
                activeTab === "general"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              role="tab"
              aria-selected={activeTab === "general"}
              aria-controls="general-panel"
            >
              General
            </button>
            <button
              onClick={() => setActiveTab("seo")}
              className={`pb-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-t ${
                activeTab === "seo"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
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
        <div className="px-8 py-6 flex-1 overflow-y-auto">
          {activeTab === "general" && (
            <div id="general-panel" role="tabpanel" className="space-y-6">
              {/* Page title */}
              <div>
                <Label htmlFor="title" className="text-sm font-medium text-[#1A1A1A] block mb-2">
                  Page title
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border-[#E2E2E2] rounded-lg px-3 py-2.5"
                  aria-describedby="title-description"
                />
              </div>

              {/* URL slug */}
              <div>
                <Label htmlFor="url-slug" className="text-sm font-medium text-[#1A1A1A] block mb-2">
                  URL slug
                </Label>
                <Input
                  id="url-slug"
                  value={urlSlug}
                  onChange={(e) => setUrlSlug(e.target.value)}
                  className="w-full border-[#E2E2E2] rounded-lg px-3 py-2.5 border-2 border-blue-500"
                  aria-describedby="url-slug-description"
                />
                <p id="url-slug-description" className="text-sm text-gray-600 mt-1">The unique location slug for this page.</p>
              </div>

              {/* Menu title and Show in menu */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="menu-title" className="text-sm font-medium text-[#1A1A1A] block mb-2">
                    Menu title
                  </Label>
                  <Input
                    id="menu-title"
                    value={menuTitle}
                    onChange={(e) => setMenuTitle(e.target.value)}
                    className="w-full border-[#E2E2E2] rounded-lg px-3 py-2.5"
                  />
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-[#1A1A1A] block mb-2">
                    Show in menu
                  </Label>
                  <div className="flex items-center mt-4">
                    <Switch
                      checked={showInMenu}
                      onCheckedChange={setShowInMenu}
                      className="data-[state=checked]:bg-blue-600"
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
                <Label htmlFor="access" className="text-sm font-medium text-[#1A1A1A] block mb-2">
                  Access
                </Label>
                <Select value={access} onValueChange={setAccess}>
                  <SelectTrigger className="w-full border-[#E2E2E2] rounded-lg px-3 py-2.5" id="access">
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
                <Label htmlFor="layout" className="text-sm font-medium text-[#1A1A1A] block mb-2">
                  Layout
                </Label>
                <Select value={layout} onValueChange={setLayout}>
                  <SelectTrigger className="w-full border-[#E2E2E2] rounded-lg px-3 py-2.5" id="layout">
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
                <Label className="text-sm font-medium text-[#1A1A1A] block mb-4">
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
                      <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  The image is usually presented when sharing the link. For example, if you post a link on Facebook, there is an image of the website.
                </p>
              </div>
            </div>
          )}

          {activeTab === "seo" && (
            <div id="seo-panel" role="tabpanel" className="py-4">
              <p className="text-gray-600">SEO settings would go here...</p>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="px-8 py-6 border-t border-gray-100 flex space-x-3">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Save
          </Button>
          <Button 
            variant="ghost" 
            onClick={onClose} 
            className="px-6 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          >
            Cancel
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
