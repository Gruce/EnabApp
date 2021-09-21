<template>
  <div>
    <div class="container-fluid">
      <div class="row main-height">
        <div class="show-scroll p-2">
          <div class="h-items-height">
            <c-heading as="h1" fontSize="4xl" ml="4" color="white">
              الإحصائيات
            </c-heading>
            <div class="row mt-5">
              <div class="col-lg-12">
                <div class="row">
                  <div class="col-4 ">
                    <SupermarketAnalyticsSales />
                  </div>
                  <div class="col-4">
                    <div class="card bg-none b-1 r-2">
                      <div class="card-body">
                        <h5 class="text-light card-title">الارباح</h5>
                        <div class="mb-2 text-left">
                          <div class="icon icon-shape icon-xl  text-white ">
                            <i class="fas fa-dollar-sign"></i>
                          </div>
                          <h5 class="mb-1 text-right text-light">$25,370.00</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="card bg-none b-1 r-2">
                      <div class="card-body">
                        <h5 class="text-light card-title">الديون</h5>
                        <div class="mb-2 text-left">
                          <div class="icon icon-shape icon-xl  text-white ">
                            <i class="fas fa-wallet"></i>
                          </div>
                          <h5 class="mb-1 text-right text-light">$25,370.00</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
  computed: {
    categories() {
      let categories =
        this.$store.state.supermarket.categories.categories.filter(
          (x) => x.id !== 0
        );
      return categories;
    },
    orders() {
      return this.$store.state.supermarket.orders.orders;
    },
    products() {
      return this.$store.state.supermarket.products.products;
    },
  },
  data() {
    return {
      sales: 0,
      products_wanted: {
        products: [],
        perPage: 3,
        currentPage: 1,
      },
    };
  },
  async created() {
    await this.fetchProducts();
    await this.fetchCategories();
    await this.fetchOrders(true);
  },
  methods: {
    ...mapActions({
      fetchCategories: "supermarket/categories/fetchCategories",
      fetchProducts: "supermarket/products/fetchProducts",
      fetchOrders: "supermarket/orders/fetchOrders",
    }),
  },
};
</script>

<style lang="scss" scoped>
//
</style>