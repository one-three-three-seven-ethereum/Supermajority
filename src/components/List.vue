<template>
    <div class="flex-1 flex flex-col min-w-80 m-5">
        <ul class="flex justify-around">
            <template v-for="client in completeDistribution">
                <li class="flex flex-col">
                    <div :class="`h-2 ${client.name}`" />
                    <span class="text-lg">{{ client.name }}</span>
                </li>
            </template>
        </ul>

        <hr class="h-1 my-4 bg-zinc-500">

        <span>Total</span>
        <Total class="mb-2" :distribution="completeDistribution" />

        <span>Known clients only</span>
        <Total :distribution="knownDistribution" />
        <span class="text-base mb-4 font-bold">{{ knownDistributionShareFormatted }} coverage</span>

        <div class="sticky flex flex-col top-0 bg-gray-100 z-50">
            <hr class="h-1 mb-4 bg-zinc-500">

            <span>Total minority share</span>
            <Total :distribution="minorityOnly" />
            <span class="text-base font-bold">This is the most important metric!</span>
            <span class="text-base">A minority client usage above 33.3% is necessary to completely eliminate the supermajority risk.</span>

            <hr class="h-1 mt-4 bg-zinc-500">
        </div>

        <span class="my-4 text-base">Info: The list indirectly includes Lido (<a class="text-base link" href="https://app.hex.tech/8dedcd99-17f4-49d8-944e-4857a355b90a/app/3f7d6967-3ef6-4e69-8f7b-d02d903f045b/latest?tab=client-diversity#execution-layer" target="_blank">view data</a>) by listing all its operators</span>

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
    import ServiceComponent from '@/components/Service.vue'
    import Total from '@/components/Total.vue'
    import { storeToRefs } from 'pinia';

    const store = useDistributionStore()
    const { knownDistribution, knownDistributionShareFormatted, completeDistribution, minorityOnly, sortedServices } = storeToRefs(store)
    const { fetchServices } = store

    await fetchServices()
</script>
