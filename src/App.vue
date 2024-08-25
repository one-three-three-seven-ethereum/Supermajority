<template>
    <h1 class="mx-auto mt-5 text-center">The Ethereum Supermajority Risk</h1>
    <h4 class="mx-auto mt-1 mb-2 text-center">(Maintained by Sonic)</h4>
    <a href="https://github.com/one-three-three-seven-ethereum/Supermajority" class="mx-auto" target="_blank">
        <span class="pi pi-github" style="font-size: 1.5rem" />
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
        background-color: #CC79A7;
    }

    .Nethermind {
        background-color: #0072B2;
    }

    .Besu {
        background-color: #009E73;
    }

    .Erigon {
        background-color: #F0E442;
    }

    .Reth {
        background-color: #56B4E9;
    }

    .Cross-Validation {
        background-color: #D55E00;
    }

    .Unknown {
        background-color: #E69F00;
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