
import { PageRow } from "@/components/pages/PageRow";
import { PageItem } from "@/types/pages";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
    <div className="overflow-hidden border-t border-subtle">
      <Table>
        <TableHeader>
          <TableRow className="bg-white border-b border-subtle hover:bg-white h-12">
            <TableHead className="h-12 px-6 text-left">
              <div className="flex items-center text-xs font-medium text-muted">
                {/* Space for expand button (20px width + 8px margin) */}
                <div className="w-5 mr-2"></div>
                <span className="whitespace-nowrap">Menu title</span>
              </div>
            </TableHead>
            
            <TableHead className="h-12 px-4 text-left w-48">
              <span className="text-xs font-medium text-muted whitespace-nowrap">Slug</span>
            </TableHead>
            
            <TableHead className="h-12 px-4 text-left w-32">
              <span className="text-xs font-medium text-muted whitespace-nowrap">Layout</span>
            </TableHead>
            
            <TableHead className="h-12 px-4 text-center w-24">
              <span className="text-xs font-medium text-muted whitespace-nowrap">SEO</span>
            </TableHead>
            
            <TableHead className="h-12 px-4 text-center w-24">
              <span className="text-xs font-medium text-muted whitespace-nowrap">In menu</span>
            </TableHead>

            {/* Space for move handle */}
            <TableHead className="h-12 w-4"></TableHead>
            
            {/* Actions */}
            <TableHead className="h-12 w-6"></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
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
        </TableBody>
      </Table>
    </div>
  );
};
