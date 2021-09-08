<template>
  <div class="py-1 mb-2 r-2 position-relative product" @click="addProduct(product.id)" @click.right="removeProduct(product.id)">
    <span class="position-absolute badge badge-light border-white text-dark count" v-if="productInCount(product.id)">
      {{ productInCount(product.id) }}
    </span>
    <!-- <span class="position-absolute badge badge-light border-white text-dark left">
        المتبقي : {{ product.count - productInCount(product.id) }}
    </span>  -->
    <div class="card-body pb-2 text-center">
      <div class="row"><span class="h5 text-light mb-1">
          {{ product.name }}
        </span>
      </div>
      <div class="row">
        <span class="text-light text-left">
          {{ $n(product.price, 'currency') }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";

export default {
  props: ["product", "orderIndex"],
  computed: {
    ...mapGetters({
      productsAdded: "supermarket/orders/productsAdded",
      productInCount: "supermarket/orders/productInCount",
    }),
  },
  methods: {
    ...mapActions({
      addProduct: "supermarket/orders/addProduct",
      removeProduct: "supermarket/orders/removeProduct",
    }),
  },
};
</script>

<style lang="scss" scoped>
.count {
  top: -5px;
  left: -5px;
}
.left {
  top: -5px;
  right: -5px;
}
.product {
  border: 1px solid #fff4;
}
.product:hover {
  cursor: pointer;
  background: $t-1;
}
.card {
  margin-bottom: 5px !important;
}
</style>