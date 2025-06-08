
export const estonianTranslations = {
  pages: {
    "Home": "Avaleht",
    "Digital ordering platform for restaurants and cafes": "Digitaalne tellimisplatvorm restoranidele ja kohvikutele",
    "Sign up for our restaurant management system with very long title that should be cut off": "Registreeru meie restorani haldussüsteemi väga pika pealkirjaga, mis peaks ära lõigatud olema",
    "News": "Uudised",
    "External Resource": "Väline ressurss",
    "Contact": "Kontakt",
    "Support": "Tugi",
    "Technical Support Documentation": "Tehnilise toe dokumentatsioon",
    "Private Client Area": "Privaatne klienditeenindusala",
    "Sales": "Müük",
    "Technical Support": "Tehniline tugi"
  },
  slugs: {
    "/digital-ordering": "/digitaalne-tellimine",
    "/digital-ordering/sign-up-for-restaurant-management-with-very-long-url-that-should-be-truncated": "/digitaalne-tellimine/registreeru-restorani-haldussüsteemi-väga-pika-urliga",
    "/news": "/uudised",
    "/contact": "/kontakt",
    "/contact/support": "/kontakt/tugi",
    "/contact/support/technical-docs": "/kontakt/tugi/tehnilised-dokumendid",
    "/contact/support/client-area": "/kontakt/tugi/klienditeenindusala",
    "/contact/sales": "/kontakt/müük",
    "/contact/technical": "/kontakt/tehniline"
  }
};

export const getTranslatedPageTitle = (title: string, language: string, isUntranslated?: boolean): string => {
  if (language !== "estonian" || isUntranslated) {
    return title;
  }
  return estonianTranslations.pages[title as keyof typeof estonianTranslations.pages] || title;
};

export const getTranslatedPageSlug = (slug: string, language: string, isUntranslated?: boolean): string => {
  if (language !== "estonian" || isUntranslated) {
    return slug;
  }
  return estonianTranslations.slugs[slug as keyof typeof estonianTranslations.slugs] || slug;
};
