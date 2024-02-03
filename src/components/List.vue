<template>
    <div class="flex-1 min-w-80 m-5">
        <div class="sticky top-0 bg-gray-100 z-50">
            <ul class="flex justify-around">
                <template v-for="client in completeDistribution">
                    <li class="flex flex-col">
                        <div :class="`h-2 ${client.name}`" />
                        <span class="text-lg">{{ client.name }}</span>
                    </li>
                </template>
            </ul>

            <hr class="h-1 my-4 bg-gray-500">

            <span>Total</span>
            <Total class="mb-2" :distribution="completeDistribution" />

            <span>Total excluding unknown clients</span>
            <Total :distribution="knwonDistribution" />
            <span class="text-base">({{ knownDistributionShareFormatted }} coverage)</span>

            <hr class="h-1 my-4 bg-gray-500">
        </div>

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