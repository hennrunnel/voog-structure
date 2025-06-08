
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

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
  return (
    <div id="general-panel" role="tabpanel" className="space-y-6">
      {/* Page title */}
      <div className="space-y-2">
        <Label htmlFor="title" className="text-sm font-medium text-foreground">
          Page title
        </Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border-border rounded-lg"
          aria-describedby="title-description"
        />
      </div>

      {/* URL slug */}
      <div className="space-y-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Label htmlFor="url-slug" className="text-sm font-medium text-foreground cursor-help">
              URL slug
            </Label>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">The unique location slug for this page.</p>
          </TooltipContent>
        </Tooltip>
        <Input
          id="url-slug"
          value={urlSlug}
          onChange={(e) => setUrlSlug(e.target.value)}
          className="w-full border-border rounded-lg"
          aria-describedby="url-slug-description"
        />
        <p className="text-xs text-muted-foreground">
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
          <div className="flex items-center pt-2">
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

      {/* Access */}
      <div className="space-y-2">
        <Label htmlFor="access" className="text-sm font-medium text-foreground">
          Access
        </Label>
        <Select value={access} onValueChange={setAccess}>
          <SelectTrigger className="w-full border-border rounded-lg" id="access">
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
            <SelectItem value="front-page">Front page</SelectItem>
            <SelectItem value="common-page">Common page</SelectItem>
            <SelectItem value="blog">Blog</SelectItem>
            <SelectItem value="shop">Shop</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Social media image */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-foreground">
          Social media image
        </Label>
        <div className="relative group">
          <img 
            src="/lovable-uploads/a3993143-33a0-4b8f-9cf9-3d7e86d827a7.png" 
            alt="Social media preview" 
            className="w-full h-48 object-cover rounded-lg"
          />
          <button 
            className="absolute top-2 right-2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-1.5 rounded-md transition-colors opacity-0 group-hover:opacity-100"
            aria-label="Remove social media image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-muted-foreground">
          The image is usually presented when sharing the link. For example, if you post a link on Facebook, there is an image of the website.
        </p>
      </div>
    </div>
  );
};
