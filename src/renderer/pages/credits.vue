<template>
  <div class="container mt-5 text-center">
    <button @click="recharge = true" :class="recharge ? 'bg-light text-dark' : 't-1 text-light'" class="btn b-1 btn-lg r-2">شحن الرصيد</button>
    <button @click="recharge = false" :class="!recharge ? 'bg-light text-dark' : 't-1 text-light'" class="btn b-1 btn-lg r-2">الطلبات</button>

    <CreditsNew v-if="recharge" />
    <CreditsRequests v-else />
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions, mapState } from "vuex";

export default {
  data(){
    return {
      recharge: true
    }
  }
};
</script>

<style lang="scss" scoped>


</style>