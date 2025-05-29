
import { useState } from "react";
import { ChevronDown, Trash, Plus } from "lucide-react";
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
                <div className="flex items-center justify-between">
                  <AccordionTrigger className="text-base font-medium text-[#1A1A1A] hover:no-underline py-3 px-0 flex-1">
                    Language settings
                  </AccordionTrigger>
                  <Button
                    className="bg-[#5A4FFF] hover:bg-[#4A3FFF] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    New page
                  </Button>
                </div>
                <AccordionContent className="pb-4 pt-2">
                  <div className="relative">
                    {/* Trash icon in top-right */}
                    <div className="absolute top-0 right-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={true} // Disabled as it's the last remaining language
                        className="text-gray-400 hover:text-gray-600 p-2"
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Form fields in two-column layout */}
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4 pr-12">
                      {/* Language name */}
                      <div className="flex items-center">
                        <label className="text-sm text-[#1A1A1A] font-medium w-32 flex-shrink-0">Language name</label>
                        <Select defaultValue="english">
                          <SelectTrigger className="bg-[#F8F9FB] border-[#E2E2E2] rounded-lg text-sm h-10 flex-1">
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
                        <label className="text-sm text-[#1A1A1A] font-medium w-32 flex-shrink-0">Region</label>
                        <Select defaultValue="global">
                          <SelectTrigger className="bg-[#F8F9FB] border-[#E2E2E2] rounded-lg text-sm h-10 flex-1">
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
                        <label className="text-sm text-[#1A1A1A] font-medium w-32 flex-shrink-0">Name in menu</label>
                        <Select defaultValue="eng">
                          <SelectTrigger className="bg-[#F8F9FB] border-[#E2E2E2] rounded-lg text-sm h-10 flex-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="eng">Eng</SelectItem>
                            <SelectItem value="est">Est</SelectItem>
                            <SelectItem value="fin">Fin</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Is this language publicly visible */}
                      <div className="flex items-center">
                        <label className="text-sm text-[#1A1A1A] font-medium w-32 flex-shrink-0">Is this language publicly visible?</label>
                        <Select defaultValue="yes">
                          <SelectTrigger className="bg-[#F8F9FB] border-[#E2E2E2] rounded-lg text-sm h-10 flex-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">Yes</SelectItem>
                            <SelectItem value="no">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Which language visitors see */}
                      <div className="flex items-center">
                        <label className="text-sm text-[#1A1A1A] font-medium w-32 flex-shrink-0">Which language visitors see?</label>
                        <Select defaultValue="detect-location">
                          <SelectTrigger className="bg-[#F8F9FB] border-[#E2E2E2] rounded-lg text-sm h-10 flex-1">
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
                      <div className="flex items-center">
                        <label className="text-sm text-[#1A1A1A] font-medium w-32 flex-shrink-0">Website title</label>
                        <Select defaultValue="finn-cross">
                          <SelectTrigger className="bg-[#F8F9FB] border-[#E2E2E2] rounded-lg text-sm h-10 flex-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="finn-cross">Finn & Cross</SelectItem>
                            <SelectItem value="custom">Custom Title</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
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
