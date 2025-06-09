
import { DevControls } from "@/components/DevControls";
import { PagesHeader } from "@/components/pages/PagesHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const Upsell = () => {
  const [devControlsVisible, setDevControlsVisible] = useState<boolean>(true);

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-4 font-sans" style={{ paddingTop: devControlsVisible ? '24px' : '80px' }}>
      <div className="w-full" style={{ maxWidth: '992px' }}>
        {devControlsVisible && (
          <DevControls
            emptyState={false}
            onEmptyStateChange={() => {}}
            currentPageName="Upsell"
            onDestroy={() => setDevControlsVisible(false)}
          />
        )}
        
        <div style={{ marginBottom: '64px' }}>
          <PagesHeader />
        </div>
        
        <Card 
          className="bg-white"
          style={{
            borderRadius: '10px',
            border: '0.5px solid rgba(24, 24, 27, 0.10)',
            background: 'var(--Primary-White, #FFF)',
            boxShadow: '0px 0.5px 1px 0px var(--shadow-dark, rgba(24, 24, 27, 0.05)), 0px 2px 5px 0px rgba(0, 0, 0, 0.05), 0px 17px 17.7px 0px rgba(0, 0, 0, 0.01)',
            paddingBottom: '0px',
            marginBottom: '32px'
          }}
        >
          <CardContent className="p-0">
            <div className="w-full">
              <Tabs value="english" className="w-full">
                {/* Language Tab Header */}
                <div 
                  className="flex items-center justify-between border-b" 
                  style={{ 
                    borderColor: '#EFEFEF',
                    paddingTop: '24px',
                    paddingBottom: '12px',
                    paddingLeft: '24px',
                    paddingRight: '24px'
                  }}
                >
                  <TabsList 
                    className="h-auto p-0 bg-transparent"
                    style={{
                      display: 'flex',
                      gap: '16px'
                    }}
                  >
                    <TabsTrigger 
                      value="english" 
                      className="px-0 py-2 text-sm font-medium text-[#1B2124] bg-transparent border-b-2 border-transparent data-[state=active]:border-[#5A4FFF] data-[state=active]:bg-transparent data-[state=active]:text-[#5A4FFF] data-[state=active]:shadow-none hover:text-[#5A4FFF] rounded-none"
                      style={{
                        fontSize: '14px',
                        fontWeight: 500,
                        lineHeight: '24px'
                      }}
                    >
                      English
                    </TabsTrigger>
                  </TabsList>
                </div>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Upsell;
