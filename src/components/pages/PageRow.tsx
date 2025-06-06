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
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.0641 6.21207C11.3244 5.95172 11.3244 5.52961 11.0641 5.26926C10.8037 5.00891 10.3816 5.00891 10.1213 5.26926L4.46443 10.9261C4.20408 11.1865 4.20408 11.6086 4.46443 11.8689C4.72478 12.1293 5.14689 12.1293 5.40724 11.8689L11.0641 6.21207Z" fill="#1B2124"/>
    <path d="M5.40726 5.93587C5.03908 5.93587 4.74059 5.63739 4.74059 5.26921C4.74059 4.90102 5.03908 4.60254 5.40726 4.60254H11.0641C11.4211 4.60254 11.7147 4.88366 11.7301 5.24025L11.9659 10.6614C11.9819 11.0293 11.6966 11.3404 11.3288 11.3564C10.9609 11.3724 10.6498 11.0871 10.6338 10.7193L10.4258 5.93587H5.40726Z" fill="#1B2124"/>
  </svg>
);

const ChevronIcon = ({ isExpanded }: { isExpanded: boolean }) => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 16 16" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}
    className="transition-transform duration-200"
  >
    <path d="M5.52859 11.5286C5.26824 11.7889 5.26824 12.2111 5.52859 12.4714C5.78894 12.7317 6.21106 12.7317 6.47141 12.4714L10.4714 8.47141C10.7238 8.219 10.7326 7.81264 10.4915 7.54953L6.8248 3.54953C6.57597 3.27811 6.15426 3.25977 5.88284 3.5086C5.61143 3.75743 5.59309 4.17914 5.84192 4.45055L9.07726 7.97993L5.52859 11.5286Z" fill="#1B2124"/>
  </svg>
);

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path opacity="0.3" fillRule="evenodd" clipRule="evenodd" d="M5.24399 6.88167L1.00003 11L1.00003 13L2.66669 13L2.66669 11.6667L4.29455 11.6667L4.29455 10.3333H5.66669L7.12299 8.76067L5.24399 6.88167Z" fill="#1B2124"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M5.49509 8.48527C3.93299 6.92317 3.93299 4.39053 5.49509 2.82843C7.05719 1.26633 9.58984 1.26633 11.1519 2.82843C12.714 4.39053 12.714 6.92317 11.1519 8.48527C9.58984 10.0474 7.05719 10.0474 5.49509 8.48527ZM8.37378 5.78799C8.76431 6.17851 9.39747 6.17851 9.78799 5.78799C10.1785 5.39747 10.1785 4.7643 9.78799 4.37378C9.39747 3.98325 8.76431 3.98325 8.37378 4.37378C7.98326 4.7643 7.98326 5.39747 8.37378 5.78799Z" fill="#1B2124"/>
  </svg>
);

const EyeVisibleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-100 hover:opacity-50 transition-opacity">
    <path d="M3 12C3 12 5.45455 6 12 6C16.9091 6 21 12 21 12C21 12 16.9091 18 12 18C5.45455 18 3 12 3 12Z" fill="#1B2124"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15Z" fill="white"/>
  </svg>
);

const EyeHiddenIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-100 hover:opacity-50 transition-opacity">
    <path d="M19.2079 9.84839C20.3304 11.0179 21 12 21 12C21 12 16.9091 18 12 18C11.1894 18 10.3879 17.8865 9.59549 17.6609L19.2079 9.84839Z" fill="#1B2124"/>
    <path d="M14.505 6.49483L12 9C10.3431 9 9 10.3431 9 12L5.52661 15.4734C3.75006 13.8335 3 12 3 12C3 12 5.45455 6 12 6C12.8665 6 13.7076 6.18695 14.505 6.49483Z" fill="#1B2124"/>
    <path opacity="0.3" d="M18.535 5.00003L5.09998 18.435L6.51498 19.85L19.95 6.41523L18.535 5.00003Z" fill="#1B2124"/>
  </svg>
);

const KebabIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-100 hover:opacity-50 transition-opacity">
    <path d="M8 4.66667C8.73638 4.66667 9.33333 4.06971 9.33333 3.33333C9.33333 2.59695 8.73638 2 8 2C7.26362 2 6.66667 2.59695 6.66667 3.33333C6.66667 4.06971 7.26362 4.66667 8 4.66667Z" fill="#1B2124"/>
    <path d="M8 9.33333C8.73638 9.33333 9.33333 8.73638 9.33333 8C9.33333 7.26362 8.73638 6.66667 8 6.66667C7.26362 6.66667 6.66667 7.26362 6.66667 8C6.66667 8.73638 7.26362 9.33333 8 9.33333Z" fill="#1B2124"/>
    <path d="M8 14C8.73638 14 9.33333 13.4031 9.33333 12.6667C9.33333 11.9303 8.73638 11.3333 8 11.3333C7.26362 11.3333 6.66667 11.9303 6.66667 12.6667C6.66667 13.4031 7.26362 14 8 14Z" fill="#1B2124"/>
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

  const handleSlugClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Handle slug click - could navigate to the page or show preview
    console.log('Slug clicked:', page.slug);
  };

  return (
    <TooltipProvider>
      <div key={page.id} className="font-sans">
        <div 
          className="group flex items-center border-b border-l-2 border-l-transparent hover:bg-[#FBFBFF] hover:border-l-[#5A4FFF] transition-colors cursor-pointer" 
          style={{ 
            paddingLeft: `${paddingLeft + 24}px`, 
            paddingRight: '24px',
            height: '64px',
            borderBottomColor: '#EFEFEF',
            borderBottomWidth: '1px'
          }} 
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
                    className={`text-sm font-medium truncate max-w-[300px] inline-block ${isUntranslated ? 'text-gray-400' : 'text-[#1B2124]'}`}
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
                    <span>
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
                    <span>
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
                  className="text-xs px-2 py-0 text-black font-medium text-center"
                  style={{
                    borderRadius: '5px',
                    background: '#FFD74B',
                    fontSize: '12px',
                    fontWeight: 500,
                    lineHeight: '16px'
                  }}
                >
                  Untranslated
                </span>
              )}
            </div>
          </div>

          {/* Slug */}
          <div className="w-48 px-4">
            {!isUntranslated ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={handleSlugClick}
                    className="text-[#1B2124] hover:text-[#5A4FFF] truncate block max-w-full text-left transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded"
                    style={{ fontSize: '14px' }}
                  >
                    {page.slug}
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{page.slug}</p>
                </TooltipContent>
              </Tooltip>
            ) : (
              <span 
                className="text-gray-400"
                style={{ fontSize: '14px' }}
              >
                -
              </span>
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
