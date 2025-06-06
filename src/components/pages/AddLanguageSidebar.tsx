
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
      <SheetContent side="right" className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Add a new language to this website</SheetTitle>
        </SheetHeader>
        
        <div className="space-y-6 mt-6">
          <div className="space-y-2">
            <Label htmlFor="language-name">Language name:</Label>
            <Select value={languageName} onValueChange={setLanguageName}>
              <SelectTrigger>
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

          <div className="space-y-2">
            <Label htmlFor="region">Region:</Label>
            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger>
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

          <div className="space-y-2">
            <Label htmlFor="name-in-menu">Name in menu: *</Label>
            <Input
              id="name-in-menu"
              value={nameInMenu}
              onChange={(e) => setNameInMenu(e.target.value)}
              placeholder="Enter name in menu"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="which-language-visitors">Which language visitors see?:</Label>
            <Select value={whichLanguageVisitors} onValueChange={setWhichLanguageVisitors}>
              <SelectTrigger>
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="detect-by-location">Detect by location</SelectItem>
                <SelectItem value="always-this-language">Always this language</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="is-publicly-visible">Is this language publicly visible?:</Label>
            <Select value={isPubliclyVisible} onValueChange={setIsPubliclyVisible}>
              <SelectTrigger>
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="website-title">Website title:</Label>
            <Input
              id="website-title"
              value={websiteTitle}
              onChange={(e) => setWebsiteTitle(e.target.value)}
              placeholder="Enter website title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="duplicate-content">Duplicate content from:</Label>
            <Select value={duplicateContentFrom} onValueChange={setDuplicateContentFrom}>
              <SelectTrigger>
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="do-not-duplicate">Do not duplicate</SelectItem>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="estonian">Estonian</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={handleSubmit}
            className="w-full bg-[#453DFF] hover:bg-[#4A3FFF] text-white"
            disabled={!languageName || !nameInMenu}
          >
            Add language
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
