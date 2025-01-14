import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        welcome: "Welcome",
        hello: "Hello, how can we help you?"
      }
    },
    fr: {
      translation: {
        welcome: "Bienvenue",
        hello: "Bonjour, comment pouvons-nous vous aider?"
      }
    },
    sw: {
      translation: {
        welcome: "Karibu",
        hello: "Habari, tunawezaje kukusaidia?"
      }
    }
  },
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
