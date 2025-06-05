
import React from "react";
import { Trash, Plus, Settings, Copy, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { PageItem } from "@/types/pages";

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

const ExternalLinkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.5961 9.3181C16.9867 8.92757 16.9867 8.29441 16.5961 7.90388C16.2056 7.51336 15.5725 7.51336 15.1819 7.90388L6.69665 16.3892C6.30613 16.7797 6.30613 17.4129 6.69665 17.8034C7.08717 18.1939 7.72034 18.1939 8.11086 17.8034L16.5961 9.3181Z" fill="#1B2124"/>
    <path d="M8.1109 8.90381C7.55862 8.90381 7.1109 8.45609 7.1109 7.90381C7.1109 7.35152 7.55862 6.90381 8.1109 6.90381H16.5962C17.1316 6.90381 17.572 7.32549 17.5952 7.86037L17.9488 15.9921C17.9728 16.5439 17.5449 17.0106 16.9932 17.0346C16.4414 17.0586 15.9747 16.6307 15.9507 16.079L15.6387 8.90381H8.1109Z" fill="#1B2124"/>
  </svg>
);

const ChevronIcon = ({ isExpanded }: { isExpanded: boolean }) => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}
    className="transition-transform duration-200"
  >
    <path d="M8.29289 17.2929C7.90237 17.6834 7.90237 18.3166 8.29289 18.7071C8.68342 19.0976 9.31658 19.0976 9.70711 18.7071L15.7071 12.7071C16.0857 12.3285 16.0989 11.7189 15.7372 11.3243L10.2372 5.32428C9.86396 4.91716 9.23139 4.88965 8.82427 5.26285C8.41716 5.63604 8.38965 6.26861 8.76285 6.67572L13.6159 11.9699L8.29289 17.2929Z" fill="#1B2124"/>
  </svg>
);

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path opacity="0.3" fillRule="evenodd" clipRule="evenodd" d="M7.866 10.3225L1.50004 16.5L1.50005 19.5L4.50004 19.5L4.50005 17.5L6.44182 17.5L6.44182 15.5H8.50004L10.6845 13.141L7.866 10.3225Z" fill="#1B2124"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M8.24265 12.7279C5.8995 10.3848 5.8995 6.58579 8.24265 4.24264C10.5858 1.89949 14.3848 1.89949 16.7279 4.24264C19.0711 6.58579 19.0711 10.3848 16.7279 12.7279C14.3848 15.0711 10.5858 15.0711 8.24265 12.7279ZM12.5607 8.68198C13.1465 9.26777 14.0962 9.26777 14.682 8.68198C15.2678 8.09619 15.2678 7.14645 14.682 6.56066C14.0962 5.97487 13.1465 5.97487 12.5607 6.56066C11.9749 7.14645 11.9749 8.09619 12.5607 8.68198Z" fill="#1B2124"/>
  </svg>
);

const EyeVisibleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-100 hover:opacity-50 transition-opacity">
    <path d="M3 12C3 12 5.45455 6 12 6C16.9091 6 21 12 21 12C21 12 16.9091 18 12 18C5.45455 18 3 12 3 12Z" fill="#1B2124"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15Z" fill="white"/>
  </svg>
);

const EyeHiddenIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-100 hover:opacity-50 transition-opacity">
    <path d="M19.2079 9.84839C20.3304 11.0179 21 12 21 12C21 12 16.9091 18 12 18C11.6894 18 11.3879 17.9865 11.0955 17.9608L19.2079 9.84839Z" fill="#1B2124"/>
    <path d="M14.5051 6.49485L12 9C10.3431 9 9 10.3431 9 12L5.52661 15.4734C3.75006 13.8335 3 12 3 12C3 12 5.45455 6 12 6C12.8665 6 13.7076 6.18695 14.5051 6.49485Z" fill="#1B2124"/>
    <path opacity="0.3" d="M18.535 5.00003L5.09998 18.4351L6.51419 19.8493L19.9492 6.41424L18.535 5.00003Z" fill="#1B2124"/>
  </svg>
);

const KebabIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-100 hover:opacity-50 transition-opacity">
    <path d="M12 7C13.1046 7 14 6.10457 14 5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5C10 6.10457 10.8954 7 12 7Z" fill="#1B2124"/>
    <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" fill="#1B2124"/>
    <path d="M12 21C13.1046 21 14 20.1046 14 19C14 17.8954 13.1046 17 12 17C10.8954 17 10 17.8954 10 19C10 20.1046 10.8954 21 12 21Z" fill="#1B2124"/>
  </svg>
);

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

  return (
    <TooltipProvider>
      <div key={page.id} className="font-sans">
        <div 
          className="group flex items-center border-b border-gray-200 py-3 hover:bg-gray-50 transition-colors cursor-pointer" 
          style={{ paddingLeft: `${paddingLeft + 12}px`, paddingRight: '12px' }} 
          role="row" 
          tabIndex={0} 
          aria-label={`${page.title} page row`}
          onClick={handleRowClick}
        >
          {/* Expand/collapse button */}
          <div className="w-5 flex justify-center mr-2">
            {hasChildren ? (
              <button 
                onClick={e => {
                  e.stopPropagation();
                  onToggleExpansion(page.id);
                }} 
                className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded" 
                aria-label={page.isExpanded ? `Collapse ${page.title}` : `Expand ${page.title}`} 
                aria-expanded={page.isExpanded}
              >
                <ChevronIcon isExpanded={page.isExpanded} />
              </button>
            ) : null}
          </div>

          {/* Title */}
          <div className="flex-1 min-w-0 mr-4">
            <div className="flex items-center gap-2 mb-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <span 
                    className={`text-sm font-medium truncate max-w-[300px] inline-block ${isUntranslated ? 'italic text-gray-400' : 'text-[#1B2124]'}`}
                  >
                    {page.title}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{page.title}</p>
                </TooltipContent>
              </Tooltip>
              
              {page.isPasswordProtected && (
                <LockIcon />
              )}
              
              {isExternalLink && (
                <ExternalLinkIcon />
              )}
              
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
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-xs text-[#1B2124] truncate block max-w-full">
                    {page.slug}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{page.slug}</p>
                </TooltipContent>
              </Tooltip>
            ) : (
              <span className="text-xs text-gray-400">-</span>
            )}
          </div>

          {/* Layout */}
          <div className="w-32 px-4">
            {!isUntranslated ? (
              <span className="text-sm text-[#1B2124]">{page.pageType}</span>
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
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleVisibility(page.id);
                }}
                aria-label={page.isVisible ? `Hide ${page.title} from menu` : `Show ${page.title} in menu`}
                className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded"
              >
                {page.isVisible ? <EyeVisibleIcon /> : <EyeHiddenIcon />}
              </button>
            ) : null}
          </div>

          {/* Actions */}
          <div className="w-16 flex items-center justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-1 h-auto hover:bg-transparent focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" 
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
                    className="cursor-pointer text-sm text-[#1B2124]"
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
                      className="cursor-pointer text-sm text-[#1B2124]"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Page settings
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={e => {
                        e.stopPropagation();
                        onDuplicatePage(page);
                      }} 
                      className="cursor-pointer text-sm text-[#1B2124]"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Duplicate page
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={e => {
                        e.stopPropagation();
                        onAddNestedPage(page);
                      }} 
                      className="cursor-pointer text-sm text-[#1B2124]"
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
                  className="cursor-pointer text-sm text-red-600 focus:text-red-600"
                >
                  <Trash className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

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
      </div>
    </TooltipProvider>
  );
};
