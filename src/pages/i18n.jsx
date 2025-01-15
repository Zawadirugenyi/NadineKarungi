// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Define your translations
const resources = {
  en: {
    translation: {
      "hello": "Hello",
      "welcome": "Welcome to our website",
      // Add more translations as needed
    }
  },
  fr: {
    translation: {
      "hello": "Bonjour",
      "welcome": "Bienvenue sur notre site Web",
      // Add more translations as needed
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    interpolation: {
      escapeValue: false, // not needed for React
    },
  });

export default i18n;
