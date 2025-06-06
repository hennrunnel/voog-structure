
import React from "react";
import { X, Trash } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface LanguageSettingsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  websiteTitle: string;
  setWebsiteTitle: (title: string) => void;
  nameInMenu: string;
  setNameInMenu: (name: string) => void;
  languageVisible: boolean;
  onLanguageVisibilityToggle: (visible: boolean) => void;
  onLanguageDelete: () => void;
  activeTab: string;
}

export const LanguageSettingsSidebar: React.FC<LanguageSettingsSidebarProps> = ({
  isOpen,
  onClose,
  websiteTitle,
  setWebsiteTitle,
  nameInMenu,
  setNameInMenu,
  languageVisible,
  onLanguageVisibilityToggle,
  onLanguageDelete,
  activeTab
}) => {
  const languageName = activeTab === "english" ? "English" : "Estonian";

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        className="w-[420px] max-w-[420px] p-0 bg-white border-l border-gray-200 shadow-lg"
        side="right"
      >
        {/* Header */}
        <div className="px-8 py-8 pb-6 border-b border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Language settings</h2>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onLanguageDelete} 
                className="text-gray-400 hover:text-gray-600 p-2" 
                aria-label="Delete language"
              >
                <Trash className="w-4 h-4" />
              </Button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                aria-label="Close language settings"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 py-6 flex-1 overflow-y-auto">
          <div className="space-y-6">
            {/* Website title */}
            <div className="flex items-center">
              <label htmlFor="website-title" className="text-sm text-[#1A1A1A] font-medium w-32 flex-shrink-0">
                Website title
              </label>
              <Input 
                id="website-title" 
                value={websiteTitle} 
                onChange={e => setWebsiteTitle(e.target.value)} 
                className="bg-[#F8F9FB] border-[#E2E2E2] rounded-lg text-sm h-10 flex-1 ml-4" 
              />
            </div>

            {/* Language name */}
            <div className="flex items-center">
              <label htmlFor="language-name" className="text-sm text-[#1A1A1A] font-medium w-32 flex-shrink-0">
                Language name
              </label>
              <Select defaultValue={activeTab}>
                <SelectTrigger className="bg-[#F8F9FB] border-[#E2E2E2] rounded-lg text-sm h-10 flex-1 ml-4" id="language-name">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="estonian">Estonian</SelectItem>
                  <SelectItem value="finnish">Finnish</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Region */}
            <div className="flex items-center">
              <label htmlFor="region" className="text-sm text-[#1A1A1A] font-medium w-32 flex-shrink-0">
                Region
              </label>
              <Select defaultValue="global">
                <SelectTrigger className="bg-[#F8F9FB] border-[#E2E2E2] rounded-lg text-sm h-10 flex-1 ml-4" id="region">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="global">Global</SelectItem>
                  <SelectItem value="europe">Europe</SelectItem>
                  <SelectItem value="north-america">North America</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Name in menu */}
            <div className="flex items-center">
              <label htmlFor="name-in-menu" className="text-sm text-[#1A1A1A] font-medium w-32 flex-shrink-0">
                Name in menu
              </label>
              <Input 
                id="name-in-menu" 
                value={nameInMenu} 
                onChange={e => setNameInMenu(e.target.value)} 
                className="bg-[#F8F9FB] border-[#E2E2E2] rounded-lg text-sm h-10 flex-1 ml-4" 
              />
            </div>

            {/* Is this language publicly visible */}
            <div className="flex items-center">
              <label htmlFor="publicly-visible" className="text-sm text-[#1A1A1A] font-medium w-32 flex-shrink-0">
                Is this language publicly visible?
              </label>
              <div className="flex-shrink-0 ml-4">
                <Switch 
                  id="publicly-visible" 
                  checked={languageVisible} 
                  onCheckedChange={onLanguageVisibilityToggle} 
                />
              </div>
            </div>

            {/* Which language visitors see */}
            <div className="flex items-center">
              <label htmlFor="visitor-language" className="text-sm text-[#1A1A1A] font-medium w-32 flex-shrink-0">
                Which language visitors see?
              </label>
              <Select defaultValue="detect-location">
                <SelectTrigger className="bg-[#F8F9FB] border-[#E2E2E2] rounded-lg text-sm h-10 flex-1 ml-4" id="visitor-language">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="detect-location">Detect by location</SelectItem>
                  <SelectItem value="browser-language">Browser language</SelectItem>
                  <SelectItem value="default">Default language</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
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
