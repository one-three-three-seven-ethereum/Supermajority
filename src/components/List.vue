<template>
    <div class="flex-1 flex flex-col min-w-80 m-5">
        <hr class="h-1 mb-4 bg-zinc-500">

        <span class="mb-2 text-base">Info: No client should have a possible share ("Max") above 66.6%!</span>

        <template v-for="client in distribution">
            <div class="flex justify-between">
                <span>{{ client.name }}</span>
                <span class="font-bold" v-if="client.shareMax >= 2 / 3 * 100">Risky!</span>
                <span>Min: {{ client.shareMinFormatted }} | Max: {{ client.shareMaxFormatted }}</span>
            </div>

            <div class="flex bg-zinc-300 h-10 relative mb-2">
                <div :class="`h-full ${client.name}`" :style="`width: ${client.shareMin}%`" />
                <div :class="`h-full Unknown`" :style="`width: ${client.shareMax - client.shareMin}%`" />

                <div class="absolute left-1/3 h-full w-1 bg-zinc-500" v-tooltip="{ content: '33.3%', triggers: ['hover', 'click'], delay: 0 }" />
                <div class="absolute right-1/3 h-full w-1 bg-zinc-500" v-tooltip="{ content: '66.6%', triggers: ['hover', 'click'], delay: 0 }" />
            </div>
        </template>

        <hr class="h-1 mt-2 bg-zinc-500">

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
    import { storeToRefs } from 'pinia'

    const store = useDistributionStore()
    const { distribution, sortedServices } = storeToRefs(store)
    const { fetchServices } = store

    await fetchServices()
</script>
