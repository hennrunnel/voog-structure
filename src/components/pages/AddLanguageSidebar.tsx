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
import { useTranslation } from "@/hooks/useTranslation";

interface AddLanguageSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLanguage: (languageData: any) => void;
  currentLanguage?: "en" | "et";
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

// Language translations mapping
const LANGUAGE_TRANSLATIONS = {
  spanish: { en: "Spanish", et: "Hispaania" },
  french: { en: "French", et: "Prantsuse" },
  german: { en: "German", et: "Saksa" },
  russian: { en: "Russian", et: "Vene" },
  dutch: { en: "Dutch", et: "Hollandi" },
  portuguese: { en: "Portuguese", et: "Portugali" },
  italian: { en: "Italian", et: "Itaalia" },
  finnish: { en: "Finnish", et: "Soome" },
  latvian: { en: "Latvian", et: "Läti" },
  lithuanian: { en: "Lithuanian", et: "Leedu" },
  chinese: { en: "Chinese", et: "Hiina" },
};

export const AddLanguageSidebar = ({ 
  isOpen, 
  onClose, 
  onAddLanguage, 
  currentLanguage = "en" 
}: AddLanguageSidebarProps) => {
  const { t } = useTranslation(currentLanguage);
  
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

  // Helper function to get translated language name
  const getTranslatedLanguageName = (languageKey: string) => {
    const translation = LANGUAGE_TRANSLATIONS[languageKey as keyof typeof LANGUAGE_TRANSLATIONS];
    if (translation && currentLanguage === "et") {
      return translation.et;
    }
    return ALL_LANGUAGES.find(lang => lang.value === languageKey)?.label || languageKey;
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
            <h2 className="text-xl font-semibold text-foreground">
              {t("add_language.header.title")}
            </h2>
          </div>
          
          {/* Content */}
          <div className="px-6 py-6 flex-1 overflow-y-auto pb-24">
            <div className="space-y-6">
              {/* Language name */}
              <div className="space-y-2">
                <Label htmlFor="language-name" className="text-sm font-medium text-foreground">
                  {t("add_language.form.language_label")}
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
                        ? getTranslatedLanguageName(languageName)
                        : t("language_options.select_language_placeholder")}
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
                    <Command>
                      <CommandInput placeholder={t("language_options.search_languages_placeholder")} />
                      <CommandList className="max-h-[300px] overflow-y-auto">
                        <CommandEmpty>{t("language_options.no_language_found")}</CommandEmpty>
                        <CommandGroup heading={t("language_options.popular_languages_group")}>
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
                              {getTranslatedLanguageName(language.value)}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                        <CommandSeparator />
                        <CommandGroup heading={t("language_options.all_languages_group")}>
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
                              {getTranslatedLanguageName(language.value)}
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
                    {t("add_language.form.region_label")}
                  </Label>
                  <Select value={region} onValueChange={setRegion}>
                    <SelectTrigger className="w-full border-border rounded-lg">
                      <SelectValue placeholder={t("language_options.select_language_placeholder")} />
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
                  {t("add_language.form.website_title_label")}
                </Label>
                <Input
                  id="website-title"
                  value={websiteTitle}
                  onChange={(e) => setWebsiteTitle(e.target.value)}
                  placeholder={t("add_language.form.website_title_placeholder")}
                  className="w-full border-border rounded-lg"
                />
              </div>

              {/* Name in menu */}
              <div className="space-y-2">
                <Label htmlFor="name-in-menu" className="text-sm font-medium text-foreground">
                  {t("add_language.form.name_in_menu_label")}
                </Label>
                <Input
                  id="name-in-menu"
                  value={nameInMenu}
                  onChange={(e) => setNameInMenu(e.target.value)}
                  placeholder={t("add_language.form.name_in_menu_placeholder")}
                  className="w-full border-border rounded-lg"
                  required
                />
              </div>

              {/* Is this language publicly visible */}
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="publicly-visible" className="text-sm font-medium text-foreground">
                    {t("add_language.form.publicly_visible_label")}
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
                  {t("add_language.form.visitor_language_label")}
                </Label>
                <Select value={whichLanguageVisitors} onValueChange={setWhichLanguageVisitors}>
                  <SelectTrigger className="w-full border-border rounded-lg">
                    <SelectValue placeholder={t("language_options.select_language_placeholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="detect-by-location">
                      {t("add_language.visitor_language_options.detect_by_location")}
                    </SelectItem>
                    <SelectItem value="always-this-language">
                      {t("add_language.visitor_language_options.always_this_language")}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-2">
                  {t("language_management.settings.visitor_language_help")}
                </p>
              </div>

              {/* Duplicate content from */}
              <div className="space-y-2">
                <Label htmlFor="duplicate-content" className="text-sm font-medium text-foreground">
                  {t("add_language.form.duplicate_content_label")}
                </Label>
                <Select value={duplicateContentFrom} onValueChange={setDuplicateContentFrom}>
                  <SelectTrigger className="w-full border-border rounded-lg">
                    <SelectValue placeholder={t("language_options.select_language_placeholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="do-not-duplicate">
                      {t("add_language.duplicate_content_options.do_not_duplicate")}
                    </SelectItem>
                    <SelectItem value="english">
                      {t("add_language.duplicate_content_options.english")}
                    </SelectItem>
                    <SelectItem value="estonian">
                      {t("add_language.duplicate_content_options.estonian")}
                    </SelectItem>
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
                {t("add_language.footer.add_button")}
              </Button>
              <Button 
                variant="outline" 
                onClick={onClose} 
                className="px-6 py-2 rounded-lg font-medium border-border bg-background hover:bg-accent hover:text-accent-foreground"
              >
                {t("add_language.footer.cancel_button")}
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
              {pendingVisibilityValue ? t("language_management.dialogs.enable_title") : t("language_management.dialogs.disable_title")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {pendingVisibilityValue 
                ? t("language_management.dialogs.enable_description")
                : t("language_management.dialogs.disable_description")
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
              {pendingVisibilityValue ? t("language_management.dialogs.enable_button") : t("language_management.dialogs.disable_button")}
            </AlertDialogAction>
            <AlertDialogCancel className="border border-border bg-background hover:bg-accent hover:text-accent-foreground mt-0">
              {t("language_management.dialogs.cancel_button")}
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
