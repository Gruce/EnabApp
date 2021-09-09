<template>
  <div class="p-3">
    <h4 class="text-light">الإشعارات</h4>
    <div class="list-group r-2 show-scroll max-height pl-1">
      <div class="list-group-item d-flex w-100 justify-content-between" v-for="num in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]" :key="num">
        <div>
          <h6 class="font-weight-light mb-1 text-light">A product from wishlist is on sale</h6>
        </div>
        <div>
          <span class="badge r-2 px-2 tb-1">2021</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$echo.channel("recharge").listen("RechargeRequestEvent", (e) => {
      console.log(e);
    });
  },
};
</script>

<style lang="scss" scoped>
.list-group-item {
  background: #ffffff00;
  border-color: $t-3;
  transition: 0.3s ease-in-out;

  &:hover {
    background: $t-3;
    border-color: $t-2;
  }
}

.max-height {
  min-height: 380px !important;
  max-height: 380px !important;
}

// @media (max-height: 1420px) {
//   .max-height {
//     min-height: calc(100vh - 65.5rem) !important;
//     max-height: calc(100vh - 65.5rem) !important;
//   }
// }

// @media (max-height: 1016px) {
//   .max-height {
//     min-height: calc(100vh - 40rem) !important;
//     max-height: calc(100vh - 40rem) !important;
//   }
// }

// @media (max-height: 1852px) {
//   .max-height {
//     min-height: calc(100vh - 55rem) !important;
//     max-height: calc(100vh - 55rem) !important;
//   }
// }
</style>