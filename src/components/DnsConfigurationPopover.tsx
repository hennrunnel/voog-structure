
import { useState, useEffect } from "react";
import { Info, X } from "lucide-react";

interface DnsConfigurationPopoverProps {
  isVisible: boolean;
  domainName: string;
  onComplete: () => void;
}

export const DnsConfigurationPopover = ({ 
  isVisible, 
  domainName, 
  onComplete 
}: DnsConfigurationPopoverProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <Info className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              DNS Configuration Required
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              To complete the setup of <strong>{domainName}</strong>, you'll need to configure your DNS settings. 
              Update your domain's nameservers or DNS records to point to Voog's servers to ensure your website works properly.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4">
              <p className="text-sm text-blue-800">
                <strong>Next steps:</strong> Configure the DNS records in the settings to point your domain to Voog's hosting infrastructure.
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onComplete}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            I understand, continue
          </button>
        </div>
      </div>
    </div>
  );
};
