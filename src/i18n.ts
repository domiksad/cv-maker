import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  pl: {
    translation: {
      firstName: "Imię",
      lastName: "Nazwisko",
      title: "Stanowisko",
      email: "Email",
      phone: "Telefon",
      address: "Adres",

      description: "Opis",

      skills: "Umiejętności",
      languages: "Języki",
      certificates: "Certyfikaty",

      experienceTitle: "Stanowisko / Firma",
      experienceDate: "Data",
      experience: "Opis doświadczenia",

      education: "Opis edukacji",

      preview: "Podgląd PDF"
    }
  },

  en: {
    translation: {
      firstName: "First Name",
      lastName: "Last Name",
      title: "Job Title",
      email: "Email",
      phone: "Phone",
      address: "Address",

      description: "Description",

      skills: "Skills",
      languages: "Languages",
      certificates: "Certificates",
      
      experience: "Experience Description",

      education: "Education Description",

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