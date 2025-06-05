
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

const LanguageChevronIcon = ({ isExpanded }: { isExpanded: boolean }) => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}
    className="transition-transform duration-200 ml-2"
  >
    <path d="M8.29289 17.2929C7.90237 17.6834 7.90237 18.3166 8.29289 18.7071C8.68342 19.0976 9.31658 19.0976 9.70711 18.7071L15.7071 12.7071C16.0857 12.3285 16.0989 11.7189 15.7372 11.3243L10.2372 5.32428C9.86396 4.91716 9.23139 4.88965 8.82427 5.26285C8.41716 5.63604 8.38965 6.26861 8.76285 6.67572L13.6159 11.9699L8.29289 17.2929Z" fill="#1B2124"/>
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
  return (
    <Accordion type="single" collapsible className="w-full mb-6">
      <AccordionItem value="language-settings" className="border-b-0">
        <div className="flex items-center justify-between">
          <AccordionTrigger 
            className="hover:no-underline py-3 px-0 flex-1 flex items-center justify-start [&>svg]:hidden"
            style={{
              fontSize: '16px',
              fontWeight: 'medium',
              color: '#1A1A1A'
            }}
          >
            <span>Language settings</span>
            <LanguageChevronIcon isExpanded={false} />
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
