import { useState } from "react";
import { Settings } from "lucide-react";
import { DomainsList } from "@/components/DomainsList";
import { CartBanner } from "@/components/CartBanner";
import { AddNewButton } from "@/components/AddNewButton";
import { PageSettings } from "@/components/PageSettings";
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
  return <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col items-center px-4 py-12">
        {/* Header Container - 992px width, centered */}
        <div className="w-full" style={{
        maxWidth: '992px'
      }}>
          <div className="flex justify-between items-center mb-8">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <h1 className="text-gray-900 text-2xl font-medium">Domains</h1>
                
              </div>
            </div>
            <div className="text-gray-900 font-medium text-xl">VOOG</div>
          </div>
        </div>

        {/* Cart Banner - 992px width, centered */}
        {cartItems.length > 0 && <div className="w-full mb-6" style={{
        maxWidth: '992px'
      }}>
            <CartBanner itemCount={cartItems.length} onClearCart={clearCart} />
          </div>}

        {/* Main Content Card - 992px width, centered */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm w-full" style={{
        maxWidth: '992px'
      }}>
          <div className="p-8">
            {/* Tabs moved inside the card */}
            <div className="border-b border-gray-200 mb-6">
              <div className="flex space-x-12">
                <button className="pb-4 text-sm font-medium border-b-2 text-blue-600 border-blue-600">
                  Domains
                </button>
                <button className="pb-4 text-sm font-medium border-b-2 text-gray-500 border-transparent hover:text-gray-700">
                  SSL certificates
                </button>
              </div>
            </div>

            {/* Add New Button positioned under tabs, aligned left */}
            <div className="mb-8">
              <AddNewButton onAddDomain={addToCart} />
            </div>
            
            <DomainsList onAddToCart={addToCart} />
          </div>
        </div>
      </div>

      <PageSettings isOpen={isPageSettingsOpen} onClose={() => setIsPageSettingsOpen(false)} />
    </div>;
};
export default Index;