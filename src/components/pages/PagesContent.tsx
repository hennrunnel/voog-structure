import { LanguageTabs } from "@/components/pages/LanguageTabs";
import { LanguageSettingsSidebar } from "@/components/pages/LanguageSettingsSidebar";
import { PageItem } from "@/types/pages";
import { useState } from "react";

interface PagesContentProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  availableTabs: string[];
  pages: PageItem[];
  englishWebsiteTitle: string;
  setEnglishWebsiteTitle: (title: string) => void;
  englishNameInMenu: string;
  setEnglishNameInMenu: (name: string) => void;
  englishLanguageVisible: boolean;
  estonianWebsiteTitle: string;
  setEstonianWebsiteTitle: (title: string) => void;
  estonianNameInMenu: string;
  setEstonianNameInMenu: (name: string) => void;
  estonianLanguageVisible: boolean;
  handleLanguageDelete: () => void;
  handleLanguagePublishToggle: (language: string, published: boolean) => void;
  handleEnglishLanguageVisibilityToggle: (visible: boolean) => void;
  handleEstonianLanguageVisibilityToggle: (visible: boolean) => void;
  onAddPageClick: () => void;
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
  pages,
  englishWebsiteTitle,
  setEnglishWebsiteTitle,
  englishNameInMenu,
  setEnglishNameInMenu,
  englishLanguageVisible,
  estonianWebsiteTitle,
  setEstonianWebsiteTitle,
  estonianNameInMenu,
  setEstonianNameInMenu,
  estonianLanguageVisible,
  handleLanguageDelete,
  handleLanguagePublishToggle,
  handleEnglishLanguageVisibilityToggle,
  handleEstonianLanguageVisibilityToggle,
  onAddPageClick,
  onToggleExpansion,
  onToggleVisibility,
  onDeletePage,
  onDuplicatePage,
  onAddNestedPage,
  onPageSettings,
  onEditPage,
  onTranslatePage,
  addLanguage
}: PagesContentProps & { addLanguage: (languageData: any) => void }) => {
  const [languageSettingsOpen, setLanguageSettingsOpen] = useState(false);

  const handleLanguageSettings = () => {
    setLanguageSettingsOpen(true);
  };

  const getCurrentLanguageSettings = () => {
    if (activeTab === "english") {
      return {
        websiteTitle: englishWebsiteTitle,
        setWebsiteTitle: setEnglishWebsiteTitle,
        nameInMenu: englishNameInMenu,
        setNameInMenu: setEnglishNameInMenu,
        languageVisible: englishLanguageVisible,
        onLanguageVisibilityToggle: handleEnglishLanguageVisibilityToggle
      };
    } else {
      return {
        websiteTitle: estonianWebsiteTitle,
        setWebsiteTitle: setEstonianWebsiteTitle,
        nameInMenu: estonianNameInMenu,
        setNameInMenu: setEstonianNameInMenu,
        languageVisible: estonianLanguageVisible,
        onLanguageVisibilityToggle: handleEstonianLanguageVisibilityToggle
      };
    }
  };

  const currentSettings = getCurrentLanguageSettings();

  return (
    <>
      <LanguageTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        availableTabs={availableTabs}
        englishVisible={englishLanguageVisible}
        estonianVisible={estonianLanguageVisible}
        onLanguageSettings={handleLanguageSettings}
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
        onAddLanguage={addLanguage}
        onLanguagePublishToggle={handleLanguagePublishToggle}
        onLanguageDelete={handleLanguageDelete}
      />

      {/* Only show language settings sidebar if there are languages */}
      {availableTabs.length > 0 && (
        <LanguageSettingsSidebar
          isOpen={languageSettingsOpen}
          onClose={() => setLanguageSettingsOpen(false)}
          websiteTitle={currentSettings.websiteTitle}
          setWebsiteTitle={currentSettings.setWebsiteTitle}
          nameInMenu={currentSettings.nameInMenu}
          setNameInMenu={currentSettings.setNameInMenu}
          languageVisible={currentSettings.languageVisible}
          onLanguageVisibilityToggle={currentSettings.onLanguageVisibilityToggle}
          onLanguageDelete={handleLanguageDelete}
          activeTab={activeTab}
        />
      )}
    </>
  );
};
