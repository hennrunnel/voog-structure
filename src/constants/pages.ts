
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
    title: "Digital ordering platform for restaurants and cafes",
    slug: "/digital-ordering",
    pageType: "Product List",
    seoScore: "Good",
    isVisible: true,
    isExpanded: false,
    children: [
      {
        id: "2-1",
        title: "Sign up for our restaurant management system with very long title that should be cut off",
        slug: "/digital-ordering/sign-up-for-restaurant-management-with-very-long-url-that-should-be-truncated",
        pageType: "Common Page",
        seoScore: "Good",
        isVisible: true
      }
    ]
  },
  {
    id: "3",
    title: "Biežāk uzdotie jautājumi",
    slug: "/about",
    pageType: "Common Page",
    seoScore: "Poor",
    translationStatus: "Untranslated",
    isVisible: false,
    isExpanded: false,
    children: [
      {
        id: "3-1",
        title: "Cik šāds risinājums maksā un kādas ir cenas",
        slug: "/about/pricing-long-url",
        pageType: "Common Page",
        seoScore: "Medium",
        translationStatus: "Untranslated",
        isVisible: true
      },
      {
        id: "3-2",
        title: "Kas nodarbojas ar pārtikas izplatīšanu restorānos",
        slug: "/about/food-distribution",
        pageType: "Common Page",
        seoScore: "Good",
        translationStatus: "Untranslated",
        isVisible: true
      }
    ]
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
    title: "External Resource",
    slug: "https://www.example.com/external-resource",
    pageType: "Link",
    seoScore: "Good",
    isVisible: true
  },
  {
    id: "6",
    title: "Contact",
    slug: "/contact",
    pageType: "Common Page",
    seoScore: "Good",
    isVisible: true,
    isExpanded: false,
    children: [
      {
        id: "6-1",
        title: "Support",
        slug: "/contact/support",
        pageType: "Common Page",
        seoScore: "Good",
        isVisible: true,
        isExpanded: false,
        children: [
          {
            id: "6-1-1",
            title: "Technical Support Documentation",
            slug: "/contact/support/technical-docs",
            pageType: "Common Page",
            seoScore: "Good",
            isVisible: true
          },
          {
            id: "6-1-2",
            title: "Private Client Area",
            slug: "/contact/support/client-area",
            pageType: "Common Page",
            seoScore: "Medium",
            isVisible: true,
            isPasswordProtected: true
          }
        ]
      },
      {
        id: "6-2",
        title: "Sales",
        slug: "/contact/sales",
        pageType: "Common Page",
        seoScore: "Medium",
        isVisible: true
      },
      {
        id: "6-3",
        title: "Technical Support",
        slug: "/contact/technical",
        pageType: "Common Page",
        seoScore: "Good",
        translationStatus: "Untranslated",
        isVisible: true
      }
    ]
  },
  {
    id: "7",
    title: "Upsell",
    slug: "/upsell",
    pageType: "Common Page",
    seoScore: "Good",
    isVisible: true
  }
];
