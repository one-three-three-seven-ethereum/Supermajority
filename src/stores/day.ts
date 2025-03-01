import { type Day } from '@/lib'
import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useDayStore = defineStore('day', () => {
    const days: Ref<Day[]> = ref([])

    async function fetchDays() {
        days.value = await (await fetch('https://api.supermajority.info')).json()
    }

    return { days, fetchDays }
})
