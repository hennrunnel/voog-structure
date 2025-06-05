
import React, { useState } from "react";
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

const LanguageChevronIcon = ({ isExpanded }: { isExpanded: boolean }) => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 16 16" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}
    className="transition-transform duration-200 ml-2"
  >
    <path d="M5.52859 11.5286C5.26824 11.7889 5.26824 12.2111 5.52859 12.4714C5.78894 12.7317 6.21106 12.7317 6.47141 12.4714L10.4714 8.47141C10.7238 8.219 10.7326 7.81264 10.4915 7.54953L6.8248 3.54953C6.57597 3.27811 6.15426 3.25977 5.88284 3.5086C5.61143 3.75743 5.59309 4.17914 5.84192 4.45055L9.07726 7.97993L5.52859 11.5286Z" fill="#1B2124"/>
  </svg>
);

export const LanguageSettings: React.FC<LanguageSettingsProps> = ({
  websiteTitle,
  setWebsiteTitle,
  nameInMenu,
  setNameInMenu,
  languageVisible,
  onLanguageVisibilityToggle,
  onLanguageDelete
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Accordion type="single" collapsible className="w-full mb-6" onValueChange={(value) => setIsExpanded(value === "language-settings")}>
      <AccordionItem value="language-settings" className="border-b-0">
        <div className="flex items-center justify-between">
          <AccordionTrigger 
            className="hover:no-underline py-3 px-0 flex-1 flex items-center justify-start [&>svg]:hidden"
            style={{
              fontSize: '14px',
              fontWeight: 'medium',
              color: '#1A1A1A'
            }}
          >
            <span>Language settings</span>
            <LanguageChevronIcon isExpanded={isExpanded} />
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
