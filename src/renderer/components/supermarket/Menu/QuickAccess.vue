<template>
  <div>
    <ul class="nav">
      <li @click="toggleMenu" class="nav-item pointer content text-center text-light py-2 ml-2 mt-3 flex-fill" v-b-tooltip.hover.top title="إغلاق النافذة"> <i class="fas fa-times fa-2x"></i> </li>
      <li @click="exit" class="nav-item pointer content text-center text-danger py-2 mx-2 mt-3 flex-fill" v-b-tooltip.hover.top title="إغلاق النظام"> <i class="fas fa-power-off fa-2x"></i> </li>
      <li @click="signout" class=" nav-item pointer content text-center text-light py-2 mx-2 mt-3 flex-fill" v-b-tooltip.hover.top title="تسجيل الخروج"> <i class="fas fa-sign-out-alt fa-2x"></i> </li>
      <!-- <li @click="refresh" class=" nav-item pointer content text-center text-light py-2 mx-2 mt-3 flex-fill" v-b-tooltip.hover.top title="إعادة تحديث النافذة"> <i class="fas fa-sync fa-2x"></i> </li> -->
      <nuxt-link class="mt-3 flex-fill" to="/">
        <li class=" nav-item pointer content text-center text-light py-2 mx-2" v-b-tooltip.hover.top title="الذهاب الى قائمة الخدمات"> <i class="fas fa-arrow-left fa-2x"></i> </li>
      </nuxt-link>
      <li v-if="$nuxt.isOnline" class=" nav-item content text-center text-light bg-success py-2 mr-2 mt-3 fs-4 flex-fill"> متصل </li>
      <li v-else class=" nav-item content text-center bg-danger text-light py-2 mr-2 mt-3 fs-4 flex-fill"> غير متصل </li>
    </ul>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions, mapState } from "vuex";
const { remote } = require("electron");

export default {
  methods: {
    ...mapMutations({ toggleMenu: "supermarket/toggleMenu" }),
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
    refresh() {
      this.$dialog
        .confirm("هل تريد تحديث الصفحة؟", {
          okText: "متأكد",
          cancelText: "الغاء",
          reverse: false,
        })
        .then(() => {
          console.log("refresh");
          remote.getCurrentWindow().reload();
        });
    },
    async signout() {
      await this.$auth.logout();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>