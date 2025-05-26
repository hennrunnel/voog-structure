
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Textarea } from "./ui/textarea";

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
      <SheetContent side="right" className="w-[580px] p-0 bg-white">
        <div className="bg-blue-600 text-white p-6">
          <SheetHeader className="mb-0">
            <div className="flex items-center space-x-3">
              <button onClick={onClose} className="text-white hover:text-gray-200">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <SheetTitle className="text-white text-xl font-medium">
                Upload SSL certificate
              </SheetTitle>
            </div>
          </SheetHeader>
          <p className="text-blue-100 text-sm mt-3">
            Copy the corresponding values from your SSL certificate files to the fields below.
          </p>
        </div>
        
        <div className="p-6 flex flex-col h-full bg-white">
          <div className="flex-1 space-y-6">
            <div>
              <label className="block text-gray-900 text-sm font-medium mb-2">
                Private key
              </label>
              <Textarea
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
                placeholder="Copy private key"
                className="min-h-[120px] bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
              />
            </div>
            
            <div>
              <label className="block text-gray-900 text-sm font-medium mb-2">
                Certificate
              </label>
              <Textarea
                value={certificate}
                onChange={(e) => setCertificate(e.target.value)}
                placeholder="Copy certificate"
                className="min-h-[120px] bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
              />
            </div>
            
            <div>
              <label className="block text-gray-900 text-sm font-medium mb-2">
                Certificate chain
              </label>
              <Textarea
                value={certificateChain}
                onChange={(e) => setCertificateChain(e.target.value)}
                placeholder="Copy certificate chain"
                className="min-h-[120px] bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
              />
            </div>
          </div>
          
          <div className="border-t pt-4 mt-6">
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
        </div>
      </SheetContent>
    </Sheet>
  );
};
