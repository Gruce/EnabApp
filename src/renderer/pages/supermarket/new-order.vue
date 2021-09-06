<template>
  <div>
    <SupermarketServicesMultipleOrder service_id="2" />

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
    lastOrder() {
      return this.$store.state.supermarket.orders.lastOrder;
    },
    ordersList() {
      return this.$store.state.supermarket.orders.ordersList;
    },
  },
  created() {
    this.fetchProducts();
    this.fetchCategories();
    this.fetchLastOrder();
    // Initiate Order
    if (this.ordersList.length <= 0)
      this.newOrder();
  },
  data() {
    return {
      
    };
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