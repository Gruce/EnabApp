<template>
  <div class="height show-scrollr">
    <SupermarketHomePerformanceDailyGoals />

    <SupermarketHomePerformanceMonthlyStatics class="mt-3" />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.height {
  min-height: calc(100vh - 10rem) !important;
  max-height: calc(100vh - 10rem) !important;
}
</style>