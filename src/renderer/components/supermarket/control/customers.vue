<template>
  <div class="mt-3">
    <div v-if="selectedCustomer > 0">
      <SupermarketCustomersCustomer @no-customer="selectedCustomer = -1" :id="selectedCustomer" />
    </div>
    <div :class="{ 'd-none': selectedCustomer > 0 }" class="r-2 border-0 shadow-none">
      <div class="row">
        <div class="col-xl-12 col-md-12 d-flex align-items-center">
          <c-heading as="h1" fontSize="4xl" ml="4" color="white">الزبائن</c-heading>
          <span v-if="customers">(الإجمالي<span class="badge t-1 mx-1">{{ customers.length }}</span>)</span>

          <c-button v-if="$nuxt.isOnline" px="6" height="100%" class="t-1 b-1 r-2 text-light me-auto" variant="ghost" @click="show = !show,editState=false,thisData = {}">
            إضافة فئة
          </c-button>
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
                    <c-form-label for="name">أسم الزبون</c-form-label>
                    <c-input size="lg" v-model="thisData.name" id="name" placeholder="أسم الزبون" />
                  </c-form-control>
                </c-grid-item>
                <c-grid-item col-span=2>
                  <c-form-control>
                    <c-form-label for="debt">الدين</c-form-label>
                    <c-input size="lg" v-model="thisData.debt" id="debt" placeholder="الدين" />
                  </c-form-control>
                </c-grid-item>
                <c-grid-item col-span=2>
                  <c-form-control>
                    <c-form-label for="phonenumber">رقم الهاتف</c-form-label>
                    <c-input size="lg" v-model="thisData.phonenumber" id="phonenumber" placeholder="رقم الهاتف" />
                  </c-form-control>
                </c-grid-item>
                <c-grid-item col-span=2>
                  <c-form-control>
                    <c-form-label for="location">عنوان السكن</c-form-label>
                    <c-input size="lg" v-model="thisData.location" id="location" placeholder="عنوان السكن" />
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

        <UtilitiesTable :data="customers" :properties="table" @watch="selectedCustomer = $event" @remove="remove($event)" @edit="thisData = get($event), editState = true, show = true" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions, mapState } from "vuex";

export default {
  computed: {
    ...mapGetters({
      get: "supermarket/customers/customer",
    }),
    

    customers() {
      return this.$store.getters["supermarket/customers/customers"];
    },
  },
  data() {
    return {
      show: false,
      search: "",
      thisData: {},
      editState: "",
      loading: false,
      selectedCustomer: 0,

      table: {
        noData: {
          message: "لايوجد زبائن",
          tip: "يمكن إضافة زبون من خلال (إضافة زبون)",
        },
        edit: true,
        remove: true,
        watch: true,
        head: [
          { title: "الاسم", column: "name" },
          { title: "الدين", column: "debt" },
          { title: "رقم الهاتف", column: "phonenumber" },
          { title: "العنوان", column: "location" },
        ],
      },
    };
  },
  created() {
    this.fetchCustomers();
  },
  methods: {
    async submit() {
      if (this.editState) {
        this.loading = true;
        await this.$store.dispatch(
          "supermarket/customers/editCustomer",
          this.thisData
        );
        this.loading = false;
      } else {
        this.loading = true;
        await this.$store.dispatch(
          "supermarket/customers/addCustomer",
          this.thisData
        );
        this.thisData = {};
        this.loading = false;
      }
    },

    ...mapActions({
      remove: "supermarket/customers/removeCustomer",
      fetchCustomers: "supermarket/customers/fetchCustomers",
    }),
  },
  watch: {
    ...mapActions({
      search: "supermarket/customers/search",
    }),
  },
};
</script>

<style lang="scss" scoped>
//
</style>