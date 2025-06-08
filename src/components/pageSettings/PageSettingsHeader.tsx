
import { useState } from "react";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageSettingsHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const PageSettingsHeader = ({ activeTab, setActiveTab }: PageSettingsHeaderProps) => {
  const handleEditPage = () => {
    console.log("Opening page editor...");
  };

  return (
    <div className="px-6 py-4 border-b border-border flex-shrink-0">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <h2 id="page-settings-title" className="text-xl font-semibold text-foreground">Page settings</h2>
          <Button 
            onClick={handleEditPage}
            variant="ghost"
            size="sm"
            className="text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit page
          </Button>
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
