<template>
  <div>
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

    <div class="table-responsive" v-if="orders.length > 0">
      <table class="table table-cards text-right">
        <thead>
          <tr class="text-light">
            <th scope="col">#</th>
            <th scope="col">رقم الطلب</th>
            <th scope="col">المبلغ الكلي</th>
            <th scope="col">أسم الموظف</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, i) in paginatedData" :key="order.id" class="table-divider hover-translate-y-n3 pointer" @click="getProducts(order.products), show = true">
            <td class="align-middle" scope="row">{{ paginatedCounter + i + 1 }}</td>
            <td class="align-middle">{{ order.order_number }}</td>
            <td class="align-middle">{{ $n(order.total_price, 'currency') }}</td>
            <td class="align-middle">{{ order.user.name }}</td>
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
</template>

<script>
import { mapMutations, mapGetters, mapActions, mapState } from "vuex";

export default {
  props: ["orders"],

  data() {
    return {
      show: false,
      search: "",
      showProducts: [],

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
        console.log(products)
      this.showProducts = products;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>