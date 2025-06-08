
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
  const titleProgress = Math.min((titleLength / 60) * 100, 100);
  
  const descriptionLength = metaDescription.length;
  const descriptionProgress = Math.min((descriptionLength / 160) * 100, 100);

  // SEO score calculation based on best practices
  const getSeoScore = () => {
    let score = 0;
    
    // Title length (optimal: 30-60 characters)
    if (titleLength >= 30 && titleLength <= 60) score += 40;
    else if (titleLength > 0) score += 20;
    
    // Description length (optimal: 120-160 characters)
    if (descriptionLength >= 120 && descriptionLength <= 160) score += 40;
    else if (descriptionLength > 0) score += 20;
    
    // Visible to search engines
    if (visibleToSearchEngines) score += 20;
    
    if (score >= 80) return { status: "Good", color: "bg-green-500" };
    if (score >= 50) return { status: "Medium", color: "bg-yellow-500" };
    return { status: "Poor", color: "bg-red-500" };
  };

  const seoScore = getSeoScore();

  return (
    <div id="seo-panel" role="tabpanel" className="space-y-6">
      {/* SEO Score Indicator */}
      <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
        <div className={`w-3 h-3 rounded-full ${seoScore.color}`} />
        <span className="text-sm font-medium">SEO Score: {seoScore.status}</span>
      </div>

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

      {/* Customize title format */}
      <div className="flex items-center space-x-2">
        <Switch
          id="customize-title"
          checked={customizeTitleFormat}
          onCheckedChange={setCustomizeTitleFormat}
        />
        <Label htmlFor="customize-title" className="text-sm font-medium text-foreground">
          Customize title format for this page
        </Label>
      </div>

      {/* Google preview */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-foreground">
          Google preview
        </Label>
        <div className="border border-border rounded-lg p-4 bg-background">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="text-blue-600 text-sm font-medium truncate">
                {titlePreview}
              </div>
              <div className="text-xs text-muted-foreground">
                {titleLength}/60
              </div>
            </div>
            <Progress value={titleProgress} className="h-1" />
            <div className="text-green-700 text-xs">
              yoursite.com{pageTitle ? `/products` : ''}
            </div>
          </div>
        </div>
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
              yoursite.com{pageTitle ? `/products` : ''}
            </div>
            <div className="text-sm text-muted-foreground">
              {metaDescription || "No meta description provided."}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <div className="text-xs text-muted-foreground">
                {descriptionLength}/160
              </div>
              <Progress value={descriptionProgress} className="h-1 flex-1" />
            </div>
          </div>
        </div>
      </div>

      {/* Visible to search engines */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Switch
            id="visible-search-engines"
            checked={visibleToSearchEngines}
            onCheckedChange={setVisibleToSearchEngines}
          />
          <Label htmlFor="visible-search-engines" className="text-sm font-medium text-foreground">
            Visible to search engines
          </Label>
        </div>
        <p className="text-sm text-muted-foreground">
          When disabled, search engines will be instructed not to index this page.
        </p>
      </div>
    </div>
  );
};
