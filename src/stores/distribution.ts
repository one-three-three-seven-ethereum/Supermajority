import { numberToPercent, type TotalDistribution, type Service } from '@/lib'
import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'

const totalValidators = 1062991

export const useDistributionStore = defineStore('distribution', () => {
    const services: Ref<Service[]> = ref([])

    const allocation = computed(() => {
        const map = new Map<string, number>().set('Unknown', 0).set('Geth', 0).set('Nethermind', 0).set('Besu', 0).set('Erigon', 0).set('Reth', 0)

        services.value.forEach(service => {
            service.allocation.forEach(client => {
                map.set(client.name, (map.get(client.name) || 0) + client.count);
            })
        })

        return map
    })

    const unknownCount = computed(() => allocation.value.get('Unknown') || 0)

    const distribution = computed(() => {
        const list: TotalDistribution[] = []

        allocation.value.forEach((count, name) => {
            if (name !== 'Unknown') {
                const shareMin = count / totalValidators
                const shareMax = (count + unknownCount.value) / totalValidators

                list.push({
                    name,
                    countMin: count,
                    countMax: count + unknownCount.value,
                    shareMin: shareMin * 100,
                    shareMax: shareMax * 100,
                    shareMinFormatted: numberToPercent.format(shareMin),
                    shareMaxFormatted: numberToPercent.format(shareMax)
                })
            }
        })

        return list
    })

    const sortedServices = computed(() => {
        const copy = [...services.value]

        // Calculate total number of validators and the market share
        const count = (service: Service) => service.allocation.reduce((total, client) => total + client.count, 0)
        copy.forEach(service => {
            const validators = count(service)
            service.validators = validators
            service.marketShareFormatted = numberToPercent.format(validators / totalValidators)
        })

        copy.sort((a, b) => {
            if (a.validators === b.validators) { // If the counts are the same, compare by name
                return a.name.localeCompare(b.name)
            }
            return b.validators! - a.validators!
        })

        return copy
    })

    async function fetchServices() {
        services.value = await (await fetch('/services.json')).json()

        // These validators are included in the service.json
        let included = 0
        allocation.value.forEach(count => {
            included += count
        })

        services.value.push({
            name: 'Unlisted Entities',
            allocation: [{
                name: 'Unknown',
                count: totalValidators - included
            }]
        })
    }

    return { sortedServices, distribution, fetchServices }
})
