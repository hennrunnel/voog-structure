
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Input } from "./ui/input";

interface UploadSslSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.5564 5.65683L5.65687 15.5563C5.26635 15.9468 5.26635 16.58 5.65687 16.9705C6.0474 17.3611 6.68056 17.3611 7.07109 16.9705L16.9706 7.07104C17.3611 6.68052 17.3611 6.04735 16.9706 5.65683C16.5801 5.2663 15.9469 5.2663 15.5564 5.65683Z" fill="#1B2124"/>
    <path d="M16.9706 15.5563L7.07106 5.65681C6.68054 5.26629 6.04737 5.26629 5.65685 5.65681C5.26632 6.04734 5.26632 6.6805 5.65685 7.07103L15.5563 16.9705C15.9469 17.361 16.58 17.361 16.9706 16.9705C17.3611 16.58 17.3611 15.9468 16.9706 15.5563Z" fill="#1B2124"/>
  </svg>
);

export const UploadSslSidebar = ({ isOpen, onClose }: UploadSslSidebarProps) => {
  const [privateKey, setPrivateKey] = useState("");
  const [certificate, setCertificate] = useState("");
  const [certificateChain, setCertificateChain] = useState("");

  const handleSave = () => {
    console.log("Uploading SSL certificate...");
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[580px] bg-white flex flex-col [&>button]:hidden font-sans">
        <div className="border-b border-gray-200 p-6 flex-shrink-0">
          <SheetHeader className="mb-0">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-[#1B2124] text-xl font-medium">
                Upload SSL certificate
              </SheetTitle>
              <button 
                onClick={onClose} 
                className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded p-1"
                aria-label="Close sidebar"
              >
                <CloseIcon />
              </button>
            </div>
          </SheetHeader>
          <p className="text-gray-600 text-sm mt-3">
            Copy the corresponding values from your SSL certificate files to the fields below.
          </p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-[#1B2124] text-xs font-medium mb-2">
                Private key
              </label>
              <Input
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
                placeholder="Copy private key"
                className="bg-white border-gray-300 text-[#1B2124] placeholder:text-gray-500 text-sm"
              />
              <p className="text-xs text-gray-600 mt-2">
                This is the private key you used to generate the SSL certificate. Most often its filename is "yourdomain_com.key".
              </p>
            </div>
            
            <div>
              <label className="block text-[#1B2124] text-xs font-medium mb-2">
                Certificate
              </label>
              <Input
                value={certificate}
                onChange={(e) => setCertificate(e.target.value)}
                placeholder="Copy certificate"
                className="bg-white border-gray-300 text-[#1B2124] placeholder:text-gray-500 text-sm"
              />
              <p className="text-xs text-gray-600 mt-2">
                This is the content of the certificate file. Most common filenames are "yourdomain_com.crt" or "ssl_certificate.crt".
              </p>
            </div>
            
            <div>
              <label className="block text-[#1B2124] text-xs font-medium mb-2">
                Certificate chain
              </label>
              <Input
                value={certificateChain}
                onChange={(e) => setCertificateChain(e.target.value)}
                placeholder="Copy certificate chain"
                className="bg-white border-gray-300 text-[#1B2124] placeholder:text-gray-500 text-sm"
              />
              <p className="text-xs text-gray-600 mt-2">
                This is the content of the certificate chain file. Most common filenames are "yourdomain_com.ca-bundle", "yourdomain_com_ssl-bundle.crt" or "IntermediateCA.crt".
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 p-6 flex-shrink-0">
          <div className="flex space-x-3">
            <button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 text-sm font-medium rounded-lg px-4 transition-colors"
            >
              Save
            </button>
            <button
              onClick={onClose}
              className="bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 py-3 text-sm font-medium rounded-lg px-4 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
