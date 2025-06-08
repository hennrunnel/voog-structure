
import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet";
import { AddPageSidebarHeader } from "./addPageSidebar/AddPageSidebarHeader";
import { AddPageSidebarForm } from "./addPageSidebar/AddPageSidebarForm";
import { AddPageSidebarFooter } from "./addPageSidebar/AddPageSidebarFooter";

interface AddPageSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePage: (pageData: { title: string; slug: string }) => void;
  selectedLayout: string | null;
}

export const AddPageSidebar = ({ isOpen, onClose, onCreatePage, selectedLayout }: AddPageSidebarProps) => {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [layout, setLayout] = useState("2023-front-page");
  const [showInMenu, setShowInMenu] = useState(true);
  const [isLinkMode, setIsLinkMode] = useState(false);
  const [hasManuallyEditedAddress, setHasManuallyEditedAddress] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Reset form when opening
      setTitle("");
      setAddress("");
      setLayout("2023-front-page");
      setShowInMenu(true);
      setIsLinkMode(false);
      setHasManuallyEditedAddress(false);
    }
  }, [isOpen]);

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

  const handleAddressChange = (value: string) => {
    setAddress(value);
    setHasManuallyEditedAddress(true);
  };

  const handleCreatePage = () => {
    if (title && address) {
      onCreatePage({ title, slug: address });
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
        <AddPageSidebarHeader isLinkMode={isLinkMode} />
        
        <AddPageSidebarForm
          title={title}
          setTitle={setTitle}
          address={address}
          handleAddressChange={handleAddressChange}
          layout={layout}
          setLayout={setLayout}
          showInMenu={showInMenu}
          setShowInMenu={setShowInMenu}
          isLinkMode={isLinkMode}
        />
        
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
