
import { useState } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AddNewButtonProps {
  onAddDomain: (domain: string) => void;
}

export const AddNewButton = ({ onAddDomain }: AddNewButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const options = [
    { 
      label: "Buy new", 
      action: () => {
        navigate("/buy-domain");
        setIsOpen(false);
      }
    },
    { 
      label: "Import", 
      action: () => {
        navigate("/import-domain");
        setIsOpen(false);
      }
    },
    { 
      label: "Pick a free one", 
      action: () => {
        navigate("/free-domain");
        setIsOpen(false);
      }
    }
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium flex items-center space-x-2 transition-colors text-sm"
      >
        <Plus className="w-4 h-4" />
        <span>Add new</span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute left-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-20">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  option.action();
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors text-gray-700 text-sm"
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
