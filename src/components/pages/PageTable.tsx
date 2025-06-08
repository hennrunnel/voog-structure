
import { PageRow } from "@/components/pages/PageRow";
import { PageItem } from "@/types/pages";

interface PageTableProps {
  pages: PageItem[];
  currentLanguage: string;
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
  currentLanguage,
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
    <div className="overflow-hidden" style={{ borderTop: '1px solid #EFEFEF' }}>
      {/* Table Header */}
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

      {/* Page Rows */}
      <div role="table" aria-label="Pages list" className="text-black">
        {pages.map(page => (
          <PageRow
            key={page.id}
            page={page}
            currentLanguage={currentLanguage}
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
      </div>
    </div>
  );
};
