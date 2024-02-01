<template>
    <div class="flex h-10">
        <template v-for="client in distribution">
            <div :class="`h-full ${client.name}`" :style="`width: ${client.share}%`" v-tooltip="{
                content: `${client.name} ${client.shareFormatted} (${(client.count)})`,
                shown: showGethTooltips && client.name === 'Geth',
                triggers: ['hover', 'click'],
                delay: 0
            }" />
        </template>
    </div>
</template>

<script setup lang="ts">
    import { showGethTooltips, type Distribution } from '@/lib'

    const { distribution } = defineProps<({ distribution: Distribution[] })>()
</script>