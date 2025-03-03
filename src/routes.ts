import { createRouter, createWebHistory } from 'vue-router'

import Home from './components/Home.vue'
import Simulator from './components/Simulator.vue'
import Graffiti from './components/Graffiti.vue'
import FAQ from './components/FAQ.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/simulator', component: Simulator },
    { path: '/graffiti', component: Graffiti },
    { path: '/faq', component: FAQ }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})
