<template>
    <Suspense>
        <template #default>
            <List />
        </template>
        <template #fallback>
            <Fallback />
        </template>
    </Suspense>
</template>

<script setup lang="ts">
import Fallback from '@/components/Fallback.vue'
import List from '@/components/List.vue'
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
