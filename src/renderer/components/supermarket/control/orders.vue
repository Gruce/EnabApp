<template>
<div>
  <div v-if="selectedCustomer > 0">
    <SupermarketCustomersCustomer @no-customer="selectedCustomer = -1" :id="selectedCustomer" />
  </div>
  <div :class="{ 'd-none': selectedCustomer > 0 }" class="mt-3">
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
              <tr v-for="(s, i) in showProducts" :key="s.pivot.product_id">
                <th scope="row">{{ ++i }}</th>
                <td>{{ s.name }}</td>
                <td>{{ s.category.name }}</td>
                <td>{{ s.barcode }}</td>
                <td>{{ s.pivot.price }}</td>
                <td>{{ s.pivot.count }}</td>
              </tr>
            </tbody>
          </table>
        </c-modal-body>
      </c-modal-content>
      <c-modal-overlay />
    </c-modal>

    <div class="r-2 border-0 shadow-none">
      <div class="row">
        <div class="col-xl-12 col-md-12 d-flex align-items-center">
          <c-heading as="h1" fontSize="4xl" ml="4" color="white">الطلبات</c-heading>
          <span v-if="orders">(الإجمالي<span class="badge t-1 mx-1">{{ orders.length }}</span>)</span>
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
          <UtilitiesTable :data="orders" :properties="table" @watch="selectedCustomer = $event"/>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapMutations, mapGetters, mapActions, mapState } from "vuex";

export default {
  computed: {
    orders() {
      return this.$store.getters["supermarket/orders/orders"];
    },
  },
  created() {
    this.fetchOrders(true);
  },
  data() {
    return {
      show: false,
      search: "",
      showProducts: [],
      selectedCustomer: -1,

      table: {
        noData: {
          message: "لايوجد طلبات",
          tip: "يمكن إضافة طلب من خلال (إضافة طلب)",
          link: "/supermarket/new-order"
        },
        watch: true,
        head: [
          { title: "اسم الزبون", column: "customer.name" },
          { title: "رقم  الطلب", column: "order_number" },
          { title: "المبلغ الكلي", column: "total_price" },
          { title: "اسم الموظف", column: "user.name" },
        ],
      },
    };
  },
  methods: {
    closeModal() {
      this.show = false;
    },
    getProducts: function (products) {
      this.showProducts = products;
    },
    ...mapActions({
      fetchOrders: "supermarket/orders/fetchOrders",
    }),
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