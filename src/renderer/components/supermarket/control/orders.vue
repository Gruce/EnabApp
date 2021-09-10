<template>
  <div class="mt-3">
    <!-- Show Products Modal -->
    <c-modal size="5xl" :is-open="show" :on-close="closeModal">
      <c-modal-content class="r-2" ref="content">
        <c-modal-header>تفاصيل الطلب / المنتجات</c-modal-header>
        <c-modal-close-button />
        <c-modal-body>
          <table class="table table-borderless text-right text-light">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">اسم المنتج</th>
                <th scope="col">فئة المنتج</th>
                <th scope="col">رقم الباركود</th>
                <th scope="col">السعر</th>
                <th scope="col">العدد</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(s, i) in showProducts" :key="s.product.id">
                <th scope="row">{{ ++i }}</th>
                <td>{{ s.product.name }}</td>
                <td>{{ categories.find(x => x.id == s.product.category_id).name }}</td>
                <td>{{ s.product.barcode }}</td>
                <td>{{ s.product.price }}</td>
                <td>{{ s.inCount }}</td>
              </tr>
            </tbody>
          </table>
        </c-modal-body>
      </c-modal-content>
      <c-modal-overlay />
    </c-modal>

    <div class="r-2 border-0 shadow-none">
      <div class="row">
        <div class="col-xl-12 col-md-12 d-flex">
          <c-heading as="h1" fontSize="4xl" ml="4" color="white">الطلبات</c-heading>
        </div>
        <div class="col-xl-12 col-md-12">
          <c-input-group mt=1>
            <c-input-left-element>
              <i class="fas fa-search"></i>
            </c-input-left-element>
            <c-input py=5 v-model="search" type="text" placeholder="بحث بحسب رقم الطلب" />
          </c-input-group>
        </div>
      </div>
      <div class="row mt-3">
        <div class="table-responsive" v-if="orders.length > 0">
          <table class="table table-cards text-right">
            <thead>
              <tr class="text-light">
                <th scope="col">#</th>
                <th scope="col">أسم الزبون</th>
                <th scope="col">رقم الطلب</th>
                <th scope="col">المبلغ الكلي</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(order, i) in orders" :key="order.id" class="table-divider hover-translate-y-n3 pointer" @click="getProducts(order.products), show = true">
                <td class="align-middle" scope="row">{{ i + 1 }}</td>
                <td class="align-middle">{{ (order.customer_id ? order.customer_id : 'لايوجد') }}</td>
                <td class="align-middle">{{ order.order_number }}</td>
                <td class="align-middle">{{ $n(totalPrice(order.products), 'currency') }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else>
          <c-alert class="bg-none b-1 r-2" variant="subtle" flexDirection="column" justifyContent="center" textAlign="center" height="200px">
            <c-alert-icon color="gray.250" name="warning" size="40px" :mr="0" />
            <c-alert-title :mt="4" :mb="1" fontSize="xl">
              لايوجد طلبات
            </c-alert-title>
            <c-alert-description maxWidth="sm">
              يمكن الشروع بإضافة الطلبات من خلال
              <nuxt-link to="/supermarket/new-order" class="fw-bold text-light"> نافذة الطلبات </nuxt-link>
            </c-alert-description>
          </c-alert>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions, mapState } from "vuex";

export default {
  computed: {
    ...mapGetters({
      c: "supermarket/categories/categories",
      products: "supermarket/products/products",
      orders: "supermarket/orders/orders",
    }),
    categories() {
      return this.c.filter((x) => x.id !== 0);
    },
  },
  data() {
    return {
      show: false,
      search: "",
      showProducts: [],
    };
  },
  methods: {
    closeModal() {
      this.show = false;
    },
    totalPrice: function (products) {
      let price = 0;
      products.forEach(
        (x) =>
          (price +=
            this.products.find((y) => y.id == x.id).price * x.pivot.count)
      );
      return price;
    },
    getProducts: function (products) {
      let fullProducts = products.map((x) => {
        return {
          product: this.products.find((y) => y.id == x.id),
          inCount: x.pivot.count,
        };
      });
      this.showProducts = fullProducts;
    },
  },
  watch: {
    ...mapActions({
      search: "supermarket/orders/search",
    }),
  },
};
</script>

<style lang="scss" scoped>
.pointer:hover {
  cursor: pointer;
}
</style>