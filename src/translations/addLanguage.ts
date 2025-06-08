
export const addLanguageTranslations = {
  add_language: {
    header: {
      title: {
        en: "Add a new language to this website",
        et: "Lisa saidile uus keel"
      }
    },
    form: {
      language_label: {
        en: "Language name",
        et: "Keele nimetus"
      },
      region_label: {
        en: "Region",
        et: "Regioon"
      },
      website_title_label: {
        en: "Website title in this language",
        et: "Saidi nimetus selles keeles"
      },
      website_title_placeholder: {
        en: "Type title here...",
        et: "Sisesta pealkiri siia..."
      },
      name_in_menu_label: {
        en: "Name in menu",
        et: "Nimi menüüs"
      },
      name_in_menu_placeholder: {
        en: "Type name here...",
        et: "Sisesta nimi siia..."
      },
      publicly_visible_label: {
        en: "Is this language publicly visible?",
        et: "Kas see keel on avalikult nähtav?"
      },
      visitor_language_label: {
        en: "Which language visitors see",
        et: "Mis keelt külastaja näeb?"
      },
      duplicate_content_label: {
        en: "Duplicate content from",
        et: "Kopeeri sisu lehelt"
      }
    },
    visitor_language_options: {
      detect_by_location: {
        en: "Detect by location",
        et: "Asukohapõhine tuvastus"
      },
      always_this_language: {
        en: "Always this language",
        et: "Alati see keel"
      }
    },
    duplicate_content_options: {
      do_not_duplicate: {
        en: "Do not duplicate",
        et: "Ära kopeeri"
      },
      english: {
        en: "English",
        et: "Inglise"
      },
      estonian: {
        en: "Estonian",
        et: "Eesti"
      }
    },
    footer: {
      add_button: {
        en: "Add language",
        et: "Lisa keel"
      },
      cancel_button: {
        en: "Cancel",
        et: "Loobu"
      }
    }
  }
} as const;
