
import React, { useState } from "react";
import { X, Trash, Check, ChevronDown } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/useTranslation";

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
  currentLanguage?: "en" | "et";
}

// Popular languages that appear at the top
const POPULAR_LANGUAGES = [
  { value: "spanish", label: "spanish" },
  { value: "french", label: "french" },
  { value: "german", label: "german" },
  { value: "english", label: "english" },
  { value: "estonian", label: "estonian" },
];

// All languages in alphabetical order
const ALL_LANGUAGES = [
  { value: "abkhazian", label: "Abkhazian", hasRegions: false },
  { value: "afar", label: "Afar", hasRegions: false },
  { value: "chinese", label: "chinese", hasRegions: false },
  { value: "dutch", label: "dutch", hasRegions: false },
  { value: "english", label: "english", hasRegions: true },
  { value: "estonian", label: "estonian", hasRegions: false },
  { value: "finnish", label: "finnish", hasRegions: false },
  { value: "french", label: "french", hasRegions: false },
  { value: "german", label: "german", hasRegions: false },
  { value: "italian", label: "italian", hasRegions: false },
  { value: "japanese", label: "Japanese", hasRegions: false },
  { value: "latvian", label: "latvian", hasRegions: false },
  { value: "lithuanian", label: "lithuanian", hasRegions: false },
  { value: "portuguese", label: "portuguese", hasRegions: false },
  { value: "russian", label: "russian", hasRegions: false },
  { value: "spanish", label: "spanish", hasRegions: true },
];

// Region options for languages that have them
const LANGUAGE_REGIONS = {
  spanish: [
    { value: "global", label: "global" },
    { value: "argentina", label: "Argentina" },
    { value: "spain", label: "Spain" },
    { value: "mexico", label: "Mexico" },
    { value: "peru", label: "Peru" },
  ],
  english: [
    { value: "global", label: "global" },
    { value: "australia", label: "Australia" },
    { value: "canada", label: "Canada" },
    { value: "new-zealand", label: "New Zealand" },
    { value: "united-kingdom", label: "United Kingdom" },
    { value: "united-states", label: "United States" },
  ],
};

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
  activeTab,
  currentLanguage = "en"
}) => {
  const { t } = useTranslation(currentLanguage);
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [languageName, setLanguageName] = useState(activeTab);
  const [region, setRegion] = useState("global");
  
  const languageDisplayName = activeTab === "english" ? t("language_options.popular_languages.english") : t("language_options.popular_languages.estonian");
  const selectedLanguage = ALL_LANGUAGES.find(lang => lang.value === languageName);
  const showRegionField = selectedLanguage?.hasRegions;

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    onLanguageDelete();
    setShowDeleteDialog(false);
  };

  const handleLanguageSelect = (value: string) => {
    setLanguageName(value);
    setRegion("global"); // Reset region when language changes
    setOpen(false);
  };

  const getLanguageLabel = (langKey: string) => {
    const translationKey = `language_options.popular_languages.${langKey}` as any;
    try {
      return t(translationKey);
    } catch {
      return langKey.charAt(0).toUpperCase() + langKey.slice(1);
    }
  };

  const getRegionLabel = (regionKey: string) => {
    if (regionKey === "global") {
      return t("regions.global");
    }
    return regionKey.charAt(0).toUpperCase() + regionKey.slice(1);
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
            <h2 className="text-xl font-semibold text-foreground">{t("language_management.settings.title")}</h2>
          </div>

          {/* Content */}
          <div className="px-6 py-6 flex-1 overflow-y-auto pb-24">
            <div className="space-y-6">
              {/* Language */}
              <div className="space-y-2">
                <Label htmlFor="language-name" className="text-sm font-medium text-foreground">
                  {t("language_management.settings.language_label")}
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
                        ? getLanguageLabel(languageName)
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
                              {getLanguageLabel(language.label)}
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
                              {getLanguageLabel(language.label)}
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
                    {t("language_management.settings.region_label")}
                  </Label>
                  <Select value={region} onValueChange={setRegion}>
                    <SelectTrigger className="w-full border-border rounded-lg">
                      <SelectValue placeholder={t("language_options.select_language_placeholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      {LANGUAGE_REGIONS[languageName as keyof typeof LANGUAGE_REGIONS]?.map((regionOption) => (
                        <SelectItem key={regionOption.value} value={regionOption.value}>
                          {getRegionLabel(regionOption.label)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Website title */}
              <div className="space-y-2">
                <Label htmlFor="website-title" className="text-sm font-medium text-foreground">
                  {t("language_management.settings.website_title_label")}
                </Label>
                <Input 
                  id="website-title" 
                  value={websiteTitle} 
                  onChange={e => setWebsiteTitle(e.target.value)} 
                  className="w-full border-border rounded-lg" 
                />
              </div>

              {/* Name in menu */}
              <div className="space-y-2">
                <Label htmlFor="name-in-menu" className="text-sm font-medium text-foreground">
                  {t("language_management.settings.name_in_menu_label")}
                </Label>
                <Input 
                  id="name-in-menu" 
                  value={nameInMenu} 
                  onChange={e => setNameInMenu(e.target.value)} 
                  className="w-full border-border rounded-lg" 
                  placeholder="e.g., EN, English"
                />
              </div>

              {/* Is this language publicly visible */}
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="publicly-visible" className="text-sm font-medium text-foreground">
                    {t("language_management.settings.publicly_visible_label")}
                  </Label>
                </div>
                <Switch 
                  id="publicly-visible" 
                  checked={languageVisible} 
                  onCheckedChange={onLanguageVisibilityToggle} 
                />
              </div>

              {/* Which language visitors see */}
              <div className="space-y-2">
                <Label htmlFor="visitor-language" className="text-sm font-medium text-foreground">
                  {t("language_management.settings.visitor_language_label")}
                </Label>
                <Select defaultValue="detect-by-location">
                  <SelectTrigger className="w-full border-border rounded-lg" id="visitor-language">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="detect-by-location">{t("regions.detect_by_location")}</SelectItem>
                    <SelectItem value="always-this">{t("regions.always_this_language")}</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground mt-2">
                  {t("language_management.settings.visitor_language_help")}
                </p>
              </div>
            </div>
          </div>

          {/* Sticky bottom row */}
          <div className="absolute bottom-0 left-0 right-0 px-6 py-6 border-t border-border bg-background flex items-center justify-between">
            <div className="flex space-x-3">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg font-medium">
                {t("language_management.settings.save_button")}
              </Button>
              <Button 
                variant="outline" 
                onClick={onClose} 
                className="px-6 py-2 rounded-lg font-medium border-border bg-background hover:bg-accent hover:text-accent-foreground"
              >
                {t("language_management.settings.cancel_button")}
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
            <AlertDialogTitle>{t("language_management.dialogs.delete_title")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("language_management.dialogs.delete_description")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row justify-start space-x-2 space-y-0">
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-destructive hover:bg-destructive/90">
              {t("language_management.dialogs.delete_button")}
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
