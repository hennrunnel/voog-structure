
import { addLanguageTranslations } from "./addLanguage";
import { addPageTranslations } from "./addPage";
import { pageSettingsTranslations } from "./pageSettings";
import { languageManagementTranslations } from "./languageManagement";
import { languageOptionsTranslations } from "./languageOptions";
import { regionsTranslations } from "./regions";

export const translations = {
  ...addLanguageTranslations,
  ...addPageTranslations,
  ...pageSettingsTranslations,
  ...languageManagementTranslations,
  ...languageOptionsTranslations,
  ...regionsTranslations
} as const;

export type TranslationKey = keyof typeof translations;
export type Language = "en" | "et";
