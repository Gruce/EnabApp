<template>
  <CThemeProvider>
    <div class="bg" />
    <CReset />
    <DefaultNavbar />
    <nuxt-child />
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

<style lang="scss" scoped>
.bg {
  background: #4f08f7; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #7c92ff,
    #4f08f7
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #7c92ff,
    #4f08f7
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  background-size: cover;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  position: absolute;
  opacity: 0.4;
  // filter: blur(25px);
  overflow: hidden;
  z-index: -1;

  background-size: 300% 100%;
  animation: gradient 2.5s linear infinite;
  animation-direction: alternate;
}

@keyframes gradient {
  0% {
    background-position: 0%;
  }
  100% {
    background-position: 100%;
  }
}

.icon {
  transition: 0.15s ease-in-out;
}
.icon:hover {
  transform: scale(1.1) rotate(90deg);
}
</style>