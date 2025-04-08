import '@/assets/main.css'
import 'floating-vue/dist/style.css'
import 'splitpanes/dist/splitpanes.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import FloatingVue from 'floating-vue'
import { router } from './routes'
import App from './App.vue'

const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura, options: { darkModeSelector: '.dark-mode-not-implemented' } } })
app.use(createPinia())
app.use(FloatingVue)
app.use(router)
app.mount('#app')
