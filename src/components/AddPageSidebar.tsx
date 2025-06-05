
import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface AddPageSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePage: (pageData: { title: string; slug: string }) => void;
  selectedLayout: string | null;
}

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.5564 5.65683L5.65687 15.5563C5.26635 15.9468 5.26635 16.58 5.65687 16.9705C6.0474 17.3611 6.68056 17.3611 7.07109 16.9705L16.9706 7.07104C17.3611 6.68052 17.3611 6.04735 16.9706 5.65683C16.5801 5.2663 15.9469 5.2663 15.5564 5.65683Z" fill="#1B2124"/>
    <path d="M16.9706 15.5563L7.07106 5.65681C6.68054 5.26629 6.04737 5.26629 5.65685 5.65681C5.26632 6.04734 5.26632 6.6805 5.65685 7.07103L15.5563 16.9705C15.9469 17.361 16.58 17.361 16.9706 16.9705C17.3611 16.58 17.3611 15.9468 16.9706 15.5563Z" fill="#1B2124"/>
  </svg>
);

export const AddPageSidebar = ({ isOpen, onClose, onCreatePage, selectedLayout }: AddPageSidebarProps) => {
  const [title, setTitle] = useState("");
  const [urlSlug, setUrlSlug] = useState("");
  const [layout, setLayout] = useState("2023-front-page");
  const [visibility, setVisibility] = useState("visible-in-menu");

  useEffect(() => {
    if (isOpen) {
      // Reset form when opening
      setTitle("");
      setUrlSlug("");
      setLayout("2023-front-page");
      setVisibility("visible-in-menu");
    }
  }, [isOpen]);

  const handleCreatePage = () => {
    if (title && urlSlug) {
      onCreatePage({ title, slug: urlSlug });
      onClose();
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        className="w-[420px] max-w-[420px] p-0 bg-white border-l border-gray-200 shadow-lg [&>button]:hidden font-sans"
        side="right"
        role="dialog"
        aria-labelledby="add-page-title"
      >
        {/* Header */}
        <div className="px-8 py-8 pb-6 border-b border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 id="add-page-title" className="text-2xl font-semibold text-[#1B2124]">Add new page</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded p-1"
              aria-label="Close sidebar"
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 py-6 flex-1 overflow-y-auto">
          <div className="space-y-6">
            {/* Page title */}
            <div>
              <Label htmlFor="title" className="text-xs font-medium text-[#1A1A1A] block mb-2">
                Page title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Type here..."
                className="w-full border-[#E2E2E2] rounded-lg px-3 py-2.5 text-sm text-[#1B2124]"
                aria-required="true"
              />
            </div>

            {/* Page URL */}
            <div>
              <Label htmlFor="url-slug" className="text-xs font-medium text-[#1A1A1A] block mb-2">
                Page URL
              </Label>
              <Input
                id="url-slug"
                value={urlSlug}
                onChange={(e) => setUrlSlug(e.target.value)}
                placeholder="/newpage"
                className="w-full border-[#E2E2E2] rounded-lg px-3 py-2.5 text-sm text-[#1B2124]"
                aria-required="true"
              />
            </div>

            {/* Page layout */}
            <div>
              <Label htmlFor="layout" className="text-xs font-medium text-[#1A1A1A] block mb-2">
                Page layout
              </Label>
              <Select value={layout} onValueChange={setLayout}>
                <SelectTrigger className="w-full border-[#E2E2E2] rounded-lg px-3 py-2.5 text-sm" id="layout">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="font-sans">
                  <SelectItem value="2023-front-page" className="text-sm text-[#1B2124]">2023 front page</SelectItem>
                  <SelectItem value="common-page" className="text-sm text-[#1B2124]">Common page</SelectItem>
                  <SelectItem value="blog-layout" className="text-sm text-[#1B2124]">Blog layout</SelectItem>
                  <SelectItem value="shop-layout" className="text-sm text-[#1B2124]">Shop layout</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Visibility */}
            <div>
              <Label htmlFor="visibility" className="text-xs font-medium text-[#1A1A1A] block mb-2">
                Visibility
              </Label>
              <Select value={visibility} onValueChange={setVisibility}>
                <SelectTrigger className="w-full border-[#E2E2E2] rounded-lg px-3 py-2.5 text-sm" id="visibility">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="font-sans">
                  <SelectItem value="visible-in-menu" className="text-sm text-[#1B2124]">Show in menu</SelectItem>
                  <SelectItem value="hidden" className="text-sm text-[#1B2124]">Hidden</SelectItem>
                  <SelectItem value="visible-not-in-menu" className="text-sm text-[#1B2124]">Visible but not in menu</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="px-8 py-6 border-t border-gray-100 flex flex-col space-y-3">
          <Button 
            onClick={handleCreatePage}
            disabled={!title || !urlSlug}
            className="w-full bg-[#5A4FFF] hover:bg-[#4A3FFF] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A4FFF] focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            aria-describedby={!title || !urlSlug ? "create-button-help" : undefined}
          >
            Create this page
          </Button>
          
          {!title || !urlSlug ? (
            <p id="create-button-help" className="sr-only">
              Please fill in both page title and URL to create the page
            </p>
          ) : null}
          
          <div className="text-center">
            <button className="text-gray-400 text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 rounded">
              Add a link instead
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
