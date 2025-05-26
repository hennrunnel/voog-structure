
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CartBanner } from "@/components/CartBanner";

const FreeDomain = () => {
  const [subdomain, setSubdomain] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [cartItems, setCartItems] = useState<string[]>([]);

  const validateSubdomain = async (value: string) => {
    if (!value.trim()) {
      setValidationMessage("");
      return;
    }

    setIsValidating(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock validation - some subdomains are "taken"
      const takenSubdomains = ["test", "demo", "admin", "www", "mail"];
      
      if (takenSubdomains.includes(value.toLowerCase())) {
        setValidationMessage("This subdomain is already taken");
      } else {
        setValidationMessage("Great! This subdomain is available");
      }
      setIsValidating(false);
    }, 500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
    setSubdomain(value);
    
    if (value) {
      validateSubdomain(value);
    } else {
      setValidationMessage("");
    }
  };

  const handleTakeIt = () => {
    if (subdomain && validationMessage.includes("available")) {
      const domainName = `${subdomain}.voog.com`;
      setCartItems(prev => [...prev, domainName]);
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const isAvailable = validationMessage.includes("available");
  const isTaken = validationMessage.includes("taken");

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
              <h1 className="text-gray-900 text-2xl font-medium">Add free .voog.com domain</h1>
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
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg w-full text-white" style={{ maxWidth: '992px' }}>
          <div className="p-12 text-center">
            <h2 className="text-3xl font-medium mb-8">
              Add free .voog.com domain to<br />this site.
            </h2>
            
            <div className="max-w-md mx-auto">
              <div className="flex bg-white rounded-md overflow-hidden">
                <div className="flex-1 relative">
                  <Input
                    type="text"
                    value={subdomain}
                    onChange={handleInputChange}
                    placeholder="yourdomain"
                    className="border-0 rounded-none text-gray-900 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600">
                    .voog.com
                  </span>
                </div>
                <button
                  onClick={handleTakeIt}
                  disabled={!isAvailable}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-2 font-medium transition-colors"
                >
                  Take it!
                </button>
              </div>
              
              {/* Validation Message */}
              {validationMessage && (
                <div className={`mt-3 text-sm ${isAvailable ? 'text-green-200' : isTaken ? 'text-red-200' : ''}`}>
                  {validationMessage}
                </div>
              )}
              
              {isValidating && (
                <div className="mt-3 text-sm text-blue-200">
                  Checking availability...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeDomain;
