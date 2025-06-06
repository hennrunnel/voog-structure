
import { PageRow } from "@/components/pages/PageRow";
import { PageTableMobile } from "@/components/pages/PageTableMobile";
import { PageItem } from "@/types/pages";
import { ViewMode } from "@/hooks/usePageManagement";

interface PageTableProps {
  pages: PageItem[];
  viewMode: ViewMode;
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
  viewMode,
  onToggleExpansion,
  onToggleVisibility,
  onDeletePage,
  onDuplicatePage,
  onAddNestedPage,
  onPageSettings,
  onEditPage,
  onTranslatePage
}: PageTableProps) => {
  if (viewMode === 'mobile') {
    return (
      <PageTableMobile
        pages={pages}
        onToggleExpansion={onToggleExpansion}
        onToggleVisibility={onToggleVisibility}
        onDeletePage={onDeletePage}
        onDuplicatePage={onDuplicatePage}
        onAddNestedPage={onAddNestedPage}
        onPageSettings={onPageSettings}
        onEditPage={onEditPage}
        onTranslatePage={onTranslatePage}
      />
    );
  }

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
      </div>
    </div>
  );
};
