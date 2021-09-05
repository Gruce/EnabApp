<template>
  <!-- eslint-disable -->
  <div class="container-fluid">
    <div class="row main-height">
      <div class="col-4">
        <div class="show-scroll p-2">
          <div class="h-items-height">
            <h1 class="text-right text-light">التحكم</h1>
            <br />
            <div class="nav flex-column nav-pills nav-customized" id="v-pills-tab" role="tablist" aria-orientation="vertical">
              <button :class="getOpen('orders')" @click="open='orders'" class="btn btn-secondary btn-icon btn-block py-3 r-2">
                <span class="btn-inner--text fs-5">الطلبات</span>
              </button>
              <button :class="getOpen('categories')" @click="open='categories'" class="btn btn-secondary btn-icon btn-block py-3 r-2">
                <span class="btn-inner--text fs-5">فئات</span>
              </button>
              <button :class="getOpen('products')" @click="open='products'" class="btn btn-secondary btn-icon btn-block py-3 r-2">
                <span class="btn-inner--text fs-5">منتجات</span>
              </button>
              <button :class="getOpen('customers')" @click="open='customers'" class="btn btn-secondary btn-icon btn-block py-3 r-2">
                <span class="btn-inner--text fs-5">الزبائن</span>
              </button>
              <button :class="getOpen('services')" @click="open='services'" class="btn btn-secondary btn-icon btn-block py-3 r-2">
                <span class="btn-inner--text fs-5">خدماتي</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-8 b-1 r-2 show-scroll">
        <div class="card-fluid p-5 h-items-height">
          <div class="text-right">
            <div v-if="open=='orders'">
              <SupermarketControlOrders />
            </div>
            <div v-if="open=='categories'">
              <SupermarketControlCategories />
            </div>
            <div v-if="open=='products'">
              <SupermarketControlProducts />
            </div>
            <div v-if="open=='customers'">
              <SupermarketControlCustomers />
            </div>
            <div v-if="open=='services'">
              <SupermarketControlServices />
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
    title: "Manage",
  },
  mounted() {
    return {};
  },
  created() {
    this.fetchOrders(true);
    this.fetchProducts();
    this.fetchCategories();
    this.fetchServices();
    this.fetchCustomers();
  },
  data() {
    return {
      open: "orders",
    };
  },
  methods: {
    ...mapActions({
      fetchCategories: "supermarket/categories/fetchCategories",
      fetchOrders: "supermarket/orders/fetchOrders",
      fetchProducts: "supermarket/products/fetchProducts",
      fetchServices: "supermarket/services/fetchServices",
      fetchCustomers: "supermarket/customers/fetchCustomers",
    }),
    getOpen: function (opened) {
      return this.open == opened ? "active" : "";
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-secondary:not(:disabled):not(.disabled):active,
.btn-secondary:not(:disabled):not(.disabled).active,
.show > .btn-secondary.dropdown-toggle {
  background-color: #ddeaff29 !important;
  border: 1px solid #ddeaff7a !important;
}
.btn {
  background-color: #ddeaff0a !important;
  border-radius: 0;
  border: 1px solid #ddeaff00 !important;
}
.btn-secondary {
  transition: 0.2s;
}
.btn-secondary:hover {
  background-color: #ddeaff1f !important;
  border: 1px solid #ddeaff3d !important;
}
// .btn-feature{
//     background-color: #1300ff4a !important;
//     color: white;
// }
// .btn-feature:hover {
//     background-color: #1300ff82 !important;
// }
.nav-pills .nav-link,
.nav-pills > .nav-link {
  color: #ffffff;
}
</style>