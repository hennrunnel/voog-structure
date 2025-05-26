
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { DomainSearch } from "@/components/DomainSearch";
import { DomainResults } from "@/components/DomainResults";
import { CartBanner } from "@/components/CartBanner";

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

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setHasSearched(true);
    
    // Mock domain search results
    const mockResults: DomainResult[] = [
      {
        name: `${term}.at`,
        tld: "AT",
        price: "€42.00 / yr",
        status: cartItems.includes(`${term}.at`) ? 'in-cart' : 'available'
      },
      {
        name: `${term}.de`,
        tld: "DE", 
        price: "€33.00 / yr",
        status: cartItems.includes(`${term}.de`) ? 'in-cart' : 'available'
      },
      {
        name: `${term}.ee`,
        tld: "EE",
        price: "€12.00 / yr", 
        status: cartItems.includes(`${term}.ee`) ? 'in-cart' : 'available'
      },
      {
        name: `${term}.es`,
        tld: "ES",
        price: "€33.00 / yr",
        status: 'taken'
      },
      {
        name: `${term}.eu`,
        tld: "EU",
        price: "€32.00 / yr",
        status: cartItems.includes(`${term}.eu`) ? 'in-cart' : 'available'
      },
      {
        name: `${term}.fr`,
        tld: "FR", 
        price: "€26.00 / yr",
        status: 'taken'
      },
      {
        name: `${term}.gr`,
        tld: "GR",
        price: "€34.00 / yr",
        status: 'error',
        errorMessage: `Could not search for ${term}.gr.`
      }
    ];
    
    setSearchResults(mockResults);
  };

  const addToCart = (domain: string) => {
    setCartItems(prev => [...prev, domain]);
    setSearchResults(prev => 
      prev.map(result => 
        result.name === domain 
          ? { ...result, status: 'in-cart' as const }
          : result
      )
    );
  };

  const removeFromCart = (domain: string) => {
    setCartItems(prev => prev.filter(item => item !== domain));
    setSearchResults(prev => 
      prev.map(result => 
        result.name === domain 
          ? { ...result, status: 'available' as const }
          : result
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setSearchResults(prev => 
      prev.map(result => 
        result.status === 'in-cart' 
          ? { ...result, status: 'available' as const }
          : result
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <Link 
              to="/" 
              className="flex items-center text-blue-600 hover:text-blue-700 mb-4 font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to all domains
            </Link>
            <h1 className="text-gray-900 text-2xl font-medium">Buy Domain</h1>
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

        {/* Main Content Card */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm" style={{ maxWidth: '992px' }}>
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
