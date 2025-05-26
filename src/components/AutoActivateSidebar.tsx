
import { useState } from "react";
import { X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Checkbox } from "./ui/checkbox";

interface AutoActivateSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (selectedDomains: string[]) => void;
}

export const AutoActivateSidebar = ({ isOpen, onClose, onSave }: AutoActivateSidebarProps) => {
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  
  const domains = [
    "developer.edicy.com",
    "voog.com", 
    "voog.co",
    "kraftal.com",
    "voog.support",
    "forum.edicy.com"
  ];

  const handleDomainToggle = (domain: string) => {
    setSelectedDomains(prev => 
      prev.includes(domain) 
        ? prev.filter(d => d !== domain)
        : [...prev, domain]
    );
  };

  const handleSave = () => {
    console.log("Activating SSL for domains:", selectedDomains);
    if (onSave) {
      onSave(selectedDomains);
    }
    setSelectedDomains([]);
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[480px] bg-white flex flex-col">
        <div className="border-b border-gray-200 p-6 flex-shrink-0">
          <SheetHeader className="mb-0">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-black text-xl font-medium">
                Auto-activate SSL certificates
              </SheetTitle>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
          </SheetHeader>
          <p className="text-gray-600 text-sm mt-3">
            Select the domains for which you want to automatically activate SSL certificates.
          </p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {domains.map((domain) => (
              <div key={domain} className="flex items-center space-x-3">
                <Checkbox
                  id={domain}
                  checked={selectedDomains.includes(domain)}
                  onCheckedChange={() => handleDomainToggle(domain)}
                />
                <label 
                  htmlFor={domain} 
                  className="text-sm text-gray-900 cursor-pointer"
                >
                  {domain}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="border-t border-gray-200 p-6 flex-shrink-0">
          <div className="flex space-x-3">
            <button
              onClick={handleSave}
              disabled={selectedDomains.length === 0}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 text-sm font-medium rounded-lg px-4 transition-colors"
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
