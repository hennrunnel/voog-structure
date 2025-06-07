
import React from "react";
import { Trash, Plus, Settings, Copy, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { TableCell, TableRow } from "@/components/ui/table";
import { PageItem } from "@/types/pages";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { EyeVisibleIcon } from "@/components/icons/EyeVisibleIcon";
import { EyeHiddenIcon } from "@/components/icons/EyeHiddenIcon";
import { KebabIcon } from "@/components/icons/KebabIcon";
import { ExternalLinkIcon } from "@/components/icons/ExternalLinkIcon";
import { LockIcon } from "@/components/icons/LockIcon";
import { MoveIcon } from "@/components/icons/MoveIcon";

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

  const handleVisibilityToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleVisibility(page.id);
  };

  return (
    <TooltipProvider>
      <>
        <TableRow 
          className="group border-l-2 border-l-transparent hover:bg-hover hover:border-l-primary-brand transition-colors cursor-pointer border-b border-subtle" 
          role="row" 
          tabIndex={0} 
          aria-label={`${page.title} page row`}
          onClick={handleRowClick}
          style={{ height: '63px' }}
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
                    className="text-secondary hover:text-primary transition-colors outline-none focus:outline-none focus:ring-0 rounded" 
                    aria-label={page.isExpanded ? `Collapse ${page.title}` : `Expand ${page.title}`} 
                    aria-expanded={page.isExpanded}
                  >
                    <ChevronIcon isExpanded={page.isExpanded} />
                  </button>
                ) : null}
              </div>

              {/* Title and badges */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span 
                        className={`text-sm font-medium truncate max-w-[300px] inline-block ${isUntranslated ? 'text-gray-400' : 'text-primary'}`}
                      >
                        {page.title}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{page.title}</p>
                    </TooltipContent>
                  </Tooltip>
                  
                  {page.isPasswordProtected && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="text-primary">
                          <LockIcon />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Password protected</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                  
                  {isExternalLink && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="text-primary">
                          <ExternalLinkIcon />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>External link</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                  
                  {isUntranslated && (
                    <span 
                      className="text-xs px-2 py-0.5 text-warning font-medium bg-warning rounded-md leading-tight"
                    >
                      Untranslated
                    </span>
                  )}
                </div>
              </div>
            </div>
          </TableCell>

          {/* Slug */}
          <TableCell className="w-48 px-4 align-middle">
            {!isUntranslated ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={handleSlugClick}
                    className="text-primary hover:text-primary-brand hover:underline truncate block w-full max-w-44 text-left transition-colors cursor-pointer outline-none focus:outline-none focus:ring-0 rounded text-sm"
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
              <span className="text-sm text-primary">{page.pageType}</span>
            ) : (
              <span className="text-sm text-gray-400">-</span>
            )}
          </TableCell>

          {/* SEO Score */}
          <TableCell className="w-24 px-4 align-middle">
            {!isUntranslated ? (
              <div aria-label={`SEO Score: ${page.seoScore}`}>
                {renderSeoScore(page.seoScore)}
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-gray-300" />
              </div>
            )}
          </TableCell>

          {/* Menu Visibility Toggle */}
          <TableCell className="w-24 px-4 align-middle">
            <div className="flex justify-center">
              {!isUntranslated ? (
                <button
                  onClick={handleVisibilityToggle}
                  aria-label={page.isVisible ? `Hide ${page.title} from menu` : `Show ${page.title} in menu`}
                  className="outline-none focus:outline-none focus:ring-0 rounded text-primary"
                >
                  {page.isVisible ? <EyeVisibleIcon /> : <EyeHiddenIcon />}
                </button>
              ) : null}
            </div>
          </TableCell>

          {/* Move handle */}
          <TableCell className="w-4 pr-2 align-middle">
            <div className={`${isHomePage ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'} transition-opacity text-secondary`}>
              <MoveIcon />
            </div>
          </TableCell>

          {/* Actions */}
          <TableCell className="w-6 pr-6 align-middle">
            <div className="flex items-center justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="p-1 h-auto hover:bg-transparent outline-none focus:outline-none focus:ring-0 text-primary" 
                    aria-label={`More options for ${page.title}`} 
                    onClick={e => e.stopPropagation()}
                  >
                    <KebabIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-white shadow-md border font-sans">
                  {isUntranslated ? (
                    <DropdownMenuItem 
                      onClick={e => {
                        e.stopPropagation();
                        onTranslatePage(page);
                      }} 
                      className="cursor-pointer text-sm text-primary"
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
                        className="cursor-pointer text-sm text-primary"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Page settings
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={e => {
                          e.stopPropagation();
                          onDuplicatePage(page);
                        }} 
                        className="cursor-pointer text-sm text-primary"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Duplicate page
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={e => {
                          e.stopPropagation();
                          onAddNestedPage(page);
                        }} 
                        className="cursor-pointer text-sm text-primary"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add subpage
                      </DropdownMenuItem>
                      {!isHomePage && (
                        hasChildren ? (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div>
                                <DropdownMenuItem 
                                  disabled
                                  className="cursor-not-allowed text-sm text-gray-400"
                                >
                                  <Trash className="w-4 h-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Cannot delete page with subpages</p>
                            </TooltipContent>
                          </Tooltip>
                        ) : (
                          <DropdownMenuItem 
                            onClick={e => {
                              e.stopPropagation();
                              onDeletePage(page);
                            }} 
                            className="cursor-pointer text-sm text-red-600 focus:text-red-600"
                          >
                            <Trash className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        )
                      )}
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
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
