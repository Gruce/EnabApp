<template>
  <div>
    <div class="position-absolute" style="top: 0%; left: 0%; width: 100%;z-index:1;">
      <div class="navbar p-2">
        <div class="row w-100">
          <div class="col-6 d-flex align-items-center">
            <div class="mr-1 group-links p-1 r-1 mr-5">
              <nuxt-link :to="nav.link" v-for="nav in navs" :key="nav.title">
                <span :class="{ 'active' : $nuxt.$route.path === nav.link}" class="badge py-2 px-3 pointer mx-1">
                  <i class="fas" :class="nav.icon"></i>
                  <span v-if="$nuxt.$route.path === nav.link" class="mr-2">
                    {{ nav.title }}
                  </span>
                </span>
              </nuxt-link>
            </div>
          </div>
          <div class="col-6">
            <div dir="ltr" class="text-white ml-3 d-flex align-items-center">
              <div dir="rtl" class="d-flex">
                <div class="mr-1">

                  <!-- Is Updating -->
                  <small v-if="updateProgress.percent && updateProgress.percent !== 100" class="badge text-info py-2 px-3" v-b-tooltip.hover.right title="جاري التحديث">
                    <i class="fas fa-circle-notch"></i>
                  </small>

                  <!-- Is Complete Updating -->
                  <div @click="updateCompleted" v-else-if="updateProgress.percent == 100" class="badge badge-success py-2 px-3 pointer">تم التحديث</div>

                </div>

                <div class="mr-1 group-links p-1 r-1">
                  <nuxt-link to="/credits">
                    <span :class="$auth.user.points <= 0 ? 'text-danger' : 'text-light'" v-b-tooltip.hover.bottom title="شحن رصيد" class="badge py-2 px-3 pointer">
                      {{ $auth.user.points }} نقطة
                    </span>
                  </nuxt-link>

                  <span @click="toggleMenu" v-b-tooltip.hover.bottom title="القائمة" class="badge pointer py-2 px-3 text-warning-h">
                    {{ $auth.user.name }}
                  </span>

                  <nuxt-link to="/">
                    <span v-b-tooltip.hover.bottom title="الأعمال" class="badge pointer py-2 px-3">
                      <i class="fas fa-arrow-left"></i>
                    </span>
                  </nuxt-link>
                </div>

                <!-- <div class="mr-1">
                  <nuxt-link to="/" v-b-tooltip.hover.bottom title="الذهاب الى الخدمات" class="badge py-2 px-3 pointer btn-icon-label text-light">
                    <i class="fas fa-arrow-left"></i>
                  </nuxt-link>
                </div> -->

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
import { mapMutations, mapGetters, mapActions, mapState } from "vuex";
const { remote, ipcRenderer } = require("electron");

export default {
  computed: {
    updateProgress() {
      return this.$store.state.update.progress;
    },
  },
  async mounted() {},
  data() {
    return {
      datetime: "",
      navs: [
        { title: "الصفحة الرئيسية", link: "/supermarket", icon: "fa-home" },
        { title: "طلب جديد", link: "/supermarket/new-order", icon: "fa-cash-register" },
        { title: "التحكم", link: "/supermarket/control", icon: "fa-list-ul" },
        { title: "التحليلات", link: "/supermarket/analytics", icon: "fa-chart-pie" },
        { title: "الخدمات", link: "/supermarket/services", icon: "fa-cubes" },
        { title: "الإعدادات", link: "/supermarket/settings", icon: "fa-cog" },
      ],
    };
  },
  created() {
    // setInterval(this.getNow, 1000);
  },
  methods: {
    updateCompleted() {
      ipcRenderer.send("restart_app");
    },
    ...mapMutations({
      toggleMenu: "supermarket/toggleMenu",
    }),
    getNow: function () {
      const today = new Date();
      const date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      const time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date + " " + time;
      this.datetime = dateTime;
    },
    async logout() {
      await this.$auth.logout();
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