import '@/assets/main.css'
import 'floating-vue/dist/style.css'
import 'splitpanes/dist/splitpanes.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import FloatingVue from 'floating-vue'
import App from './App.vue'

const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(createPinia())
app.use(FloatingVue)
app.mount('#app')
