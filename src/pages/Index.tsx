
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
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-white text-3xl font-bold mb-2">Domains</h1>
            <div className="flex gap-4">
              <button className="bg-blue-800 text-white px-4 py-2 rounded-md font-medium">
                Domains
              </button>
              <button className="text-blue-100 hover:text-white px-4 py-2 rounded-md transition-colors">
                SSL certificates
              </button>
            </div>
          </div>
          <div className="text-white font-bold text-2xl">VOOG</div>
        </div>

        {/* Cart Banner */}
        {cartItems.length > 0 && (
          <CartBanner 
            itemCount={cartItems.length} 
            onClearCart={clearCart}
          />
        )}

        {/* Main Dashboard */}
        <div className="bg-white rounded-lg shadow-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Domains</h2>
            <AddNewButton onAddDomain={addToCart} />
          </div>
          
          <DomainsList onAddToCart={addToCart} />
        </div>
      </div>
    </div>
  );
};

export default Index;
