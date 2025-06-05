
export interface PageItem {
  id: string;
  title: string;
  slug: string;
  pageType: string;
  seoScore: "Good" | "Medium" | "Poor";
  translationStatus?: "Untranslated" | "Hidden";
  isVisible: boolean;
  children?: PageItem[];
  isExpanded?: boolean;
}

export interface LayoutOption {
  id: string;
  title: string;
  icon: string;
}

export interface DragState {
  isDragging: boolean;
  draggedPageId: string | null;
  dropZone: {
    pageId: string;
    position: 'before' | 'after' | 'nested';
  } | null;
}
