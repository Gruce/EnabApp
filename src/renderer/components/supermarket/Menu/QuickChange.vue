<template>
  <div>
    <ul class="nav flex-column pr-0">
      <li @click="setPrintState" class="nav-item pointer content text-center py-4 " :class="printState ? 'text-light' : 'text-dark' " v-b-tooltip.hover.left title="تفعيل / تعطيل خاصية الطباعة">
        <i class="fas fa-print fa-3x"></i>
        <div class="mt-3">
          <span v-if="defaultPrinter">{{ defaultPrinter }}</span>
          <span v-else>لم يتم اختيار طابعة</span>
        </div>
      </li>
      <nuxt-link to="/credits" v-b-tooltip.hover.left title="شحن رصيد">
        <li class="nav-item pointer content text-center py-4 mt-3 text-light ">
          <i class="fas fa-credit-card fa-3x"></i>
          <div class="mt-3">{{ $auth.user.points }} نقطة</div>
        </li>
      </nuxt-link>
    </ul>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions, mapState } from "vuex";

export default {
  computed: {
    ...mapGetters({
      printState: "supermarket/utilities/printState",
      defaultPrinter: "supermarket/utilities/defaultPrinter",
    }),
  },
  methods: {
    ...mapActions({
      setPrintState: "supermarket/utilities/setPrintState",
    }),
  },
};
</script>

<style lang="scss" scoped>
</style>