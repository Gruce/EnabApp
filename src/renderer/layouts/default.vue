<template>
  <CThemeProvider>
    <CReset />
    <div class="main-container position-relative">
      <nuxt-child />
      <div class="position-absolute top-0 start-0 pointer my-3 ml-4">
        <span @click="exit">
          <UtilitiesClose />
        </span>
      </div>
      <div class="position-absolute top-0 pointer my-3">
        <span @click="$router.go(-1);" v-if="$nuxt.$route.path !== '/' && $nuxt.$route.path !== '/login'">
          <UtilitiesBack />
        </span>
      </div>
    </div>
  </CThemeProvider>
</template>

<script>
import { CThemeProvider, CReset } from '@chakra-ui/vue'

const { remote } = require("electron");

export default {
  components: {CThemeProvider},

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
.icon{
  transition: 0.15s ease-in-out;
}
.icon:hover {
  transform: scale(1.1) rotate(90deg);
}
.t-1:hover{
  background: #fcfcfc5e !important;
}
</style>