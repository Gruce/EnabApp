<template>
  <div>
    <SupermarketServicesMultipleOrder v-if="multipleOrder" />

    <div v-for="(order, i) in ordersList" :key="i">
      <SupermarketNeworderOrder v-if="order.enabled" :orderIndex="i" />
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions, mapState } from "vuex";

export default {
  layout: "supermarket",
  head: {
    title: "New Order",
  },
  computed: {
    ...mapGetters({
      lastOrder: "supermarket/orders/lastOrder",
      ordersList: "supermarket/orders/ordersList",

      // Services
      multipleOrder: "supermarket/services/multipleOrder",
    }),
  },
  created() {
    this.fetchProducts();
    this.fetchCategories();
    this.fetchLastOrder();
    // Initiate Order
    if (this.ordersList.length <= 0) this.newOrder();
  },
  methods: {
    ...mapActions({
      fetchProducts: "supermarket/products/fetchProducts",
      fetchCategories: "supermarket/categories/fetchCategories",
      fetchLastOrder: "supermarket/orders/fetchLastOrder",
    }),

    ...mapMutations({
      newOrder: "supermarket/orders/newOrder",
    }),
  },
};
</script>

<style lang="scss" scoped>
</style>