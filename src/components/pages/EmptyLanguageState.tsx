
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

interface EmptyLanguageStateProps {
  onAddLanguageClick: () => void;
}

export const EmptyLanguageState = ({ onAddLanguageClick }: EmptyLanguageStateProps) => {
  return (
    <div className="w-full">
      {/* Table Headers - matching PageTable structure */}
      <div className="overflow-hidden" style={{ borderTop: '1px solid #EFEFEF' }}>
        <div className="bg-white py-3" style={{ borderBottom: '1px solid #EFEFEF' }}>
          <div 
            className="flex items-center text-xs font-medium text-[#8d9091]" 
            style={{ 
              paddingLeft: '24px',
              paddingRight: '24px'
            }}
          >
            {/* Expand/collapse space + Title */}
            <div className="flex items-center mr-4" style={{ minWidth: 0, flex: 1 }}>
              {/* Space for expand button (20px width + 8px margin) */}
              <div className="w-5 mr-2"></div>
              <span>Menu title</span>
            </div>
            
            {/* Slug */}
            <div className="w-48 px-4">
              <span>Slug</span>
            </div>
            
            {/* Layout */}
            <div className="w-32 px-4">
              <span>Layout</span>
            </div>
            
            {/* SEO */}
            <div className="w-24 px-4 flex justify-center">
              <span>SEO</span>
            </div>
            
            {/* In menu */}
            <div className="w-24 px-4 flex justify-center">
              <span>In menu</span>
            </div>

            {/* Space for move handle */}
            <div className="mr-2" style={{ width: '16px' }}></div>
            
            {/* Actions */}
            <div className="w-6"></div>
          </div>
        </div>
      </div>

      {/* Empty State Content */}
      <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Languages className="w-8 h-8 text-gray-400" />
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No languages configured
        </h3>
        
        <p className="text-sm text-gray-500 mb-6 max-w-md">
          Your website doesn't have any languages set up yet. Add your first language to start creating pages and managing content for your site.
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
