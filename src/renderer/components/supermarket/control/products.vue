<template>
  <div class="mt-3">
    <div class="r-2 border-0 shadow-none">
      <div class="row">
        <div class="col-xl-12 col-md-12 d-flex align-items-center">
          <c-heading as="h1" fontSize="4xl" ml="4" color="white">المنتجات</c-heading>
          <span v-if="products">(الإجمالي<span class="badge t-1 mx-1">{{ products.length }}</span>)</span>

          <span class="me-auto text-left" v-if="$auth.user.supermarket.product_count <= products.length">
            <c-button v-if="$nuxt.isOnline && $auth.user.supermarket.pivot.user_type == 'admin'" class="t-1 b-1 r-2 text-light" variant="ghost" @click="countUp()">
              تمديد
            </c-button>
          </span>
          <span px="6" height="100%" class="me-auto" v-else>
            <c-button v-if="$nuxt.isOnline" class="t-1 b-1 r-2 text-light me-auto" variant="ghost" @click="show = !show,editState=false,thisData = {}">
              إضافة منتج
            </c-button>
          </span>
        </div>

        <div v-if="$auth.user.supermarket.product_count <= products.length" class="col-12">
          <div class="alert t-3 text-light b-2 w-100 r-2 mt-3 fs-6" role="alert">
              <div class="align-items-center d-flex">
                <i class="fas fa-info-circle fa-2x mx-3"></i>
                لقد تجاوزت الـ 
                <span class="text-dark mx-1">{{ products.length }}</span>
                منتج.
                يمكن زيادة المساحة بـ 
                <span class="text-dark mx-1">2000</span>
                نقطة للحصول على
                <span class="badge badge-success mr-1">500 اضافية</span>
              </div>

              <span class="badge t-1 b-1 mr-3 mt-2 r-1 text-dark px-3" v-if="$auth.user.supermarket.pivot.user_type !== 'admin'">
                  يجب ان تكون مدير
              </span>
          </div>
        </div>


        <div class="col-xl-12 col-md-12">
            <c-input-group mt=1>
              <c-input-left-element>
                <i class="fas fa-search"></i>
              </c-input-left-element>
              <c-input py=5 v-model="search" type="text" placeholder="بحث" />
            </c-input-group>
        </div>
      </div>
      <div class="mt-3">
        <!-- ADD / EDIT -->
        <c-collapse :is-open="show">
          <h3 class="text-center text-light tb-2 r-2 p-3 my-2" v-if="$nuxt.isOffline && !editState">لايوجد اتصال بالانترنت</h3>
          <c-box class="t-1 r-2 b-1" p="6" v-else>
            <form @submit.prevent="submit">

              <c-grid templateColumns="repeat(4, 1fr)" gap=4>
                <c-grid-item col-span=2>
                  <c-form-control is-required>
                    <c-form-label for="name">أسم المنتج</c-form-label>
                    <c-input size="lg" v-model="thisData.name" id="name" placeholder="أسم المنتج" />
                  </c-form-control>
                </c-grid-item>

                <c-grid-item col-span=2>
                  <c-form-control is-required>
                    <c-form-label for="category">فئة المنتج</c-form-label>
                    <v-select v-model="thisData.category_id" :options="categories" label="name" :reduce="name => name.id"></v-select>
                  </c-form-control>
                </c-grid-item>

                <c-grid-item col-span=2>
                  <c-form-control>
                    <c-form-label for="barcode">الباركود</c-form-label>
                    <c-input size="lg" v-model="thisData.barcode" id="barcode" placeholder="الباركود" />
                  </c-form-control>
                </c-grid-item>
                <c-grid-item col-span=1>
                  <c-form-control is-required>
                    <c-form-label for="count">العدد</c-form-label>
                    <c-input size="lg" v-model="thisData.count" id="count" placeholder="العدد" />
                  </c-form-control>
                </c-grid-item>
                <c-grid-item col-span=1>
                  <c-form-control is-required>
                    <c-form-label for="price">السعر</c-form-label>
                    <c-input size="lg" v-model="thisData.price" id="price" placeholder="السعر" />
                  </c-form-control>
                </c-grid-item>
              </c-grid>

              <c-button mt="4" :isLoading="loading" type="submit" class="t-1 r-2" size="lg" border="2px" border-color="primary.1">
                <span v-if="editState">تعديل</span>
                <span v-else>إضافة</span>
              </c-button>
            </form>
          </c-box>
        </c-collapse>

        <UtilitiesTable :data="products" :properties="table" @remove="remove($event)" @edit="thisData = get($event), editState = true, show = true" />
        
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions, mapState } from "vuex";

export default {
  computed: {
    ...mapGetters({
      categories: "supermarket/categories/categories",
      get: "supermarket/products/product",
    }),

    products(){
      return this.$store.getters['supermarket/products/products']
    }
  },
  data() {
    return {
      show: false,
      loading: false,
      search: "",
      thisData: { type: 0 },
      editState: "",
      types: [
        // {text: 'وزني', value: 1},
        { text: "عددي", value: 0 },
      ],

      table: {
        noData: {
          message: "لايوجد منتجات",
          tip: "يمكن إضافة منتجات من خلال (إضافة منتج)",
        },
        edit: true,
        remove: true,
        head: [
          { title: "الاسم", column: "name" },
          { title: "فئة المنتج", column: "category.name" },
          { title: "العدد", column: "count" },
          { title: "السعر", column: "price" },
        ],
      },
    };
  },
  created(){
    this.fetchProducts();
  },
  methods: {
    async submit() {
      if (this.editState) {
        this.loading = true;
        await this.$store.dispatch(
          "supermarket/products/editProduct",
          this.thisData
        );
        this.loading = false;
        this.show = false;
      } else {
        this.loading = true;
        await this.$store.dispatch(
          "supermarket/products/addProduct",
          this.thisData
        );
        let categoryId = this.thisData.category_id;
        this.thisData = { category_id: categoryId, type: 0 };
        this.loading = false;
      }
    },

    ...mapActions({
      remove: "supermarket/products/removeProduct",
      fetchProducts: "supermarket/products/fetchProducts",
      countUp: "supermarket/products/countUp",
    }),
  },
  watch: {
    ...mapActions({
      search: "supermarket/products/search",
    }),
  },
};
</script>

<style lang="scss" scoped>
//
</style>