
import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet";
import { TranslatePageSidebarHeader } from "./translatePageSidebar/TranslatePageSidebarHeader";
import { TranslatePageSidebarForm } from "./translatePageSidebar/TranslatePageSidebarForm";
import { TranslatePageSidebarFooter } from "./translatePageSidebar/TranslatePageSidebarFooter";
import { PageItem } from "@/types/pages";

interface TranslatePageSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTranslation: (translationData: { 
    title: string; 
    slug: string; 
    duplicateFrom: string;
    layout: string;
    visibility: string;
  }) => void;
  pageToTranslate: PageItem | null;
  currentLanguage: string;
  availableLanguages: string[];
}

export const TranslatePageSidebar = ({ 
  isOpen, 
  onClose, 
  onCreateTranslation, 
  pageToTranslate,
  currentLanguage,
  availableLanguages 
}: TranslatePageSidebarProps) => {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [duplicateFrom, setDuplicateFrom] = useState("do-not-duplicate");
  const [layout, setLayout] = useState("common-page");
  const [visibility, setVisibility] = useState("visible");
  const [hasManuallyEditedAddress, setHasManuallyEditedAddress] = useState(false);

  // Filter out current language from available languages for duplication
  const otherLanguages = availableLanguages.filter(lang => lang !== currentLanguage);

  useEffect(() => {
    if (isOpen && pageToTranslate) {
      // Pre-fill title with the original page title
      setTitle(pageToTranslate.title);
      setAddress("");
      setDuplicateFrom("do-not-duplicate");
      setLayout("common-page");
      setVisibility("visible");
      setHasManuallyEditedAddress(false);
    }
  }, [isOpen, pageToTranslate]);

  // Auto-generate address from title
  useEffect(() => {
    if (title && !hasManuallyEditedAddress) {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setAddress(slug ? `/${slug}` : "");
    }
  }, [title, hasManuallyEditedAddress]);

  const handleAddressChange = (value: string) => {
    setAddress(value);
    setHasManuallyEditedAddress(true);
  };

  const handleCreateTranslation = () => {
    if (title && address) {
      onCreateTranslation({ 
        title, 
        slug: address, 
        duplicateFrom,
        layout,
        visibility
      });
      onClose();
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        className="w-[400px] sm:w-[540px] p-0 bg-background border-l border-border shadow-lg flex flex-col"
        side="right"
        role="dialog"
        aria-labelledby="translate-page-title"
      >
        <TranslatePageSidebarHeader />
        
        <TranslatePageSidebarForm
          title={title}
          setTitle={setTitle}
          address={address}
          handleAddressChange={handleAddressChange}
          duplicateFrom={duplicateFrom}
          setDuplicateFrom={setDuplicateFrom}
          layout={layout}
          setLayout={setLayout}
          visibility={visibility}
          setVisibility={setVisibility}
          availableLanguages={otherLanguages}
        />
        
        <TranslatePageSidebarFooter
          title={title}
          address={address}
          handleCreateTranslation={handleCreateTranslation}
        />
      </SheetContent>
    </Sheet>
  );
};
