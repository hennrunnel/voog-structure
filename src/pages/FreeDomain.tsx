
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

  const handleTakeIt = (e: React.FormEvent) => {
    e.preventDefault();
    if (subdomain && validationMessage.includes("available")) {
      const domainName = `${subdomain}.voog.com`;
      setCartItems(prev => [...prev, domainName]);
    }
  };

  const isAvailable = validationMessage.includes("available");
  const isTaken = validationMessage.includes("taken");

  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col items-center px-4 py-12">
        {/* Header Container - 992px width, centered */}
        <div className="w-full" style={{ maxWidth: '992px' }}>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-gray-900 text-2xl font-medium">Add free .voog.com domain</h1>
            </div>
            <div className="text-gray-900 font-medium text-xl">VOOG</div>
          </div>
        </div>

        {/* Main Content Card - 992px width, centered */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm w-full" style={{ maxWidth: '992px' }}>
          <div className="p-8">
            {/* Tabs with back navigation */}
            <div className="border-b border-gray-200 mb-6">
              <div className="flex space-x-12">
                <Link to="/" className="pb-4 text-sm font-medium border-b-2 text-gray-900 border-gray-900 flex items-center">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Domains
                </Link>
              </div>
            </div>

            <div className="mb-8">
              <form onSubmit={handleTakeIt} className="space-y-4">
                <div>
                  <div className="mt-2 flex gap-3">
                    <div className="flex-1 relative">
                      <Input 
                        id="subdomain-search" 
                        type="text" 
                        value={subdomain} 
                        onChange={handleInputChange} 
                        placeholder="yourdomain" 
                        className="pr-20" 
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600">
                        .voog.com
                      </span>
                    </div>
                    <button 
                      type="submit" 
                      disabled={!isAvailable} 
                      className="bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-2 rounded-md font-medium transition-colors"
                    >
                      Take it!
                    </button>
                  </div>
                </div>
              </form>
              
              {/* Validation Message */}
              {validationMessage && (
                <div className={`mt-3 text-sm ${isAvailable ? 'text-green-600' : isTaken ? 'text-red-600' : ''}`}>
                  {validationMessage}
                </div>
              )}
              
              {isValidating && (
                <div className="mt-3 text-sm text-gray-600">
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
