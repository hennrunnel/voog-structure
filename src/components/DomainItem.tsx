
import { Lock, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
}

export const DomainItem = ({ domain, onAddToCart, onOpenSettings }: DomainItemProps) => {
  const navigate = useNavigate();

  const getTypeColor = (type: string) => {
    if (type === "COM") return "bg-blue-50 text-blue-700 border-blue-200";
    if (type === "EE") return "bg-yellow-50 text-yellow-700 border-yellow-200";
    if (type === "ORG") return "bg-green-50 text-green-700 border-green-200";
    if (type === "NET") return "bg-purple-50 text-purple-700 border-purple-200";
    if (type === "BIZ") return "bg-orange-50 text-orange-700 border-orange-200";
    return "bg-gray-50 text-gray-700 border-gray-200";
  };

  const getIconColor = (type: string) => {
    if (type === "COM") return "bg-blue-500";
    if (type === "EE") return "bg-yellow-500";
    if (type === "ORG") return "bg-green-500";
    if (type === "NET") return "bg-purple-500";
    if (type === "BIZ") return "bg-orange-500";
    return "bg-gray-400";
  };

  const getIconText = (type: string) => {
    if (type === "Free Voog domain") return "•";
    return type.substring(0, 3).toUpperCase();
  };

  const getExpiryColor = (expiry: string) => {
    if (expiry.includes("Expired")) return "text-red-600";
    if (expiry === "External") return "text-orange-600";
    if (expiry === "Free forever") return "text-green-600";
    if (expiry === "!") return "text-red-600";
    return "text-gray-600";
  };

  const handleSettingsClick = () => {
    navigate(`/domain-settings?domain=${encodeURIComponent(domain.name)}`);
  };

  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors">
      <div className="flex items-center space-x-4">
        {/* Domain Icon */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-medium text-xs ${getIconColor(domain.type)}`}>
          {getIconText(domain.type)}
        </div>

        {/* Domain Info */}
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-1">
            <h3 className="font-medium text-gray-900 text-sm">{domain.name}</h3>
            
            {/* SSL Lock */}
            {domain.sslActive && (
              <Lock className="w-4 h-4 text-green-600" />
            )}
            
            {/* Primary Badge */}
            {domain.isPrimary && (
              <span className="bg-purple-50 text-purple-700 text-xs px-2 py-1 rounded border border-purple-200 font-medium">
                PRIMARY
              </span>
            )}
          </div>
          
          {/* Type Badge */}
          <span className={`inline-block text-xs px-2 py-1 rounded border font-medium ${getTypeColor(domain.type)}`}>
            {domain.type === "Free Voog domain" ? "Free Voog domain" : domain.type}
          </span>
          
          {/* Notes */}
          {domain.notes && (
            <p className="text-xs text-gray-600 mt-2">{domain.notes}</p>
          )}
          
          {/* Source */}
          {domain.source && (
            <p className="text-xs text-gray-500 mt-1">{domain.source}</p>
          )}
        </div>
      </div>

      {/* Right Side - Expiry and Actions */}
      <div className="flex items-center space-x-4">
        <div className="text-right">
          {domain.expiry && (
            <p className={`font-medium text-sm ${getExpiryColor(domain.expiry)}`}>
              {domain.expiry}
            </p>
          )}
          {domain.expiryDate && (
            <p className={`text-xs ${getExpiryColor(domain.expiryDate)}`}>
              {domain.expiryDate}
            </p>
          )}
        </div>
        
        {/* Settings Icon */}
        <button 
          onClick={handleSettingsClick}
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
