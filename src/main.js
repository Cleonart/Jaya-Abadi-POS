import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import './assets/tailwind.css';
import './assets/global.css';
import 'pattern.css/dist/pattern.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import 'vue-loading-overlay/dist/vue-loading.css';
import VueClipboard from 'vue-clipboard2'

createApp(App).use(router, VueClipboard).mount('#app')
