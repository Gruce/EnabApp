<template>
  <div>
    <div v-if="updateProgress.percent" class="row">
      <div class="progress-wrapper px-0" v-if="updateProgress.percent !==100"> <span class="progress-percentage text-light">جاري التحديث...</span> <span class="progress-label text-light">{{Math.round(updateProgress.percent * 100)/100}}%</span>
        <div class="progress mt-2 p-0" style="height: 10px;">
          <div class="progress-bar bg-dark" role="progressbar" :aria-valuenow="updateProgress.percent" aria-valuemin="0" aria-valuemax="100" :style="'width: '+updateProgress.percent+'%;'"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions, mapState } from "vuex";

export default {
  computed: {
    ...mapGetters({
      updateProgress: "update/progress",
    }),
  },
};
</script>

<style lang="scss" scoped>
</style>