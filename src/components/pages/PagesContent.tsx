
import { LanguageTabs } from "@/components/pages/LanguageTabs";
import { EnglishTabContent } from "@/components/pages/EnglishTabContent";
import { EstonianTabContent } from "@/components/pages/EstonianTabContent";
import { PageItem } from "@/types/pages";

interface PagesContentProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  availableTabs: string[];
  englishLanguageVisible: boolean;
  estonianLanguageVisible: boolean;
  englishWebsiteTitle: string;
  setEnglishWebsiteTitle: (title: string) => void;
  englishNameInMenu: string;
  setEnglishNameInMenu: (name: string) => void;
  estonianWebsiteTitle: string;
  setEstonianWebsiteTitle: (title: string) => void;
  estonianNameInMenu: string;
  setEstonianNameInMenu: (name: string) => void;
  onEnglishLanguageVisibilityToggle: (visible: boolean) => void;
  onEstonianLanguageVisibilityToggle: (visible: boolean) => void;
  onLanguageDelete: () => void;
  onAddPageClick: () => void;
  pages: PageItem[];
  onToggleExpansion: (pageId: string) => void;
  onToggleVisibility: (pageId: string) => void;
  onDeletePage: (page: PageItem) => void;
  onDuplicatePage: (page: PageItem) => void;
  onAddNestedPage: (page: PageItem) => void;
  onPageSettings: (page: PageItem) => void;
  onEditPage: (page: PageItem) => void;
  onTranslatePage: (page: PageItem) => void;
}

export const PagesContent = ({
  activeTab,
  setActiveTab,
  availableTabs,
  englishLanguageVisible,
  estonianLanguageVisible,
  englishWebsiteTitle,
  setEnglishWebsiteTitle,
  englishNameInMenu,
  setEnglishNameInMenu,
  estonianWebsiteTitle,
  setEstonianWebsiteTitle,
  estonianNameInMenu,
  setEstonianNameInMenu,
  onEnglishLanguageVisibilityToggle,
  onEstonianLanguageVisibilityToggle,
  onLanguageDelete,
  onAddPageClick,
  pages,
  onToggleExpansion,
  onToggleVisibility,
  onDeletePage,
  onDuplicatePage,
  onAddNestedPage,
  onPageSettings,
  onEditPage,
  onTranslatePage
}: PagesContentProps) => {
  return (
    <div 
      className="bg-white"
      style={{
        width: '992px',
        borderRadius: '10px',
        border: 'none',
        background: 'var(--Primary-White, #FFF)',
        boxShadow: '0px 0.5px 1px 0px var(--shadow-dark, rgba(24, 24, 27, 0.05)), 0px 2px 5px 0px rgba(0, 0, 0, 0.05), 0px 17px 17.7px 0px rgba(0, 0, 0, 0.01)'
      }}
    >
      <LanguageTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        availableTabs={availableTabs}
        englishVisible={englishLanguageVisible}
        estonianVisible={estonianLanguageVisible}
      >
        <EnglishTabContent
          websiteTitle={englishWebsiteTitle}
          setWebsiteTitle={setEnglishWebsiteTitle}
          nameInMenu={englishNameInMenu}
          setNameInMenu={setEnglishNameInMenu}
          languageVisible={englishLanguageVisible}
          onLanguageVisibilityToggle={onEnglishLanguageVisibilityToggle}
          onLanguageDelete={onLanguageDelete}
          onAddPageClick={onAddPageClick}
          pages={pages}
          onToggleExpansion={onToggleExpansion}
          onToggleVisibility={onToggleVisibility}
          onDeletePage={onDeletePage}
          onDuplicatePage={onDuplicatePage}
          onAddNestedPage={onAddNestedPage}
          onPageSettings={onPageSettings}
          onEditPage={onEditPage}
          onTranslatePage={onTranslatePage}
        />

        <EstonianTabContent
          websiteTitle={estonianWebsiteTitle}
          setWebsiteTitle={setEstonianWebsiteTitle}
          nameInMenu={estonianNameInMenu}
          setNameInMenu={setEstonianNameInMenu}
          languageVisible={estonianLanguageVisible}
          onLanguageVisibilityToggle={onEstonianLanguageVisibilityToggle}
          onLanguageDelete={onLanguageDelete}
          onAddPageClick={onAddPageClick}
          pages={pages}
          onToggleExpansion={onToggleExpansion}
          onToggleVisibility={onToggleVisibility}
          onDeletePage={onDeletePage}
          onDuplicatePage={onDuplicatePage}
          onAddNestedPage={onAddNestedPage}
          onPageSettings={onPageSettings}
          onEditPage={onEditPage}
          onTranslatePage={onTranslatePage}
        />
      </LanguageTabs>
    </div>
  );
};
