<template>
  <!-- Service ID = 2 -->
  <div class="mb-3">
    <div class="group-links p-2 r-2">
      <span :class="order.enabled ? 'active' : ''" @click="selectOrder(i)" v-for="(order, i) in ordersList" :key="i" class="badge r-2 py-3 px-3 pointer mx-1 fs-6">
        الطلب {{ i+1 }}
      </span>

      <span @click="newOrder()" class="badge r-2 py-3 px-3 pointer mx-1 float-left fs-6">
        طلب جديد
      </span>

      <span @click="removeOrder()" class="badge r-2 py-3 px-3 pointer mx-1 float-left text-danger-h fs-6">
        حذف الطلب
      </span>
    </div>
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
.nav-pills {
  .active {
    background: $t-3;
  }
  .nav-link {
    color: #fff;
  }
}

.nav-link-button {
  transition: 0.3s ease-out;

  &:hover {
    background: $tb-2 !important;
  }
}
</style>