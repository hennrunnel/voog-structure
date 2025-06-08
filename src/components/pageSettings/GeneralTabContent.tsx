
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { X } from "lucide-react";
import { useState } from "react";

interface GeneralTabContentProps {
  title: string;
  setTitle: (title: string) => void;
  urlSlug: string;
  setUrlSlug: (slug: string) => void;
  menuTitle: string;
  setMenuTitle: (title: string) => void;
  showInMenu: boolean;
  setShowInMenu: (show: boolean) => void;
  access: string;
  setAccess: (access: string) => void;
  layout: string;
  setLayout: (layout: string) => void;
}

export const GeneralTabContent = ({
  title,
  setTitle,
  urlSlug,
  setUrlSlug,
  menuTitle,
  setMenuTitle,
  showInMenu,
  setShowInMenu,
  access,
  setAccess,
  layout,
  setLayout,
}: GeneralTabContentProps) => {
  const [isImageHovered, setIsImageHovered] = useState(false);

  return (
    <div id="general-panel" role="tabpanel" className="space-y-6">
      {/* Page title */}
      <div className="space-y-2">
        <Label htmlFor="page-title" className="text-sm font-medium text-foreground">
          Page title
        </Label>
        <Input
          id="page-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border-border rounded-lg"
        />
      </div>

      {/* URL slug */}
      <div className="space-y-2">
        <Label htmlFor="url-slug" className="text-sm font-medium text-foreground">
          URL slug
        </Label>
        <Input
          id="url-slug"
          value={urlSlug}
          onChange={(e) => setUrlSlug(e.target.value)}
          className="w-full border-border rounded-lg"
        />
        <p className="text-sm text-muted-foreground">
          The unique location slug for this page.
        </p>
      </div>

      {/* Menu title and Show in menu */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="menu-title" className="text-sm font-medium text-foreground">
            Menu title
          </Label>
          <Input
            id="menu-title"
            value={menuTitle}
            onChange={(e) => setMenuTitle(e.target.value)}
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
        <Label htmlFor="page-layout" className="text-sm font-medium text-foreground">
          Layout
        </Label>
        <Select value={layout} onValueChange={setLayout}>
          <SelectTrigger className="w-full border-border rounded-lg" id="page-layout">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="front-page">Front page</SelectItem>
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
            className="aspect-video w-full bg-muted rounded-lg overflow-hidden mb-2 relative"
            onMouseEnter={() => setIsImageHovered(true)}
            onMouseLeave={() => setIsImageHovered(false)}
          >
            <img 
              src="/lovable-uploads/01d5297b-673d-4f82-8bf5-fac4d352b073.png"
              alt="F1 race car preview"
              className="w-full h-full object-cover"
            />
            {isImageHovered && (
              <button className="absolute top-2 right-2 w-6 h-6 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors">
                <X className="w-4 h-4 text-white" />
              </button>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            This image will be displayed when your page is shared on social media platforms.
          </p>
        </div>
      </div>
    </div>
  );
};
