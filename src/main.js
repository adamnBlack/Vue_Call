import './assets/main.css'
import { createApp, inject, reactive } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import "tailwindcss/tailwind.css";
import App from './App.vue'
import router from './router'

// const GStore = reactive({ flashMessage: '' })

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
// pinia.use(inject('GStore'))

// app.provide('GStore', GStore)
app.use(pinia)
app.use(router)
app.mount('#app')
