
import { useState } from "react";
import { DomainsList } from "@/components/DomainsList";
import { CartBanner } from "@/components/CartBanner";
import { AddNewButton } from "@/components/AddNewButton";

const Index = () => {
  const [cartItems, setCartItems] = useState<string[]>([]);

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
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-gray-900 text-2xl font-medium mb-4">Domains</h1>
            <div className="flex gap-1">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium">
                Domains
              </button>
              <button className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-md text-sm transition-colors">
                SSL certificates
              </button>
            </div>
          </div>
          <div className="text-gray-900 font-medium text-xl">VOOG</div>
        </div>

        {/* Cart Banner */}
        {cartItems.length > 0 && (
          <div className="mb-6">
            <CartBanner 
              itemCount={cartItems.length} 
              onClearCart={clearCart}
            />
          </div>
        )}

        {/* Main Content Card - 992px width */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm" style={{ maxWidth: '992px' }}>
          <div className="p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-medium text-gray-900">Domains</h2>
              <AddNewButton onAddDomain={addToCart} />
            </div>
            
            <DomainsList onAddToCart={addToCart} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
