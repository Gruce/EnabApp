<template>
  <!-- eslint-disable -->
  <div class="container-fluid">
    <SupermarketServicesCalculator v-if="calculator && calculatorState" :totalPrice="totalPrice" />

    <div class="row main-height">
      <div class="col-5">
        <div class="px-2">
          <div class="h-items-height">
            <div class="row">
              <div class="col-1 px-0">
                <button @click="hideCategories" type="button" class="btn btn-xs btn-block t-1 b-2 r-2">
                  <span class="btn-inner--icon">
                    <i v-if="!hideCategoriesValue" class="fas fa-arrow-right text-light"></i>
                    <i v-else="hideCategoriesValue" class="fas fa-arrow-left text-light"></i>
                  </span>
                </button>
              </div>
              <div class="col-11">
                <div id="top-right" class="form-group">
                  <c-input-group>
                    <c-input-left-element>
                      <c-tooltip label="فقط منتجات">
                        <c-switch :isChecked="true" @change="onlyProducts" mt=3 ml=6 size="md" />
                      </c-tooltip>
                    </c-input-left-element>
                    <c-input v-model="search" type="text" placeholder="بحث" />
                  </c-input-group>
                  <!-- <input v-model="search" type="text" class="form-control form-control-sm r-2" placeholder="بحث">
                  <div class="form-check form-switch position-absolute search-only-products">
                    <label class="form-check-label" for="onlySearchProducts"><small>فقط منتجات</small></label>
                    <input checked @change="onlyProducts" class="form-check-input mr-1" type="checkbox" id="onlySearchProducts">
                  </div> -->
                </div>
              </div>
            </div>
            <div class="row text-center">
              <UtilitiesLoading v-if="products_loading" />
            </div>
            <div class="row mt-3">
              <div v-if="!hideCategoriesValue" class="col-4 show-scroll">
                <div class="h-sub-items-height category-list p-2">
                  <ul class="nav flex-column p-0">
                    <li :class="(category.id== selectedCategory ? 'activeCategory' : '')" class="nav-item" v-for="category in categories" :key="'category-'+category.id">
                      <div class="nav-link">
                        <SupermarketNeworderCategory :category="category" />
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div :class="hideCategoriesValue ? 'col-12' : 'col-8'" class="show-scroll">
                <div class="h-sub-items-height p-2">
                  <div class="row">
                    <div :class="hideCategoriesValue ? 'col-xl-4 col-sm-6' : 'col-xl-6 col-sm-12'" v-for="product in products" :key="'product-'+product.id">
                      <SupermarketNeworderProduct :orderIndex="orderIndex" :product="product" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-7 r-2 b-1">
        <div class="card-fluid p-4">
          <div class="text-right">
            <div class="row mx-0">
              <div class="col-6 p-0">
                <c-text fontSize="3xl">
                  <span>الطلب الحالي </span>
                  <small v-if="lastOrder.order_number">#{{ lastOrder.order_number+orderIndex+1 }}</small>
                  <small v-else>#{{ orderIndex+1 }}</small>
                </c-text>
              </div>
              <div class="col-6 text-left p-0">
                <div>
                  <SupermarketServicesCustomerAssign v-if="customerAssign" :orderIndex="orderIndex" :productsAdded="productsAdded" />

                  <c-button :isDisabled="productsAdded.length <= 0" @click="emptyProducts()" variant-color="red" class="r-2" variant="solid">
                    حذف الكل
                  </c-button>
                </div>
              </div>
            </div>
            <div class="show-scroll mt-3">
              <div class="h-list-height">
                <ul class="list-group products-list list-group-flush ml-1 p-0">
                  <li class="list-group-item" v-for="productAdded in productsAdded" :key="'added'+productAdded.id">
                    <SupermarketNeworderAddedProduct :orderIndex="orderIndex" :product="productAdded" />
                  </li>
                </ul>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-5">
                <button @click="endOrder" :class="[productsAdded.length > 0 ? '' : 'disabled']" type="button" class="btn btn-block btn-light py-3 fs-3 r-2">
                  إنهاء الطلب
                </button>
              </div>
              <div class="col-7">
                <div class="row t-1 r-2 align-items-center p-3">
                  <div class="col-6">
                    <span class="fs-3 text-light">
                      <b>الإجمالي</b>
                    </span>
                  </div>
                  <div class="col-6 text-left text-light">
                    <span class="fs-3 totalPrice">
                      <b>{{ $n(totalPrice, 'currency') }}</b>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mt-1">
              <div class="col-5">
                <div class="row tb-2 r-2 mx-0 p-1">
                  <!-- Right - Empty -->
                  <div class="col-12">
                    <SupermarketNeworderPaymentMethods />
                  </div>
                </div>
              </div>
              <div class="col-7">
                <div v-if="lastOrder.order_number" class="row align-items-center p-1">
                  <div class="col-4">
                    <span class="fs-6 text-light">
                      <b>الطلب السابق #{{ lastOrder.order_number }}</b>
                    </span>
                  </div>
                  <div class="col-8 text-left text-light">
                    <span class="fs-6">
                      <b>{{ $n(lastOrder.order_price, 'currency') }}</b>
                    </span>
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
import { mapMutations, mapGetters, mapActions, mapState } from "vuex";

