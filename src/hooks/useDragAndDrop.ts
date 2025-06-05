
import { useState } from "react";
import { DragState, PageItem } from "@/types/pages";

export const useDragAndDrop = (pages: PageItem[], setPages: (pages: PageItem[]) => void) => {
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    draggedPageId: null,
    dropZone: null
  });

  const handleDragStart = (e: React.DragEvent, pageId: string) => {
    if (pageId === "1") return; // Prevent dragging Home page

    setDragState({
      isDragging: true,
      draggedPageId: pageId,
      dropZone: null
    });
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", pageId);
  };

  const handleDragOver = (e: React.DragEvent, targetPageId: string, position: 'before' | 'after' | 'nested') => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    
    if (dragState.draggedPageId && dragState.draggedPageId !== targetPageId) {
      setDragState(prev => ({
        ...prev,
        dropZone: {
          pageId: targetPageId,
          position
        }
      }));
    }
  };

  const handleDragEnd = () => {
    setDragState({
      isDragging: false,
      draggedPageId: null,
      dropZone: null
    });
  };

  const handleDrop = (e: React.DragEvent, targetPageId: string, position: 'before' | 'after' | 'nested') => {
    e.preventDefault();
    
    if (dragState.draggedPageId && dragState.draggedPageId !== targetPageId) {
      console.log(`Moving page ${dragState.draggedPageId} ${position} page ${targetPageId}`);
      
      const reorderPages = (pages: PageItem[], draggedId: string, targetId: string, pos: 'before' | 'after' | 'nested'): PageItem[] => {
        let draggedPage: PageItem | null = null;
        
        const removePageRecursive = (pageList: PageItem[]): PageItem[] => {
          return pageList.filter(page => {
            if (page.id === draggedId) {
              draggedPage = page;
              return false;
            }
            if (page.children) {
              page.children = removePageRecursive(page.children);
            }
            return true;
          });
        };
        
        const updatedPages = removePageRecursive([...pages]);
        
        if (!draggedPage) return pages;
        
        const insertPageRecursive = (pageList: PageItem[]): PageItem[] => {
          const result: PageItem[] = [];
          
          for (let i = 0; i < pageList.length; i++) {
            const page = pageList[i];
            
            if (page.id === targetId) {
              if (pos === 'before') {
                result.push(draggedPage);
                result.push(page);
              } else if (pos === 'after') {
                result.push(page);
                result.push(draggedPage);
              } else if (pos === 'nested') {
                const updatedPage = {
                  ...page,
                  children: [...(page.children || []), draggedPage],
                  isExpanded: true
                };
                result.push(updatedPage);
              }
            } else {
              if (page.children && page.children.length > 0) {
                const updatedChildren = insertPageRecursive(page.children);
                result.push({
                  ...page,
                  children: updatedChildren
                });
              } else {
                result.push(page);
              }
            }
          }
          
          return result;
        };
        
        return insertPageRecursive(updatedPages);
      };
      
      setPages(reorderPages(pages, dragState.draggedPageId!, targetPageId, position));
    }
    
    handleDragEnd();
  };

  return {
    dragState,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDrop
  };
};
