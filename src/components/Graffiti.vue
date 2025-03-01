<template>
    <Suspense>
        <template #default>
            <Chart />
        </template>
        <template #fallback>
            <div>Loading...</div>
        </template>
    </Suspense>
</template>

<script setup lang="ts">
import Chart from '@/components/Chart.vue'
</script>
