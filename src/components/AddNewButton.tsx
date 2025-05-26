
import { useState } from "react";
import { ChevronDown, Plus } from "lucide-react";

interface AddNewButtonProps {
  onAddDomain: (domain: string) => void;
}

export const AddNewButton = ({ onAddDomain }: AddNewButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { label: "Buy new", action: () => onAddDomain("new-domain.com") },
    { label: "Import", action: () => onAddDomain("imported-domain.com") },
    { label: "Pick a free one", action: () => onAddDomain("free-domain.voog.construction") }
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium flex items-center space-x-2 transition-colors"
      >
        <Plus className="w-4 h-4" />
        <span>Add new</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-2 z-20">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  option.action();
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors text-gray-700"
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
