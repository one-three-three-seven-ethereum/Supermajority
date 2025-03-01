import { createRouter, createWebHistory } from 'vue-router'

import HomeView from './components/Home.vue'
import ToastView from './components/Toast.vue'
import GraffitiView from './components/Graffiti.vue'

const routes = [
    { path: '/', component: HomeView },
    { path: '/toast', component: ToastView },
    { path: '/graffiti', component: GraffitiView }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})
