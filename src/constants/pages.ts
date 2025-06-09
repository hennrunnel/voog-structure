import { PageItem } from "@/types/pages";

export interface LayoutOption {
  id: string;
  title: string;
  icon: string;
}

export const layoutOptions: LayoutOption[] = [
  {
    id: "front-page",
    title: "Front page",
    icon: "🏠"
  },
  {
    id: "common-page", 
    title: "Common page",
    icon: "📄"
  },
  {
    id: "blog-layout",
    title: "Blog",
    icon: "📝"
  },
  {
    id: "shop-layout",
    title: "Shop",
    icon: "🛍️"
  },
  {
    id: "external-link",
    title: "External link",
    icon: "🔗"
  }
];

export const mockPages: PageItem[] = [
  {
    id: "1",
    title: "Home",
    slug: "/",
    pageType: "Front page",
    seoScore: "Good",
    isVisible: true,
    isExpanded: false,
    children: [
      {
        id: "2",
        title: "About",
        slug: "/about",
        pageType: "Common page",
        seoScore: "Medium",
        isVisible: true,
        isExpanded: false,
        children: [
          {
            id: "3",
            title: "Team",
            slug: "/about/team",
            pageType: "Common page",
            seoScore: "Poor",
            isVisible: true
          },
          {
            id: "4",
            title: "History",
            slug: "/about/history",
            pageType: "Common page",
            seoScore: "Good",
            isVisible: false
          }
        ]
      },
      {
        id: "5",
        title: "Services",
        slug: "/services",
        pageType: "Common page",
        seoScore: "Good",
        isVisible: true,
        isExpanded: false,
        children: [
          {
            id: "6",
            title: "Consulting",
            slug: "/services/consulting",
            pageType: "Common page",
            seoScore: "Medium",
            isVisible: true
          },
          {
            id: "7",
            title: "Development",
            slug: "/services/development",
            pageType: "Common page",
            seoScore: "Good",
            isVisible: true
          }
        ]
      },
      {
        id: "8",
        title: "Blog",
        slug: "/blog",
        pageType: "Blog",
        seoScore: "Good",
        isVisible: true
      },
      {
        id: "9",
        title: "Contact",
        slug: "/contact",
        pageType: "Common page",
        seoScore: "Medium",
        isVisible: true
      }
    ]
  },
  {
    id: "10",
    title: "Shop",
    slug: "/shop",
    pageType: "Shop",
    seoScore: "Good",
    isVisible: true,
    isExpanded: false,
    children: [
      {
        id: "11",
        title: "Products",
        slug: "/shop/products",
        pageType: "Common page",
        seoScore: "Medium",
        isVisible: true
      },
      {
        id: "12",
        title: "Cart",
        slug: "/shop/cart",
        pageType: "Common page",
        seoScore: "Poor",
        isVisible: false
      }
    ]
  },
  {
    id: "13",
    title: "Help",
    slug: "/help",
    pageType: "Common page",
    seoScore: "Medium",
    isVisible: true
  }
];
