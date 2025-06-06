
import React from "react";
import { Trash, Plus, Settings, Copy, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
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

const LockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1 opacity-60">
    <path d="M11.6666 6.41666H11.0833V4.66666C11.0833 2.64999 9.51665 1.16666 7.58331 1.16666C5.64998 1.16666 4.08331 2.64999 4.08331 4.66666V6.41666H3.49998C2.67498 6.41666 1.99998 7.09166 1.99998 7.91666V11.0833C1.99998 11.9083 2.67498 12.5833 3.49998 12.5833H11.6666C12.4916 12.5833 13.1666 11.9083 13.1666 11.0833V7.91666C13.1666 7.09166 12.4916 6.41666 11.6666 6.41666ZM5.24998 4.66666C5.24998 3.29166 6.29165 2.33333 7.58331 2.33333C8.87498 2.33333 9.91665 3.29166 9.91665 4.66666V6.41666H5.24998V4.66666Z" fill="#8D9091"/>
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1 opacity-60">
    <path d="M10.5 3.91669L5.25 9.16669L4.08333 8.00002L9.33333 2.75002H5.83333V1.16669H12.25V7.58335H10.6667V4.08335L10.5 3.91669Z" fill="#8D9091"/>
    <path d="M10.5 10.5H3.5V3.5H7V1.75H3.5C2.6 1.75 1.75 2.6 1.75 3.5V10.5C1.75 11.4 2.6 12.25 3.5 12.25H10.5C11.4 12.25 12.25 11.4 12.25 10.5V7H10.5V10.5Z" fill="#8D9091"/>
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1 opacity-60">
    <path d="M7.5 5L12.5 10L7.5 15" stroke="#8D9091" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EyeHiddenIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-50">
    <path d="M19.2079 9.84839C20.3304 11.0179 21 12 21 12C21 12 16.9091 18 12 18C11.1894 18 10.3879 17.8865 9.59549 17.6609L19.2079 9.84839Z" fill="#1B2124"/>
    <path d="M14.505 6.49483L12 9C10.3431 9 9 10.3431 9 12L5.52661 15.4734C3.75006 13.8335 3 12 3 12C3 12 5.45455 6 12 6C12.8665 6 13.7076 6.18695 14.505 6.49483Z" fill="#1B2124"/>
    <path opacity="0.3" d="M18.535 5.00003L5.09998 18.435L6.51498 19.85L19.95 6.41523L18.535 5.00003Z" fill="#1B2124"/>
  </svg>
);

const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60">
    <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="#8D9091" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="3" stroke="#8D9091" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const PageRow = ({
  page,
  level,
  onToggleExpansion,
  onToggleVisibility,
  onDeletePage,
  onDuplicatePage,
  onAddNestedPage,
  onPageSettings,
  onEditPage,
  onTranslatePage
}: PageRowProps) => {
  const paddingLeft = level * 20;
  const isHomePage = page.title === "Home";
  const isUntranslated = page.translationStatus === "Untranslated";
  const isExternalLink = page.pageType === "Link";

  const handleRowClick = () => {
    if (page.translationStatus === "Untranslated") {
      onEditPage(page);
    }
  };

  return (
    <TooltipProvider>
      <div role="row" aria-label={`Page: ${page.title}`}>
        <div 
          className="group flex items-center border-b border-l-2 border-l-transparent hover:bg-[#FBFBFF] hover:border-l-[#5A4FFF] transition-colors cursor-pointer" 
          style={{ 
            paddingLeft: `${paddingLeft + 24}px`, 
            paddingRight: '24px',
            height: '64px',
            borderBottomColor: '#EFEFEF',
            borderBottomWidth: '0.5px'
          }}
          onClick={handleRowClick}
        >
          {/* Expand/collapse + Title */}
          <div className="flex items-center mr-4" style={{ minWidth: 0, flex: 1 }}>
            <div className="w-5 mr-2 flex justify-center">
              {page.children && page.children.length > 0 && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleExpansion(page.id);
                  }}
                  className="p-1 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  aria-label={page.isExpanded ? "Collapse" : "Expand"}
                >
                  <ChevronRightIcon />
                </button>
              )}
            </div>
            <span className="text-[#1B2124] text-sm font-medium truncate flex items-center">
              {page.title}
              {isExternalLink && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span>
                      <ExternalLinkIcon />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>External link</p>
                  </TooltipContent>
                </Tooltip>
              )}
              {page.isPasswordProtected && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span>
                      <LockIcon />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Password protected</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </span>
          </div>
          
          {/* Slug */}
          <div className="w-48 px-4">
            <span className="text-[#8D9091] text-sm truncate">{page.slug}</span>
          </div>
          
          {/* Layout */}
          <div className="w-32 px-4">
            <span className="text-[#8D9091] text-sm truncate">
              {isUntranslated ? (
                <span className="text-[#F59E0B] bg-[#FEF3C7] px-2 py-1 rounded text-xs">
                  Untranslated
                </span>
              ) : (
                page.pageType
              )}
            </span>
          </div>
          
          {/* SEO */}
          <div className="w-24 px-4 text-center">
            <span className={`text-sm ${
              page.seoScore === "Good" ? "text-[#059669]" : 
              page.seoScore === "Needs attention" ? "text-[#F59E0B]" : 
              "text-[#DC2626]"
            }`}>
              {page.seoScore}
            </span>
          </div>
          
          {/* In menu + Visibility Toggle */}
          <div className="w-24 px-4 text-center flex justify-center">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onToggleVisibility(page.id);
              }}
              className="p-1 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              aria-label={page.isVisible ? "Hide page" : "Show page"}
            >
              {page.isVisible ? <EyeIcon /> : <EyeHiddenIcon />}
            </button>
          </div>
          
          {/* Actions */}
          <div className="w-16 flex justify-center">
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  onPageSettings(page);
                }}
                className="h-8 w-8 p-0 hover:bg-gray-100"
                aria-label="Page settings"
              >
                <Settings className="h-4 w-4 text-gray-500" />
              </Button>
              
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  onDuplicatePage(page);
                }}
                className="h-8 w-8 p-0 hover:bg-gray-100"
                aria-label="Duplicate page"
              >
                <Copy className="h-4 w-4 text-gray-500" />
              </Button>
              
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddNestedPage(page);
                }}
                className="h-8 w-8 p-0 hover:bg-gray-100"
                aria-label="Add nested page"
              >
                <Plus className="h-4 w-4 text-gray-500" />
              </Button>
              
              {!isHomePage && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeletePage(page);
                  }}
                  className="h-8 w-8 p-0 hover:bg-red-100"
                  aria-label="Delete page"
                >
                  <Trash className="h-4 w-4 text-red-500" />
                </Button>
              )}
            </div>
          </div>
        </div>
        
        {/* Render children */}
        {page.isExpanded && page.children?.map(child => (
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
