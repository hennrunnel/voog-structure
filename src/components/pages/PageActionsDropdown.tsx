
import React from "react";
import { Trash, Plus, Settings, Copy, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { PageItem } from "@/types/pages";
import { KebabIcon } from "@/components/icons/KebabIcon";

interface PageActionsDropdownProps {
  page: PageItem;
  isHomePage: boolean;
  hasChildren: boolean;
  isUntranslated?: boolean;
  onPageSettings: (page: PageItem) => void;
  onDuplicatePage: (page: PageItem) => void;
  onAddNestedPage: (page: PageItem) => void;
  onDeletePage: (page: PageItem) => void;
  onTranslatePage: (page: PageItem) => void;
}

export const PageActionsDropdown: React.FC<PageActionsDropdownProps> = ({
  page,
  isHomePage,
  hasChildren,
  isUntranslated,
  onPageSettings,
  onDuplicatePage,
  onAddNestedPage,
  onDeletePage,
  onTranslatePage
}) => {
  return (
    <div className="flex items-center justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-1 h-auto hover:bg-transparent outline-none focus:outline-none focus:ring-0 text-black" 
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
              className="cursor-pointer text-sm text-black"
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
                className="cursor-pointer text-sm text-black"
              >
                <Settings className="w-4 h-4 mr-2" />
                Page settings
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={e => {
                  e.stopPropagation();
                  onDuplicatePage(page);
                }} 
                className="cursor-pointer text-sm text-black"
              >
                <Copy className="w-4 h-4 mr-2" />
                Duplicate page
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={e => {
                  e.stopPropagation();
                  onAddNestedPage(page);
                }} 
                className="cursor-pointer text-sm text-black"
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
  );
};
