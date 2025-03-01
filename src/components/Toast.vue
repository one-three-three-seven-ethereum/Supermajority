<template>
    <div v-if="showFAQ" class="flex-1 min-w-80 m-5">
        TEST
    </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import { ref } from 'vue'

const showFAQ = ref(true)
</script>

<style scoped>
@reference "@/assets/main.css";

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
