
import { LayoutOption, PageItem } from "@/types/pages";

export const layoutOptions: LayoutOption[] = [
  {
    id: "front-page",
    title: "Front Page",
    icon: "🏠"
  },
  {
    id: "common-page",
    title: "Common Page",
    icon: "📄"
  },
  {
    id: "shop",
    title: "Shop",
    icon: "🛒"
  },
  {
    id: "blog-news",
    title: "Blog & News",
    icon: "📰"
  },
  {
    id: "link-navigation",
    title: "Link in the navigation",
    icon: "🔗"
  }
];

export const mockPages: PageItem[] = [
  {
    id: "1",
    title: "Home",
    slug: "/",
    pageType: "Front Page",
    seoScore: "Good",
    isVisible: true
  },
  {
    id: "2",
    title: "Products",
    slug: "/products",
    pageType: "Product List",
    seoScore: "Good",
    isVisible: true,
    isExpanded: true,
    children: []
  },
  {
    id: "3",
    title: "About",
    slug: "/about",
    pageType: "Common Page",
    seoScore: "Poor",
    translationStatus: "Untranslated",
    isVisible: false
  },
  {
    id: "4",
    title: "News",
    slug: "/news",
    pageType: "Blog & News",
    seoScore: "Medium",
    isVisible: true
  },
  {
    id: "5",
    title: "Contact",
    slug: "/contact",
    pageType: "Common Page",
    seoScore: "Good",
    isVisible: true,
    isExpanded: true,
    children: [
      {
        id: "5-1",
        title: "Support",
        slug: "/contact/support",
        pageType: "Common Page",
        seoScore: "Good",
        isVisible: true
      },
      {
        id: "5-2",
        title: "Sales",
        slug: "/contact/sales",
        pageType: "Common Page",
        seoScore: "Medium",
        isVisible: true
      },
      {
        id: "5-3",
        title: "Technical Support",
        slug: "/contact/technical",
        pageType: "Common Page",
        seoScore: "Good",
        translationStatus: "Untranslated",
        isVisible: true
      }
    ]
  }
];
