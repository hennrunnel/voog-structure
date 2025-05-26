import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SuccessModal } from "@/components/SuccessModal";
import { DnsConfigurationPopover } from "@/components/DnsConfigurationPopover";

const ImportDomain = () => {
  const [domain, setDomain] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDnsPopover, setShowDnsPopover] = useState(false);
  const navigate = useNavigate();

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
      setShowSuccessModal(true);
    }
  };

  const handleViewDomains = () => {
    setShowSuccessModal(false);
    navigate("/");
  };

  const handleConfigureDns = () => {
    setShowSuccessModal(false);
    setShowDnsPopover(true);
  };

  const handleDnsPopoverComplete = () => {
    setShowDnsPopover(false);
    navigate(`/domain-settings?domain=${encodeURIComponent(domain)}&tab=dns`);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col items-center px-4 py-12">
        {/* Header Container - 992px width, centered */}
        <div className="w-full" style={{ maxWidth: '992px' }}>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-gray-900 text-2xl font-medium">Import external domain</h1>
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
              <form onSubmit={handleImport} className="space-y-4">
                <div>
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
                      className="bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-2 rounded-md font-medium transition-colors"
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
            </div>
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        title="Domain Successfully Imported!"
        description={`${domain} has been added to your account. Choose your next step:`}
        primaryAction={{
          label: "Configure DNS Settings",
          onClick: handleConfigureDns
        }}
        secondaryAction={{
          label: "View Domains List",
          onClick: handleViewDomains
        }}
      />

      <DnsConfigurationPopover
        isVisible={showDnsPopover}
        domainName={domain}
        onComplete={handleDnsPopoverComplete}
      />
    </div>
  );
};

export default ImportDomain;
