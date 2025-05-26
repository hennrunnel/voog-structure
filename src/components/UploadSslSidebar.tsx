
import { useState } from "react";
import { X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Input } from "./ui/input";

interface UploadSslSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

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
      <SheetContent side="right" className="w-[580px] bg-white flex flex-col">
        <div className="border-b border-gray-200 p-6 flex-shrink-0">
          <SheetHeader className="mb-0">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-black text-xl font-medium">
                Upload SSL certificate
              </SheetTitle>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
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
              <label className="block text-gray-900 text-sm font-medium mb-2">
                Private key
              </label>
              <Input
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
                placeholder="Copy private key"
                className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
              />
              <p className="text-xs text-gray-600 mt-2">
                This is the private key you used to generate the SSL certificate. Most often its filename is "yourdomain_com.key".
              </p>
            </div>
            
            <div>
              <label className="block text-gray-900 text-sm font-medium mb-2">
                Certificate
              </label>
              <Input
                value={certificate}
                onChange={(e) => setCertificate(e.target.value)}
                placeholder="Copy certificate"
                className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
              />
              <p className="text-xs text-gray-600 mt-2">
                This is the content of the certificate file. Most common filenames are "yourdomain_com.crt" or "ssl_certificate.crt".
              </p>
            </div>
            
            <div>
              <label className="block text-gray-900 text-sm font-medium mb-2">
                Certificate chain
              </label>
              <Input
                value={certificateChain}
                onChange={(e) => setCertificateChain(e.target.value)}
                placeholder="Copy certificate chain"
                className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
              />
              <p className="text-xs text-gray-600 mt-2">
                This is the content of the certificate chain file. Most common filenames are "yourdomain_com.ca-bundle", "yourdomain_com_ssl-bundle.crt" or "IntermediateCA.crt".
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 p-6 flex-shrink-0">
          <div className="flex justify-between space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
