import React from "react";
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { TableCell, TableRow } from "@/components/ui/table";
import { PageItem } from "@/types/pages";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { MoveIcon } from "@/components/icons/MoveIcon";
import { SeoScore } from "./SeoScore";
import { VisibilityToggle } from "./VisibilityToggle";
import { PageTitle } from "./PageTitle";
import { PageActionsDropdown } from "./PageActionsDropdown";

interface PageRowProps {
  page: PageItem;
  level: number;
  onToggleExpansion: (pageId: string) => void;
  onToggleVisibility: (pageId: string) => void;
  onDeletePage: (page: PageItem) => void;
  onDuplicatePage: (page: PageItem) => void;
  onAddNestedPage: (page: PageItem) => void;
  onPageSettings: (page: PageItem) => void;
  onEditPage: (page: PageItem) => void;
  onTranslatePage: (page: PageItem) => void;
}

export const PageRow: React.FC<PageRowProps> = ({
  page,
  level = 0,
  onToggleExpansion,
  onToggleVisibility,
  onDeletePage,
  onDuplicatePage,
  onAddNestedPage,
  onPageSettings,
  onEditPage,
  onTranslatePage
}) => {
  const hasChildren = page.children && page.children.length > 0;
  const paddingLeft = level * 24;
  const isHomePage = page.id === "1";
  const isUntranslated = page.translationStatus === "Untranslated";
  const isExternalLink = page.pageType === "Link";

  const handleRowClick = () => {
    if (page.translationStatus === "Untranslated") {
      onEditPage(page);
    } else {
      onPageSettings(page);
    }
  };

  const handleSlugClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Slug clicked:', page.slug);
  };

  const handleVisibilityToggle = () => {
    onToggleVisibility(page.id);
  };

  return (
    <TooltipProvider>
      <>
        <TableRow 
          role="row" 
          tabIndex={0} 
          aria-label={`${page.title} page row`}
          onClick={handleRowClick}
          style={{ height: '63px' }}
          className="group hover:bg-primary-blue-2 transition-colors cursor-pointer border-b border-subtle"
        >
          {/* Title with expand/collapse */}
          <TableCell className="p-0 align-middle">
            <div className="flex items-center h-full" style={{ paddingLeft: `${paddingLeft + 24}px` }}>
              {/* Expand/collapse button */}
              <div className="w-5 flex justify-center mr-2">
                {hasChildren ? (
                  <button 
                    onClick={e => {
                      e.stopPropagation();
                      onToggleExpansion(page.id);
                    }} 
                    className="text-black hover:text-primary-blue transition-colors outline-none focus:outline-none focus:ring-0 rounded" 
                    aria-label={page.isExpanded ? `Collapse ${page.title}` : `Expand ${page.title}`} 
                    aria-expanded={page.isExpanded}
                  >
                    <ChevronIcon isExpanded={page.isExpanded} />
                  </button>
                ) : null}
              </div>

              {/* Title and badges */}
              <PageTitle 
                title={page.title}
                isUntranslated={isUntranslated}
                isPasswordProtected={page.isPasswordProtected}
                isExternalLink={isExternalLink}
              />
            </div>
          </TableCell>

          {/* Slug */}
          <TableCell className="w-28 px-4 align-middle">
            {!isUntranslated ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={handleSlugClick}
                    className="text-black hover:text-primary-blue hover:underline truncate block w-full max-w-24 text-left transition-colors cursor-pointer outline-none focus:outline-none focus:ring-0 rounded text-sm"
                  >
                    {page.slug}
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{page.slug}</p>
                </TooltipContent>
              </Tooltip>
            ) : (
              <span className="text-gray-400 text-sm">-</span>
            )}
          </TableCell>

          {/* Layout */}
          <TableCell className="w-32 px-4 align-middle">
            {!isUntranslated ? (
              <span className="text-sm text-black whitespace-nowrap">{page.pageType}</span>
            ) : (
              <span className="text-sm text-gray-400">-</span>
            )}
          </TableCell>

          {/* SEO Score */}
          <TableCell className="w-24 px-4 align-middle">
            <SeoScore score={page.seoScore} isUntranslated={isUntranslated} />
          </TableCell>

          {/* Menu Visibility Toggle */}
          <TableCell className="w-24 px-4 align-middle">
            <VisibilityToggle 
              isVisible={page.isVisible}
              isUntranslated={isUntranslated}
              pageTitle={page.title}
              onToggle={handleVisibilityToggle}
            />
          </TableCell>

          {/* Move handle */}
          <TableCell className="w-4 pr-2 align-middle">
            <div className={`${isHomePage ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'} transition-opacity text-black`}>
              <MoveIcon />
            </div>
          </TableCell>

          {/* Actions */}
          <TableCell className="w-6 pr-6 align-middle">
            <PageActionsDropdown 
              page={page}
              isHomePage={isHomePage}
              hasChildren={hasChildren}
              isUntranslated={isUntranslated}
              onPageSettings={onPageSettings}
              onDuplicatePage={onDuplicatePage}
              onAddNestedPage={onAddNestedPage}
              onDeletePage={onDeletePage}
              onTranslatePage={onTranslatePage}
            />
          </TableCell>
        </TableRow>

        {/* Render children if expanded */}
        {hasChildren && page.isExpanded && page.children?.map(child => (
          <PageRow
            key={child.id}
            page={child}
            level={level + 1}
            onToggleExpansion={onToggleExpansion}
            onToggleVisibility={onToggleVisibility}
            onDeletePage={onDeletePage}
            onDuplicatePage={onDuplicatePage}
            onAddNestedPage={onAddNestedPage}
            onPageSettings={onPageSettings}
            onEditPage={onEditPage}
            onTranslatePage={onTranslatePage}
          />
        ))}
      </>
    </TooltipProvider>
  );
};
