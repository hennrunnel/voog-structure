
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
import { InfoBox } from "@/components/ui/info-box";

interface AddPageSidebarFormProps {
  title: string;
  setTitle: (value: string) => void;
  address: string;
  handleAddressChange: (value: string) => void;
  layout: string;
  setLayout: (value: string) => void;
  showInMenu: boolean;
  setShowInMenu: (value: boolean) => void;
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
  isLinkMode
}: AddPageSidebarFormProps) => {
  return (
    <div className="px-6 py-6 flex-1 overflow-y-auto">
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

            {/* Menu title and Show in menu - using same pattern as Page Settings */}
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
          </>
        )}

        {/* Info Box - now using the reusable component */}
        {!isLinkMode && (
          <InfoBox>
            After creating your page, manage SEO, access, and social image in Page settings.
          </InfoBox>
        )}
      </div>
    </div>
  );
};
