
import { useState } from "react";
import { X } from "lucide-react";
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
  const [title, setTitle] = useState("Tour");
  const [urlSlug, setUrlSlug] = useState("/tour");
  const [menuTitle, setMenuTitle] = useState("");
  const [visibleInMenu, setVisibleInMenu] = useState(true);
  const [access, setAccess] = useState("public");
  const [layout, setLayout] = useState("tour");

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full max-w-2xl bg-white p-0 border-l border-gray-200 shadow-sm rounded-none h-full overflow-y-auto">
        <SheetHeader className="p-8 pb-0">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-2xl font-medium text-gray-900">
              Page settings
            </SheetTitle>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          {/* Tabs */}
          <div className="mt-6">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab("general")}
                className={`pb-2 text-sm font-medium transition-colors ${
                  activeTab === "general"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                General
              </button>
              <button
                onClick={() => setActiveTab("seo")}
                className={`pb-2 text-sm font-medium transition-colors ${
                  activeTab === "seo"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                SEO
              </button>
            </div>
          </div>
        </SheetHeader>

        <div className="p-8 pt-6 space-y-6">
          {activeTab === "general" && (
            <>
              {/* Title */}
              <div className="py-4">
                <Label htmlFor="title" className="text-sm font-medium text-gray-900 block mb-2">
                  Title
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* URL slug */}
              <div className="py-4">
                <Label htmlFor="url-slug" className="text-sm font-medium text-gray-900 block mb-2">
                  URL slug
                </Label>
                <Input
                  id="url-slug"
                  value={urlSlug}
                  onChange={(e) => setUrlSlug(e.target.value)}
                  className="w-full"
                />
                <p className="text-sm text-gray-600 mt-1">The unique location slug for this page.</p>
              </div>

              {/* Visible in menu */}
              <div className="py-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-gray-900">
                    Visible in menu
                  </Label>
                  <Switch
                    checked={visibleInMenu}
                    onCheckedChange={setVisibleInMenu}
                  />
                </div>
              </div>

              {/* Menu title */}
              <div className="py-4">
                <Label htmlFor="menu-title" className="text-sm font-medium text-gray-600 block mb-2">
                  Menu title
                </Label>
                <Input
                  id="menu-title"
                  value={menuTitle}
                  onChange={(e) => setMenuTitle(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Access */}
              <div className="py-4">
                <Label htmlFor="access" className="text-sm font-medium text-gray-900 block mb-2">
                  Access
                </Label>
                <Select value={access} onValueChange={setAccess}>
                  <SelectTrigger className="w-full">
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
              <div className="py-4">
                <Label htmlFor="layout" className="text-sm font-medium text-gray-900 block mb-2">
                  Layout
                </Label>
                <Select value={layout} onValueChange={setLayout}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tour">Tour</SelectItem>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="blog">Blog</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Social media image */}
              <div className="py-4">
                <Label className="text-sm font-medium text-gray-900 block mb-4">
                  Social media image
                </Label>
                <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                  <div className="w-16 h-16 bg-white rounded-lg mx-auto mb-4 flex items-center justify-center shadow-sm">
                    <div className="w-6 h-6 bg-gray-300 rounded"></div>
                  </div>
                  <p className="text-sm text-gray-600 font-medium">Gallery</p>
                </div>
              </div>
            </>
          )}

          {activeTab === "seo" && (
            <div className="py-4">
              <p className="text-gray-600">SEO settings would go here...</p>
            </div>
          )}

          {/* Action buttons */}
          <div className="pt-8 flex space-x-3">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
              Save
            </Button>
            <Button variant="outline" onClick={onClose} className="px-6">
              Cancel
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
