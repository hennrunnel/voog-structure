
import { useState } from "react";
import { Settings } from "lucide-react";
import { DomainsList } from "@/components/DomainsList";
import { AddNewButton } from "@/components/AddNewButton";
import { PageSettings } from "@/components/PageSettings";
import { SslCertificatesView } from "@/components/SslCertificatesView";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [isPageSettingsOpen, setIsPageSettingsOpen] = useState(false);

  const addToCart = (domain: string) => {
    setCartItems(prev => [...prev, domain]);
  };

  const removeFromCart = (domain: string) => {
    setCartItems(prev => prev.filter(item => item !== domain));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col items-center px-4 py-12">
        {/* Header Container - 992px width, centered */}
        <div className="w-full" style={{ maxWidth: '992px' }}>
          <div className="flex justify-between items-center mb-8">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <h1 className="text-gray-900 text-2xl font-medium">Domains</h1>
              </div>
            </div>
            <div className="text-gray-900 font-medium text-xl">VOOG</div>
          </div>
        </div>

        {/* Main Content Card - 992px width, centered */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm w-full" style={{ maxWidth: '992px' }}>
          <div className="p-8">
            {/* Tabs using shadcn/ui Tabs component */}
            <Tabs defaultValue="domains" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="domains">Domains</TabsTrigger>
                <TabsTrigger value="ssl">SSL certificates</TabsTrigger>
              </TabsList>

              <TabsContent value="domains">
                {/* Add New Button positioned under tabs, aligned left */}
                <div className="mb-8">
                  <AddNewButton onAddDomain={addToCart} />
                </div>
                
                <DomainsList onAddToCart={addToCart} />
              </TabsContent>

              <TabsContent value="ssl">
                <SslCertificatesView />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <PageSettings isOpen={isPageSettingsOpen} onClose={() => setIsPageSettingsOpen(false)} />
    </div>
  );
};

export default Index;
