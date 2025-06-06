
import { PageRowMobile } from "@/components/pages/PageRowMobile";
import { PageItem } from "@/types/pages";

interface PageTableMobileProps {
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

export const PageTableMobile = ({
  pages,
  onToggleExpansion,
  onToggleVisibility,
  onDeletePage,
  onDuplicatePage,
  onAddNestedPage,
  onPageSettings,
  onEditPage,
  onTranslatePage
}: PageTableMobileProps) => {
  return (
    <div className="overflow-hidden border-t border-gray-200">
      {/* Page Rows - No header in mobile view */}
      <div role="table" aria-label="Pages list">
        {pages.map(page => (
          <PageRowMobile
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
