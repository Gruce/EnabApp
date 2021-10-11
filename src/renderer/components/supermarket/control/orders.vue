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
        <div class="table-responsive" v-if="orders.length > 0">
          <table class="table table-cards text-right">
            <thead>
              <tr class="text-light">
                <th scope="col">#</th>
                <th scope="col">أسم الزبون</th>
                <th scope="col">رقم الطلب</th>
                <th scope="col">المبلغ الكلي</th>
                <th scope="col">اسم الموظف</th>
                <th scope="col">التحكم</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(order, i) in paginatedData" :key="order.id" class="table-divider hover-translate-y-n3">
                <td class="align-middle" scope="row">{{ paginatedCounter + i + 1 }}</td>
                <td class="align-middle">
                  <button v-if="order.customer" class="btn p-0" @click="selectedCustomer = order.customer.id">
                    {{ order.customer.name }}
                  </button>
                  <span v-else>لايوجد</span>
                </td>
                <td class="align-middle">{{ order.order_number }}</td>
                <td class="align-middle">{{ $n(order.total_price, 'currency') }}</td>
                <td class="align-middle">{{ order.user.name }}</td>
                <td class="align-middle">
                  <c-button variant-color="gray" size="xs" @click="getProducts(order.products), show = true" variant="ghost">
                    <i class="fas fa-eye"></i>
                  </c-button>
                </td>
              </tr>
            </tbody>
          </table>
          <UtilitiesLoadMore @page="paginatedCounter = $event" @data="paginatedData = $event" :data="orders" perPage="10" />

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

      // Pagination
      paginatedData: [],
      paginatedCounter: 0,
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