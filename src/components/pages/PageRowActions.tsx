
import React from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";
import { PageItem } from "@/types/pages";
import { KebabIcon } from "./PageRowIcons";
import { useIsMobile } from "@/hooks/use-mobile";

interface PageRowActionsProps {
  page: PageItem;
  onDeletePage: (page: PageItem) => void;
  onDuplicatePage: (page: PageItem) => void;
  onAddNestedPage: (page: PageItem) => void;
  onPageSettings: (page: PageItem) => void;
  onEditPage: (page: PageItem) => void;
  onTranslatePage: (page: PageItem) => void;
  onToggleVisibility: (pageId: string) => void;
}

export const PageRowActions: React.FC<PageRowActionsProps> = ({
  page,
  onDeletePage,
  onDuplicatePage,
  onAddNestedPage,
  onPageSettings,
  onEditPage,
  onTranslatePage,
  onToggleVisibility
}) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const hasChildren = page.children && page.children.length > 0;
  const isHomePage = page.id === "1";
  const isUntranslated = page.translationStatus === "Untranslated";

  const handleEditPage = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate("/edit-mode");
  };

  return (
    <div className="w-6 flex items-center justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-1 h-auto hover:bg-transparent outline-none focus:outline-none focus:ring-0" 
            aria-label={`More options for ${page.title}`} 
            onClick={e => e.stopPropagation()}
          >
            <KebabIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className="w-48 bg-white shadow-md border font-sans"
          style={{
            borderRadius: '4px',
            padding: '8px 0'
          }}
        >
          {isUntranslated ? (
            <DropdownMenuItem 
              onClick={e => {
                e.stopPropagation();
                onTranslatePage(page);
              }} 
              className="cursor-pointer text-[#1B2124] transition-colors"
              style={{
                height: '40px',
                padding: '8px 16px',
                fontSize: '14px',
                lineHeight: '24px',
                margin: '0',
                borderRadius: '0'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#5A4FFF';
                e.currentTarget.style.backgroundColor = 'rgba(90, 79, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#1B2124';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              Translate page
            </DropdownMenuItem>
          ) : (
            <>
              {/* 1. Edit page */}
              <DropdownMenuItem 
                onClick={handleEditPage} 
                className="cursor-pointer text-[#1B2124] transition-colors"
                style={{
                  height: '40px',
                  padding: '8px 16px',
                  fontSize: '14px',
                  lineHeight: '24px',
                  margin: '0',
                  borderRadius: '0'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#5A4FFF';
                  e.currentTarget.style.backgroundColor = 'rgba(90, 79, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#1B2124';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                Edit page
              </DropdownMenuItem>
              
              {/* 2. Add subpage */}
              <DropdownMenuItem 
                onClick={e => {
                  e.stopPropagation();
                  onAddNestedPage(page);
                }} 
                className="cursor-pointer text-[#1B2124] transition-colors"
                style={{
                  height: '40px',
                  padding: '8px 16px',
                  fontSize: '14px',
                  lineHeight: '24px',
                  margin: '0',
                  borderRadius: '0'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#5A4FFF';
                  e.currentTarget.style.backgroundColor = 'rgba(90, 79, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#1B2124';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                Add subpage
              </DropdownMenuItem>
              
              {/* 3. Duplicate */}
              <DropdownMenuItem 
                onClick={e => {
                  e.stopPropagation();
                  onDuplicatePage(page);
                }} 
                className="cursor-pointer text-[#1B2124] transition-colors"
                style={{
                  height: '40px',
                  padding: '8px 16px',
                  fontSize: '14px',
                  lineHeight: '24px',
                  margin: '0',
                  borderRadius: '0'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#5A4FFF';
                  e.currentTarget.style.backgroundColor = 'rgba(90, 79, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#1B2124';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                Duplicate
              </DropdownMenuItem>
              
              {/* 4. Hide from menu */}
              <DropdownMenuItem 
                onClick={e => {
                  e.stopPropagation();
                  onToggleVisibility(page.id);
                }} 
                className="cursor-pointer text-[#1B2124] transition-colors"
                style={{
                  height: '40px',
                  padding: '8px 16px',
                  fontSize: '14px',
                  lineHeight: '24px',
                  margin: '0',
                  borderRadius: '0'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#5A4FFF';
                  e.currentTarget.style.backgroundColor = 'rgba(90, 79, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#1B2124';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {page.isVisible ? 'Hide from menu' : 'Show in menu'}
              </DropdownMenuItem>
              
              {/* 5. Settings */}
              <DropdownMenuItem 
                onClick={e => {
                  e.stopPropagation();
                  onPageSettings(page);
                }} 
                className="cursor-pointer text-[#1B2124] transition-colors"
                style={{
                  height: '40px',
                  padding: '8px 16px',
                  fontSize: '14px',
                  lineHeight: '24px',
                  margin: '0',
                  borderRadius: '0'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#5A4FFF';
                  e.currentTarget.style.backgroundColor = 'rgba(90, 79, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#1B2124';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                Settings
              </DropdownMenuItem>
              
              {/* 6. Divider and 7. Delete */}
              {!isHomePage && (
                <>
                  <DropdownMenuSeparator />
                  {hasChildren ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <DropdownMenuItem 
                            disabled
                            className="cursor-not-allowed text-gray-400"
                            style={{
                              height: '40px',
                              padding: '8px 16px',
                              fontSize: '14px',
                              lineHeight: '24px',
                              margin: '0',
                              borderRadius: '0'
                            }}
                          >
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
                      className="cursor-pointer text-red-600 transition-colors"
                      style={{
                        height: '40px',
                        padding: '8px 16px',
                        fontSize: '14px',
                        lineHeight: '24px',
                        margin: '0',
                        borderRadius: '0'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#5A4FFF';
                        e.currentTarget.style.backgroundColor = 'rgba(90, 79, 255, 0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#DC2626';
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      Delete
                    </DropdownMenuItem>
                  )}
                </>
              )}
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
