
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { X } from "lucide-react";
import { useState } from "react";

interface AddPageSidebarFormProps {
  title: string;
  setTitle: (value: string) => void;
  address: string;
  handleAddressChange: (value: string) => void;
  layout: string;
  setLayout: (value: string) => void;
  showInMenu: boolean;
  setShowInMenu: (value: boolean) => void;
  access: string;
  setAccess: (value: string) => void;
  isLinkMode: boolean;
}

export const AddPageSidebarForm = ({
  title,
  setTitle,
  address,
  handleAddressChange,
  layout,
  setLayout,
  showInMenu,
  setShowInMenu,
  access,
  setAccess,
  isLinkMode
}: AddPageSidebarFormProps) => {
  const [isImageHovered, setIsImageHovered] = useState(false);

  return (
    <div className="space-y-6">
      {/* Page title */}
      <div className="space-y-2">
        <Label htmlFor="title" className="text-sm font-medium text-foreground">
          Page title
        </Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter page title..."
          className="w-full border-border rounded-lg"
          aria-required="true"
        />
      </div>

      {/* URL slug */}
      <div className="space-y-2">
        <Label htmlFor="address" className="text-sm font-medium text-foreground">
          {isLinkMode ? "Address" : "URL slug"}
        </Label>
        <Input
          id="address"
          value={address}
          onChange={(e) => handleAddressChange(e.target.value)}
          placeholder={isLinkMode ? "https://example.com" : "/page-slug"}
          className="w-full border-border rounded-lg"
          aria-required="true"
        />
        {!isLinkMode && (
          <p className="text-sm text-muted-foreground">
            The unique location slug for this page.
          </p>
        )}
      </div>

      {!isLinkMode && (
        <>
          {/* Menu title and Show in menu */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="menu-title" className="text-sm font-medium text-foreground">
                Menu title
              </Label>
              <Input
                id="menu-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border-border rounded-lg"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Show in menu
              </Label>
              <div className="flex items-center mt-4">
                <Switch
                  checked={showInMenu}
                  onCheckedChange={setShowInMenu}
                  aria-describedby="show-in-menu-description"
                />
                <span className="sr-only" id="show-in-menu-description">
                  Toggle whether this page appears in the navigation menu
                </span>
              </div>
            </div>
          </div>

          {/* Access control */}
          <div className="space-y-2">
            <Label htmlFor="access-control" className="text-sm font-medium text-foreground">
              Access
            </Label>
            <Select value={access} onValueChange={setAccess}>
              <SelectTrigger className="w-full border-border rounded-lg" id="access-control">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="private">Private</SelectItem>
                <SelectItem value="password">Password protected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Layout */}
          <div className="space-y-2">
            <Label htmlFor="layout" className="text-sm font-medium text-foreground">
              Layout
            </Label>
            <Select value={layout} onValueChange={setLayout}>
              <SelectTrigger className="w-full border-border rounded-lg" id="layout">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023-front-page">2023 front page</SelectItem>
                <SelectItem value="common-page">Common page</SelectItem>
                <SelectItem value="blog-layout">Blog layout</SelectItem>
                <SelectItem value="shop-layout">Shop layout</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Social image */}
          <div className="space-y-2">
            <Label htmlFor="social-image" className="text-sm font-medium text-foreground">
              Social image
            </Label>
            <div className="bg-background">
              <div 
                className="aspect-video w-full bg-muted rounded-lg overflow-hidden mb-2 relative border-2 border-dashed border-border flex items-center justify-center"
                onMouseEnter={() => setIsImageHovered(true)}
                onMouseLeave={() => setIsImageHovered(false)}
              >
                <div className="text-muted-foreground text-sm">Click to upload image</div>
              </div>
              <p className="text-sm text-muted-foreground">
                This image will be displayed when your page is shared on social media platforms.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
