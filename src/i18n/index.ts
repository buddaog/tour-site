import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en';
import az from './locales/az';
import ru from './locales/ru';

// Get the user's browser language or default to English
const getBrowserLanguage = (): 'en' | 'az' | 'ru' => {
  const language = navigator.language.split('-')[0];
  if (language === 'az') return 'az';
  if (language === 'ru') return 'ru';
  return 'en';
};

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en,
      az,
      ru,
    },
    lng: localStorage.getItem('language') || getBrowserLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;