export default {
  layout: "supermarket",
  head: {
    title: "New Order",
  },
  props: ["orderIndex"],
  computed: {
    ...mapGetters({
      categories: "supermarket/categories/categories_all",
      products: "supermarket/products/products",
      productsAdded: "supermarket/orders/productsAdded",
      lastOrder: "supermarket/orders/lastOrder",
      selectedCategory: "supermarket/orders/selectedCategory",
      hideCategoriesValue: "supermarket/orders/hideCategoriesValue",
      totalPrice: "supermarket/orders/totalPrice",

      // Services Properties
      calculatorState: "supermarket/orders/calculator",

      // Services
      customerAssign: "supermarket/services/customerAssign",
      calculator: "supermarket/services/calculator",
    }),
  },
  data() {
    return {
      products_loading: true,
      search: "",
    };
  },
  created() {
    this.products_loading = false;
  },
  methods: {
    ...mapMutations({
      onlyProducts: "supermarket/orders/onlyProducts",
      hideCategories: "supermarket/orders/hideCategories",
    }),
    ...mapActions({
      emptyProducts: "supermarket/orders/emptyProducts",
      endOrder: "supermarket/orders/endOrder",
    }),
  },

  watch: {
    ...mapActions({
      search: "supermarket/orders/searchItems",
    }),
  },
};
</script>

<style lang="scss">
.main-height {
  min-height: calc(100vh - 13rem) !important;
  max-height: calc(100vh - 13rem) !important;
}
.h-items-height {
  min-height: calc(100vh - 12rem) !important;
  max-height: calc(100vh - 12rem) !important;
}
.h-sub-items-height {
  min-height: calc(100vh - 14.75rem) !important;
  max-height: calc(100vh - 14.75rem) !important;
}
.h-list-height {
  min-height: calc(100vh - 28rem) !important;
  max-height: calc(100vh - 28rem) !important;
}
.products-list .list-group-item:first-child {
  border-top-left-radius: $r-2 !important;
  border-top-right-radius: $r-2 !important;
}
.products-list .list-group-item:last-child {
  border-bottom-right-radius: $r-2 !important;
  border-bottom-left-radius: $r-2 !important;
}
.search-only-products {
  left: 20px;
  top: 8px;
}
.category-list .nav-item {
  border: 1px solid #fff4;
  &:first-of-type {
    background: $t-1;
    border-top-left-radius: $r-2;
    border-top-right-radius: $r-2;
  }
  &:last-of-type {
    border-bottom-left-radius: $r-2;
    border-bottom-right-radius: $r-2;
  }
  &:hover {
    background: $t-3;
  }
}

.activeCategory {
  background: #fff3 !important;
}
</style>