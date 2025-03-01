<template>
    <v-chart class="overflow-hidden m-2 max-h-96" :option="option" theme="dark" autoresize />
</template>

<script setup lang="ts">
import { use } from 'echarts/core'
import VChart from 'vue-echarts'
import { SVGRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import { TooltipComponent, GridComponent, LegendComponent } from 'echarts/components'
import { computed, ref } from 'vue'

import { useDayStore } from '@/stores/day'
import { storeToRefs } from 'pinia'

const store = useDayStore()
const { days } = storeToRefs(store)
const { fetchDays } = store

await fetchDays()

use([
    SVGRenderer,
    GridComponent,
    LineChart,
    TooltipComponent,
    LegendComponent
])

const xAxisLabels = computed(() => days.value.map(day => day.date.slice(0, 10)))

const series = computed(() => {
    // Extract all unique client names from all days by looking at their keys
    const allClientNames = [...new Set(days.value.flatMap(day => Object.keys(day.clients)))]

    // For each client, build a data array containing counts for each day
    return allClientNames.map(name => ({
        name: name,
        data: days.value.map(day => day.clients[name] || 0),
        type: 'line',
        smooth: false
    }))
})

const option = ref({
    xAxis: [
        {
            type: 'category',
            data: xAxisLabels
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: 'Blocks per day'
        }
    ],
    series,
    tooltip: {
        show: true,
        trigger: 'axis',
        formatter: (params: Array<{ seriesName: string; value: number; axisValue: string }>) => {
            const date = params[0].axisValue

            const seriesData = params
                .sort((a, b) => b.value - a.value)
                .map(
                    (param) =>
                        `${param.seriesName}: ${param.value}`
                )
                .join('<br>')

            return `<b>${date}</b><br>${seriesData}`
        }
    },
    legend: {
        show: true,
        selected: { 'Prysm': false, 'Lighthouse': false, 'Teku': false, 'Nimbus': false, 'Lodestar': false, 'Grandine': false }
    }
})
</script>
