
import { useState } from "react";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

interface PageSettingsHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentLanguage?: "en" | "et";
}

export const PageSettingsHeader = ({ 
  activeTab, 
  setActiveTab, 
  currentLanguage = "en" 
}: PageSettingsHeaderProps) => {
  const { t } = useTranslation(currentLanguage);

  const handleEditPage = () => {
    console.log("Opening page editor...");
  };

  return (
    <div className="px-6 py-4 border-b border-border flex-shrink-0">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <h2 id="page-settings-title" className="text-xl font-semibold text-foreground">
            {t("page_settings.header.title")}
          </h2>
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
          {t("page_settings.header.general_tab")}
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
          {t("page_settings.header.seo_tab")}
        </button>
      </div>
    </div>
  );
};
