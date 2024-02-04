<template>
    <div class="flex bg-zinc-300 h-10 relative">
        <template v-for="client in distribution">
            <div :class="`h-full ${client.name}`" :style="`width: ${client.share}%`" v-tooltip="{
                content: `${client.name} ${client.shareFormatted} (${(client.count)})`,
                shown: showImportantTooltips && ['Geth', 'Minority'].includes(client.name),
                triggers: ['hover', 'click'],
                delay: 0
            }" />

            <template v-if="client.name === 'Minority'">
                <div class="absolute left-1/3 h-full w-1 bg-zinc-500" v-tooltip="{ content: '33.3%', triggers: ['hover', 'click'], delay: 0 }" />
                <div class="absolute right-1/3 h-full w-1 bg-zinc-500" v-tooltip="{ content: '66.6%', triggers: ['hover', 'click'], delay: 0 }" />
            </template>
        </template>
    </div>
</template>

<script setup lang="ts">
    import { showImportantTooltips, type Distribution } from '@/lib'

    const { distribution } = defineProps<({ distribution: Distribution[] })>()
</script>