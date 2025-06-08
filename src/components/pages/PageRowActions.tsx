
import React from "react";
import { Trash, Plus, Settings, Copy, FileText, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { PageItem } from "@/types/pages";
import { KebabIcon } from "./PageRowIcons";

interface PageRowActionsProps {
  page: PageItem;
  onDeletePage: (page: PageItem) => void;
  onDuplicatePage: (page: PageItem) => void;
  onAddNestedPage: (page: PageItem) => void;
  onPageSettings: (page: PageItem) => void;
  onEditPage: (page: PageItem) => void;
  onTranslatePage: (page: PageItem) => void;
}

export const PageRowActions: React.FC<PageRowActionsProps> = ({
  page,
  onDeletePage,
  onDuplicatePage,
  onAddNestedPage,
  onPageSettings,
  onEditPage,
  onTranslatePage
}) => {
  const hasChildren = page.children && page.children.length > 0;
  const isHomePage = page.id === "1";
  const isUntranslated = page.translationStatus === "Untranslated";

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
              className="cursor-pointer text-[#1B2124] hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white transition-colors"
              style={{
                height: '40px',
                padding: '8px 16px',
                fontSize: '14px',
                lineHeight: '24px',
                margin: '0',
                borderRadius: '0'
              }}
            >
              <FileText className="w-4 h-4 mr-2" />
              Translate page
            </DropdownMenuItem>
          ) : (
            <>
              <DropdownMenuItem 
                onClick={e => {
                  e.stopPropagation();
                  onEditPage(page);
                }} 
                className="cursor-pointer text-[#1B2124] hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white transition-colors"
                style={{
                  height: '40px',
                  padding: '8px 16px',
                  fontSize: '14px',
                  lineHeight: '24px',
                  margin: '0',
                  borderRadius: '0'
                }}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit page
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={e => {
                  e.stopPropagation();
                  onPageSettings(page);
                }} 
                className="cursor-pointer text-[#1B2124] hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white transition-colors"
                style={{
                  height: '40px',
                  padding: '8px 16px',
                  fontSize: '14px',
                  lineHeight: '24px',
                  margin: '0',
                  borderRadius: '0'
                }}
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={e => {
                  e.stopPropagation();
                  onDuplicatePage(page);
                }} 
                className="cursor-pointer text-[#1B2124] hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white transition-colors"
                style={{
                  height: '40px',
                  padding: '8px 16px',
                  fontSize: '14px',
                  lineHeight: '24px',
                  margin: '0',
                  borderRadius: '0'
                }}
              >
                <Copy className="w-4 h-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={e => {
                  e.stopPropagation();
                  onAddNestedPage(page);
                }} 
                className="cursor-pointer text-[#1B2124] hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white transition-colors"
                style={{
                  height: '40px',
                  padding: '8px 16px',
                  fontSize: '14px',
                  lineHeight: '24px',
                  margin: '0',
                  borderRadius: '0'
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add subpage
              </DropdownMenuItem>
              {/* Delete option - not shown for Home page, disabled with tooltip for pages with children */}
              {!isHomePage && (
                hasChildren ? (
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
                    className="cursor-pointer text-red-600 hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white transition-colors"
                    style={{
                      height: '40px',
                      padding: '8px 16px',
                      fontSize: '14px',
                      lineHeight: '24px',
                      margin: '0',
                      borderRadius: '0'
                    }}
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
  );
};
