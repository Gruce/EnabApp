<template>
  <div class="mt-3">
    <div class="r-2 border-0 shadow-none">
      <div class="row">
        <div class="col-xl-12 col-md-12 d-flex align-items-center">
          <c-heading as="h1" fontSize="4xl" ml="4" color="white">الفئات</c-heading>
          <span v-if="categories">(الإجمالي<span class="badge t-1 mx-1">{{ categories.length }}</span>)</span>

          <span class="me-auto text-left" v-if="$auth.user.supermarket.category_count < categories.length">
            <c-button v-if="$nuxt.isOnline && $auth.user.supermarket.pivot.user_type == 'admin'" class="t-1 b-1 r-2 text-light" variant="ghost" @click="countUp()">
              تمديد
            </c-button>
          </span>
          <span px="6" height="100%" class="me-auto" v-else>
            <c-button v-if="$nuxt.isOnline" class="t-1 b-1 r-2 text-light" variant="ghost" @click="show = !show,editState=false,thisData = {}">
              إضافة فئة
            </c-button>
          </span>
        </div>
        <div v-if="$auth.user.supermarket.category_count <= categories.length" class="col-12">
          <div class="alert t-3 text-light b-2 w-100 r-2 mt-3 fs-6" role="alert">
            <div class="align-items-center d-flex">
              <i class="fas fa-info-circle fa-2x mx-3"></i>
              لقد تجاوزت الـ
              <span class="text-dark mx-1">{{ categories.length }}</span>
              فئة.
              يمكن زيادة المساحة بـ
              <span class="text-dark mx-1">2000</span>
              نقطة للحصول على
              <span class="badge badge-success mr-1">200 اضافية</span>
            </div>

            <span class="badge t-1 b-1 mr-3 mt-2 r-1 text-dark px-3" v-if="$auth.user.supermarket.pivot.user_type !== 'admin'">
              يجب ان تكون مدير
            </span>
          </div>
        </div>
      </div>

      <div class="mt-3 mb-3">
        <!-- ADD / EDIT -->
        <c-collapse :is-open="show">
          <h3 class="text-center text-light tb-2 r-2 p-3 my-2" v-if="$nuxt.isOffline && !editState">لايوجد اتصال بالانترنت</h3>
          <c-box class="t-1 r-2 b-1" p="6" v-else>
            <form @submit.prevent="submit">
              <c-form-control is-required>
                <c-form-label for="name">أسم الفئة</c-form-label>
                <c-input size="lg" v-model="thisData.name" id="name" placeholder="أسم الفئة" />
              </c-form-control>

              <c-button mt="4" :isLoading="loading" type="submit" class="t-1 r-2" size="lg" border="2px" border-color="primary.1">
                <span v-if="editState">تعديل</span>
                <span v-else>إضافة</span>
              </c-button>
            </form>
          </c-box>
        </c-collapse>

        <UtilitiesTable :data="categories" :properties="table" @remove="remove($event)" @edit="thisData = get($event), editState = true, show = true" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions, mapState } from "vuex";

export default {
  computed: {
    ...mapGetters({
      get: "supermarket/categories/category",
      products: "supermarket/products/products",
    }),

    categories() {
      return [...this.$store.getters["supermarket/categories/categories_all"]].splice(1);;
    },
  },
  data() {
    return {
      show: false,
      search: "",
      thisData: {},
      editState: "",
      loading: false,

      table: {
        noData: {
          message: "لايوجد فئات",
          tip: "يمكن إضافة فئات من خلال (إضافة فئة)",
        },
        search: "name",
        control: [
          {name: "edit", icon: "fa-pen", variant: "primary"},
          {name: "remove", icon: "fa-times", variant: "danger"},
        ],
        head: [
          { title: "الاسم", column: "name" },
          { title: "عدد المنتجات", column: "products_count" },
        ],
      },
    };
  },
  created() {
    this.fetchCategories();
  },
  async mounted() {
    // Set each category products count
    const products = await this.products;
  },

  methods: {
    async submit() {
      if (this.editState) {
        this.loading = true;
        await this.$store.dispatch(
          "supermarket/categories/editCategory",
          this.thisData
        );
        this.loading = false;
        this.show = false;
      } else {
        this.loading = true;
        await this.$store.dispatch(
          "supermarket/categories/addCategory",
          this.thisData
        );
        this.thisData = {};
        this.loading = false;
      }
    },

    ...mapActions({
      remove: "supermarket/categories/removeCategory",
      fetchCategories: "supermarket/categories/fetchCategories",
      countUp: "supermarket/categories/countUp",
    }),
  },
};
</script>

<style lang="scss" scoped>
</style>