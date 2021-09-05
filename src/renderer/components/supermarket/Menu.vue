<template>
  <div class="main-menu d-flex justify-content-center">
    <!-- Components Container -->
    <div class="container">

      <div class="row mx-0 mb-5">
        <div class="col-12 p-0">
          <div class="text-light" style="text-shadow: rgb(31 45 61 / 60%) 3px 4px 5px">
            <div class="display-3">
              {{ time }}
            </div>
            <span>
              {{ date }}
            </span>
          </div>
        </div>
      </div>

      <!-- Updating ProgressBar -->
      <div v-if="updateProgress.percent" class="row">
        <div class="progress-wrapper px-0" v-if="updateProgress.percent !==100"> <span class="progress-percentage text-light">جاري التحديث...</span> <span class="progress-label text-light">{{Math.round(updateProgress.percent * 100)/100}}%</span>
          <div class="progress mt-2 p-0" style="height: 10px;">
            <div class="progress-bar bg-dark" role="progressbar" :aria-valuenow="updateProgress.percent" aria-valuemin="0" aria-valuemax="100" :style="'width: '+updateProgress.percent+'%;'"></div>
          </div>
        </div>
      </div>

      <!-- Components -->
      <div class="row d-flex align-content-stretch flex-wrap">
        <!-- Quick Access Buttons -->
        <div class="col-1">
          <ul class="nav flex-column pr-0">
            <li @click="toggleMenu" class="nav-item pointer content text-center text-light py-4" v-b-tooltip.hover.left title="إغلاق النافذة"> <i class="fas fa-times fa-2x"></i> </li>
            <li @click="exit" class="nav-item pointer content text-center text-danger py-4 mt-3" v-b-tooltip.hover.left title="إغلاق النظام"> <i class="fas fa-power-off fa-2x"></i> </li>
            <li @click="signout" class=" nav-item pointer content text-center text-light py-4 mt-3" v-b-tooltip.hover.left title="تسجيل الخروج"> <i class="fas fa-sign-out-alt fa-2x"></i> </li>
            <li @click="refresh" class=" nav-item pointer content text-center text-light py-4 mt-3" v-b-tooltip.hover.left title="إعادة تحديث النافذة"> <i class="fas fa-sync fa-2x"></i> </li>
            <nuxt-link to="/">
              <li class=" nav-item pointer content text-center text-light py-4 mt-3" v-b-tooltip.hover.left title="الرجوع الى قائمة الخدمات"> <i class="fas fa-arrow-left fa-2x"></i> </li>
            </nuxt-link>
            <li v-if="$nuxt.isOnline" class=" nav-item content text-center text-light bg-success py-4 mt-3"> متصل </li>
            <li v-else class=" nav-item content text-center bg-danger text-light py-4 mt-3"> غير متصل </li>
          </ul>
        </div>
        <!-- Quick Change Buttons -->
        <div class="col-3">
          <ul class="nav flex-column pr-0">
            <li @click="setPrintState" class="nav-item pointer content text-center py-4 " :class="printState ? 'text-light' : 'text-secondary' " v-b-tooltip.hover.left title="تفعيل / تعطيل خاصية الطباعة">
              <i class="fas fa-print fa-3x"></i>
              <div class="mt-3">
                <span v-if="defaultPrinter">{{ defaultPrinter }}</span>
                <span v-else>لم يتم اختيار طابعة</span>
              </div>
            </li>
            <nuxt-link to="/credits" v-b-tooltip.hover.left title="شحن رصيد">
              <li class="nav-item pointer content text-center py-4 mt-3 text-light ">
                <i class="fas fa-credit-card fa-3x"></i>
                <div class="mt-3">{{ $auth.user.points }} نقطة</div>
              </li>
            </nuxt-link>
          </ul>
        </div>
        <!-- Important Details -->
        <div class="col-5 d-flex flex-column">
          <div class="row flex-fill">
            <div class="col-12">
              <div class="content">
                TOP
              </div>
            </div>
          </div>
          <div class="row pt-3">
            <div class="col-6">
              <a href="https://enab.app/support" target="_blank" rel="noopener noreferrer" class="content pointer d-flex flex-column justify-content-center align-items-center text-center py-4">
                <i class="fas fa-life-ring fa-3x text-light"></i>
                <h6 class="text-light mt-3">الاسئلة الشائعة</h6>
              </a>
            </div>
            <div class="col-6">
              <div v-if="!updateProgress.percent" class="content text-center d-flex flex-column justify-content-center align-items-center">
                <i class="fas fa-history fa-3x text-light"></i>
                <span class="text-light mt-3 fw-bold h6">{{version}} <small class="text-light">(اخر اصدار)</small></span>
              </div>
              <div v-if="updateProgress.percent && updateProgress.percent !==100" class="content bg-info text-center d-flex flex-column justify-content-center align-items-center">
                <i class="fas fa-redo fa-spin fa-3x text-light"></i>
                <h6 class="text-light mt-3 loading">جاري التحديث</h6>
              </div>
              <div v-if="updateProgress.percent==100" @click="updateCompleted" class="content pointer bg-success text-center d-flex flex-column justify-content-center align-items-center">
                <i class="fas fa-check fa-3x text-light"></i>
                <h6 class="text-light mt-3 fw-bold">تم التحديث</h6> <small class="text-light">هل تريد تنصيب التحديث؟</small>
              </div>
            </div>
          </div>
        </div>
        <!-- User Configuration -->
        <div class="col-3 d-flex flex-column">
          <div class="row flex-fill">
            <div class="col-12">
              <div class="content">
                <div class="mt-5 text-center">
                  <div class="img-fluid mb-1"> <img class="w-50 r-2" :src="$auth.user.profile_photo_url" alt="Image placeholder" /> </div>
                  <h3 class="text-light mb-0">{{$auth.user.name}}</h3>
                  <h6 class="text-light mt-0">( {{$auth.user.supermarket.name}} )</h6>
                  <div class="mt-4">
                    <ul class="list-group p-0">
                      <li class=" list-group-item custom d-flex justify-content-between align-items-center fs-6">
                        <div> <i class="fas fa-map-marker-alt ml-3"></i> <span>{{ $auth.user.supermarket.city }} - {{ $auth.user.supermarket.location }}</span> </div>
                      </li>
                      <li v-if="$auth.user.supermarket.instagram" class="list-group-item custom d-flex justify-content-between align-items-center fs-6">
                        <div> <i class="fab fa-instagram ml-3"></i> <span>{{ $auth.user.supermarket.instagram }}</span> </div>
                      </li>
                      <li v-if="$auth.user.supermarket.instagram" class="list-group-item custom d-flex justify-content-between align-items-center fs-6">
                        <div> <i class="fab fa-instagram ml-3"></i> <span>{{ $auth.user.supermarket.instagram }}</span> </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row pt-3">
            <div class="col-12">
              <div class="content">
                <div class="d-flex flex-column justify-content-center align-items-center text-center py-2" style="margin: 6px">
                  <v-swatches v-model="color" :swatches="swatches" popover-x="left"></v-swatches>
                  <h6 class="text-light mt-3">تغيير اللون</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-5">
        <div class="text-center text-light"> عنب، مع كل الحب <i class="fas fa-heart text-danger"></i> </div>
      </div>
    </div>

  </div>
