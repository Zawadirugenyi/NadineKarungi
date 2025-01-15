// src/i18n.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Define resources for the supported languages
const resources = {
  en: {
    translation: {
      welcome: 'Welcome',
      hello: 'Hello, how are you?',
    },
  },
  fr: {
    translation: {
      welcome: 'Bienvenue',
      hello: 'Bonjour, comment ça va?',
    },
  },
};

i18n
  .use(initReactI18next)  // Connects i18n with React
  .init({
    resources,
    lng: 'en',  // Default language
    fallbackLng: 'en',  // Fallback language if key is missing
    interpolation: {
      escapeValue: false,  // React already handles escaping
    },
    react: {
      useSuspense: false,  // Disabling Suspense for immediate translations
    },
  });

export default i18n;
