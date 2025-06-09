
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

interface TranslatePageSidebarFormProps {
  title: string;
  setTitle: (value: string) => void;
  address: string;
  handleAddressChange: (value: string) => void;
  duplicateFrom: string;
  setDuplicateFrom: (value: string) => void;
  layout: string;
  setLayout: (value: string) => void;
  visibility: string;
  setVisibility: (value: string) => void;
  availableLanguages: string[];
}

export const TranslatePageSidebarForm = ({
  title,
  setTitle,
  address,
  handleAddressChange,
  duplicateFrom,
  setDuplicateFrom,
  layout,
  setLayout,
  visibility,
  setVisibility,
  availableLanguages
}: TranslatePageSidebarFormProps) => {
  const showLayoutField = duplicateFrom === "do-not-duplicate";

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
            placeholder="Type here..."
            className="w-full border-border rounded-lg"
            aria-required="true"
          />
        </div>

        {/* Address */}
        <div className="space-y-2">
          <Label htmlFor="address" className="text-sm font-medium text-foreground">
            Address
          </Label>
          <Input
            id="address"
            value={address}
            onChange={(e) => handleAddressChange(e.target.value)}
            placeholder="/page-slug"
            className="w-full border-border rounded-lg"
            aria-required="true"
          />
          <p className="text-sm text-muted-foreground">
            The unique location slug for this page.
          </p>
        </div>

        {/* Duplicate content from */}
        <div className="space-y-2">
          <Label htmlFor="duplicate-from" className="text-sm font-medium text-foreground">
            Duplicate content from
          </Label>
          <Select value={duplicateFrom} onValueChange={setDuplicateFrom}>
            <SelectTrigger className="w-full border-border rounded-lg" id="duplicate-from">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="do-not-duplicate">Do not duplicate</SelectItem>
              {availableLanguages.map((language) => (
                <SelectItem key={language} value={language}>
                  {language.charAt(0).toUpperCase() + language.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Layout - only shown when "Do not duplicate" is selected */}
        {showLayoutField && (
          <div className="space-y-2">
            <Label htmlFor="layout" className="text-sm font-medium text-foreground">
              Page layout
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
        )}

        {/* Show in menu toggle */}
        <div className="space-y-2">
          <Label htmlFor="show-in-menu" className="text-sm font-medium text-foreground">
            Show in menu
          </Label>
          <div className="flex items-center space-x-2">
            <Switch
              id="show-in-menu"
              checked={visibility === "visible"}
              onCheckedChange={(checked) => setVisibility(checked ? "visible" : "hidden")}
            />
            <span className="text-sm text-muted-foreground">
              {visibility === "visible" ? "Visible" : "Hidden"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
