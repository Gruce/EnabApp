<template>
  <div class="t-1 b-1 rounded-lg mb-3 p-4 w-100">
    <div class="w-100 text-center mb-3">
      <img class="mx-auto rank-img mb-1" src="https://icons-for-free.com/iconfiles/png/512/page+quality+rank+icon-1320190816917337266.png" alt="">
      <div @click="showDetails = !showDetails" class="t-1-h p-3 r-2 pointer">
        <div class="d-flex justify-content-between align-items-center">
          <span class="fs-5 badge r-2">مبتدئ</span>
          <span><small>الى المستوى التالي</small></span>
        </div>
        <div class="progress progress-md mt-2" style="height: 8px">
          <div class="progress-bar bg-success" role="progressbar" :style="'width: 50%;'" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
      </div>
    </div>
    <div v-if="showDetails" class="row px-3">
      <div class="col-12 p-0 b-1 r-2">
        <!-- مستوى العمل -->
        <div class="d-flex align-items-center goal p-3 r-2">
          <div class="icon icon-shape p-2 t-1">
            <i class="fas fa-signal text-white"></i>
          </div>
          <div class="pr-3 w-100">
            <span class="text-light mb-0 p-1">مستوى العمل</span>
            <span class="float-left p-1 px-2 r-1 t-1 text-light ml-3">5</span>
          </div>
        </div>

        <!-- نقاط الخبرة -->
        <div class="d-flex align-items-center goal p-3 r-2">
          <div class="icon icon-shape p-2 t-1">
            <i class="fas fa-brain text-white"></i>
          </div>
          <div class="pr-3 w-100">
            <span class="text-light mb-0 p-1">نقاط الخبرة</span>
            <span class="float-left p-1 px-2 r-1 t-1 text-light ml-3">1648763</span>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDetails: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.goal {
  transition: 0.15s ease-in-out;
  &:hover {
    background: $t-1 !important;
  }
}

.rank-img {
  width: 10rem;
  border: 1px solid $t-1;
  padding: 0.5rem;
  border-radius: 50%;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
}
</style>