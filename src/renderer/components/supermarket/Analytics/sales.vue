<template>
  <div>
    <div class="card bg-none b-1 r-2">
      <div class="card-body text-white text-center">
        <i class="far fa-chart-bar fa-4x"></i>
        <h6 class="text-light card-title mt-3 fs-5 fw-bold">المبيعات</h6>
        <UtilitiesLoading v-if="!sales" />
        <h4 v-else class="mb-1 text-light">{{ $n(sales, 'currency') }}</h4>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      sales: "supermarket/orders/sales",
    }),
  },
};
</script>

<style lang="scss" scoped>
</style>