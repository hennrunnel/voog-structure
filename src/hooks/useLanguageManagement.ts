
import { useState } from "react";

export const useLanguageManagement = () => {
  const [activeTab, setActiveTab] = useState("english");
  const [availableTabs, setAvailableTabs] = useState(["english", "estonian"]);
  
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

  const handleLanguageDelete = () => {
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
    handleLanguageDelete,
    confirmLanguageDelete,
    handleEnglishLanguageVisibilityToggle,
    handleEstonianLanguageVisibilityToggle,
    confirmLanguageVisibilityToggle
  };
};
