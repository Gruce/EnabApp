<template>
  <div class="mt-3">
    <div class="r-2 border-0 shadow-none">
      <c-heading as="h1" fontSize="4xl" ml="4" color="white">
        متجر الخدمات
      </c-heading>

      <div class="r-2 p-3 b-1 show-scroll mt-4">
        <div class="row mx-3 mt-3">
          <div class="col-6">
            <span class="badge badge-dark p-2 text-right" v-if="services">
              عدد الخدمات {{ services.length }}
            </span>
          </div>
          <div class="col-6">
            <div class="form-group text-left">
              <label class="form-check-label text-light" for="onlySearchProducts">
                <small>الخدمات غير المشترك بها</small>
              </label>
              <c-switch @change="onlyOwned" mt=3 ml=6 size="md" />
            </div>
          </div>
        </div>
        <!-- <hr class="bg-light" /> -->
        <div class="row h-items-height mt-4 mx-3">
          <div v-for="service in services" :key="service.id" class="col-xl-4 col-lg-6">
            <SupermarketServicesService :service="service" />
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
    title: "Services",
  },
  computed: {
    services() {
      let services = this.$store.state.supermarket.services.services;
      if (this.$store.state.supermarket.services.onlyOwned)
        services = services.filter((x) => x.owned == false);
      return services;
    },
  },
  created() {
    this.fetchServices(true);
  },
  methods: {
    ...mapActions({
      fetchServices: "supermarket/services/fetchServices",
    }),
    ...mapMutations({
      onlyOwned: "supermarket/services/onlyOwned",
    }),
  },
};
</script>

<style lang="scss" scoped>
.h-items-height {
  min-height: calc(100vh - 22rem) !important;
  max-height: calc(100vh - 22rem) !important;
}
.card {
  button.text-dark {
    transition: 0.3s;
    &:hover {
      color: #111 !important;
    }
  }
}
</style>