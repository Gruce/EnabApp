<template>
  <div>
    <div class="container-fluid">
      <div class="row main-height">
        <div class="show-scroll p-2">
          <div class="h-items-height">
            <div class="row mt-5">
              <div class="col-lg-8">
                <div class="row">
                  <div class="col-4 ">
                    <div class="card bg-none b-1 r-2">
                      <div class="card-body text-white text-center">
                        <i class="far fa-chart-bar fa-4x"></i>
                        <h6 class="text-light card-title mt-3">المبيعات</h6>
                        <h4 class="mb-1 text-light">{{ $n(sales, 'currency') }}</h4>
                      </div>
                    </div>
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
                <div class="row pt-4">
                  <div class="col-12">
                    <div class="card bg-none b-1 r-1">
                      <div class="card-body">
                        <h5 class="text-light card-title">المنتجات الأكثر مبيعاً</h5>

                        <table class="table table-borderless text-light">
                          <thead>
                            <tr>
                              <td>#</td>
                              <td>أسم المنتج</td>
                              <td>عدد الاستخدامات</td>
                              <td>المتوفر</td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(product, i) in products_wanted.products" :key="product.id">
                              <td> {{++i}} </td>
                              <td> {{ product.name }} </td>
                              <td> {{ product.ordered_count }} </td>
                              <td> {{ product.count }} </td>
                            </tr>
                          </tbody>
                        </table>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="card bg-none b-1 r-2">
                  <div class="card-body">
                    <h5 class="text-light card-title">الاوقات</h5>
                    <div class="progress-circle progress-lg mx-auto mt-5" id="progress-performance-1" data-progress="72" data-trailwidth="4" data-text="72%" data-textclass="h3" data-shape="circle" data-color="primary" style="position: relative;"><svg viewBox="0 0 100 100" style="display: block;">
                        <path d="M 50,50 m 0,-46.5 a 46.5,46.5 0 1 1 0,93 a 46.5,46.5 0 1 1 0,-93" stroke="#eee" stroke-width="2" fill-opacity="0"></path>
                        <path d="M 50,50 m 0,-46.5 a 46.5,46.5 0 1 1 0,93 a 46.5,46.5 0 1 1 0,-93" stroke="#07294a" stroke-width="4" fill-opacity="0" style="stroke-dasharray: 292.273, 292.273; stroke-dashoffset: 81.8366;"></path>
                      </svg>
                      <div class="h3" style="position: absolute; left: 50%; top: 50%; padding: 0px; margin: 0px; transform: translate(-50%, -50%); color: #eee;">7:00PM</div>
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
  watch: {
    orders: {
      deep: true,
      handler(newVal) {
        // console.log(newVal)
        let orders_products = [];
        newVal.forEach((x) => orders_products.push(...x.products));

        // Sales
        this.sales = 0;
        orders_products.forEach(
          (x) =>
            (this.sales +=
              x.pivot.count * this.products.find((y) => y.id == x.id).price)
        );

        // Most Wanted Products
        orders_products.forEach((x) => {
          let product = this.products_wanted.products.find((y) => y.id == x.id);
          if (product) product.ordered_count += x.pivot.count;
          else
            this.products_wanted.products.push({
              id: x.id,
              ordered_count: x.pivot.count,
              ...this.products.find((y) => y.id == x.id),
            });
        });
        this.products_wanted.products
          .sort((a, b) => a.ordered_count - b.ordered_count)
          .reverse()
          .slice(0, 5);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
//
</style>