<template>
  <div>
    <div class="container-fluid">
      <div class="row main-height">
        <div class="col-4">
          <div class="show-scroll p-2">
            <div class="h-items-height">
              <h1 class="text-right text-light">احصائية</h1>
              <div
                class="nav flex-column nav-pills nav-customized"
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
              >
                <button
                  :class="getOpen('overview')"
                  @click="open = 'overview'"
                  class="btn btn-secondary btn-icon btn-block py-3 r-2"
                >
                  <span class="btn-inner--text fs-5">نضرة عامة</span>
                </button>
                <button
                  :class="getOpen('products')"
                  @click="open = 'products'"
                  class="btn btn-secondary btn-icon btn-block py-3 r-2"
                >
                  <span class="btn-inner--text fs-5">المبيعات</span>
                </button>
                <button
                  :class="getOpen('sales')"
                  @click="open = 'sales'"
                  class="btn btn-secondary btn-icon btn-block py-3 r-2"
                >
                  <span class="btn-inner--text fs-5">المنتجات</span>
                </button>
                <button
                  :class="getOpen('times')"
                  @click="open = 'times'"
                  class="btn btn-secondary btn-icon btn-block py-3 r-2"
                >
                  <span class="btn-inner--text fs-5">الاوقات</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-8 t-1 r-1 show-scroll">
          <div class="card-fluid p-5 h-items-height">
            <div class="text-right">
              <div v-if="open == 'Overview'">
                <SupermarketAnalyticsOverview />
              </div>
              <div v-if="open == 'Products'">
                <SupermarketAnalyticsProducts />
              </div>
              <div v-if="open == 'Sales'">
                <SupermarketAnalyticsSales />
              </div>
              <div v-if="open == 'Times'">
                <SupermarketAnalyticsTimes />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  layout: "supermarket",
  head: {
    title: "Analytics",
  },
  methods: {
    ...mapActions({}),
    getOpen: function (opened) {
      return this.open == opened ? "active" : "";
    },
  },
};
</script>

<style lang="scss" scoped>
//
</style>