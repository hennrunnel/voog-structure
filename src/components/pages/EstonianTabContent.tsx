
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PageTable } from "@/components/pages/PageTable";
import { PageItem } from "@/types/pages";

interface EstonianTabContentProps {
  onAddPageClick: () => void;
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

export const EstonianTabContent = ({
  onAddPageClick,
  pages,
  onToggleExpansion,
  onToggleVisibility,
  onDeletePage,
  onDuplicatePage,
  onAddNestedPage,
  onPageSettings,
  onEditPage,
  onTranslatePage
}: EstonianTabContentProps) => {
  return (
    <TabsContent value="estonian" className="mt-0 px-0">
      <div className="px-8 py-6">
        <Button 
          onClick={onAddPageClick}
          className="text-white font-semibold hover:bg-[#4A3FFF] focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          style={{
            padding: '8px 16px',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
            borderRadius: '8px',
            background: '#453DFF',
            color: '#FFF',
            textAlign: 'center',
            fontFamily: '"Avenir Next"',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: 600,
            lineHeight: '24px'
          }}
        >
          Add page
        </Button>
      </div>

      <PageTable
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
    </TabsContent>
  );
};
