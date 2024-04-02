<template>
    <div class="flex">
        <div class="flex-1 flex flex-col">
            <div class="flex items-center">
                <template v-if="!service.website">
                    <span>{{ service.name }}</span>
                </template>
                <template v-else>
                    <a :href="service.website" target="_blank">{{ service.name }}</a>
                </template>
                <span class="ml-1 mr-auto text-base" v-tooltip="{ content: 'Market Share', delay: 0, triggers: ['hover', 'click'] }">({{ service.marketShareFormatted }})</span>

                <template v-if="service.twitter">
                    <a :href="service.twitter" target="_blank" v-tooltip="{ content: 'Twitter', delay: 0 }">
                        <span class="pi pi-twitter text-blue-400"></span>
                    </a>
                </template>
                <template v-if="service.source">
                    <a :href="service.source" target="_blank" class="ml-3" v-tooltip="{ content: 'Source', delay: 0 }">
                        <span class="pi pi-link"></span>
                    </a>
                </template>
            </div>
            <splitpanes :key="splitpaneKey" class="default-theme" @resize="resize" @resized="resized" :dbl-click-splitter="false" :push-other-panes="false">
                <template v-for="(client, index) in distribution">
                    <pane :size="client.share">
                        <div :class="`h-10 ${client.name}`" v-tooltip="{
                            content: `${client.name} ${client.shareFormatted} (${client.count})`,
                            placement: (wavePattern && index % 2 === 1) ? 'bottom' : 'top',
                            shown: showTooltips,
                            triggers: (showTooltips) ? [] : ['hover', 'click'],
                            delay: 0
                        }" />
                    </pane>
                </template>
            </splitpanes>
        </div>
        <Button icon="pi pi-plus" class="bg-orange-400 ml-2 self-end rounded-full w-8 h-8 mb-1" :disabled="addMenuItems.length === 0" @click="toggleAddMenu" />
        <Menu ref="addMenu" :model="addMenuItems" :popup="true" />
        <Button icon="pi pi-minus" class="bg-orange-400 ml-2 self-end rounded-full w-8 h-8 mb-1" :disabled="removeMenuItems.length === 1" @click="toggleRemoveMenu" />
        <Menu ref="removeMenu" :model="removeMenuItems" :popup="true" />
    </div>
    <template v-if="['Kraken', 'OKX', 'Binance'].includes(service.name)">
        <span class="text-base font-bold">*Risky! No public data available.</span>
    </template>
</template>

<script setup lang="ts">
    import { numberToPercent, type ServiceDistribution, type Service } from '@/lib'
    import type { MenuItem, MenuItemCommandEvent } from 'primevue/menuitem'
    import { Splitpanes, Pane } from 'splitpanes'
    import Button from 'primevue/button'
    import { computed, ref } from 'vue'
    import Menu from 'primevue/menu'

    const { service } = defineProps<({ service: Service })>()

    const wavePattern = ref(false)
    const showTooltips = ref(false)
    const splitpaneKey = ref(0) // Used to force a rerender
    const addMenu = ref<Menu | null>(null)
    const removeMenu = ref<Menu | null>(null)

    const addMenuItems = computed(() => {
        let options = ['Geth', 'Nethermind', 'Besu', 'Erigon', 'Reth', 'Unknown']

        if (service.name === "Rocket Pool") {  // Easter Egg
            options = ['Geth', 'Nethermind', 'Besu', 'Erigon', 'rETH', 'Unknown']
        }

        const list: MenuItem[] = []

        options.forEach(name => {
            if (!service.allocation.find(client => client.name === name.replace('rETH', 'Reth'))) { // Easter Egg
                list.push({ label: name, command: addCommand })
            }
        })

        return list
    })

    const removeMenuItems = computed(() => {
        const list: MenuItem[] = []

        service.allocation.forEach(client => {
            list.push({ label: client.name, command: removeCommand })
        })

        return list
    })

    const distribution = computed(() => {
        const list: ServiceDistribution[] = []

        service.allocation.forEach(client => {
            const share = client.count / totalCount.value

            list.push({
                name: client.name,
                count: client.count,
                share: share * 100,
                shareFormatted: numberToPercent.format(share)
            })
        })

        return list
    })

    const totalCount = computed(() => {
        let totalCount = 0

        service.allocation.forEach((client) => {
            totalCount += client.count
        })

        return totalCount
    })

    function resize(event: any) {
        showTooltips.value = true
        wavePattern.value = true
        const previousTotalCount = totalCount.value // totalCount changes during the for loop; a copy of it is needed

        for (let i = 0; i < service.allocation.length; i++) {
            service.allocation[i].count = Math.round(previousTotalCount * event[i].size / 100)
        }
    }

    function resized() {
        showTooltips.value = false

        // Disable the wave pattern after all tooltips have disappeared
        setTimeout(() => {
            wavePattern.value = false
        }, 200)
    }

    function toggleAddMenu(event: MouseEvent) {
        if (addMenu.value) {
            addMenu.value.toggle(event)
        }
    }

    function toggleRemoveMenu(event: MouseEvent) {
        if (removeMenu.value) {
            removeMenu.value.toggle(event)
        }
    }

    //Reduce the count af all existing clients by 20% and add them to the new client
    function addCommand(event: MenuItemCommandEvent) {

        let add = 0

        service.allocation.forEach(client => {
            const reduce = Math.round(client.count * 0.2)
            client.count -= reduce
            add += reduce
        })

        let name = event.item.label as string

        if (name === "rETH") { // Easter Egg
            name = "Reth"
        }

        service.allocation.push({
            name,
            count: add
        })

        forceSplitpaneRerender()
    }

    //Remove the client and add the count to the first remaining client
    function removeCommand(event: MenuItemCommandEvent) {
        const index = service.allocation.findIndex(client => client.name === event.item.label);
        const add = service.allocation[index].count

        service.allocation.splice(index, 1)
        service.allocation[0].count += add

        forceSplitpaneRerender()
    }

    function forceSplitpaneRerender() {
        splitpaneKey.value += 1
    }
</script>

<style>
    .splitpanes--vertical>.splitpanes__splitter {
        min-width: 1rem;
    }
</style>