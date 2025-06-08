
import { useTranslation } from "@/hooks/useTranslation";

interface PagesHeaderProps {
  currentLanguage?: "en" | "et";
}

export const PagesHeader = ({ currentLanguage = "en" }: PagesHeaderProps) => {
  const { t } = useTranslation(currentLanguage);
  
  return (
    <h1 
      className="text-[#1A1A1A]"
      style={{
        fontFamily: '"Avenir Next"',
        fontSize: '40px',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: '39px'
      }}
    >
      {t("page_structure.site_structure_title")}
    </h1>
  );
};
