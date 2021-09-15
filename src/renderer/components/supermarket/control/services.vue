<template>
  <div class="mt-3">
    <div class="r-2 border-0 shadow-none">
      <div class="row d-flex justify-content-between">
        <div class="col-auto">
          <h1 class="text-right text-light">
            <c-heading as="h1" fontSize="4xl" ml="4" color="white">خدماتي</c-heading>
          </h1>
        </div>
      </div>
      <div class="row mt-3" v-if="services.length > 0">
        <div v-for="service in services" :key="service.id" class="col-6">
          <SupermarketServicesService :service="service" />
        </div>
      </div>
      <div v-else>
        <c-alert class="bg-none b-1 r-2 mt-3" variant="subtle" flexDirection="column" justifyContent="center" textAlign="center" height="200px">
          <c-alert-icon color="gray.250" name="warning" size="40px" :mr="0" />
          <c-alert-title :mt="4" :mb="1" fontSize="xl">
            لايوجد خدمات
          </c-alert-title>
          <c-alert-description maxWidth="sm">
            يمكنك شراء خدمات من خلال
            <nuxt-link to="/supermarket/services" class="fw-bold text-light"> متجر الخدمات </nuxt-link>
          </c-alert-description>
        </c-alert>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions, mapState } from "vuex";

export default {
  computed: {
    ...mapGetters({
      services: "supermarket/services/owned",
    }),
  },
  created() {
    this.fetchServices();
  },
  methods: {
    ...mapActions({
      fetchServices: "supermarket/services/fetchServices",
    }),
  },
};
</script>

<style lang="scss" scoped>
//
</style>