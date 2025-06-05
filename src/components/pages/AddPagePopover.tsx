
import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { LayoutOption } from "@/types/pages";
import { layoutOptions } from "@/constants/pages";

interface AddPagePopoverProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onLayoutSelect: (layoutId: string) => void;
}

export const AddPagePopover: React.FC<AddPagePopoverProps> = ({
  isOpen,
  setIsOpen,
  onLayoutSelect
}) => {
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button className="bg-[#5A4FFF] hover:bg-[#4A3FFF] text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add page
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-3" align="end">
        <div className="space-y-2">
          {layoutOptions.map(option => (
            <button 
              key={option.id} 
              onClick={() => onLayoutSelect(option.id)} 
              className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" 
              aria-label={`Create ${option.title} page`}
            >
              <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-sm">
                {option.icon}
              </div>
              <span className="text-sm font-medium text-gray-900">{option.title}</span>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
