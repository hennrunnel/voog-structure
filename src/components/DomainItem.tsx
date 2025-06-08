
import { Lock, LockOpen, MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
  onRemoveDomain: (domainName: string) => void;
  isFirst?: boolean;
}

export const DomainItem = ({
  domain,
  onAddToCart,
  onOpenSettings,
  onRemoveDomain,
  isFirst = false
}: DomainItemProps) => {
  const getTypeColor = (type: string) => {
    if (type === "COM") return "bg-blue-50 text-blue-700 border-blue-200";
    if (type === "EE") return "bg-yellow-50 text-yellow-700 border-yellow-200";
    if (type === "ORG") return "bg-green-50 text-green-700 border-green-200";
    if (type === "NET") return "bg-purple-50 text-purple-700 border-purple-200";
    if (type === "BIZ") return "bg-orange-50 text-orange-700 border-orange-200";
    return "bg-gray-50 text-gray-700 border-gray-200";
  };
  
  const getIconText = (type: string) => {
    if (type === "Free Voog domain") return "";
    return type.substring(0, 3).toUpperCase();
  };

  const handleSettingsClick = () => {
    console.log(`Domain settings functionality simplified for: ${domain.name}`);
  };

  const handleRenewClick = () => {
    console.log(`Domain renew functionality removed for: ${domain.name}`);
  };

  const handleRemoveClick = () => {
    console.log(`Domain remove functionality simplified for: ${domain.name}`);
  };

  return (
    <TooltipProvider delayDuration={300}>
      <div className={`flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0 transition-colors ${isFirst ? 'border-t border-gray-100' : ''}`}>
        <div className="flex items-center space-x-4 flex-1">
          {/* Domain Icon */}
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-sm bg-gray-600">
            {getIconText(domain.type)}
          </div>

          {/* Domain Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3 mb-1">
              <h3 className="font-medium text-gray-900 text-sm">{domain.name}</h3>
              
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
                  <p>SSL management has been simplified</p>
                </TooltipContent>
              </Tooltip>
              
              {/* Primary Badge */}
              {domain.isPrimary && (
                <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded font-medium">
                  PRIMARY
                </span>
              )}
            </div>
            
            <p className="text-xs text-gray-500">Domain management functionality has been simplified</p>
          </div>
        </div>

        {/* Right Side - Simplified Info and Actions */}
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="font-medium text-sm text-gray-600">{domain.expiry}</p>
            {domain.expiryDate && (
              <p className="text-xs text-gray-600">{domain.expiryDate}</p>
            )}
          </div>
          
          {/* Simplified Kebab Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end"
              style={{
                borderRadius: '4px',
                padding: '8px 0'
              }}
            >
              <DropdownMenuItem 
                onClick={handleSettingsClick}
                className="cursor-pointer text-[#1B2124] transition-colors"
                style={{
                  height: '40px',
                  padding: '8px 16px',
                  fontSize: '14px',
                  lineHeight: '24px',
                  margin: '0',
                  borderRadius: '0'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#5A4FFF';
                  e.currentTarget.style.backgroundColor = 'rgba(90, 79, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#1B2124';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                Settings (simplified)
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={handleRenewClick}
                className="cursor-pointer text-[#1B2124] transition-colors"
                style={{
                  height: '40px',
                  padding: '8px 16px',
                  fontSize: '14px',
                  lineHeight: '24px',
                  margin: '0',
                  borderRadius: '0'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#5A4FFF';
                  e.currentTarget.style.backgroundColor = 'rgba(90, 79, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#1B2124';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                Renew (console log)
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={handleRemoveClick} 
                className="cursor-pointer text-red-600 transition-colors"
                style={{
                  height: '40px',
                  padding: '8px 16px',
                  fontSize: '14px',
                  lineHeight: '24px',
                  margin: '0',
                  borderRadius: '0'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#5A4FFF';
                  e.currentTarget.style.backgroundColor = 'rgba(90, 79, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#DC2626';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                Remove (console log)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </TooltipProvider>
  );
};
