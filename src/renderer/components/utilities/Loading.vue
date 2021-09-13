<template>
    <div>
        <i class="fas fa-spinner fa-spin text-white" :class="size ? `fa-${size}x` : 'fa-2x' "></i>
    </div>
</template>

<script>
    export default {
        props: ['size']
    }
</script>

<style lang="scss" scoped>
// 
</style>