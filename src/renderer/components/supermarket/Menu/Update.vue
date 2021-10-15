<template>
  <div>
    <div @click="$emit('toggle')" v-if="!updateProgress.percent" class="content pointer py-4 text-center d-flex flex-column justify-content-center align-items-center">
      <i class="fas fa-history fa-3x text-light"></i>
      <span class="text-light mt-3 fw-bold h6">{{version}}
        <small class="text-light">(اخر اصدار)</small>
      </span>
    </div>
    <div v-if="updateProgress.percent && updateProgress.percent !==100" class="content bg-info text-center d-flex flex-column justify-content-center align-items-center">
      <i class="fas fa-redo fa-spin fa-3x text-light"></i>
      <h6 class="text-light mt-3 loading">جاري التحديث</h6>
    </div>
    <div v-if="updateProgress.percent==100" @click="updateCompleted" class="content pointer bg-success text-center d-flex flex-column justify-content-center align-items-center">
      <i class="fas fa-check fa-3x text-light"></i>
      <h6 class="text-light mt-3 fw-bold">تم التحديث</h6> <small class="text-light">هل تريد تنصيب التحديث؟</small>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions, mapState } from "vuex";
const { remote, ipcRenderer } = require("electron");

export default {
  computed: {
    ...mapGetters({
      updateProgress: "update/progress",
    }),
  },
  async mounted() {
    try {
      this.version = await this.$version();
    } catch (e) {
      console.log(e);
    }
  },
  data() {
    return {
      version: "",
      show: false,
    };
  },
  methods: {
    updateCompleted() {
      ipcRenderer.send("restart_app");
    },
    closeModal() {
      this.show = false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>