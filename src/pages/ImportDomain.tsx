
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CartBanner } from "@/components/CartBanner";

const ImportDomain = () => {
  const [domain, setDomain] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [cartItems, setCartItems] = useState<string[]>([]);

  const validateDomain = (value: string) => {
    // Basic domain validation
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
    
    if (!value.trim()) {
      setErrorMessage("");
      return false;
    }
    
    if (!domainRegex.test(value)) {
      setErrorMessage("Please enter a valid domain name (e.g., example.com)");
      return false;
    }
    
    setErrorMessage("");
    return true;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setDomain(value);
    validateDomain(value);
  };

  const handleImport = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateDomain(domain)) {
      setCartItems(prev => [...prev, domain]);
      setDomain("");
    }
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
              <Link 
                to="/" 
                className="flex items-center text-blue-600 hover:text-blue-700 mb-4 font-medium"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to all domains
              </Link>
              <h1 className="text-gray-900 text-2xl font-medium">Import external domain</h1>
            </div>
            <div className="text-gray-900 font-medium text-xl">VOOG</div>
          </div>
        </div>

        {/* Cart Banner - 992px width, centered */}
        {cartItems.length > 0 && (
          <div className="w-full mb-6" style={{ maxWidth: '992px' }}>
            <CartBanner 
              itemCount={cartItems.length} 
              onClearCart={clearCart}
            />
          </div>
        )}

        {/* Main Content Card - 992px width, centered */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm w-full" style={{ maxWidth: '992px' }}>
          <div className="p-8">
            <div className="mb-8">
              <form onSubmit={handleImport} className="space-y-4">
                <div>
                  <Label htmlFor="domain-import" className="text-gray-900 font-medium">
                    Import your domain
                  </Label>
                  <div className="mt-2 flex gap-3">
                    <Input
                      id="domain-import"
                      type="text"
                      value={domain}
                      onChange={handleInputChange}
                      placeholder="Type your domain name here..."
                      className="flex-1"
                    />
                    <button
                      type="submit"
                      disabled={!domain || !!errorMessage}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-2 rounded-md font-medium transition-colors"
                    >
                      Import
                    </button>
                  </div>
                </div>
              </form>
              
              {/* Error Message */}
              {errorMessage && (
                <div className="mt-3 text-sm text-red-600">
                  {errorMessage}
                </div>
              )}
              
              {/* Info tooltip */}
              <div className="mt-4 text-sm text-gray-600">
                💡 You must point DNS to Voog servers.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportDomain;
