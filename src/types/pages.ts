
export interface PageItem {
  id: string;
  title: string;
  slug: string;
  pageType: string;
  seoScore: "Good" | "Needs attention" | "Poor";
  translationStatus?: "Untranslated" | "Hidden";
  isVisible: boolean;
  children?: PageItem[];
  isExpanded?: boolean;
  isPasswordProtected?: boolean;
}

export interface LayoutOption {
  id: string;
  title: string;
  icon: string;
}
