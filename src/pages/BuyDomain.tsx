import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { DomainSearch } from "@/components/DomainSearch";
import { DomainResults } from "@/components/DomainResults";
import { CartNotificationBar } from "@/components/CartNotificationBar";

export interface DomainResult {
  name: string;
  tld: string;
  price: string;
  status: 'available' | 'in-cart' | 'taken' | 'error';
  errorMessage?: string;
}

const BuyDomain = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<DomainResult[]>([]);
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setHasSearched(true);

    // Mock domain search results
    const mockResults: DomainResult[] = [{
      name: `${term}.at`,
      tld: "AT",
      price: "€42.00 / yr",
      status: cartItems.includes(`${term}.at`) ? 'in-cart' : 'available'
    }, {
      name: `${term}.de`,
      tld: "DE",
      price: "€33.00 / yr",
      status: cartItems.includes(`${term}.de`) ? 'in-cart' : 'available'
    }, {
      name: `${term}.ee`,
      tld: "EE",
      price: "€12.00 / yr",
      status: cartItems.includes(`${term}.ee`) ? 'in-cart' : 'available'
    }, {
      name: `${term}.es`,
      tld: "ES",
      price: "€33.00 / yr",
      status: 'taken'
    }, {
      name: `${term}.eu`,
      tld: "EU",
      price: "€32.00 / yr",
      status: cartItems.includes(`${term}.eu`) ? 'in-cart' : 'available'
    }, {
      name: `${term}.fr`,
      tld: "FR",
      price: "€26.00 / yr",
      status: 'taken'
    }, {
      name: `${term}.gr`,
      tld: "GR",
      price: "€34.00 / yr",
      status: 'error',
      errorMessage: `Could not search for ${term}.gr.`
    }];
    setSearchResults(mockResults);
  };

  const addToCart = (domain: string) => {
    setCartItems(prev => [...prev, domain]);
    setSearchResults(prev => prev.map(result => result.name === domain ? {
      ...result,
      status: 'in-cart' as const
    } : result));
    setShowNotification(true);
  };

  const removeFromCart = (domain: string) => {
    setCartItems(prev => prev.filter(item => item !== domain));
    setSearchResults(prev => prev.map(result => result.name === domain ? {
      ...result,
      status: 'available' as const
    } : result));
  };

  const clearCart = () => {
    setCartItems([]);
    setSearchResults(prev => prev.map(result => result.status === 'in-cart' ? {
      ...result,
      status: 'available' as const
    } : result));
    setShowNotification(false);
  };

  const handleCheckout = () => {
    console.log("Proceeding to checkout...");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CartNotificationBar 
        show={showNotification && cartItems.length > 0} 
        itemCount={cartItems.length} 
        onClose={() => setShowNotification(false)} 
        onCheckout={handleCheckout} 
      />
      
      <div className="flex flex-col items-center px-4 py-12">
        {/* Header Container - 992px width, centered */}
        <div className="w-full" style={{ maxWidth: '992px' }}>
          <div className="flex justify-between items-center mb-8">
            <div>
              <Link 
                to="/" 
                className="flex items-center text-gray-600 hover:text-gray-700 mb-4 font-medium"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to all domains
              </Link>
              <h1 className="text-gray-900 text-2xl font-medium">Buy domain</h1>
            </div>
            <div className="text-gray-900 font-medium text-xl">VOOG</div>
          </div>
        </div>

        {/* Main Content Card - 992px width, centered */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm w-full" style={{ maxWidth: '992px' }}>
          <div className="p-8">
            <DomainSearch onSearch={handleSearch} />
            
            {hasSearched && (
              <DomainResults 
                results={searchResults} 
                onAddToCart={addToCart} 
                onRemoveFromCart={removeFromCart} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyDomain;
