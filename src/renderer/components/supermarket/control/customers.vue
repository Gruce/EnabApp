<template>
  <div class="mt-3">
    <div class="r-2 border-0 shadow-none">
      <div class="row">
        <div class="col-8 d-flex">
          <h1 class="text-light">الزبائن</h1>
          <span class="mx-2">-</span>
          <b-button v-if="$nuxt.isOnline" @click="editState=false,thisCustomer = {}" class="t-1 r-2 px-4 border-0 text-light" v-b-toggle.add-edit>
            إضافة زبون
          </b-button>
          <b-button v-if="$nuxt.isOffline" disabled class="t-1 r-2 px-4 border-0 text-light">
            إضافة زبون
          </b-button>
        </div>
        <div class="col-4">
          <div class="form-group">
            <input v-model="search" type="text" class="form-control r-2" placeholder="بحث" />
          </div>
        </div>
      </div>
      <div class="mt-3">
        <!-- ADD / EDIT -->
        <b-collapse id="add-edit">
          <h3 class="text-center text-light tb-2 r-2 p-3 my-2" v-if="$nuxt.isOffline && !editState">لايوجد اتصال بالانترنت</h3>
          <b-card class="t-3 r-2" v-else>
            <b-form class="p-4" @submit.prevent="submit">
              <h2 v-if="editState">تعديل الزبون</h2>
              <h2 v-else>إضافة زبون</h2>
              <div class="row">
                <b-form-group id="input-group-1" label="أسم الزبون" label-for="customer_name_input">
                  <b-form-input v-model="thisCustomer.name" id="customer_name_input" type="text" required></b-form-input>
                </b-form-group>
              </div>
              <div class="row mt-3">
                <div class="col-6">
                  <b-form-group id="input-group-2" label="الدين" label-for="customer_debt_input">
                    <b-form-input v-model="thisCustomer.debt" id="customer_debt_input" type="text"></b-form-input>
                  </b-form-group>
                </div>
                <div class="col-6">
                  <b-form-group id="input-group-3" label="رقم الهاتف" label-for="customer_phonenumber_input">
                    <b-form-input v-model="thisCustomer.phonenumber" id="customer_phonenumber_input" type="number"></b-form-input>
                  </b-form-group>
                </div>
              </div>
              <div class="row mt-3">
                <b-form-group id="input-group-3" label="عنوان السكن" label-for="customer_location_input">
                  <b-form-input v-model="thisCustomer.location" id="customer_location_input" type="text"></b-form-input>
                </b-form-group>
              </div>
              <b-button v-if="editState" type="submit" class="tb-2 border-0 fs-5 btn-block py-2 mt-3">تعديل</b-button>
              <b-button v-else type="submit" class="tb-2 border-0 fs-5 btn-block py-2 mt-3">أضف</b-button>
            </b-form>
          </b-card>
        </b-collapse>

        <div class="table-responsive">
          <!-- <h4 class="text-center text-light" v-if="customers.length <= 0">
            لاتوجد منتجات
          </h4> -->
          <table class="table table-cards text-right">
            <thead>
              <tr class="text-light">
                <th scope="col">#</th>
                <th scope="col">الاسم</th>
                <th scope="col">الدين</th>
                <th scope="col">رقم الهاتف</th>
                <th scope="col">العنوان</th>
                <th scope="col">التحكم</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(customer, i) in customers" :key="customer.id" class="table-divider">
                <td scope="row">{{ i + 1 }}</td>
                <td>{{ customer.name }}</td>
                <td>{{ customer.debt }}</td>
                <td>{{ customer.phonenumber }}</td>
                <td>{{ customer.location }}</td>
                <td class="text-center">
                  <a v-if="customer.id !== 0" href="#" @click="$store.commit('supermarket/customers/setCustomer', customer.id), editState = true" v-b-toggle.add-edit class="action-item text-primary">
                    <i class="fas fa-pen"></i>
                  </a>
                  <a v-if="customer.id !== 0" @click="removeCustomer(customer.id)" href="#" class="action-item text-danger">
                    <i class="fas fa-times"></i>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions, mapState } from "vuex";

export default {
  computed: {
    customers() {
      return this.$store.state.supermarket.customers.customers;
    },
    customer() {
      return this.$store.state.supermarket.customers.customer;
    },
  },
  data() {
    return {
      search: "",
      thisCustomer: {},
      editState: "",
    };
  },
  async mounted() {},
  methods: {
    submit: function () {
      if (this.editState) {
        this.$store.dispatch(
          "supermarket/customers/editCustomer",
          this.thisCustomer
        );
      } else {
        this.$store.dispatch(
          "supermarket/customers/addCustomer",
          this.thisCustomer
        );
        this.thisCustomer = {};
      }
    },

    ...mapActions({
      removeCustomer: "supermarket/customers/removeCustomer",
    }),
  },
  watch: {
    ...mapActions({
      search: "supermarket/customers/search",
    }),
    customer(x) {
      this.thisCustomer = { ...x };
    },
  },
};
</script>

<style lang="scss" scoped>
//
</style>