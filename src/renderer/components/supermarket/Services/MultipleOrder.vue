<template>
  <div v-if="service">
    <ul class="nav nav-pills p-0 mb-2">
      <li @click="selectOrder(i)" class="nav-item" v-for="(order, i) in ordersList" :key="i">
        <a class="nav-link r-2" :class="order.enabled ? 'active' : ''" href="#">الطلب {{ i+1 }}</a>
      </li>
      <div class="me-auto d-flex">
        <li @click="removeOrder()" class="nav-item ml-1">
          <a class="nav-link tb-1 btn-icon-label r-2" href="#">
            <span class="btn-inner--text">
              حذف الطلب
            </span>
            <span class="btn-inner--icon">
              <i class="fas fa-minus"></i>
            </span>
          </a>
        </li>
        <li @click="newOrder()" class="nav-item">
          <a class="nav-link tb-1 btn-icon-label r-2" href="#">
            <span class="btn-inner--text">
              طلب جديد
            </span>
            <span class="btn-inner--icon">
              <i class="fas fa-plus"></i>
            </span>
          </a>
        </li>
      </div>
    </ul>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions, mapState } from "vuex";

export default {
  props: ["service_id"],

  computed: {
    service() {
      if (this.$store.state.supermarket.services.services)
        return this.$store.state.supermarket.services.services.find(
          (x) => x.id == this.service_id && x.state == true
        );
    },
    lastOrder() {
      return this.$store.state.supermarket.orders.lastOrder;
    },
    ordersList() {
      return this.$store.state.supermarket.orders.ordersList;
    },
  },
  methods: {
    orderNumber(i) {
      return this.lastOrder.order_number ? this.lastOrder.order_number + i : i;
    },

    ...mapMutations({
      selectOrder: "supermarket/orders/selectOrder",
      newOrder: "supermarket/orders/newOrder",
      removeOrder: "supermarket/orders/removeOrder",
    }),
  },
};
</script>

<style lang="scss" scoped>
.nav-pills{
  .active{
    background: $t-3;
  }
  .nav-link{
    color: #fff;
  }
}
</style>