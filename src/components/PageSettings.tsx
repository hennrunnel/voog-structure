
import React, { useState } from "react";
import { X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageItem } from "@/types/pages";

interface PageSettingsProps {
  page: PageItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PageSettings = ({ page, isOpen, onClose }: PageSettingsProps) => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [address, setAddress] = useState("");

  React.useEffect(() => {
    if (page) {
      setTitle(page.title);
      setSlug(page.slug);
      setAddress(page.pageType === "Link" ? page.slug : "");
    }
  }, [page]);

  const handleSaveSettings = () => {
    console.log("Page settings saved:", { title, slug, address });
    onClose();
  };

  if (!page) return null;

  const isLinkType = page.pageType === "Link";

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full max-w-2xl bg-white p-0 border-l border-gray-200 shadow-sm rounded-none h-full overflow-y-auto">
        <SheetHeader className="p-8 pb-0">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-2xl font-medium text-gray-900">
              {page.title} settings
            </SheetTitle>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </SheetHeader>

        <div className="p-8 pt-6">
          {isLinkType ? (
            // Simplified form for Link type pages
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-700 mb-2">
                  Where does this link lead? Insert an internal or external web address.
                </p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1"
                    placeholder="Enter link title"
                  />
                </div>

                <div>
                  <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                    Address
                  </Label>
                  <Input
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="mt-1"
                    placeholder="https://example.com or /internal-page"
                  />
                </div>
              </div>
              
              <Button onClick={handleSaveSettings} className="w-full bg-green-600 hover:bg-green-700 text-white">
                Save settings
              </Button>
            </div>
          ) : (
            // Full form for other page types
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="general" className="text-sm">GENERAL</TabsTrigger>
                <TabsTrigger value="seo" className="text-sm">SEO</TabsTrigger>
                <TabsTrigger value="advanced" className="text-sm">ADVANCED</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                      Page Title
                    </Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="mt-1"
                      placeholder="Enter page title"
                    />
                  </div>

                  <div>
                    <Label htmlFor="slug" className="text-sm font-medium text-gray-700">
                      URL Slug
                    </Label>
                    <Input
                      id="slug"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      className="mt-1"
                      placeholder="/page-slug"
                    />
                  </div>
                </div>
                
                <Button onClick={handleSaveSettings} className="w-full bg-green-600 hover:bg-green-700 text-white">
                  Save settings
                </Button>
              </TabsContent>

              <TabsContent value="seo" className="space-y-0">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-700">
                    SEO settings functionality has been simplified for demonstration purposes.
                  </p>
                </div>
                
                <Button onClick={handleSaveSettings} className="w-full bg-green-600 hover:bg-green-700 text-white">
                  Save settings
                </Button>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-0">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-700">
                    Advanced settings functionality has been simplified for demonstration purposes.
                  </p>
                </div>
                
                <Button onClick={handleSaveSettings} className="w-full bg-green-600 hover:bg-green-700 text-white">
                  Save settings
                </Button>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
