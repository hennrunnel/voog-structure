
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
import { Label } from "@/components/ui/label";

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
        className="w-[400px] sm:w-[540px] p-0 bg-background border-l border-border shadow-lg"
        side="right"
      >
        {/* Header */}
        <div className="px-6 py-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Language settings</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onLanguageDelete} 
              className="text-muted-foreground hover:text-foreground p-2" 
              aria-label="Delete language"
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6 flex-1 overflow-y-auto">
          <div className="space-y-4">
            {/* Website title */}
            <div>
              <Label htmlFor="website-title" className="text-sm font-medium text-foreground">
                Website title
              </Label>
              <Input 
                id="website-title" 
                value={websiteTitle} 
                onChange={e => setWebsiteTitle(e.target.value)} 
                className="w-full border-border rounded-lg mt-2" 
              />
            </div>

            {/* Language name */}
            <div>
              <Label htmlFor="language-name" className="text-sm font-medium text-foreground">
                Language name
              </Label>
              <Select defaultValue={activeTab}>
                <SelectTrigger className="w-full border-border rounded-lg mt-2" id="language-name">
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
            <div>
              <Label htmlFor="region" className="text-sm font-medium text-foreground">
                Region
              </Label>
              <Select defaultValue="global">
                <SelectTrigger className="w-full border-border rounded-lg mt-2" id="region">
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
            <div>
              <Label htmlFor="name-in-menu" className="text-sm font-medium text-foreground">
                Name in menu
              </Label>
              <Input 
                id="name-in-menu" 
                value={nameInMenu} 
                onChange={e => setNameInMenu(e.target.value)} 
                className="w-full border-border rounded-lg mt-2" 
              />
            </div>

            {/* Is this language publicly visible */}
            <div className="flex items-center justify-between">
              <Label htmlFor="publicly-visible" className="text-sm font-medium text-foreground">
                Is this language publicly visible?
              </Label>
              <Switch 
                id="publicly-visible" 
                checked={languageVisible} 
                onCheckedChange={onLanguageVisibilityToggle} 
              />
            </div>

            {/* Which language visitors see */}
            <div>
              <Label htmlFor="visitor-language" className="text-sm font-medium text-foreground">
                Which language visitors see?
              </Label>
              <Select defaultValue="detect-location">
                <SelectTrigger className="w-full border-border rounded-lg mt-2" id="visitor-language">
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
