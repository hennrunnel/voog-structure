
import { useState } from "react";
import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PageSettingsProps } from "@/types/pageSettings";
import { PageSettingsHeader } from "./pageSettings/PageSettingsHeader";
import { GeneralTabContent } from "./pageSettings/GeneralTabContent";
import { SeoTabContent } from "./pageSettings/SeoTabContent";
import { PageSettingsFooter } from "./pageSettings/PageSettingsFooter";
import { PageSettingsDialogs } from "./pageSettings/PageSettingsDialogs";

export const PageSettings = ({ isOpen, onClose }: PageSettingsProps) => {
  const [activeTab, setActiveTab] = useState("general");
  const [title, setTitle] = useState("Digital ordering platform for restaurants and cafes");
  const [urlSlug, setUrlSlug] = useState("/products");
  const [menuTitle, setMenuTitle] = useState("Products");
  const [showInMenu, setShowInMenu] = useState(true);
  const [access, setAccess] = useState("public");
  const [layout, setLayout] = useState("front-page");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDuplicateDialog, setShowDuplicateDialog] = useState(false);

  // SEO state
  const [seoTitle, setSeoTitle] = useState("Digital ordering platform for restaurants and cafes");
  const [titleFormat, setTitleFormat] = useState("page-title-site-name");
  const [customizeTitleFormat, setCustomizeTitleFormat] = useState(false);
  const [metaDescription, setMetaDescription] = useState("Streamline your restaurant operations with our comprehensive digital ordering platform. Manage orders, inventory, and customer relationships all in one place.");
  const [visibleToSearchEngines, setVisibleToSearchEngines] = useState(true);

  // Mock data to simulate if page has children - this would come from props in real implementation
  const pageHasChildren = false;

  const handleDuplicatePage = () => {
    setShowDuplicateDialog(true);
  };

  const handleDeletePage = () => {
    if (!pageHasChildren) {
      setShowDeleteDialog(true);
    }
  };

  const confirmDeletePage = () => {
    console.log("Deleting page...");
    setShowDeleteDialog(false);
    onClose();
  };

  const confirmDuplicatePage = () => {
    console.log("Duplicating page...");
    setShowDuplicateDialog(false);
    onClose();
  };

  return (
    <>
      <TooltipProvider>
        <Sheet open={isOpen} onOpenChange={onClose}>
          <SheetContent 
            className="w-[400px] sm:w-[540px] p-0 bg-background border-l border-border shadow-lg flex flex-col"
            side="right"
            role="dialog"
            aria-labelledby="page-settings-title"
          >
            <PageSettingsHeader activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Content - scrollable */}
            <div className="px-6 py-6 flex-1 overflow-y-auto pb-24">
              {activeTab === "general" && (
                <GeneralTabContent
                  title={title}
                  setTitle={setTitle}
                  urlSlug={urlSlug}
                  setUrlSlug={setUrlSlug}
                  menuTitle={menuTitle}
                  setMenuTitle={setMenuTitle}
                  showInMenu={showInMenu}
                  setShowInMenu={setShowInMenu}
                  access={access}
                  setAccess={setAccess}
                  layout={layout}
                  setLayout={setLayout}
                />
              )}

              {activeTab === "seo" && (
                <SeoTabContent
                  seoTitle={seoTitle}
                  setSeoTitle={setSeoTitle}
                  titleFormat={titleFormat}
                  setTitleFormat={setTitleFormat}
                  customizeTitleFormat={customizeTitleFormat}
                  setCustomizeTitleFormat={setCustomizeTitleFormat}
                  metaDescription={metaDescription}
                  setMetaDescription={setMetaDescription}
                  visibleToSearchEngines={visibleToSearchEngines}
                  setVisibleToSearchEngines={setVisibleToSearchEngines}
                  pageTitle={title}
                />
              )}
            </div>

            <PageSettingsFooter
              onClose={onClose}
              onDuplicatePage={handleDuplicatePage}
              onDeletePage={handleDeletePage}
              pageHasChildren={pageHasChildren}
            />
          </SheetContent>
        </Sheet>
      </TooltipProvider>

      <PageSettingsDialogs
        showDeleteDialog={showDeleteDialog}
        setShowDeleteDialog={setShowDeleteDialog}
        showDuplicateDialog={showDuplicateDialog}
        setShowDuplicateDialog={setShowDuplicateDialog}
        onConfirmDelete={confirmDeletePage}
        onConfirmDuplicate={confirmDuplicatePage}
      />
    </>
  );
};
