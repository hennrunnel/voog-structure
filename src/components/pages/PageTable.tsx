
import { PageRow } from "@/components/pages/PageRow";
import { PageItem } from "@/types/pages";

interface PageTableProps {
  pages: PageItem[];
  onToggleExpansion: (pageId: string) => void;
  onToggleVisibility: (pageId: string) => void;
  onDeletePage: (page: PageItem) => void;
  onDuplicatePage: (page: PageItem) => void;
  onAddNestedPage: (page: PageItem) => void;
  onPageSettings: (page: PageItem) => void;
  onEditPage: (page: PageItem) => void;
  onTranslatePage: (page: PageItem) => void;
}

export const PageTable = ({
  pages,
  onToggleExpansion,
  onToggleVisibility,
  onDeletePage,
  onDuplicatePage,
  onAddNestedPage,
  onPageSettings,
  onEditPage,
  onTranslatePage
}: PageTableProps) => {
  return (
    <div className="overflow-hidden border-t border-gray-200">
      {/* Table Header */}
      <div className="bg-white px-3 py-3 border-b border-gray-200">
        <div 
          className="flex items-center text-xs font-medium text-[#8d9091]" 
          style={{ 
            paddingLeft: '24px',
            paddingRight: '24px'
          }}
        >
          {/* Expand/collapse space + Title */}
          <div className="flex items-center mr-4" style={{ minWidth: 0, flex: 1 }}>
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
          <div className="w-24 px-4">
            <span>SEO</span>
          </div>
          
          {/* In menu */}
          <div className="w-24 px-4">
            <span>In menu</span>
          </div>
          
          {/* Actions */}
          <div className="w-16"></div>
        </div>
      </div>

      {/* Page Rows */}
      <div role="table" aria-label="Pages list">
        {pages.map(page => (
          <PageRow
            key={page.id}
            page={page}
            level={0}
            onToggleExpansion={onToggleExpansion}
            onToggleVisibility={onToggleVisibility}
            onDeletePage={onDeletePage}
            onDuplicatePage={onDuplicatePage}
            onAddNestedPage={onAddNestedPage}
            onPageSettings={onPageSettings}
            onEditPage={onEditPage}
            onTranslatePage={onTranslatePage}
          />
        ))}
        
        {/* Download entire site link */}
        <div className="px-3 py-4">
          <div className="flex justify-end" style={{ paddingRight: '12px' }}>
            <button className="text-[#5A4FFF] text-sm font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded">
              Download entire site
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
