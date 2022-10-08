import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import moshaToast from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
axios
axios.defaults.headers.common = { "Authorization": `bearer ${String(sessionStorage.getItem("token_user"))}` };
loadFonts()

const app = createApp(App)
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$HOST = 'http://127.0.0.1:3000'
  app.use(router)
  .use(moshaToast)
  .use(vuetify)
  .mount('#app')
