<template>
  <div>
    <div class="position-absolute" style="top: 0px; left: 0%; width: 100%;z-index:1">
      <div class="navbar p-2">
        <div class="row w-100">
          <div class="col-6 d-flex align-items-center">
            <ul class="nav nav-pills mr-5">
              <li class="nav-item">
                <nuxt-link to="/supermarket" :class="{ 'active' : $nuxt.$route.path === '/supermarket'}" class="nav-link py-1 px-2">
                  <i class="fas fa-home"></i>
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link to="/supermarket/new-order" :class="{ 'active' : $nuxt.$route.path === '/supermarket/new-order'}" class="nav-link py-1 px-3">
                  <i class="fas fa-cash-register"></i>
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link to="/supermarket/control" :class="{ 'active' : $nuxt.$route.path === '/supermarket/control'}" class="nav-link py-1 px-3">
                  <i class="fas fa-list-ul"></i>
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link to="/supermarket/analytics" :class="{ 'active' : $nuxt.$route.path === '/supermarket/analytics'}" class="nav-link py-1 px-3">
                  <i class="fas fa-chart-pie"></i>
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link to="/supermarket/services" :class="{ 'active' : $nuxt.$route.path === '/supermarket/services'}" class="nav-link py-1 px-3">
                  <i class="fas fa-cubes"></i>
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link to="/supermarket/settings" :class="{ 'active' : $nuxt.$route.path === '/supermarket/settings'}" class="nav-link py-1 px-3">
                  <i class="fas fa-cog"></i>
                </nuxt-link>
              </li>
            </ul>
          </div>
          <div class="col-6">
            <div dir="ltr" class="text-white ml-3 d-flex align-items-center">
              <div dir="rtl" class="d-flex">
                <!-- <div class="mr-1">
                  <div class="fs-5 px-3">{{ datetime }}</div>
                </div> -->

                <div class="mr-1">

                  <!-- Is Updating -->
                  <small v-if="updateProgress.percent && updateProgress.percent !== 100" class="badge text-info py-2 px-3" v-b-tooltip.hover.right title="جاري التحديث">
                    <i class="fas fa-circle-notch"></i>
                  </small>

                  <!-- Is Complete Updating -->
                  <div @click="updateCompleted" v-else-if="updateProgress.percent == 100" class="badge badge-success py-2 px-3 pointer">تم التحديث</div>

                </div>

                <div class="mr-1">
                  <nuxt-link to="/credits">
                    <div :class="$auth.user.points <= 0 ? 'text-danger' : 'text-light'" v-b-tooltip.hover.bottom title="شحن رصيد" class="badge py-2 px-3 pointer btn-icon-label">
                      <span class="btn-inner--icon">
                        <i class="fas fa-credit-card"></i>
                      </span>
                      <span class="btn-inner--text">
                        {{ $auth.user.points }} نقطة
                      </span>
                    </div>
                  </nuxt-link>
                </div>

                <div class="mr-1">
                  <div @click="toggleMenu" v-b-tooltip.hover.bottom title="القائمة" class="badge py-2 px-3 pointer btn-icon-label">
                    <span class="btn-inner--icon">
                      <i class="fas fa-bars"></i>
                    </span>
                    <span class="btn-inner--text">
                      {{ $auth.user.name }}
                    </span>
                  </div>
                </div>

                <div class="mr-1">
                  <nuxt-link to="/" v-b-tooltip.hover.bottom title="الذهاب الى الخدمات" class="badge py-2 px-3 pointer btn-icon-label text-light">
                    <i class="fas fa-arrow-left"></i>
                  </nuxt-link>
                </div>
                
                <div class="mr-1">
                  <span @click="exit" v-b-tooltip.hover.bottom title="الخروج من النظام" class="badge py-2 px-3 pointer btn-icon-label text-danger">
                    <i class="fas fa-times"></i>
                  </span>
                </div>
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
    };
  },
  created() {
    // setInterval(this.getNow, 1000);
  },
  methods: {
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
.navbar {
  background: rgb(0, 0, 0);
  background: linear-gradient(
    43deg,
    rgba(0, 0, 0, 0.5) 0%,
    rgba(0, 0, 0, 0.35) 50%,
    rgba(0, 0, 0, 0.5) 100%
  );
}
.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  background-color: $tb-1;
  border-radius: 0.3rem;
  color: #ffffff;

}

.nav-pills .nav-link,
.nav-pills > .nav-link {
  color: #ffffff;
}

.signout-icon {
  transform: scale(-1);
}

.pointer:hover {
  cursor: pointer;
}

.btn-icon-label {
  transition: 0.2s ease-in;
  background: $tb-1 !important;
  &:hover {
    background: $tb-2 !important;
  }
}
</style>