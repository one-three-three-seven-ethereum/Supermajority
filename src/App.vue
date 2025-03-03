<template>
    <h1 class="mx-auto mt-5 text-center">The Ethereum Supermajority Risk</h1>
    <h4 class="mx-auto mt-1 mb-2 text-center">(Maintained by Sonic)</h4>
    <a href="https://github.com/one-three-three-seven-ethereum/Supermajority" class="mx-auto" target="_blank">
        <span class="pi pi-github" style="font-size: 1.5rem" />
    </a>
    <Menubar class="m-2" :model="items" />
    <div class="flex flex-wrap justify-center h-full">
        <RouterView />
    </div>
</template>

<script setup lang="ts">
import Menubar from 'primevue/menubar'
import type { MenuItem } from 'primevue/menuitem'
import { ref } from 'vue'
import { router } from '@/routes'

const items = ref<MenuItem[]>([
    {
        label: 'Overview',
        icon: 'pi pi-home',
        command: () => router.push('/')
    },
    {
        label: 'Graffiti Data',
        icon: 'pi pi-chart-line',
        command: () => router.push('/graffiti')
    },
    {
        label: 'Risk Simulator',
        icon: 'pi pi-shield',
        command: () => router.push('/simulator')
    },
    {
        label: 'FAQ',
        icon: 'pi pi-question-circle',
        command: () => router.push('/faq')
    }
])
</script>

<style>
@reference "@/assets/main.css";

.v-popper__popper .v-popper__inner {
    @apply bg-black
}

.v-popper__popper .v-popper__arrow-outer {
    @apply border-black
}

.v-popper__popper.v-popper__popper--show-from .v-popper__wrapper {
    transform: scale(.5);
}

.v-popper__popper.v-popper__popper--show-to .v-popper__wrapper {
    transform: none;
    transition: transform .2s;
}
</style>
