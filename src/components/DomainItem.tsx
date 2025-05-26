
import { Lock, LockOpen, MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
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
  
  const getStatusColor = (expiryDate: string) => {
    // Only red if already expired or not registered
    if (expiryDate.includes("Expired") || expiryDate.includes("Domain is not registered")) return "text-red-600";
    return "text-gray-600";
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
    onRemoveDomain(domain.name);
    setIsRemoveModalOpen(false);
  };

  // Check if domain has pricing (to show renew option)
  const hasPricing = domain.expiry.includes("€") && !domain.expiry.includes("External") && !domain.expiry.includes("Free");

  // Show notes only for redirected domains (first domain in this case)
  const shouldShowNotes = domain.notes && domain.notes.includes("Redirected");

  const getTypeDisplay = (type: string) => {
    if (type === "Free Voog domain") return "FREE";
    return type;
  };

  return (
    <TooltipProvider delayDuration={300}>
      <TableRow className="hover:bg-gray-50">
        {/* Domain Column */}
        <TableCell>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
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
                <Badge className="bg-blue-600 text-white text-xs px-2 py-1 rounded font-medium">
                  PRIMARY
                </Badge>
              )}
            </div>
          </div>
          
          {/* Notes - only show for redirected domains */}
          {shouldShowNotes && (
            <p className="text-xs text-gray-600 mt-1">{domain.notes}</p>
          )}
        </TableCell>

        {/* Type Column */}
        <TableCell>
          <Badge variant="outline" className={getTypeColor(domain.type)}>
            {getTypeDisplay(domain.type)}
          </Badge>
        </TableCell>

        {/* Source Column */}
        <TableCell>
          <span className="text-sm text-gray-600">{domain.source}</span>
        </TableCell>

        {/* Expiry Price Column */}
        <TableCell className="text-right">
          <span className="text-sm font-medium text-gray-900">{domain.expiry}</span>
        </TableCell>

        {/* Status Column */}
        <TableCell>
          {domain.expiryDate ? (
            <span className={`text-sm ${getStatusColor(domain.expiryDate)}`}>
              {domain.expiryDate}
            </span>
          ) : (
            <span className="text-sm text-gray-400">-</span>
          )}
        </TableCell>

        {/* Actions Column */}
        <TableCell>
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
                Remove
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>

      <RemoveConfirmationModal
        isOpen={isRemoveModalOpen}
        onClose={() => setIsRemoveModalOpen(false)}
        onConfirm={handleConfirmRemove}
        domainName={domain.name}
      />
    </TooltipProvider>
  );
};
