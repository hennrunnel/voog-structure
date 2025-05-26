
import { Lock, Settings } from "lucide-react";

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
}

export const DomainItem = ({ domain, onAddToCart }: DomainItemProps) => {
  const getTypeColor = (type: string) => {
    if (type === "COM") return "bg-blue-100 text-blue-800";
    if (type === "EE") return "bg-yellow-100 text-yellow-800";
    return "bg-gray-100 text-gray-700";
  };

  const getExpiryColor = (expiry: string) => {
    if (expiry.includes("Expired")) return "text-red-600";
    if (expiry === "External") return "text-orange-600";
    if (expiry === "Free forever") return "text-green-600";
    return "text-gray-600";
  };

  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex items-center space-x-4">
        {/* Domain Icon */}
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${
          domain.type === "COM" ? "bg-blue-500" : 
          domain.type === "EE" ? "bg-yellow-500" : "bg-gray-400"
        }`}>
          {domain.type === "COM" ? "COM" : 
           domain.type === "EE" ? "EE" : "•"}
        </div>

        {/* Domain Info */}
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <h3 className="font-bold text-gray-900">{domain.name}</h3>
            
            {/* SSL Lock */}
            {domain.sslActive && (
              <Lock className="w-4 h-4 text-green-600" />
            )}
            
            {/* Primary Badge */}
            {domain.isPrimary && (
              <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                PRIMARY
              </span>
            )}
          </div>
          
          {/* Type Badge */}
          <span className={`inline-block text-xs px-2 py-1 rounded mt-1 ${getTypeColor(domain.type)}`}>
            {domain.type === "Free Voog domain" ? "Free Voog domain" : domain.type}
          </span>
          
          {/* Notes */}
          {domain.notes && (
            <p className="text-sm text-gray-600 mt-1">{domain.notes}</p>
          )}
          
          {/* Source */}
          {domain.source && (
            <p className="text-sm text-gray-500 mt-1">{domain.source}</p>
          )}
        </div>
      </div>

      {/* Right Side - Expiry and Actions */}
      <div className="flex items-center space-x-4">
        <div className="text-right">
          {domain.expiry && (
            <p className={`font-medium ${getExpiryColor(domain.expiry)}`}>
              {domain.expiry}
            </p>
          )}
          {domain.expiryDate && (
            <p className={`text-sm ${getExpiryColor(domain.expiryDate)}`}>
              {domain.expiryDate}
            </p>
          )}
        </div>
        
        {/* Settings Icon */}
        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
