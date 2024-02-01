<template>
    <div class="flex-1 min-w-80 m-5">
        <ul class="flex justify-around mb-5">
            <template v-for="client in completeDistribution">
                <li class="flex flex-col">
                    <div :class="`h-2 ${client.name}`" />
                    <span class="text-lg">{{ client.name }}</span>
                </li>
            </template>
        </ul>

        <hr class="h-1 my-4 bg-gray-500">

        <span>Total excl. unknown clients ({{ knownDistributionShareFormatted }} coverage)</span>
        <Total :distribution="knwonDistribution" class="mb-2" />
        <span>Total incl. unknown clients (100% coverage)</span>
        <Total :distribution="completeDistribution" class="mb-2" />

        <hr class="h-1 my-4 bg-gray-500">

        <ul>
            <template v-for="service in sortedServices">
                <li class="mb-2">
                    <ServiceComponent :service="service" />
                </li>
            </template>
        </ul>
    </div>
</template>

<script setup lang="ts">
    import { useDistributionStore } from '@/stores/distribution'
    import ServiceComponent from "@/components/Service.vue"
    import Total from '@/components/Total.vue'
    import { storeToRefs } from 'pinia';

    const store = useDistributionStore()
    const { knwonDistribution, knownDistributionShareFormatted, completeDistribution, sortedServices } = storeToRefs(store)
    const { fetchServices } = store

    await fetchServices()
</script>