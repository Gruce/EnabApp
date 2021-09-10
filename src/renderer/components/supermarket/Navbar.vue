<template>
  <div>
    <div class="position-absolute" style="top: 0px; left: 0%; width: 100%;z-index:1">
      <div class="tb-2 p-2">
        <div class="row">
          <div class="col-6 d-flex align-items-center">
            <ul class="nav nav-pills mr-5">
              <li class="nav-item">
                <nuxt-link to="/supermarket" :class="{ 'active' : $nuxt.$route.path === '/supermarket'}" class="nav-link py-1 px-3">
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
            <div dir="ltr" class="text-white ml-5 d-flex align-items-center">
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

                  <!-- Is Online -->
                  <small v-else-if="$nuxt.isOnline" class="badge text-success p-2 px-3" v-b-tooltip.hover.right title="متصل">
                    <i class="fas fa-circle"></i>
                  </small>

                  <!-- Is Offline -->
                  <small v-if="$nuxt.isOffline" class="badge text-danger p-2 px-3" v-b-tooltip.hover.right title="غير متصل">
                    <i class="fas fa-circle"></i>
                  </small>
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
.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  background-color: $tb-1;
  border-radius: 0.2rem;
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