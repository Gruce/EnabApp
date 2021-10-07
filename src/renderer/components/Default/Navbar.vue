<template>
  <div>
    <div class="position-absolute" style="top: 0%; left: 0%; width: 100%;z-index:1;">
      <div class="navbar p-2">
        <div class="row w-100">
          <div class="col-6 d-flex align-items-center">
            <div class="mr-1 group-links p-1 r-1 mr-5">
              <span @click="$router.go(-1);" v-if="$nuxt.$route.path !== '/' && $nuxt.$route.path !== '/login'" class="badge py-2 px-3 pointer mx-1">
                <i class="fas fa-arrow-right"></i>
              </span>
            </div>
          </div>
          <div class="col-6">
            <div dir="ltr" class="text-white ml-3 d-flex align-items-center">
              <div dir="rtl" class="d-flex">
                <UtilitiesTitleBarManagement class="mr-3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const { remote, ipcRenderer } = require("electron");

export default {
  computed: {
    updateProgress() {
      return this.$store.state.update.progress;
    },
  },
  created() {
    // setInterval(this.getNow, 1000);
  },
  methods: {
    updateCompleted() {
      ipcRenderer.send("restart_app");
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  -webkit-user-select: none;
  -webkit-app-region: drag;
}
.navbar {
  background: rgb(0, 0, 0);
  background: linear-gradient(
    43deg,
    rgba(0, 0, 0, 0.5) 0%,
    rgba(0, 0, 0, 0.35) 50%,
    rgba(0, 0, 0, 0.5) 100%
  );
  transition: 0.15s ease-in-out;
}
</style>