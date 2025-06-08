
import { translations, Language } from "@/translations/translations";

// Helper type to get nested keys from translation object
type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? ObjectType[Key] extends { en: string; et: string }
      ? Key
      : `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : never;
}[keyof ObjectType & (string | number)];

type TranslationPath = NestedKeyOf<typeof translations>;

export const useTranslation = (currentLanguage: Language = "en") => {
  const t = (path: TranslationPath): string => {
    const keys = path.split('.');
    let current: any = translations;
    
    for (const key of keys) {
      current = current?.[key];
      if (!current) {
        console.warn(`Translation key not found: ${path}`);
        return path; // Return the path as fallback
      }
    }
    
    if (typeof current === 'object' && current[currentLanguage]) {
      return current[currentLanguage];
    }
    
    // Fallback to English if current language not available
    if (typeof current === 'object' && current.en) {
      return current.en;
    }
    
    console.warn(`Translation not found for key: ${path} in language: ${currentLanguage}`);
    return path; // Return the path as fallback
  };

  return { t };
};
