
import { useState } from "react";
import { ChevronDown, Trash } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export const Pages = () => {
  const [activeTab, setActiveTab] = useState("estonian");
  const [isPubliclyVisible, setIsPubliclyVisible] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-12">
      <div className="w-full bg-white rounded-lg border border-gray-200 shadow-sm p-6" style={{ maxWidth: '992px' }}>
        {/* Header */}
        <h1 className="text-[28px] font-semibold text-[#1A1A1A] mb-6">Pages</h1>
        
        {/* Language Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-transparent h-auto p-0 mb-6 border-b border-gray-200 rounded-none w-full justify-start">
            <TabsTrigger 
              value="estonian" 
              className="text-base px-4 py-3 text-[#666] data-[state=active]:text-[#5A4FFF] data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#5A4FFF] data-[state=active]:shadow-none rounded-none"
            >
              Estonian
            </TabsTrigger>
            <TabsTrigger 
              value="general" 
              className="text-base px-4 py-3 text-[#666] data-[state=active]:text-[#5A4FFF] data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#5A4FFF] data-[state=active]:shadow-none rounded-none"
            >
              General
            </TabsTrigger>
          </TabsList>

          <TabsContent value="estonian" className="mt-0">
            {/* Language Settings Accordion */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="language-settings" className="border-b-0">
                <AccordionTrigger className="text-base font-medium text-[#1A1A1A] hover:no-underline py-3 px-0">
                  Language settings
                </AccordionTrigger>
                <AccordionContent className="pb-4 pt-2">
                  <div className="space-y-4">
                    {/* Language name */}
                    <div className="space-y-2">
                      <label className="text-sm text-[#1A1A1A] font-medium">Language name</label>
                      <Select defaultValue="english">
                        <SelectTrigger className="bg-[#F8F9FB] border-[#E2E2E2] rounded-lg text-sm">
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
                    <div className="space-y-2">
                      <label className="text-sm text-[#1A1A1A] font-medium">Region</label>
                      <Select defaultValue="global">
                        <SelectTrigger className="bg-[#F8F9FB] border-[#E2E2E2] rounded-lg text-sm">
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
                    <div className="space-y-2">
                      <label className="text-sm text-[#1A1A1A] font-medium">Name in menu</label>
                      <Input 
                        placeholder="Eng" 
                        className="bg-[#F8F9FB] border-[#E2E2E2] rounded-lg text-sm"
                      />
                    </div>

                    {/* Is this language publicly visible */}
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-[#1A1A1A] font-medium">Is this language publicly visible?</label>
                      <Switch 
                        checked={isPubliclyVisible}
                        onCheckedChange={setIsPubliclyVisible}
                      />
                    </div>

                    {/* Which language visitors see */}
                    <div className="space-y-2">
                      <label className="text-sm text-[#1A1A1A] font-medium">Which language visitors see?</label>
                      <Select defaultValue="detect-location">
                        <SelectTrigger className="bg-[#F8F9FB] border-[#E2E2E2] rounded-lg text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="detect-location">Detect by location</SelectItem>
                          <SelectItem value="browser-language">Browser language</SelectItem>
                          <SelectItem value="default">Default language</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Website title */}
                    <div className="space-y-2">
                      <label className="text-sm text-[#1A1A1A] font-medium">Website title</label>
                      <Input 
                        defaultValue="Finn & Cross" 
                        className="bg-[#F8F9FB] border-[#E2E2E2] rounded-lg text-sm"
                      />
                    </div>

                    {/* Delete button - right aligned */}
                    <div className="flex justify-end pt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={true} // Disabled as it's the last remaining language
                        className="text-gray-400 hover:text-gray-600 p-2"
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          <TabsContent value="general" className="mt-0">
            <div className="text-[#666]">
              General tab content will be displayed here.
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
