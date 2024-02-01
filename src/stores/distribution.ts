import { numberToPercent, type Distribution, type Service } from '@/lib'
import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'

const totalValidators = 914433

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

    const knwonDistribution = computed(() => distribution(true))
    const completeDistribution = computed(() => distribution(false))

    const distribution = (knownOnly = false) => {
        const list: Distribution[] = []

        allocation.value.forEach((count, name) => {
            if (count && !(knownOnly && name === 'Unknown')) {
                const share = count / ((knownOnly) ? knownValidators.value : totalValidators)

                list.push({
                    name,
                    count,
                    share: share * 100,
                    shareFormatted: numberToPercent.format(share)
                })
            }
        })

        return list
    }

    const knownValidators = computed(() => {
        let known = 0;

        allocation.value.forEach((count, name) => {
            if (name !== 'Unknown') {
                known += count;
            }
        })

        return known
    })

    const knownDistributionShareFormatted = computed(() => {
        return numberToPercent.format(knownValidators.value / totalValidators)
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
        const data: Service[] = await (await fetch('/services.json')).json()

        services.value = data
        services.value.push({
            name: 'Unknown',
            allocation: [{
                name: 'Unknown',
                count: totalValidators - knownValidators.value
            }]
        })
    }

    return { sortedServices, knwonDistribution, knownDistributionShareFormatted, completeDistribution, fetchServices }
})