
import React from "react";
import { Trash, Plus, Settings, Copy, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
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
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.5961 9.3181C16.9867 8.92757 16.9867 8.29441 16.5961 7.90388C16.2056 7.51336 15.5725 7.51336 15.1819 7.90388L6.69665 16.3892C6.30613 16.7797 6.30613 17.4129 6.69665 17.8034C7.08717 18.1939 7.72034 18.1939 8.11086 17.8034L16.5961 9.3181Z" fill="#1B2124"/>
    <path d="M8.1109 8.90381C7.55862 8.90381 7.1109 8.45609 7.1109 7.90381C7.1109 7.35152 7.55862 6.90381 8.1109 6.90381H16.5962C17.1316 6.90381 17.572 7.32549 17.5952 7.86037L17.9488 15.9921C17.9728 16.5439 17.5449 17.0106 16.9932 17.0346C16.4414 17.0586 15.9747 16.6307 15.9507 16.079L15.6387 8.90381H8.1109Z" fill="#1B2124"/>
  </svg>
);

const ChevronIcon = ({ isExpanded }: { isExpanded: boolean }) => (
  <svg 
    width="24" 
    height="24" 
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
  <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path opacity="0.3" fillRule="evenodd" clipRule="evenodd" d="M7.866 10.3225L1.50004 16.5L1.50005 19.5L4.50004 19.5L4.50005 17.5L6.44182 17.5L6.44182 15.5H8.50004L10.6845 13.141L7.866 10.3225Z" fill="#1B2124"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M8.24265 12.7279C5.8995 10.3848 5.8995 6.58579 8.24265 4.24264C10.5858 1.89949 14.3848 1.89949 16.7279 4.24264C19.0711 6.58579 19.0711 10.3848 16.7279 12.7279C14.3848 15.0711 10.5858 15.0711 8.24265 12.7279ZM12.5607 8.68198C13.1465 9.26777 14.0962 9.26777 14.682 8.68198C15.2678 8.09619 15.2678 7.14645 14.682 6.56066C14.0962 5.97487 13.1465 5.97487 12.5607 6.56066C11.9749 7.14645 11.9749 8.09619 12.5607 8.68198Z" fill="#1B2124"/>
  </svg>
);

const MoveIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M11.3799 13.005L5.4953 13.005C5.04657 13.005 4.6828 12.6412 4.6828 12.1925C4.6828 11.7438 5.04657 11.38 5.4953 11.38L11.3799 11.38L11.3799 4.26465C11.3799 3.81592 11.7437 3.45215 12.1924 3.45215C12.6412 3.45215 13.0049 3.81592 13.0049 4.26465L13.0049 11.38L20.1203 11.38C20.569 11.38 20.9328 11.7438 20.9328 12.1925C20.9328 12.6412 20.569 13.005 20.1203 13.005L13.0049 13.005L13.0049 18.8896C13.0049 19.3384 12.6412 19.7021 12.1924 19.7021C11.7437 19.7021 11.3799 19.3384 11.3799 18.8896L11.3799 13.005Z" fill="#1B2124"/>
    <path d="M12.1924 19.0867L13.916 17.3631C14.3647 17.0458 14.7477 17.0458 15.065 17.3631C15.3823 17.6804 15.3823 18.0634 15.065 18.5121L12.1924 21.3848L9.31977 18.5121C8.93675 18.1291 8.93675 17.7461 9.31977 17.3631C9.70278 16.9801 10.0858 16.9801 10.4688 17.3631L12.1924 19.0867ZM19.0867 12.1924L17.3631 10.4688C17.0458 10.0201 17.0458 9.63706 17.3631 9.31976C17.6804 9.00246 18.0634 9.00246 18.5122 9.31976L21.3848 12.1924L18.5122 15.065C18.1291 15.448 17.7461 15.448 17.3631 15.065C16.9801 14.682 16.9801 14.299 17.3631 13.916L19.0867 12.1924ZM12.1924 5.29809L10.4688 7.02166C10.0201 7.33897 9.63707 7.33897 9.31977 7.02166C9.00247 6.70436 9.00247 6.32135 9.31977 5.87262L12.1924 2.99999L15.065 5.87262C15.448 6.25563 15.448 6.63865 15.065 7.02166C14.682 7.40468 14.299 7.40468 13.916 7.02166L12.1924 5.29809ZM5.2981 12.1924L7.02167 13.916C7.33897 14.3647 7.33897 14.7477 7.02167 15.065C6.70437 15.3823 6.32135 15.3823 5.87262 15.065L3 12.1924L5.87262 9.31976C6.25564 8.93675 6.63865 8.93675 7.02167 9.31976C7.40469 9.70278 7.40469 10.0858 7.02167 10.4688L5.2981 12.1924Z" fill="#1B2124"/>
  </svg>
);

const KebabIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      <div key={page.id}>
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
                  <span className="text-xs text-gray-500 truncate block max-w-full">
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

          {/* Move Icon */}
          <div className="w-8 px-1 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={(e) => e.stopPropagation()}
              className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded p-1" 
              aria-label={`Move ${page.title}`}
            >
              <MoveIcon />
            </button>
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
                  <KebabIcon />
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
