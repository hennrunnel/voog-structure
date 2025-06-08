
import { useTranslation } from "@/hooks/useTranslation";

interface AddPageSidebarHeaderProps {
  isLinkMode: boolean;
  currentLanguage?: "en" | "et";
}

export const AddPageSidebarHeader = ({ isLinkMode, currentLanguage = "en" }: AddPageSidebarHeaderProps) => {
  const { t } = useTranslation(currentLanguage);
  
  return (
    <div className="px-6 py-6 border-b border-border">
      <h2 id="add-page-title" className="text-xl font-semibold text-foreground">
        {isLinkMode ? t("add_page.header.add_custom_link") : t("add_page.header.add_new_page")}
      </h2>
    </div>
  );
};
