<template>
  <div class="mt-3">
    <div class="r-2 border-0 shadow-none">
      <div class="row">
        <div class="col-xl-12 col-md-12 d-flex">
          <c-heading as="h1" fontSize="4xl" ml="4" color="white">الفئات</c-heading>
<<<<<<< Updated upstream
=======
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

        <div v-if="$auth.user.supermarket.category_count < categories.length" class="col-12">
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
>>>>>>> Stashed changes

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

        <div class="table-responsive" v-if="categories.length > 0">

          <table class="table table-cards text-right">
            <thead>
              <tr class="text-light">
                <th scope="col">#</th>
                <th scope="col">الاسم</th>
                <th scope="col">عدد المنتجات</th>
                <th scope="col">التحكم</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(category, i) in paginatedData" :key="category.id" class="table-divider">
                <td class="align-middle" scope="row">{{ i+1 }}</td>
                <td class="align-middle">{{ category.name }}</td>
                <td class="align-middle">{{ category.productsCount }}</td>
                <td class="align-middle">
                  <c-button v-if="category.id !== 0" variant-color="blue" size="sm" @click="thisData = getCategory(category.id), editState = true, show = true" variant="ghost">
                    <i class="fas fa-pen"></i>
                  </c-button>
                  <c-button v-if="category.id !== 0" variant-color="red" size="sm" @click="removeCategory(category.id)" variant="ghost">
                    <i class="fas fa-times"></i>
                  </c-button>
                </td>
              </tr>
            </tbody>
          </table>
          <UtilitiesLoadMore @data="paginatedData = $event" :data="categories" perPage="10" />

        </div>
        <div v-else>
          <c-alert class="bg-none b-1 r-2" variant="subtle" flexDirection="column" justifyContent="center" textAlign="center" height="200px">
            <c-alert-icon color="gray.250" name="warning" size="40px" :mr="0" />
            <c-alert-title :mt="4" :mb="1" fontSize="xl">
              لايوجد فئات
            </c-alert-title>
            <c-alert-description maxWidth="sm">
              يمكن إضافة فئات من خلال (إضافة فئة)
            </c-alert-description>
          </c-alert>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions, mapState } from "vuex";

export default {
  computed: {
    ...mapGetters({
      getCategory: "supermarket/categories/category",
      products: "supermarket/products/products",
    }),

    categories() {
      return this.$store.getters["supermarket/categories/categories_all"];
    },
  },
  data() {
    return {
      show: false,
      search: "",
      thisData: {},
      editState: "",
      loading: false,

      // Pagination
      paginatedData: [],
<<<<<<< Updated upstream
=======
      paginatedCounter: 0,
>>>>>>> Stashed changes
    };
  },
  created() {
    this.fetchCategories();
  },
  async mounted() {
    // Set each category products count
    const products = await this.products;
    await this.categories.forEach((x) => {
      this.$store.commit("supermarket/categories/set_products_count", {
        id: x.id,
        count: products.filter((y) => y.category_id == x.id).length,
      });
    });
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
      removeCategory: "supermarket/categories/removeCategory",
      fetchCategories: "supermarket/categories/fetchCategories",
      countUp: "supermarket/categories/countUp",
    }),
  },
  watch: {
    ...mapActions({
      search: "supermarket/categories/search",
    }),
  },
};
</script>

<style lang="scss" scoped>
</style>