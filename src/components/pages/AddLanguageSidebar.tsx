
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddLanguageSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLanguage: (languageData: any) => void;
}

// Popular languages that appear at the top
const POPULAR_LANGUAGES = [
  { value: "spanish", label: "Spanish", hasRegions: true },
  { value: "french", label: "French", hasRegions: false },
  { value: "german", label: "German", hasRegions: false },
  { value: "english", label: "English", hasRegions: true },
  { value: "estonian", label: "Estonian", hasRegions: false },
];

// All languages in alphabetical order
const ALL_LANGUAGES = [
  { value: "abkhazian", label: "Abkhazian", hasRegions: false },
  { value: "afar", label: "Afar", hasRegions: false },
  { value: "chinese", label: "Chinese", hasRegions: false },
  { value: "dutch", label: "Dutch", hasRegions: false },
  { value: "english", label: "English", hasRegions: true },
  { value: "estonian", label: "Estonian", hasRegions: false },
  { value: "finnish", label: "Finnish", hasRegions: false },
  { value: "french", label: "French", hasRegions: false },
  { value: "german", label: "German", hasRegions: false },
  { value: "italian", label: "Italian", hasRegions: false },
  { value: "japanese", label: "Japanese", hasRegions: false },
  { value: "latvian", label: "Latvian", hasRegions: false },
  { value: "lithuanian", label: "Lithuanian", hasRegions: false },
  { value: "portuguese", label: "Portuguese", hasRegions: false },
  { value: "russian", label: "Russian", hasRegions: false },
  { value: "spanish", label: "Spanish", hasRegions: true },
];

// Region options for languages that have them
const LANGUAGE_REGIONS = {
  spanish: [
    { value: "global", label: "Global" },
    { value: "argentina", label: "Argentina" },
    { value: "spain", label: "Spain" },
    { value: "mexico", label: "Mexico" },
    { value: "peru", label: "Peru" },
  ],
  english: [
    { value: "global", label: "Global" },
    { value: "australia", label: "Australia" },
    { value: "canada", label: "Canada" },
    { value: "new-zealand", label: "New Zealand" },
    { value: "united-kingdom", label: "United Kingdom" },
    { value: "united-states", label: "United States" },
  ],
};

