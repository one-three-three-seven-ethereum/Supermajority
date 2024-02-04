<template>
    <h1 class="mx-auto mt-5 text-center">The Ethereum Supermajority Risk</h1>
    <h4 class="mx-auto mt-1 mb-2 text-center">(Maintained by Sonic)</h4>
    <a href="https://github.com/one-three-three-seven/Supermajority" class="mx-auto" target="_blank">
        <span class="pi pi-github text-2xl" />
    </a>
    <div class="flex flex-wrap justify-center">
        <Suspense>
            <template #default>
                <List />
            </template>
            <template #fallback>
                <Fallback />
            </template>
        </Suspense>
        <FAQ />
    </div>
</template>

<script setup lang="ts">
    import Fallback from '@/components/Fallback.vue'
    import List from '@/components/List.vue'
    import FAQ from '@/components/FAQ.vue'
</script>

<style>
    h1 {
        @apply text-3xl font-bold
    }

    h2 {
        @apply text-2xl font-bold
    }

    h3 {
        @apply text-xl font-bold
    }

    h4 {
        @apply text-xl
    }

    span, a {
        @apply text-lg
    }

    ul {
        @apply list-none
    }

    .Geth {
        @apply bg-red-500
    }

    .Nethermind {
        @apply bg-blue-500
    }

    .Besu {
        @apply bg-green-500
    }

    .Erigon {
        @apply bg-slate-500
    }

    .Reth {
        @apply bg-purple-500
    }

    .Minority{
        @apply bg-lime-500
    }

    .Unknown {
        @apply bg-orange-500
    }

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