<template>
  <div>
    <div class="row">
      <div class="col-8 height show-scroll">
        <SupermarketHomeWelcome />
        <SupermarketHomeAds />
      </div>
      <div class="col-4 height show-scroll">
        <SupermarketHomePerformance />
      </div>

    </div>
  </div>
</template>

<script>
export default {
  layout: "supermarket",
  head: {
    title: "Supermarket",
  },
  mounted(){

  },
};
</script>

<style lang="scss" scoped>
.height {
  min-height: calc(100vh - 9rem) !important;
  max-height: calc(100vh - 9rem) !important;
}
</style>