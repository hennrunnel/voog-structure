import { PagesHeader } from "@/components/pages/PagesHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const Upsell = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-4 font-sans" style={{ paddingTop: '80px' }}>
      <div className="w-full" style={{ maxWidth: '992px' }}>
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
            paddingBottom: '32px',
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
                    <TabsTrigger 
                      value="estonian" 
                      className="px-0 py-2 text-sm font-medium text-[#1B2124] bg-transparent border-b-2 border-transparent data-[state=active]:border-[#5A4FFF] data-[state=active]:bg-transparent data-[state=active]:text-[#5A4FFF] data-[state=active]:shadow-none hover:text-[#5A4FFF] rounded-none"
                      style={{
                        fontSize: '14px',
                        fontWeight: 500,
                        lineHeight: '24px'
                      }}
                    >
                      Estonian
                    </TabsTrigger>
                  </TabsList>
                  
                  <button 
                    className="text-sm text-[#5A4FFF] hover:underline outline-none focus:outline-none"
                    style={{ 
                      paddingBottom: '16px',
                      paddingTop: '0px',
                      fontWeight: 500
                    }}
                  >
                    Add language
                  </button>
                </div>

                {/* Upgrade Message Content */}
                <div className="flex justify-center px-6 py-6">
                  <div className="text-center" style={{ maxWidth: '800px' }}>
                    <h1 className="text-2xl font-semibold text-[#1B2124] mb-4">
                      Upgrade required
                    </h1>
                    <p className="text-[#1B2124] mb-6 leading-relaxed">
                      Your Voog Standard plan allows 3 languages. For just €22 per month you'll get 20 GB of storage, unlimited pages, users, languages, and access to developer tools for deep customization of your website.
                    </p>
                    <Button 
                      className="bg-[#5A4FFF] text-white hover:bg-[#4a3fee]"
                    >
                      Contact site admin
                    </Button>
                  </div>
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
