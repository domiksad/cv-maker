import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  pl: {
    translation: {
      firstName: "Imię",
      lastName: "Nazwisko",
      description: "Opis",
      preview: "Podgląd PDF"
    }
  },
  en: {
    translation: {
      firstName: "First Name",
      lastName: "Last Name",
      description: "Description",
      preview: "PDF Preview"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pl',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;