export const AddLanguageSidebar = ({ isOpen, onClose, onAddLanguage }: AddLanguageSidebarProps) => {
  const [languageName, setLanguageName] = useState("");
  const [region, setRegion] = useState("");
  const [websiteTitle, setWebsiteTitle] = useState("");
  const [nameInMenu, setNameInMenu] = useState("");
  const [isPubliclyVisible, setIsPubliclyVisible] = useState(true);
  const [whichLanguageVisitors, setWhichLanguageVisitors] = useState("detect-by-location");
  const [duplicateContentFrom, setDuplicateContentFrom] = useState("do-not-duplicate");
  const [showVisibilityDialog, setShowVisibilityDialog] = useState(false);
  const [pendingVisibilityValue, setPendingVisibilityValue] = useState(false);
  const [open, setOpen] = useState(false);

  const selectedLanguage = ALL_LANGUAGES.find(lang => lang.value === languageName);
  const showRegionField = selectedLanguage?.hasRegions;

  const handleLanguageSelect = (value: string) => {
    setLanguageName(value);
    setRegion(""); // Reset region when language changes
    setOpen(false);
  };

  const handleVisibilityToggle = (newValue: boolean) => {
    setPendingVisibilityValue(newValue);
    setShowVisibilityDialog(true);
  };

  const confirmVisibilityToggle = () => {
    setIsPubliclyVisible(pendingVisibilityValue);
    setShowVisibilityDialog(false);
  };

  const handleSubmit = () => {
    if (!languageName || !nameInMenu) return;
    
    onAddLanguage({
      languageName,
      region: showRegionField ? region : "",
      nameInMenu,
      whichLanguageVisitors,
      isPubliclyVisible,
      websiteTitle,
      duplicateContentFrom
    });
    
    // Reset form
    setLanguageName("");
    setRegion("");
    setNameInMenu("");
    setWhichLanguageVisitors("detect-by-location");
    setIsPubliclyVisible(true);
    setWebsiteTitle("");
    setDuplicateContentFrom("do-not-duplicate");
    
    onClose();
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
            <h2 className="text-xl font-semibold text-foreground">Add a new language</h2>
          </div>
          
          {/* Content */}
          <div className="px-6 py-6 flex-1 overflow-y-auto pb-24">
            <div className="space-y-6">
              {/* Language name */}
              <div className="space-y-2">
                <Label htmlFor="language-name" className="text-sm font-medium text-foreground">
                  Language
                </Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between border-border"
                    >
                      {languageName
                        ? ALL_LANGUAGES.find((language) => language.value === languageName)?.label
                        : "Select language..."}
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Search languages..." />
                      <CommandList className="max-h-[300px] overflow-y-auto">
                        <CommandEmpty>No language found.</CommandEmpty>
                        <CommandGroup heading="Popular languages">
                          {POPULAR_LANGUAGES.map((language) => (
                            <CommandItem
                              key={`popular-${language.value}`}
                              value={language.value}
                              onSelect={() => handleLanguageSelect(language.value)}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  languageName === language.value ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {language.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                        <CommandSeparator />
                        <CommandGroup heading="All languages">
                          {ALL_LANGUAGES.map((language) => (
                            <CommandItem
                              key={language.value}
                              value={language.value}
                              onSelect={() => handleLanguageSelect(language.value)}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  languageName === language.value ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {language.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Region - only show if language has regions */}
              {showRegionField && (
                <div className="space-y-2">
                  <Label htmlFor="region" className="text-sm font-medium text-foreground">
                    Region
                  </Label>
                  <Select value={region} onValueChange={setRegion}>
                    <SelectTrigger className="w-full border-border rounded-lg">
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      {LANGUAGE_REGIONS[languageName as keyof typeof LANGUAGE_REGIONS]?.map((regionOption) => (
                        <SelectItem key={regionOption.value} value={regionOption.value}>
                          {regionOption.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Website title */}
              <div className="space-y-2">
                <Label htmlFor="website-title" className="text-sm font-medium text-foreground">
                  Website title in this language
                </Label>
                <Input
                  id="website-title"
                  value={websiteTitle}
                  onChange={(e) => setWebsiteTitle(e.target.value)}
                  placeholder="Enter website title"
                  className="w-full border-border rounded-lg"
                />
              </div>

              {/* Name in menu */}
              <div className="space-y-2">
                <Label htmlFor="name-in-menu" className="text-sm font-medium text-foreground">
                  Name in menu
                </Label>
                <Input
                  id="name-in-menu"
                  value={nameInMenu}
                  onChange={(e) => setNameInMenu(e.target.value)}
                  placeholder="e.g., EN, English"
                  className="w-full border-border rounded-lg"
                  required
                />
              </div>

              {/* Is this language publicly visible */}
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="publicly-visible" className="text-sm font-medium text-foreground">
                    Is this language publicly visible?
                  </Label>
                </div>
                <Switch 
                  id="publicly-visible" 
                  checked={isPubliclyVisible} 
                  onCheckedChange={handleVisibilityToggle} 
                />
              </div>

              {/* Which language visitors see */}
              <div className="space-y-2">
                <Label htmlFor="visitor-language" className="text-sm font-medium text-foreground">
                  Which language visitors see
                </Label>
                <Select value={whichLanguageVisitors} onValueChange={setWhichLanguageVisitors}>
                  <SelectTrigger className="w-full border-border rounded-lg">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="detect-by-location">Detect by location</SelectItem>
                    <SelectItem value="always-this-language">Always this language</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-2">
                  Choose how to show the site's language: auto-detect based on location, or always use the selected one.
                </p>
              </div>

              {/* Duplicate content from */}
              <div className="space-y-2">
                <Label htmlFor="duplicate-content" className="text-sm font-medium text-foreground">
                  Duplicate content from
                </Label>
                <Select value={duplicateContentFrom} onValueChange={setDuplicateContentFrom}>
                  <SelectTrigger className="w-full border-border rounded-lg">
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

          {/* Sticky bottom row */}
          <div className="absolute bottom-0 left-0 right-0 px-6 py-6 border-t border-border bg-background flex items-center justify-between">
            <div className="flex space-x-3">
              <Button 
                onClick={handleSubmit}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg font-medium"
                disabled={!languageName || !nameInMenu}
              >
                Add language
              </Button>
              <Button 
                variant="outline" 
                onClick={onClose} 
                className="px-6 py-2 rounded-lg font-medium border-border bg-background hover:bg-accent hover:text-accent-foreground"
              >
                Cancel
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Language Visibility Dialog */}
      <AlertDialog open={showVisibilityDialog} onOpenChange={setShowVisibilityDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {pendingVisibilityValue ? 'Enable language' : 'Disable language'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {pendingVisibilityValue 
                ? 'Are you sure you want to enable this language? It will become visible to visitors.'
                : 'Are you sure you want to disable this language? It will no longer be visible to visitors.'
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row justify-end space-x-2 space-y-0">
            <AlertDialogAction 
              onClick={confirmVisibilityToggle}
              className={pendingVisibilityValue === false 
                ? "bg-destructive hover:bg-destructive/90" 
                : "bg-primary hover:bg-primary/90"
              }
            >
              {pendingVisibilityValue ? 'Enable' : 'Disable'}
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
