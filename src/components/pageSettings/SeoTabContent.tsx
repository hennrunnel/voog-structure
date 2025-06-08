
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";

interface SeoTabContentProps {
  seoTitle: string;
  setSeoTitle: (title: string) => void;
  titleFormat: string;
  setTitleFormat: (format: string) => void;
  customizeTitleFormat: boolean;
  setCustomizeTitleFormat: (customize: boolean) => void;
  metaDescription: string;
  setMetaDescription: (description: string) => void;
  visibleToSearchEngines: boolean;
  setVisibleToSearchEngines: (visible: boolean) => void;
  pageTitle: string;
  urlSlug: string;
}

export const SeoTabContent = ({
  seoTitle,
  setSeoTitle,
  titleFormat,
  setTitleFormat,
  customizeTitleFormat,
  setCustomizeTitleFormat,
  metaDescription,
  setMetaDescription,
  visibleToSearchEngines,
  setVisibleToSearchEngines,
  pageTitle,
  urlSlug,
}: SeoTabContentProps) => {
  // Calculate title length and preview
  const getTitlePreview = () => {
    if (customizeTitleFormat) {
      return seoTitle;
    }
    
    switch (titleFormat) {
      case "page-title-site-name":
        return `${pageTitle} - YourSite`;
      case "site-name-page-title":
        return `YourSite - ${pageTitle}`;
      case "page-title-only":
        return pageTitle;
      default:
        return `${pageTitle} - YourSite`;
    }
  };

  const titlePreview = getTitlePreview();
  const titleLength = titlePreview.length;
  
  // Title SEO score calculation (optimal: under 70 characters)
  const getTitleSeoColor = () => {
    if (titleLength <= 70) return "bg-green-500";
    if (titleLength <= 90) return "bg-yellow-500";
    return "bg-red-500";
  };

  const titleProgress = Math.min((titleLength / 70) * 100, 100);
  
  const descriptionLength = metaDescription.length;
  
  // Description SEO score calculation (optimal: around 150 characters)
  const getDescriptionSeoColor = () => {
    if (descriptionLength >= 120 && descriptionLength <= 150) return "bg-green-500";
    if (descriptionLength >= 100 && descriptionLength <= 180) return "bg-yellow-500";
    if (descriptionLength > 0) return "bg-red-500";
    return "bg-gray-400";
  };

  const descriptionProgress = Math.min((descriptionLength / 150) * 100, 100);

  return (
    <div id="seo-panel" role="tabpanel" className="space-y-6">
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="seo-title" className="text-sm font-medium text-foreground">
          Title
        </Label>
        <Input
          id="seo-title"
          value={seoTitle}
          onChange={(e) => setSeoTitle(e.target.value)}
          className="w-full border-border rounded-lg"
          disabled={!customizeTitleFormat}
        />
      </div>

      {/* Title format */}
      <div className="space-y-2">
        <Label htmlFor="title-format" className="text-sm font-medium text-foreground">
          Title format
        </Label>
        <Select value={titleFormat} onValueChange={setTitleFormat} disabled={customizeTitleFormat}>
          <SelectTrigger className="w-full border-border rounded-lg" id="title-format">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="page-title-site-name">Page title - Site name</SelectItem>
            <SelectItem value="site-name-page-title">Site name - Page title</SelectItem>
            <SelectItem value="page-title-only">Page title only</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Customize title format label */}
      <div className="space-y-2">
        <Label htmlFor="customize-title" className="text-sm font-medium text-foreground">
          Customize title format
        </Label>
        <div className="flex items-center space-x-2">
          <Switch
            id="customize-title"
            checked={customizeTitleFormat}
            onCheckedChange={setCustomizeTitleFormat}
          />
        </div>
      </div>

      {/* Title preview (no label) */}
      <div className="space-y-2">
        <div className="border border-border rounded-lg p-4 bg-background">
          <div className="space-y-2">
            <div className="text-blue-600 text-sm font-medium">
              {titlePreview}
            </div>
            <div className="flex items-center gap-2">
              <Progress value={titleProgress} className={`h-2 flex-1`} />
              <div className="text-xs text-muted-foreground">
                {titleLength}/70
              </div>
              <div className={`w-2 h-2 rounded-full ${getTitleSeoColor()}`} />
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          This is how current page's title is displayed on Google. By default the title format set in{" "}
          <a href="/admin/seo" className="text-blue-600 hover:underline">SEO General</a>{" "}
          is used but you can override it locally, if you wish.
        </p>
      </div>

      {/* Meta description */}
      <div className="space-y-2">
        <Label htmlFor="meta-description" className="text-sm font-medium text-foreground">
          Meta description
        </Label>
        <Textarea
          id="meta-description"
          value={metaDescription}
          onChange={(e) => setMetaDescription(e.target.value)}
          className="w-full border-border rounded-lg min-h-[80px]"
          placeholder="Write a compelling description that summarizes this page..."
        />
        <div className="flex items-center gap-2">
          <Progress value={descriptionProgress} className="h-2 flex-1" />
          <div className="text-xs text-muted-foreground">
            {descriptionLength}/150
          </div>
          <div className={`w-2 h-2 rounded-full ${getDescriptionSeoColor()}`} />
        </div>
        <p className="text-sm text-muted-foreground">
          The description that will appear in search engine results.
        </p>
      </div>

      {/* Search result preview */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-foreground">
          Search result preview
        </Label>
        <div className="border border-border rounded-lg p-4 bg-background">
          <div className="space-y-2">
            <div className="text-blue-600 text-sm font-medium">
              {titlePreview}
            </div>
            <div className="text-green-700 text-xs">
              yoursite.com{urlSlug || '/products'}
            </div>
            <div className="text-sm text-muted-foreground">
              {metaDescription || "No meta description provided."}
            </div>
          </div>
        </div>
      </div>

      {/* Visible to search engines */}
      <div className="space-y-2">
        <Label htmlFor="visible-search-engines" className="text-sm font-medium text-foreground">
          Visible to search engines
        </Label>
        <div className="flex items-center space-x-2">
          <Switch
            id="visible-search-engines"
            checked={visibleToSearchEngines}
            onCheckedChange={setVisibleToSearchEngines}
          />
        </div>
        <p className="text-sm text-muted-foreground">
          When disabled, search engines will be instructed not to index this page.
        </p>
      </div>
    </div>
  );
};
