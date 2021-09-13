<template>
  <!-- Service ID = 3 -->
  <div class="d-inline-block position-relative">
    <button @click="toggleModal" type="button" :class="[productsAdded.length > 0 ? '' : 'disabled']" class="btn tb-2 text-light btn-icon-label">
      <span class="btn-inner--icon">
        <i class="fas fa-user"></i>
      </span>
      <span class="btn-inner--text">
        <span v-if="orderList.customer_id">
          {{ selectedCustomer }}
        </span>
        <span v-else>
          تعيين زبون
        </span>
      </span>
    </button>

    <div v-if="showCustomers" class="main">
      <div class="container">
        <c-heading class="text-center" as="h1" fontSize="4xl" mt="3" ml="4" color="white">تعيين الزبون</c-heading>
        <div class="position-absolute top-0 start-0 pointer my-3 ml-4">
          <span @click="toggleModal">
            <UtilitiesClose />
          </span>
        </div>
        <div class="row mt-5">
          <div class="col-6">
            <button @click="newCustomer = false" class="btn btn-block py-3 fs-5 r-2" :class="newCustomer ? 'btn-secondary' : 'btn-light'">
              تعيين زبون
            </button>
          </div>
          <div class="col-6">
            <button @click="newCustomer = true" class="btn btn-block py-3 fs-5 r-2" :class="newCustomer ? 'btn-light ' : 'btn-secondary'">
              التحكم بالزبائن
            </button>
          </div>
        </div>
        <div class="row mt-3 bg-none b-1 m-1 r-2 p-2 content show-scroll">
          <div v-if="newCustomer" class="text-right">
            <SupermarketControlCustomers />
          </div>
          <div v-else>
            <div class="row mt-3">
              <div class="col">
                <c-input-group mt=1>
                  <c-input-left-element>
                    <i class="fas fa-search"></i>
                  </c-input-left-element>
                  <c-input py=5 v-model="search" type="text" placeholder="بحث" />
                </c-input-group>
              </div>
              <div v-if="orderList.customer_id" class="col-auto">
                <button @click="toggleModal(), unselectCustomer()" type="button" class="btn btn-danger btn-lg r-2 text-light btn-icon-label">
                  <span class="btn-inner--icon">
                    <i class="fas fa-times"></i>
                  </span>
                  <span class="btn-inner--text">
                    الغاء التعيين
                  </span>
                </button>
              </div>
            </div>

            <div class="row mt-3" v-if="customers.length > 0">
              <div class="col-4" v-for="customer in customers" :key="customer.id">
                <div class="t-1 b-2 r-2 p-3 pointer customer text-center" @click="chooseCustomer(customer.id)">
                  <div class="fs-4 mb-2">{{ customer.name }}</div>
                  <div class="badge mx-2 t-3 p-1 px-3 r-2 fs-6">
                    الدين : {{ $n(customer.debt, 'currency') }}
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <c-alert class="bg-none b-1 r-2 mt-3" variant="subtle" flexDirection="column" justifyContent="center" textAlign="center" height="200px">
                <c-alert-icon color="gray.250" name="warning" size="40px" :mr="0" />
                <c-alert-title :mt="4" :mb="1" fontSize="xl">
                  لايوجد زبائن
                </c-alert-title>
                <c-alert-description maxWidth="sm">
                  يمكن إضافة زبائن من خلال (إضافة زبون)
                </c-alert-description>
              </c-alert>
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
  props: ["productsAdded", "orderIndex"],

  computed: {
    ...mapGetters({
      c: "supermarket/customers/customers",
    }),
    customers() {
      if (this.c) {
        if (this.search !== "")
          return this.c.filter((x) => x.name.includes(this.search));
        else return this.c;
      }
    },
    orderList() {
      if (this.$store.state.supermarket.orders.ordersList[this.orderIndex])
        return this.$store.state.supermarket.orders.ordersList[this.orderIndex];
    },
    selectedCustomer() {
      if (this.customers && this.orderList) {
        let customers = Object.assign([], this.customers);
        return customers.find((x) => x.id == this.orderList.customer_id).name;
      }
    },
  },
  async created() {
    await this.fetchCustomers();
  },
  data() {
    return {
      showCustomers: false,
      newCustomer: false,
      search: "",
      loading: true,
    };
  },
  methods: {
    toggleModal() {
      this.showCustomers = !this.showCustomers;
    },
    chooseCustomer(customer_id) {
      this.toggleModal();
      this.selectCustomer(customer_id);
    },
    ...mapActions({
      fetchCustomers: "supermarket/customers/fetchCustomers",
    }),
    ...mapMutations({
      selectCustomer: "supermarket/orders/selectCustomer",
      unselectCustomer: "supermarket/orders/unselectCustomer",
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

.main {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 97vw;
  height: 97vh;
  background: #ffffff00;
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  z-index: 999;
  border-radius: $r-2;
  padding: 1rem;
  border: 2px solid $t-3;

  .content {
    min-height: calc(95vh - 15rem) !important;
    max-height: calc(95vh - 15rem) !important;

    .customer {
      transition: 0.3s ease-in-out;
      color: #fff;
      margin: 5px;
      &:hover {
        background: $t-3 !important;
      }
    }
  }
}

.btn-secondary {
  background: $t-1;
  border: 1px solid $t-1;
  transition: 0.2s ease-in-out;

  &:hover {
    background: $t-3;
  }
}
</style>