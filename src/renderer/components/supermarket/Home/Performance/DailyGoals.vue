<template>
  <div>
    <div class="card rounded-lg b-1 t-1 mb-0">
      <div class="card-header">
        <div class="d-flex justify-content-between align-items-center">
          <div><span class="fs-6">الأهداف اليومية</span></div>
        </div>
      </div>
      <div class="card-body p-2">
        <nuxt-link :to="result.to" v-for="result in results" :key="result.title">
          <div class="d-flex align-items-center goal p-3 r-2">
            <div class="icon icon-shape p-3 t-1">
              <i class="fas text-white" :class="result.icon"></i>
            </div>
            <div class="pr-3 w-100">
              <span class="text-light mb-0">{{result.title}}</span>
              <span class="float-left text-light"><small dir="ltr">{{result.part}} / {{result.total}}</small></span>
              <div class="progress progress-md mt-2" style="height: 8px">
                <div class="progress-bar bg-success" role="progressbar" :style="'width: '+result.percent+'%;'" :aria-valuenow="result.percent" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      results: [
        {
          title: "الأموال الواردة",
          part: 5000,
          total: 100000,
          percent: 5,
          icon: "fa-money-bill",
          to: '/supermarket/analytics'
        },
        {
          title: "عدد الطلبات",
          part: 15,
          total: 75,
          percent: 20,
          icon: "fa-cash-register",
          to: '/supermarket/analytics'
        },
        {
          title: "عدد الزبائن",
          part: 1,
          total: 1,
          percent: 100,
          icon: "fa-user-friends",
          to: '/supermarket/analytics'
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.goal{
    transition: .15s ease-in-out;
    &:hover{
        background: $t-1 !important;
    }
}
</style>