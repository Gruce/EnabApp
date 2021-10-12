<template>
  <div class="group-links p-1 r-1">
    <span @click="minimize()" v-b-tooltip.hover.bottom title="تصغير" class="badge py-2 px-3 pointer">
      <i class="fas fa-window-minimize"></i>
    </span>
    <span @click="maximize()" v-b-tooltip.hover.bottom title="تكبير" class="badge py-2 px-3 pointer">
      <i class="fas fa-window-maximize"></i>
    </span>
    <span @click="exit()" v-b-tooltip.hover.bottom title="الخروج من النظام" class="badge py-2 px-3 pointer text-danger-h">
      <i class="fas fa-window-close"></i>
    </span>
  </div>
</template>

<script>
const { remote } = require("electron");
const win = remote.BrowserWindow.getFocusedWindow();

export default {
  methods: {
    maximize() {
      win.maximize();
    },
    minimize() {
      win.minimize();
    },
    exit() {
      this.$dialog
        .confirm("هل انت متأكد من إغلاق النظام؟", {
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
</style>