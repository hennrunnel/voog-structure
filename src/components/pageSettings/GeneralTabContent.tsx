
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

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
        <p className="text-sm text-muted-foreground mt-2">
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
    </div>
  );
};
