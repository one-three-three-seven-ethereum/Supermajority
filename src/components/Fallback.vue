<template>
    <div class="flex-1 min-w-96 m-5">
        <div v-for="i in 15">
            <Skeleton width="10rem" height="2rem" class="mb-2"></Skeleton>
            <Skeleton width="100%" height="3rem" class="mb-2"></Skeleton>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Skeleton from 'primevue/skeleton'
</script>