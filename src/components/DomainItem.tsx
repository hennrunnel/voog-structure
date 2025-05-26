import { Lock, LockOpen, Settings, MoreVertical, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { RemoveConfirmationModal } from "./RemoveConfirmationModal";

interface Domain {
  name: string;
  type: string;
  sslActive: boolean;
  expiry: string;
  expiryDate: string;
  notes: string;
  source: string;
  isExternal: boolean;
  isPrimary?: boolean;
}
interface DomainItemProps {
  domain: Domain;
  onAddToCart: (domain: string) => void;
  onOpenSettings: (domain: Domain) => void;
  isFirst?: boolean;
}
export const DomainItem = ({
  domain,
  onAddToCart,
  onOpenSettings,
  isFirst = false
}: DomainItemProps) => {
  const navigate = useNavigate();
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  const getTypeColor = (type: string) => {
    if (type === "COM") return "bg-blue-50 text-blue-700 border-blue-200";
    if (type === "EE") return "bg-yellow-50 text-yellow-700 border-yellow-200";
    if (type === "ORG") return "bg-green-50 text-green-700 border-green-200";
    if (type === "NET") return "bg-purple-50 text-purple-700 border-purple-200";
    if (type === "BIZ") return "bg-orange-50 text-orange-700 border-orange-200";
    return "bg-gray-50 text-gray-700 border-gray-200";
  };
  const getIconText = (type: string) => {
    if (type === "Free Voog domain") return "•";
    return type.substring(0, 3).toUpperCase();
  };
  const getExpiryDateColor = (expiryDate: string) => {
    if (expiryDate.includes("Expired") || expiryDate.includes("Domain is not registered") || expiryDate.includes("Sep") || expiryDate.toLowerCase().includes("expires")) return "text-red-600";
    return "text-gray-600";
  };

  // Check if we should show the type badge (only for domains with "free" in the type)
  const shouldShowTypeBadge = domain.type.toLowerCase().includes("free");

  // Get the source text - for free Voog domains, show as source instead of type
  const getSourceText = () => {
    if (domain.type === "Free Voog domain") {
      return "Free Voog domain";
    }
    return domain.source;
  };

  const handleSettingsClick = () => {
    navigate(`/domain-settings?domain=${encodeURIComponent(domain.name)}`);
  };

  const handleRenewClick = () => {
    onAddToCart(domain.name);
  };

  const handleRemoveClick = () => {
    setIsRemoveModalOpen(true);
  };

  const handleConfirmRemove = () => {
    console.log(`Removing domain: ${domain.name}`);
    setIsRemoveModalOpen(false);
    // Here you would typically call an API to remove the domain
  };

  // Check if domain has pricing (to show renew option)
  const hasPricing = domain.expiry.includes("€") && !domain.expiry.includes("External") && !domain.expiry.includes("Free");

  // Check if domain is about to expire (within 30 days)
  const isAboutToExpire = domain.expiryDate.toLowerCase().includes("expires") && !domain.expiryDate.toLowerCase().includes("2026");

  // Check if domain is not registered
  const isNotRegistered = domain.expiryDate.includes("Domain is not registered");

  // Check if domain is "Free Forever"
  const isFreeForever = domain.expiry === "Free forever";

  return (
    <TooltipProvider delayDuration={300}>
      <div className={`flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors ${isFirst ? 'border-t border-gray-100' : ''}`}>
        <div className="flex items-center space-x-4 flex-1">
          {/* Domain Icon */}
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-sm bg-gray-600">
            {getIconText(domain.type)}
          </div>

          {/* Domain Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3 mb-1">
              <h3 className="font-medium text-gray-900 text-base">{domain.name}</h3>
              
              {/* SSL Status with Tooltip */}
              <Tooltip>
                <TooltipTrigger asChild>
                  {domain.sslActive ? (
                    <Lock className="w-4 h-4 text-green-600 cursor-help" />
                  ) : (
                    <LockOpen className="w-4 h-4 text-red-600 cursor-help" />
                  )}
                </TooltipTrigger>
                <TooltipContent side="top" align="center">
                  <p>
                    {domain.sslActive 
                      ? "SSL certificate for this domain is valid" 
                      : "This domain does not have an SSL certificate. You can upload your own or auto-activate a free certificate in SSL certificates."
                    }
                  </p>
                </TooltipContent>
              </Tooltip>
              
              {/* Primary Badge */}
              {domain.isPrimary && (
                <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded font-medium">
                  PRIMARY
                </span>
              )}
            </div>
            
            {/* Type Badge - only show for free domains */}
            {shouldShowTypeBadge}
            
            {/* Notes */}
            {domain.notes && <p className="text-xs text-gray-600 mt-2">{domain.notes}</p>}
            
            {/* Source */}
            {getSourceText() && <p className="text-xs text-gray-500 mt-1">{getSourceText()}</p>}
          </div>
        </div>

        {/* Right Side - Expiry and Actions */}
        <div className="flex items-center space-x-4">
          <div className="text-right">
            {/* Handle not registered domains specially */}
            {isNotRegistered ? (
              <p className="text-base text-red-600">Domain is not registered</p>
            ) : (
              <>
                {domain.expiry && (
                  <p className="font-medium text-base text-gray-600">
                    {domain.expiry}
                  </p>
                )}
                {domain.expiryDate && (
                  <p className={`text-xs ${getExpiryDateColor(domain.expiryDate)}`}>
                    {domain.expiryDate}
                  </p>
                )}
              </>
            )}
          </div>
          
          {/* Kebab Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleSettingsClick}>
                Settings
              </DropdownMenuItem>
              {hasPricing && (
                <DropdownMenuItem onClick={handleRenewClick}>
                  Renew
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={handleRemoveClick} className="text-red-600 focus:text-red-600">
                <Trash2 className="w-4 h-4 mr-2 text-red-600" />
                Remove
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <RemoveConfirmationModal
        isOpen={isRemoveModalOpen}
        onClose={() => setIsRemoveModalOpen(false)}
        onConfirm={handleConfirmRemove}
        domainName={domain.name}
      />
    </TooltipProvider>
  );
};
