
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
import { useTranslation } from "@/hooks/useTranslation";

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
  currentLanguage?: "en" | "et";
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
  isLinkMode,
  currentLanguage = "en"
}: AddPageSidebarFormProps) => {
  const { t } = useTranslation(currentLanguage);
  
  return (
    <div className="px-6 py-6 flex-1 overflow-y-auto">
      <div className="space-y-6">
        {/* Page title */}
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-medium text-foreground">
            {t("add_page.form.page_title_label")}
          </Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t("add_page.form.page_title_placeholder")}
            className="w-full border-border rounded-lg"
            aria-required="true"
          />
        </div>

        {/* URL slug */}
        <div className="space-y-2">
          <Label htmlFor="address" className="text-sm font-medium text-foreground">
            {isLinkMode ? t("add_page.form.address_label") : t("add_page.form.url_slug_label")}
          </Label>
          <Input
            id="address"
            value={address}
            onChange={(e) => handleAddressChange(e.target.value)}
            placeholder={isLinkMode ? t("add_page.form.address_placeholder") : "/page-slug"}
            className="w-full border-border rounded-lg"
            aria-required="true"
          />
          {!isLinkMode && (
            <p className="text-sm text-muted-foreground">
              {t("add_page.form.url_slug_help")}
            </p>
          )}
        </div>

        {!isLinkMode && (
          <>
            {/* Layout */}
            <div className="space-y-2">
              <Label htmlFor="layout" className="text-sm font-medium text-foreground">
                {t("add_page.form.layout_label")}
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
                  {t("add_page.form.menu_title_label")}
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
                  {t("add_page.form.show_in_menu_label")}
                </Label>
                <div className="flex items-center mt-4">
                  <Switch
                    checked={showInMenu}
                    onCheckedChange={setShowInMenu}
                    aria-describedby="show-in-menu-description"
                  />
                  <span className="sr-only" id="show-in-menu-description">
                    {t("add_page.form.show_in_menu_description")}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Info Box - now using the reusable component */}
        {!isLinkMode && (
          <InfoBox>
            {t("add_page.form.info_box_text")}
          </InfoBox>
        )}
      </div>
    </div>
  );
};