</template><script>
import { mapMutations, mapGetters, mapActions, mapState } from "vuex";
const { remote, ipcRenderer } = require("electron");
export default {
  computed: {
    updateProgress() {
      return this.$store.state.update.progress;
    },
    backgroundColor() {
      return this.$store.state.supermarket.utilities.color;
    },
    printState() {
      return this.$store.state.supermarket.utilities.printState;
    },
    defaultPrinter() {
      return this.$store.state.supermarket.utilities.defaultPrinter;
    },
  },
  async mounted() {
    try {
      this.version = await this.$version();
    } catch (e) {
      console.log(e);
    }
    setInterval(this.updateClock, 1000);
    if (this.$nuxt.isOnline)
      this.$auth.fetchUser()
  },
  created() {
    this.$moment.updateLocale("en", {
      monthsShort: [
        "يناير",
        "فبراير",
        "مارس",
        "أبريل",
        "مايو",
        "يونيو",
        "يوليو",
        "أغسطس",
        "سبتمبر",
        "أكتوبر",
        "نوفمبر",
        "ديسمبر",
      ],
      weekdaysShort: [
        "الأحد",
        "الأثنين",
        "الثلاثاء",
        "الأربعاء",
        "الخميس",
        "الجمعة",
        "السبت",
      ],
      meridiem: function (hour, minute, isLowercase) {
        if (hour < 7) {
          return "فجراً";
        } else if (hour < 11 && minute < 30) {
          return "صباحاً";
        } else if (hour < 15 && minute < 30) {
          return "ظهراً";
        } else if (hour < 18) {
          return "عصراً";
        } else {
          return "مساءاً";
        }
      },
    });
  },
  data() {
    return {
      version: "",
      color: "#4776E6",
      swatches: [
        "#4776E6", //Primary Color
        "#070d1d", //Secondary Color
      ],
      time: "00:00",
      date: "",
    };
  },
  methods: {
    updateCompleted() {
      ipcRenderer.send("restart_app");
    },
    ...mapMutations({ toggleMenu: "supermarket/toggleMenu" }),
    ...mapActions({
      setColor: "supermarket/utilities/setColor",
      setPrintState: "supermarket/utilities/setPrintState",
    }),
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
    updateClock() {
      this.time = this.$moment().format("LT");
      this.date = this.$moment().format("ddd، D MMM، YYYY");
    },
  },
  watch: {
    color(color) {
      this.setColor(color);
    },
  },
};
</script><style lang="scss" scoped>
.main-menu {
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  background: rgba(0, 0, 0, 0.4);
  z-index: 10;
  .container {
    margin-top: 2rem;
    // margin-top: 10%;
    .close {
      &:hover {
        cursor: pointer;
      }
    }
  }
}

.content {
  height: 100%;
  padding: 10px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: $r-2;
  transition: 0.3s;
}

.pointer:hover {
  cursor: pointer;
  background: rgba(0, 0, 0, 0.6) !important;
  &.bg-success {
    background: #146c43 !important;
  }
  &.bg-danger {
    background: #b02a37 !important;
  }
}
.list-group {
  .custom {
    border: 0 !important;
    color: #eee !important;
    background: #ffffff00 !important;
    transition: 0.3s;
    border-radius: $r-2;
    &:hover {
      background: rgba(0, 0, 0, 0.6) !important;
    }
  }
}
.h-correct {
  height: calc(25% - 0.5rem) !important;
}
</style>