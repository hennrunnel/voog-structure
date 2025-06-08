
export interface PageSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface PageSettingsState {
  activeTab: string;
  title: string;
  urlSlug: string;
  menuTitle: string;
  showInMenu: boolean;
  access: string;
  layout: string;
  showDeleteDialog: boolean;
  showDuplicateDialog: boolean;
}
