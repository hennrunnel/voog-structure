
interface AddPageSidebarHeaderProps {
  isLinkMode: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const AddPageSidebarHeader = ({ isLinkMode, activeTab, setActiveTab }: AddPageSidebarHeaderProps) => {
  return (
    <div className="px-6 py-4 border-b border-border flex-shrink-0">
      <h2 id="add-page-title" className="text-xl font-semibold text-foreground mb-4">
        {isLinkMode ? "Add a custom link" : "Add new page"}
      </h2>
      
      {!isLinkMode && (
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
      )}
    </div>
  );
};
