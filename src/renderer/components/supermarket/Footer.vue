<template>
  <div class="beta">
    <span class="badge tb-2 text-light">
      BETA
    </span>

    <span class="badge tb-2 text-light" v-b-tooltip.hover.top title="السوبرماركت">
      {{ $auth.user.supermarket.name }}
    </span>

    <span class="badge tb-2 text-light">
      {{ getUserType($auth.user.supermarket.pivot.user_type) }}
    </span>

    <!-- Printer -->
    <span @click="setPrintState" class="badge text-dark pointer" :class="printState ? 'badge-success' : 't-3'" v-b-tooltip.hover.top :title="printState ? 'الطابعة مفعلة' : 'الطابعة غير مفعلة'">
      <i class="fas fa-print"></i>
    </span>

    <!-- Is Online -->
    <span class="badge badge-success text-dark" v-if="$nuxt.isOnline">
      متصل
    </span>
    <!-- Is Offline -->
    <span class="badge badge-danger text-dark" v-if="$nuxt.isOffline">
      غير متصل
    </span>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions, mapState } from "vuex";

export default {
  computed: {
    ...mapGetters({
        // Printer
      printState: "supermarket/utilities/printState",
      defaultPrinter: "supermarket/utilities/defaultPrinter",
    }),
  },
  methods: {
    getUserType(user_type){
      switch (user_type){
        case 'admin':
          return "مدير"
        case 'staff':
          return "طاقم العمل"
        default:
          return "غير معروف"
      }
    },
    ...mapActions({
        // Printer
      setPrintState: "supermarket/utilities/setPrintState",
    }),
  },
};
</script>

<style lang="scss" scoped>
.beta {
  width: 100%;
  direction: ltr;
  position: absolute;
  bottom: 0.25rem;
  left: 2.25rem;
  //   transform: translate(-50%, -50%);
}
</style>