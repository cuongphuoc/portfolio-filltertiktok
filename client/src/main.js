import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { revealDirective } from './directives/reveal.js';
import './assets/style.css';

createApp(App).use(router).directive('reveal', revealDirective).mount('#app');
