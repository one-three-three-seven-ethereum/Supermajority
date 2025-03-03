<template>
    <div class="flex-1 min-w-80 m-5 flex flex-col items-center">
        <Message closable severity="warn">The market shares shown for each client are approximate estimates.</Message>
        <Message closable class="mt-2 max-w-xl" severity="info">This tool highlights the benefits of client diversity and shows that clients with lower market shares are less likely to be part of a problematic supermajority chain.</Message>
        <span v-if="executionToast || consensusToast" class="flex text-9xl text-red-500">X</span>
        <span v-else class="flex text-9xl text-green-500">✓</span>

        <Message closable severity="info">All faulty clients are assumed to have the same consensus bug.</Message>

        <div class="flex flex-row flex-wrap justify-center">
            <template v-for="clients in [consensusClients, executionClients]">
                <Card class="m-2">
                    <template #content>
                        <div class="flex flex-row">
                            <div>
                                <span class="font-bold">You use:</span>
                                <div class="flex flex-col mb-2">
                                    <template v-for="client in clients">
                                        <div class="my-0.5">
                                            <label>
                                                <Checkbox v-model="client.checked" binary />
                                                {{ client.name }} ({{ numberToPercent.format(client.share) }})
                                            </label>
                                        </div>
                                    </template>
                                </div>
                            </div>
                            <div>
                                <span class="font-bold">Faulty:</span>
                                <div class="flex flex-col items-center">
                                    <template v-for="client in clients">
                                        <Checkbox class="my-1" v-model="client.faulty" binary />
                                    </template>
                                </div>
                            </div>
                        </div>
                    </template>
                </Card>
            </template>
        </div>

        <Card class="m-2">
            <template #content>
                <div class="flex flex-col items-center">
                    <label>
                        <Checkbox v-model="multiNode" binary />
                        Attestation Consensus Threshold
                    </label>
                    <InputNumber class="mt-2" v-model="multiNodeCount" showButtons buttonLayout="horizontal" :min="2" :max="6" />
                    <span class="text-sm">(You only attest if this number of your clients agree with each other.)</span>
                    <a class="link" href="https://github.com/serenita-org/vero" target="_blank">Vero</a>
                    <a class="link" href="https://github.com/attestantio/vouch" target="_blank">Vouch (Majority Strategy)</a>
                </div>
            </template>
        </Card>

        <Card class="m-2">
            <template #content>
                <label>
                    <Checkbox v-model="perfectDistribution" binary />
                    Assume perfect client distribution
                </label>
            </template>
        </Card>
    </div>
</template>

<script setup lang="ts">
import type { Client } from '@/lib'

import Message from 'primevue/message'
import { numberToPercent } from '@/lib'
import Card from 'primevue/card'
import Checkbox from 'primevue/checkbox'
import InputNumber from 'primevue/inputnumber'
import { computed, ref, watch, type Ref } from 'vue'
const perfectDistribution = ref(false)
const multiNodeCount = ref(2)
const multiNode = ref(false)

const defaultExecutionClients = [
    { name: 'Nethermind', share: 0.36, checked: false, faulty: false },
    { name: 'Geth', share: 0.43, checked: false, faulty: false },
    { name: 'Besu', share: 0.16, checked: false, faulty: false },
    { name: 'Erigon', share: 0.03, checked: false, faulty: false },
    { name: 'Reth', share: 0.02, checked: false, faulty: false }
]

const defaultConsensusClients = [
    { name: 'Lighthouse ', share: 0.32, checked: false, faulty: false },
    { name: 'Prysm', share: 0.31, checked: false, faulty: false },
    { name: 'Teku', share: 0.27, checked: false, faulty: false },
    { name: 'Nimbus', share: 0.06, checked: false, faulty: false },
    { name: 'Grandine', share: 0.02, checked: false, faulty: false },
    { name: 'Lodestar', share: 0.02, checked: false, faulty: false },
]

watch(perfectDistribution, (checked) => {
    if (checked) {
        executionClients.value.forEach((client) => {
            client.share = 1 / executionClients.value.length
        })
        consensusClients.value.forEach((client) => {
            client.share = 1 / consensusClients.value.length
        })
    } else {
        executionClients.value = structuredClone(defaultExecutionClients)
        consensusClients.value = structuredClone(defaultConsensusClients)
    }
})

const executionClients = ref<Client[]>(structuredClone(defaultExecutionClients))
const consensusClients = ref<Client[]>(structuredClone(defaultConsensusClients))

const executionToast = computed(() => isToast(executionClients))
const consensusToast = computed(() => isToast(consensusClients))

function isToast(clients: Ref<Client[]>) {
    let usedFaultyClients = 0
    let faultyShare = 0

    clients.value.forEach((client: Client) => {
        if (client.faulty) {
            faultyShare += client.share
        }

        if (client.checked && client.faulty) {
            usedFaultyClients++
        }
    })

    return (
        faultyShare >= 2 / 3 && // There is a faulty supermajority
        usedFaultyClients > 0 && // At least one faulty client is used
        !(multiNode.value && multiNodeCount.value > usedFaultyClients) // Not protected by multi-node setup
    )
}
</script>

<style scoped>
@reference "@/assets/main.css";
</style>
