
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Checkbox } from "./ui/checkbox";

interface AutoActivateSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AutoActivateSidebar = ({ isOpen, onClose }: AutoActivateSidebarProps) => {
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

  const handleSelectAll = () => {
    if (selectedDomains.length === domains.length) {
      setSelectedDomains([]);
    } else {
      setSelectedDomains(domains);
    }
  };

  const handleSave = () => {
    console.log("Activating SSL for domains:", selectedDomains);
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[480px] p-0">
        <div className="bg-green-600 text-white p-6">
          <SheetHeader className="mb-0">
            <div className="flex items-center space-x-3">
              <button onClick={onClose} className="text-white hover:text-gray-200">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <SheetTitle className="text-white text-xl font-medium">
                Auto-activate...
              </SheetTitle>
            </div>
          </SheetHeader>
        </div>
        
        <div className="p-6 flex flex-col h-full">
          <div className="flex-1">
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
                disabled={selectedDomains.length === 0}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-md transition-colors"
              >
                Activate selected
              </button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
