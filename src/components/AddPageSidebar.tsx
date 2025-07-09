
import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet";
import { AddPageSidebarHeader } from "./addPageSidebar/AddPageSidebarHeader";
import { AddPageSidebarForm } from "./addPageSidebar/AddPageSidebarForm";
import { AddPageSidebarSeoForm } from "./addPageSidebar/AddPageSidebarSeoForm";
import { AddPageSidebarFooter } from "./addPageSidebar/AddPageSidebarFooter";

interface AddPageSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePage: (pageData: { title: string; slug: string; layout: string }) => void;
  selectedLayout: string | null;
}

export const AddPageSidebar = ({ isOpen, onClose, onCreatePage, selectedLayout }: AddPageSidebarProps) => {
  const [activeTab, setActiveTab] = useState("general");
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [layout, setLayout] = useState("2023-front-page");
  const [showInMenu, setShowInMenu] = useState(true);
  const [access, setAccess] = useState("public");
  const [isLinkMode, setIsLinkMode] = useState(false);
  const [hasManuallyEditedAddress, setHasManuallyEditedAddress] = useState(false);

  // SEO state
  const [seoTitle, setSeoTitle] = useState("");
  const [titleFormat, setTitleFormat] = useState("page-title-site-name");
  const [customizeTitleFormat, setCustomizeTitleFormat] = useState(false);
  const [metaDescription, setMetaDescription] = useState("");
  const [visibleToSearchEngines, setVisibleToSearchEngines] = useState(true);

  useEffect(() => {
    if (isOpen) {
      // Reset form when opening
      setActiveTab("general");
      setTitle("");
      setAddress("");
      setLayout(selectedLayout || "2023-front-page");
      setShowInMenu(true);
      setAccess("public");
      setIsLinkMode(false);
      setHasManuallyEditedAddress(false);
      // Reset SEO fields
      setSeoTitle("");
      setTitleFormat("page-title-site-name");
      setCustomizeTitleFormat(false);
      setMetaDescription("");
      setVisibleToSearchEngines(true);
    }
  }, [isOpen, selectedLayout]);

  // Auto-generate address from title
  useEffect(() => {
    if (title && !hasManuallyEditedAddress && !isLinkMode) {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setAddress(slug ? `/${slug}` : "");
    }
  }, [title, hasManuallyEditedAddress, isLinkMode]);

  // Auto-generate SEO title from title
  useEffect(() => {
    if (title && !customizeTitleFormat) {
      setSeoTitle(title);
    }
  }, [title, customizeTitleFormat]);

  const handleAddressChange = (value: string) => {
    setAddress(value);
    setHasManuallyEditedAddress(true);
  };

  const handleCreatePage = () => {
    if (title && address) {
      onCreatePage({ title, slug: address, layout });
      onClose();
    }
  };

  const toggleMode = () => {
    setIsLinkMode(!isLinkMode);
    setTitle("");
    setAddress("");
    setHasManuallyEditedAddress(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        className="w-[400px] sm:w-[540px] p-0 bg-background border-l border-border shadow-lg flex flex-col"
        side="right"
        role="dialog"
        aria-labelledby="add-page-title"
      >
        <AddPageSidebarHeader 
          isLinkMode={isLinkMode} 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        
        <div className="px-6 py-6 flex-1 overflow-y-auto">
          {activeTab === "general" && (
            <AddPageSidebarForm
              title={title}
              setTitle={setTitle}
              address={address}
              handleAddressChange={handleAddressChange}
              layout={layout}
              setLayout={setLayout}
              showInMenu={showInMenu}
              setShowInMenu={setShowInMenu}
              access={access}
              setAccess={setAccess}
              isLinkMode={isLinkMode}
            />
          )}

          {activeTab === "seo" && !isLinkMode && (
            <AddPageSidebarSeoForm
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
              urlSlug={address}
            />
          )}
        </div>
        
        <AddPageSidebarFooter
          title={title}
          address={address}
          isLinkMode={isLinkMode}
          handleCreatePage={handleCreatePage}
          toggleMode={toggleMode}
        />
      </SheetContent>
    </Sheet>
  );
};
