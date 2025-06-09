
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface PageSettingsHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const EditPageIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_502_341)">
      <path opacity="0.3" d="M10.9 2C11.4523 2 11.9 2.44772 11.9 3C11.9 3.55228 11.4523 4 10.9 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V16C20 15.4477 20.4477 15 21 15C21.5523 15 22 15.4477 22 16V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V6C2 3.79086 3.79086 2 6 2H10.9Z" fill="currentColor"/>
      <path d="M7.00454 13.8973C7.00454 13.1346 6.84109 10.1246 9.21551 7.73659C10.8136 6.12944 13.2052 5.85069 16.0654 5.72357V1.83791C16.0654 1.4237 16.4012 1.08791 16.8154 1.08791C17.0017 1.08791 17.1814 1.15726 17.3194 1.28244L23.8275 7.18682C24.1343 7.46513 24.1574 7.93945 23.8791 8.24623C23.8644 8.26233 23.8491 8.27779 23.8332 8.29256L17.325 14.3198C17.0211 14.6013 16.5466 14.5831 16.2652 14.2791C16.1368 14.1405 16.0654 13.9585 16.0654 13.7695V9.90761C14.2494 9.95755 12.9559 10.0731 11.7806 10.447C10.0957 10.983 8.79198 12.4994 7.86932 14.9963L7.86929 14.9963C7.76047 15.2908 7.47976 15.4863 7.16582 15.4863H7C7 15.0278 7.00454 14.3014 7.00454 13.8973Z" fill="currentColor"/>
    </g>
    <defs>
      <clipPath id="clip0_502_341">
        <rect width="24" height="24" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

export const PageSettingsHeader = ({ activeTab, setActiveTab }: PageSettingsHeaderProps) => {
  const handleEditPage = () => {
    console.log("Navigating to page editor...");
  };

  return (
    <div className="px-6 py-4 border-b border-border flex-shrink-0">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <h2 id="page-settings-title" className="text-xl font-semibold text-foreground">Page settings</h2>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                onClick={handleEditPage}
                variant="ghost"
                size="sm"
                className="text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <EditPageIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Click to edit page</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="flex space-x-8" role="tablist">
        <button
          onClick={() => setActiveTab("general")}
          className={`pb-2 text-sm font-medium transition-colors rounded-t ${
            activeTab === "general"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
          role="tab"
          aria-selected={activeTab === "general"}
          aria-controls="general-panel"
        >
          General
        </button>
        <button
          onClick={() => setActiveTab("seo")}
          className={`pb-2 text-sm font-medium transition-colors rounded-t ${
            activeTab === "seo"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
          role="tab"
          aria-selected={activeTab === "seo"}
          aria-controls="seo-panel"
        >
          SEO
        </button>
      </div>
    </div>
  );
};
