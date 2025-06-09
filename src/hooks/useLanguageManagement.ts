
import { useState } from "react";

export const useLanguageManagement = () => {
  const [activeTab, setActiveTab] = useState("english");
  const [availableTabs, setAvailableTabs] = useState<string[]>(["english", "estonian"]);
  
  // English language settings
  const [englishWebsiteTitle, setEnglishWebsiteTitle] = useState("Finn & Cross");
  const [englishNameInMenu, setEnglishNameInMenu] = useState("Eng");
  const [englishLanguageVisible, setEnglishLanguageVisible] = useState(true);
  
  // Estonian language settings
  const [estonianWebsiteTitle, setEstonianWebsiteTitle] = useState("Finn & Cross");
  const [estonianNameInMenu, setEstonianNameInMenu] = useState("Est");
  const [estonianLanguageVisible, setEstonianLanguageVisible] = useState(false);

  // Dialog states
  const [languageDeleteDialogOpen, setLanguageDeleteDialogOpen] = useState(false);
  const [languageVisibilityDialogOpen, setLanguageVisibilityDialogOpen] = useState(false);
  const [languageVisibilityAction, setLanguageVisibilityAction] = useState<'enable' | 'disable'>('disable');
  const [languageReorderOpen, setLanguageReorderOpen] = useState(false);

  const handleLanguageDelete = (language?: string) => {
    setLanguageDeleteDialogOpen(true);
  };

  const confirmLanguageDelete = () => {
    const currentTabIndex = availableTabs.indexOf(activeTab);
    const newTabs = availableTabs.filter(tab => tab !== activeTab);
    setAvailableTabs(newTabs);
    if (newTabs.length > 0) {
      const nextTab = newTabs[Math.max(0, currentTabIndex - 1)];
      setActiveTab(nextTab);
    }
    setLanguageDeleteDialogOpen(false);
  };

  const handleLanguagePublishToggle = (language: string, published: boolean) => {
    if (language === "english") {
      setEnglishLanguageVisible(published);
    } else if (language === "estonian") {
      setEstonianLanguageVisible(published);
    }
  };

  const handleEnglishLanguageVisibilityToggle = (newValue: boolean) => {
    setLanguageVisibilityAction(newValue ? 'enable' : 'disable');
    setLanguageVisibilityDialogOpen(true);
  };

  const handleEstonianLanguageVisibilityToggle = (newValue: boolean) => {
    setLanguageVisibilityAction(newValue ? 'enable' : 'disable');
    setLanguageVisibilityDialogOpen(true);
  };

  const confirmLanguageVisibilityToggle = () => {
    if (activeTab === "english") {
      setEnglishLanguageVisible(languageVisibilityAction === 'enable');
    } else if (activeTab === "estonian") {
      setEstonianLanguageVisible(languageVisibilityAction === 'enable');
    }
    setLanguageVisibilityDialogOpen(false);
  };

  const handleReorderLanguages = () => {
    setLanguageReorderOpen(true);
  };

  const handleSaveLanguageOrder = (reorderedLanguages: { id: string; name: string }[]) => {
    setAvailableTabs(reorderedLanguages.map(lang => lang.id));
    setLanguageReorderOpen(false);
  };

  const addLanguage = (languageData: any) => {
    // Add the new language to available tabs
    const newLanguage = languageData.languageName;
    if (!availableTabs.includes(newLanguage)) {
      setAvailableTabs(prev => [...prev, newLanguage]);
      
      // If this is the first language, set it as active
      if (availableTabs.length === 0) {
        setActiveTab(newLanguage);
      }
    }
    console.log("Adding new language:", languageData);
  };

  const getLanguagesForReorder = () => {
    return availableTabs.map(tab => ({
      id: tab,
      name: tab === "english" ? "English" : tab === "estonian" ? "Estonian" : tab
    }));
  };

  return {
    activeTab,
    setActiveTab,
    availableTabs,
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
    languageDeleteDialogOpen,
    setLanguageDeleteDialogOpen,
    languageVisibilityDialogOpen,
    setLanguageVisibilityDialogOpen,
    languageVisibilityAction,
    languageReorderOpen,
    setLanguageReorderOpen,
    handleLanguageDelete,
    confirmLanguageDelete,
    handleLanguagePublishToggle,
    handleEnglishLanguageVisibilityToggle,
    handleEstonianLanguageVisibilityToggle,
    confirmLanguageVisibilityToggle,
    handleReorderLanguages,
    handleSaveLanguageOrder,
    getLanguagesForReorder,
    addLanguage
  };
};
