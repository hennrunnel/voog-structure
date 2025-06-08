
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface AddLanguageSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLanguage: (languageData: any) => void;
}

export const AddLanguageSidebar = ({ isOpen, onClose, onAddLanguage }: AddLanguageSidebarProps) => {
  const [languageName, setLanguageName] = useState("");
  const [region, setRegion] = useState("");
  const [nameInMenu, setNameInMenu] = useState("");
  const [whichLanguageVisitors, setWhichLanguageVisitors] = useState("");
  const [isPubliclyVisible, setIsPubliclyVisible] = useState("");
  const [websiteTitle, setWebsiteTitle] = useState("");
  const [duplicateContentFrom, setDuplicateContentFrom] = useState("");

  const handleSubmit = () => {
    if (!languageName || !nameInMenu) return;
    
    onAddLanguage({
      languageName,
      region,
      nameInMenu,
      whichLanguageVisitors,
      isPubliclyVisible: isPubliclyVisible === "Yes",
      websiteTitle,
      duplicateContentFrom
    });
    
    // Reset form
    setLanguageName("");
    setRegion("");
    setNameInMenu("");
    setWhichLanguageVisitors("");
    setIsPubliclyVisible("");
    setWebsiteTitle("");
    setDuplicateContentFrom("");
    
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        className="w-[400px] sm:w-[540px] p-0 bg-background border-l border-border shadow-lg"
        side="right"
      >
        {/* Header */}
        <div className="px-6 py-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Add a new language to this website</h2>
        </div>
        
        {/* Content */}
        <div className="px-6 py-6 flex-1 overflow-y-auto">
          <div className="space-y-4">
            <div>
              <Label htmlFor="language-name" className="text-sm font-medium text-foreground">Language name:</Label>
              <Select value={languageName} onValueChange={setLanguageName}>
                <SelectTrigger className="w-full border-border rounded-lg mt-2">
                  <SelectValue placeholder="e.g. Spanish" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                  <SelectItem value="german">German</SelectItem>
                  <SelectItem value="italian">Italian</SelectItem>
                  <SelectItem value="portuguese">Portuguese</SelectItem>
                  <SelectItem value="russian">Russian</SelectItem>
                  <SelectItem value="chinese">Chinese</SelectItem>
                  <SelectItem value="japanese">Japanese</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="region" className="text-sm font-medium text-foreground">Region:</Label>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger className="w-full border-border rounded-lg mt-2">
                  <SelectValue placeholder="e.g. Global" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="global">Global</SelectItem>
                  <SelectItem value="europe">Europe</SelectItem>
                  <SelectItem value="north-america">North America</SelectItem>
                  <SelectItem value="south-america">South America</SelectItem>
                  <SelectItem value="asia">Asia</SelectItem>
                  <SelectItem value="africa">Africa</SelectItem>
                  <SelectItem value="oceania">Oceania</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="name-in-menu" className="text-sm font-medium text-foreground">Name in menu: *</Label>
              <Input
                id="name-in-menu"
                value={nameInMenu}
                onChange={(e) => setNameInMenu(e.target.value)}
                placeholder="Enter name in menu"
                className="w-full border-border rounded-lg mt-2"
                required
              />
            </div>

            <div>
              <Label htmlFor="which-language-visitors" className="text-sm font-medium text-foreground">Which language visitors see?:</Label>
              <Select value={whichLanguageVisitors} onValueChange={setWhichLanguageVisitors}>
                <SelectTrigger className="w-full border-border rounded-lg mt-2">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="detect-by-location">Detect by location</SelectItem>
                  <SelectItem value="always-this-language">Always this language</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="is-publicly-visible" className="text-sm font-medium text-foreground">Is this language publicly visible?:</Label>
              <Select value={isPubliclyVisible} onValueChange={setIsPubliclyVisible}>
                <SelectTrigger className="w-full border-border rounded-lg mt-2">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="website-title" className="text-sm font-medium text-foreground">Website title:</Label>
              <Input
                id="website-title"
                value={websiteTitle}
                onChange={(e) => setWebsiteTitle(e.target.value)}
                placeholder="Enter website title"
                className="w-full border-border rounded-lg mt-2"
              />
            </div>

            <div>
              <Label htmlFor="duplicate-content" className="text-sm font-medium text-foreground">Duplicate content from:</Label>
              <Select value={duplicateContentFrom} onValueChange={setDuplicateContentFrom}>
                <SelectTrigger className="w-full border-border rounded-lg mt-2">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="do-not-duplicate">Do not duplicate</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="estonian">Estonian</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-6 border-t border-border">
          <Button 
            onClick={handleSubmit}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={!languageName || !nameInMenu}
          >
            Add language
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
