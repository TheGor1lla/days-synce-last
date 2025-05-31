import { createI18n } from 'vue-i18n';
import en from './en.json';
import de from './de.json';

const messages = { en, de };

const userLocale = navigator.language.split('-')[0];

const i18n = createI18n({
  legacy: false,
  locale: ['en', 'de'].includes(userLocale) ? userLocale : 'en',
  fallbackLocale: 'en',
  messages,
});

export default i18n;
