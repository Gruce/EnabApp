<template>
  <div>
    <div class="main-container position-relative">
      <div class="position-absolute top-0 start-50 translate-middle pointer">
        <div @click="exit" class="icon icon-xl icon-shape rounded-circle t-1">
          <i class="fas fa-times fa-2x text-dark"></i>
          </div>
      </div>
      <nuxt-child />
    </div>
  </div>
</template>

<script>
const { remote } = require("electron");

export default {
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