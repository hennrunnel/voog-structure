
import React from "react";
import { ChevronDown, ChevronRight, Trash, Plus, ExternalLink, MoreVertical, Settings, Copy, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { PageItem, DragState } from "@/types/pages";

interface PageRowProps {
  page: PageItem;
  level: number;
  dragState: DragState;
  onToggleExpansion: (pageId: string) => void;
  onToggleVisibility: (pageId: string) => void;
  onDeletePage: (page: PageItem) => void;
  onDuplicatePage: (page: PageItem) => void;
  onAddNestedPage: (page: PageItem) => void;
  onPageSettings: (page: PageItem) => void;
  onEditPage: (page: PageItem) => void;
  onTranslatePage: (page: PageItem) => void;
  onDragStart: (e: React.DragEvent, pageId: string) => void;
  onDragOver: (e: React.DragEvent, pageId: string, position: 'before' | 'after' | 'nested') => void;
  onDragEnd: () => void;
  onDrop: (e: React.DragEvent, pageId: string, position: 'before' | 'after' | 'nested') => void;
  renderDropZone: (pageId: string, position: 'before' | 'after' | 'nested') => React.ReactNode;
}

const renderSeoScore = (score: "Good" | "Medium" | "Poor") => {
  const color = score === "Good" ? "bg-green-500" : score === "Medium" ? "bg-yellow-500" : "bg-red-500";
  return (
    <div className="flex items-center justify-center">
      <div className={`w-2 h-2 rounded-full ${color}`} />
    </div>
  );
};

export const PageRow: React.FC<PageRowProps> = ({
  page,
  level = 0,
  dragState,
  onToggleExpansion,
  onToggleVisibility,
  onDeletePage,
  onDuplicatePage,
  onAddNestedPage,
  onPageSettings,
  onEditPage,
  onTranslatePage,
  onDragStart,
  onDragOver,
  onDragEnd,
  onDrop,
  renderDropZone
}) => {
  const hasChildren = page.children && page.children.length > 0;
  const paddingLeft = level * 24;
  const isDraggedPage = dragState.draggedPageId === page.id;
  const isHomePage = page.id === "1";
  const isUntranslated = page.translationStatus === "Untranslated";

  return (
    <div key={page.id}>
      {renderDropZone(page.id, 'before')}
      
      <div 
        className={`group flex items-center border-b border-gray-200 py-3 hover:bg-gray-50 transition-colors ${isDraggedPage ? 'opacity-50' : ''}`} 
        style={{ paddingLeft: `${paddingLeft + 12}px`, paddingRight: '12px' }} 
        role="row" 
        tabIndex={0} 
        aria-label={`${page.title} page row`}
        draggable={!isHomePage}
        onDragStart={e => {
          if (!isHomePage) {
            onDragStart(e, page.id);
          }
        }}
        onDragEnd={onDragEnd}
        onDragOver={e => {
          if (dragState.isDragging && dragState.draggedPageId !== page.id) {
            e.preventDefault();
            onDragOver(e, page.id, 'after');
          }
        }}
        onDrop={e => {
          if (dragState.isDragging && dragState.draggedPageId !== page.id) {
            onDrop(e, page.id, 'after');
          }
        }}
      >
        {/* Expand/collapse button */}
        <div className="w-5 flex justify-center mr-2">
          {hasChildren && (
            <button 
              onClick={e => {
                e.stopPropagation();
                onToggleExpansion(page.id);
              }} 
              className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded" 
              aria-label={page.isExpanded ? `Collapse ${page.title}` : `Expand ${page.title}`} 
              aria-expanded={page.isExpanded}
            >
              {page.isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          )}
        </div>

        {/* Title */}
        <div className="flex-1 min-w-0 mr-4">
          <div className="flex items-center gap-2 mb-1">
            <span 
              className={`text-sm font-medium cursor-pointer hover:text-blue-600 ${isUntranslated ? 'italic text-gray-400' : 'text-gray-900'}`}
              onClick={(e) => {
                e.stopPropagation();
                onEditPage(page);
              }}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  e.stopPropagation();
                  onEditPage(page);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Edit ${page.title} page`}
            >
              {page.title}
            </span>
            {isUntranslated && (
              <Badge variant="secondary" className="text-xs px-2 py-0 bg-gray-100 text-gray-600 border-0">
                Untranslated
              </Badge>
            )}
          </div>
        </div>

        {/* Slug */}
        <div className="w-48 px-4">
          {!isUntranslated ? (
            <button 
              onClick={e => {
                e.stopPropagation();
                window.open(page.slug, '_blank');
              }} 
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded" 
              aria-label={`Open ${page.slug} in new tab`}
            >
              <span className="truncate">{page.slug}</span>
              <ExternalLink className="w-3 h-3 flex-shrink-0" />
            </button>
          ) : (
            <span className="text-xs text-gray-400">-</span>
          )}
        </div>

        {/* Page Type */}
        <div className="w-32 px-4">
          {!isUntranslated ? (
            <span className="text-sm text-gray-600">{page.pageType}</span>
          ) : (
            <span className="text-sm text-gray-400">-</span>
          )}
        </div>

        {/* SEO Score */}
        <div className="w-24 px-4">
          {!isUntranslated ? (
            <div aria-label={`SEO Score: ${page.seoScore}`}>
              {renderSeoScore(page.seoScore)}
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-gray-300" />
            </div>
          )}
        </div>

        {/* Menu Visibility Toggle */}
        <div className="w-24 px-4 flex justify-center">
          {!isUntranslated ? (
            <Switch 
              checked={page.isVisible} 
              onCheckedChange={(checked) => {
                const e = window.event as Event;
                e?.stopPropagation();
                onToggleVisibility(page.id);
              }}
              onClick={(e) => e.stopPropagation()}
              aria-label={page.isVisible ? `Hide ${page.title} from menu` : `Show ${page.title} in menu`}
              className="data-[state=checked]:bg-[#443DF6] data-[state=unchecked]:bg-[#443DF6] data-[state=unchecked]:opacity-10 w-8 h-4 [&>span]:w-3 [&>span]:h-3 [&>span]:data-[state=checked]:translate-x-4 [&>span]:data-[state=unchecked]:translate-x-0"
            />
          ) : null}
        </div>

        {/* Actions */}
        <div className="w-16 flex items-center justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-1 h-auto hover:bg-gray-200 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" 
                aria-label={`More options for ${page.title}`} 
                onClick={e => e.stopPropagation()}
              >
                <MoreVertical className="w-4 h-4 text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-white shadow-md border">
              {isUntranslated ? (
                <DropdownMenuItem 
                  onClick={e => {
                    e.stopPropagation();
                    onTranslatePage(page);
                  }} 
                  className="cursor-pointer"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Translate page
                </DropdownMenuItem>
              ) : (
                <>
                  <DropdownMenuItem 
                    onClick={e => {
                      e.stopPropagation();
                      onPageSettings(page);
                    }} 
                    className="cursor-pointer"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Page settings
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={e => {
                      e.stopPropagation();
                      onDuplicatePage(page);
                    }} 
                    className="cursor-pointer"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Duplicate page
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={e => {
                      e.stopPropagation();
                      onAddNestedPage(page);
                    }} 
                    className="cursor-pointer"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add subpage
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuItem 
                onClick={e => {
                  e.stopPropagation();
                  onDeletePage(page);
                }} 
                className="cursor-pointer text-red-600 focus:text-red-600"
              >
                <Trash className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {renderDropZone(page.id, 'nested')}

      {/* Render children if expanded */}
      {hasChildren && page.isExpanded && page.children?.map(child => (
        <PageRow
          key={child.id}
          page={child}
          level={level + 1}
          dragState={dragState}
          onToggleExpansion={onToggleExpansion}
          onToggleVisibility={onToggleVisibility}
          onDeletePage={onDeletePage}
          onDuplicatePage={onDuplicatePage}
          onAddNestedPage={onAddNestedPage}
          onPageSettings={onPageSettings}
          onEditPage={onEditPage}
          onTranslatePage={onTranslatePage}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDragEnd={onDragEnd}
          onDrop={onDrop}
          renderDropZone={renderDropZone}
        />
      ))}

      {renderDropZone(page.id, 'after')}
    </div>
  );
};
