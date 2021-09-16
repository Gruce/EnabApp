<template>
  <CThemeProvider>
    <CReset />
    <div class="position-absolute top-0 start-0 pointer my-3 ml-4">
      <span @click="exit">
        <UtilitiesClose />
      </span>
    </div>
    <nuxt-child />
    <div class="position-absolute top-0 pointer my-3 mr-4">
      <span @click="$router.go(-1);" v-if="$nuxt.$route.path !== '/' && $nuxt.$route.path !== '/login'">
        <UtilitiesBack />
      </span>
    </div>
  </CThemeProvider>
</template>

<script>
import { CThemeProvider, CReset } from "@chakra-ui/vue";

const { remote } = require("electron");

export default {
  components: { CThemeProvider },

  methods: {
    exit() {
      this.$dialog
        .confirm("هل انت متأكد؟", {
          okText: "متأكد",
          cancelText: "الغاء",
          reverse: false,
        })
        .then(() => {
          remote.app.exit();
        });
    },
  },
};
</script>

<style scoped>
/* body {
  background-image: linear-gradient(to right, #6a11cb 0%, #2575fc 100%) !important;

  background-size: 300% 100%;
  animation: gradient 3s linear infinite;
  animation-direction: alternate;
}
@keyframes gradient {
  0% {
    background-position: 0%;
  }
  100% {
    background-position: 100%;
  }
} */

.icon {
  transition: 0.15s ease-in-out;
}
.icon:hover {
  transform: scale(1.1) rotate(90deg);
}
</style>