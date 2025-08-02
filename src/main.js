import '@/assets/css/base.css';
import i18n from '@/i18n/i18n.js';

import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import router from './router';
import ToastService from 'primevue/toastservice';

import Aura from '@primeuix/themes/aura';

const app = createApp(App);

app.use(i18n);
app.use(router);
app.use(ToastService);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      darkModeSelector: 'system',
      cssLayer: false,
    },
  },
});

app.mount('#app');
