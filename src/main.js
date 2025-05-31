import '@/assets/css/main.css';
import i18n from '@/i18n/i18n.js';

import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';

const app = createApp(App);

app.use(i18n);
app.use(PrimeVue);
app.mount('#app');
