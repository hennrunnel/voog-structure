
import React from "react";
import { X, Trash } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
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
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const languageName = activeTab === "english" ? "English" : "Estonian";

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    onLanguageDelete();
    setShowDeleteDialog(false);
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent 
          className="w-[400px] sm:w-[540px] p-0 bg-background border-l border-border shadow-lg flex flex-col"
          side="right"
        >
          {/* Header */}
          <div className="px-6 py-6 border-b border-border">
            <h2 className="text-xl font-semibold text-foreground">Language settings</h2>
          </div>

          {/* Content */}
          <div className="px-6 py-6 flex-1 overflow-y-auto pb-24">
            <div className="space-y-6">
              {/* Basic Information Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide">Basic Information</h3>
                
                {/* Language name */}
                <div>
                  <Label htmlFor="language-name" className="text-sm font-medium text-foreground">
                    Language
                  </Label>
                  <Select defaultValue={activeTab}>
                    <SelectTrigger className="w-full bg-muted border-border rounded-lg mt-2" id="language-name">
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
                    <SelectTrigger className="w-full bg-muted border-border rounded-lg mt-2" id="region">
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
                    className="w-full bg-muted border-border rounded-lg mt-2" 
                    placeholder="e.g., EN, English"
                  />
                </div>

                {/* Website title */}
                <div>
                  <Label htmlFor="website-title" className="text-sm font-medium text-foreground">
                    Website title
                  </Label>
                  <Input 
                    id="website-title" 
                    value={websiteTitle} 
                    onChange={e => setWebsiteTitle(e.target.value)} 
                    className="w-full bg-muted border-border rounded-lg mt-2" 
                  />
                </div>
              </div>

              {/* Visibility Settings Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide">Visibility Settings</h3>
                
                {/* Is this language publicly visible */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="publicly-visible" className="text-sm font-medium text-foreground">
                      Make this language publicly visible
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      When enabled, visitors will be able to access this language version
                    </p>
                  </div>
                  <Switch 
                    id="publicly-visible" 
                    checked={languageVisible} 
                    onCheckedChange={onLanguageVisibilityToggle} 
                  />
                </div>

                {/* Which language visitors see */}
                <div>
                  <Label htmlFor="visitor-language" className="text-sm font-medium text-foreground">
                    Which language visitors see
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    How should visitors be directed to language versions?
                  </p>
                  <Select defaultValue="detect-location">
                    <SelectTrigger className="w-full bg-muted border-border rounded-lg mt-2" id="visitor-language">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="detect-location">Detect by location</SelectItem>
                      <SelectItem value="always-this">Always this language</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
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
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleDeleteClick} 
              className="text-muted-foreground hover:text-foreground p-2" 
              aria-label="Delete language"
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Language</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the {languageName} language? This action cannot be undone and will remove all content for this language.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-destructive hover:bg-destructive/90">
              Delete Language
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
