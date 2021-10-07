<template>
  <div class="container text-center">
    <div class="mt-6">

      <div class="group-links p-2 r-2">
        <span @click="recharge = true" :class="recharge ? 'active' : ''" class="badge r-2 py-3 px-3 pointer fs-5">
          شحن الرصيد
        </span>
        <span @click="recharge = false" :class="!recharge ? 'active' : ''" class="badge r-2 py-3 px-3 pointer fs-5">
          الطلبات
        </span>
      </div>

      <CreditsNew v-if="recharge" />
      <CreditsRequests v-else />
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      recharge: true,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>