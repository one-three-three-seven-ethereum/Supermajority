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
