<template>
    <div v-if="showFAQ" class="flex-1 min-w-80 m-5">
        <div class="flex justify-between">
            <h2>FAQ</h2>
            <Button type="button" icon="pi pi-times" severity="secondary" outlined class="w-8 h-8" @click="() => showFAQ = false" v-tooltip="{ content: 'Hide FAQ', delay: 0 }" />
        </div>
        <ul>
            <li>
                <h3>What is this website about?</h3>
                <span>The supermajority client risk of the Ethereum execution layer, especially the client usage of staking services and pools.</span>
            </li>
            <li>
                <h3>What is the supermajority client risk?</h3>
                <span>A client software that is used by more than 2/3 of all active validators is considered a supermajority
                    client. It has the capability to finalize the chain without the agreement of the other clients. A consensus
                    bug within such a client would cause catastrophic results, such as a network split, loss of funds, and
                    reputation damage.</span>

                <span>Detailed explanations can be found at the end of this page.</span>
            </li>
            <li>
                <h3>Why should I care about this?</h3>
                <span>You could lose most of your funds if a supermajority client is used for validator duties by you or your pool/service/LST.</span>
            </li>
            <li>
                <h3>What can I do as a staking pool/service user?</h3>
                <span>Ask the operator which client it is using and let them know that you are concerned about the
                    supermajority client risk.</span>
                <span>Consider using a pool/service that prioritizes client diversity.</span>
            </li>
            <li>
                <h3>What can I do as a validator operator?</h3>
                <span>Use minority clients.</span>
            </li>
            <li>
                <h3>If I switch to a minority client, where can I find support?</h3>
                <span>All of the clients have dedicated Discord communities where help is provided by the team and other users.</span>
                <a href="https://discord.com/invite/hyperledger">Besu</a>
                <a href="https://github.com/ledgerwatch/erigon#erigon-discord-server">Erigon</a>
            </li>
            <li>
                <h3>Is it possible to resolve a supermajority consensus bug through a hard fork?</h3>
                <span>Theoretically, yes. But it may require a rollback of the chain, and there would likely be no social
                    consensus to do it. Nobody knows for sure what would happen in such a situation.</span>
            </li>
            <li>
                <h3>I am already using a minority client or not staking at all, why should I care about this?</h3>
                <span>You would still be affected by a supermajority bug regardless, but the resulting consequential damage
                    would be less severe.</span>
                <span>1.) The network could split into two chains.</span>
                <span>2.) It is unpredictable which chain will be considered canonical; maybe both. Transactions could be
                    reverted, resulting in a loss of funds. An offline penalty could apply to your validator, regardless of
                    the client used [3].</span>
                <span>3.) The reputation of the whole network would be damaged and the ETH price would likely drop sharply.</span>
                <span>It is in the best interest of all ETH holders and network users to get the network diversified.</span>
            </li>
            <li>
                <h3>Why are some pools/services missing, and why are there unknown client distributions?</h3>
                <span>Despite considerable effort to provide the data, acquiring it seamlessly remains a difficult task. The
                    data is often not publicly available, and the support responses are frequently slow and
                    unhelpful.</span>
                <span>Any help in making the dataset better is appreciated. Open an issue in the <a href="https://github.com/one-three-three-seven/Supermajority" target="_blank">GitHub
                        repository</a>, and the data will be updated accordingly.</span>
            </li>
            <li>
                <h3>What about the consensus layer?</h3>
                <span>There is no supermajority client in the consensus layer. While there is still room for improvement,
                    the current focus is on the execution layer.</span>
                <span>Data about the consensus layer can be found at <a href="https://rated.network" target="_blank">rated.network</a>.</span>
            </li>
            <li>
                <h3>Where can I find more info?</h3>
                <span>A good place for all kinds of questions related to this topic is the <span class="font-semibold">#nonfinality-risk</span> channel at the
                    <a href="https://discord.gg/ethstaker">EthStaker Discord</a>.</span>
                <span>There are numerous existing resources on this topic. Please note that some of them are written for the
                    consensus layer, but they mostly apply to the execution layer as well.</span>
                <a href="https://dankradfeist.de/ethereum/2022/03/24/run-the-majority-client-at-your-own-peril.html" target="_blank">[1] Dankrad Feist - Run the majority client at your own peril!</a>
                <a href="https://eth2book.info/bellatrix/part2/incentives/diversity/" target="_blank">[2] eth2book.info - Diversity</a>
                <a href="https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA" target="_blank">[3] jmcook.eth - Client diversity on Ethereum's consensus layer</a>
                <a href="https://labrys.io/insights/geth-staking" target="_blank">Yes, you really can lose all your ETH if you stake with Geth</a>
                <a href="https://www.kiln.fi/post/ethereum-client-diversity-part-1-consensus-finalization" target="_blank">Ethereum Client Diversity Part 1: Consensus and Finalization</a>
                <a href="https://www.kiln.fi/post/ethereum-client-diversity-part-2-execution-layer-diversity" target="_blank">Ethereum Client Diversity Part 2: Execution-layer Diversity</a>
                <a href="https://www.kiln.fi/post/ethereum-client-diversity-part-3-consensus-layer-diversity" target="_blank">Ethereum Client Diversity Part 3: Consensus-layer Diversity</a>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
    import Button from 'primevue/button'
    import { ref } from 'vue'

    const showFAQ = ref(true)
</script>

<style scoped>
    ul>li {
        @apply flex flex-col mt-2
    }

    ul>li>h3 {
        @apply mb-1
    }

    ul>li>span {
        @apply mb-2
    }

    a {
        @apply link
    }
</style>