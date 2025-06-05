
import React from "react";
import { Trash } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface LanguageSettingsProps {
  websiteTitle: string;
  setWebsiteTitle: (title: string) => void;
  nameInMenu: string;
  setNameInMenu: (name: string) => void;
  languageVisible: boolean;
  onLanguageVisibilityToggle: (visible: boolean) => void;
  onLanguageDelete: () => void;
}

export const LanguageSettings: React.FC<LanguageSettingsProps> = ({
  websiteTitle,
  setWebsiteTitle,
  nameInMenu,
  setNameInMenu,
  languageVisible,
  onLanguageVisibilityToggle,
  onLanguageDelete
}) => {
  return (
    <Accordion type="single" collapsible className="w-full mb-6">
      <AccordionItem value="language-settings" className="border-b-0">
        <div className="flex items-center justify-between">
          <AccordionTrigger className="text-base font-medium text-[#1A1A1A] hover:no-underline py-3 px-0 flex-1">
            Language settings
          </AccordionTrigger>
        </div>
        <AccordionContent className="pb-4 pt-2">
          {/* Trash icon in top-right */}
          <div className="absolute top-0 right-0">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onLanguageDelete} 
              className="text-gray-400 hover:text-gray-600 p-2" 
              aria-label="Delete language"
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>

          {/* Form fields in two-column layout */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 pr-12">
            {/* Website title */}
            <div className="flex items-center">
              <label htmlFor="website-title" className="text-sm text-[#1A1A1A] font-medium w-32 flex-shrink-0">
                Website title
              </label>
              <Input 
                id="website-title" 
                value={websiteTitle} 
                onChange={e => setWebsiteTitle(e.target.value)} 
                className="bg-[#F8F9FB] border-[#E2E2E2] rounded-lg text-sm h-10 flex-1" 
              />
            </div>

            {/* Language name */}
            <div className="flex items-center">
              <label htmlFor="language-name" className="text-sm text-[#1A1A1A] font-medium w-32 flex-shrink-0">
                Language name
              </label>
              <Select defaultValue="english">
                <SelectTrigger className="bg-[#F8F9FB] border-[#E2E2E2] rounded-lg text-sm h-10 flex-1" id="language-name">
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
                <SelectTrigger className="bg-[#F8F9FB] border-[#E2E2E2] rounded-lg text-sm h-10 flex-1" id="region">
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
                className="bg-[#F8F9FB] border-[#E2E2E2] rounded-lg text-sm h-10 flex-1" 
              />
            </div>

            {/* Is this language publicly visible */}
            <div className="flex items-center">
              <label htmlFor="publicly-visible" className="text-sm text-[#1A1A1A] font-medium w-32 flex-shrink-0">
                Is this language publicly visible?
              </label>
              <div className="flex-shrink-0">
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
                <SelectTrigger className="bg-[#F8F9FB] border-[#E2E2E2] rounded-lg text-sm h-10 flex-1" id="visitor-language">
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
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
