<template>
  <div>
    <div class="row">
      <div class="col-xl-12 col-md-12 d-flex align-items-center">
        <c-heading as="h1" fontSize="4xl" ml="4" color="white">
          <i class="fas fa-user"></i>
          {{ customer.name }}
        </c-heading>

        <c-button @click="$emit('no-customer')" px="6" height="100%" class="t-1 b-1 r-2 text-light me-auto" variant="ghost">
          رجوع
        </c-button>
      </div>
      <hr class="my-4" />
      <div class="col-xl-12 col-md-12 d-flex align-items-center">
        <div class="row w-100">
          <div class="col-4 t-1-h p-3 r-2 text-center">
            <h1 class="fs-1 text-light">300$</h1>
            <span class="fs-5">إجمالي الطلبات</span>
          </div>
          <div class="col-4 t-1-h p-3 r-2 text-center">
            <h1 class="fs-1 text-light">{{$n(customer.debt, 'currency')}}</h1>
            <span class="fs-5">الدين</span>
          </div>
          <div class="col-4 t-1-h p-3 r-2 text-center">
            <h1 class="fs-1 text-light">300$</h1>
            <span class="fs-5">الدين</span>
          </div>
        </div>
      </div>

      <div class="col-xl-12 col-md-12 mt-3">
        <c-box class="w-100">
          <c-tabs variant="solid-rounded" is-fitted>
            <c-tab-list class="t-1 b-1 r-2 p-2">
              <c-tab>الطلبات</c-tab>
              <c-tab>النشاطات</c-tab>
            </c-tab-list>

            <c-tab-panels class="mt-2 t-1 r-2 p-2">
              <c-tab-panel>
                <SupermarketCustomersOrders :orders="orders" />
              </c-tab-panel>
              <c-tab-panel>
                <p>two!</p>
              </c-tab-panel>
            </c-tab-panels>
          </c-tabs>
        </c-box>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions, mapState } from "vuex";

export default {
  props: ["id"],
  computed: {
    customer() {
      return this.$store.getters["supermarket/customers/customer"](this.id);
    },

    customers() {
      return this.$store.getters["supermarket/customers/customers"];
    },

    orders() {
      return this.$store.getters["supermarket/orders/ordersOfCustomer"](
        this.id
      );
    },
  },
};
</script>

<style lang="scss" scoped>
</style>