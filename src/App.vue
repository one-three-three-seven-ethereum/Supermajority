<template>
    <h1 class="mx-auto mt-5 text-center">The Ethereum Supermajority Risk</h1>
    <h4 class="mx-auto mt-1 mb-2 text-center">(Maintained by Sonic)</h4>
    <a href="https://github.com/one-three-three-seven-ethereum/Supermajority" class="mx-auto" target="_blank">
        <span class="pi pi-github" style="font-size: 1.5rem" />
    </a>
    <div class="flex flex-wrap justify-center h-full">
        <RouterView />
    </div>
</template>

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
