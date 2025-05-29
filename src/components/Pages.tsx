
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Pages = () => {
  const [activeTab, setActiveTab] = useState("estonian");

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
                  <div className="text-[#666]">
                    Language settings content will be displayed here when expanded.
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
