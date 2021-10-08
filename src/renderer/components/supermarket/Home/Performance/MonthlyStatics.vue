<template>
  <div>

    <div class="card rounded-lg b-1 t-1 mb-0">
      <div class="card-header">
        <div class="d-flex justify-content-between align-items-center">
          <div><span class="fs-6">نظرة على الشهر الحالي</span></div>
        </div>
      </div>
      <div class="card-body p-3">
        <div class="row">
          <div class="col-6" v-if="customerAssign">
            <div class="bg-none shadow-none rounded-lg mb-3">
              <div class="px-4 py-5 text-center goal r-2 b-1">
                <div class="h1 font-weight-bolder text-white mb-0"><span>0</span></div>
                <h6 class="text-white">الزبائن</h6>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="bg-none shadow-none rounded-lg mb-3">
              <div class="px-4 py-5 text-center goal r-2 b-1">
                <div class="h1 font-weight-bolder text-white mb-0">
                  <span>{{ ordersCount }}</span>
                </div>
                <h6 class="text-white">عدد الطلبات</h6>
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="bg-none shadow-none rounded-lg mb-3">
              <div class="px-4 py-5 text-center goal r-2 b-1">
                <div class="h1 font-weight-bolder text-white mb-0">
                  <span>{{ $n(ordersIncome, 'currency') }}</span>
                </div>
                <h6 class="text-white fs-6">
                  مجموع الدخل
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions, mapState } from "vuex";

export default {
  computed: {
    thisMonthOrders() {
      if (this.$store.getters["supermarket/orders/orders"]) {
        let o = this.$store.getters["supermarket/orders/orders"].filter((x) =>
          this.$moment(x.created_at).isSame(new Date(), "month")
        );
        return o;
      } else return [];
    },

    ordersCount() {
      return this.thisMonthOrders.length;
    },

    ordersIncome() {
      return this.thisMonthOrders.reduce((a, b) => +a + +b.total_price, 0);
    },

    ...mapGetters({
      // Services
      customerAssign: "supermarket/services/customerAssign",
    }),
  },
};
</script>

<style lang="scss" scoped>
.goal {
  transition: 0.15s ease-in-out;
  &:hover {
    background: $t-1 !important;
  }
}
</style>