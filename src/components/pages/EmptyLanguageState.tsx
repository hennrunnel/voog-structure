
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

interface EmptyLanguageStateProps {
  onAddLanguageClick: () => void;
}

export const EmptyLanguageState = ({ onAddLanguageClick }: EmptyLanguageStateProps) => {
  return (
    <div className="w-full">
      {/* Empty State Content */}
      <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Languages className="w-8 h-8 text-gray-400" />
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No languages yet
        </h3>
        
        <p className="text-sm text-gray-500 mb-6 max-w-md">
          Add your first language to start creating pages and managing content.
        </p>
        
        <Button 
          onClick={onAddLanguageClick}
          className="text-white font-semibold hover:bg-[#4A3FFF]" 
          style={{
            padding: '12px 24px',
            borderRadius: '8px',
            background: '#453DFF',
            color: '#FFF',
            fontSize: '14px',
            fontWeight: 600,
            lineHeight: '24px'
          }}
        >
          Add your first language
        </Button>
      </div>
    </div>
  );
};
