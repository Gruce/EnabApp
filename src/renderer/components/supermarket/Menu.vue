<template>
  <div class="main-menu d-flex align-items-center justify-content-center">
    <div class="container">
      <div class="row h-100">
        <div class="col-4">
          <div class="row h-100">
            <div class="col-4 final-column">
              <div class="">
                <ul class="nav flex-column">
                  <li
                    @click="toggleMenu"
                    class="nav-item pointer content text-center text-light py-4"
                  >
                    <i class="fas fa-times fa-2x"></i>
                  </li>
                  <li
                    @click="exit"
                    class="
                      nav-item
                      pointer
                      content
                      text-center text-danger
                      py-4
                      mt-1
                    "
                  >
                    <i class="fas fa-power-off fa-2x"></i>
                  </li>
                  <li
                    @click="signout"
                    class="
                      nav-item
                      pointer
                      content
                      text-center text-light
                      py-4
                      mt-1
                    "
                  >
                    <i class="fas fa-sign-out-alt fa-2x"></i>
                  </li>
                  <li
                    @click="sync"
                    class="
                      nav-item
                      pointer
                      content
                      text-center text-light
                      py-4
                      mt-1
                    "
                  >
                    <i class="fas fa-sync fa-2x"></i>
                  </li>
                  <li
                    v-if="$nuxt.isOnline"
                    class="
                      nav-item
                      content
                      text-center text-light
                      bg-success
                      py-4
                      mt-1
                    "
                  >
                    متصل
                  </li>
                  <li
                    v-else
                    class="
                      nav-item
                      content
                      text-center
                      bg-danger
                      text-light
                      py-4
                      mt-1
                    "
                  >
                    غير متصل
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-8 final-column">
              <div class="content">asd</div>
            </div>
          </div>
        </div>
        <div class="col-8">
          <div class="row h-100">
            <div class="col-7">
              <div class="row h-100">
                <div class="row h-75 pb-1">
                  <div class="col-12 final-column">
                    <div class="content">Top</div>
                  </div>
                </div>
                <div class="row h-25">
                  <div class="col-6 final-column">
                    <div class="content pointer text-center d-flex flex-column justify-content-center align-items-center">
                        <i class="fas fa-life-ring fa-3x text-light"></i>
                        <h6 class="text-light mt-3">الاسئلة الشائعة</h6>
                    </div>
                  </div>
                  <div class="col-6 final-column">
                    <div class="content pointer text-center d-flex flex-column justify-content-center align-items-center">
                        <i class="fas fa-headset fa-3x text-light"></i>
                        <h6 class="text-light mt-3">الدعم الفني</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-5 final-column">
              <div class="content text-center h-75 mb-2">
                <div class="mt-5 w-100">
                  <div class="img-fluid mb-1">
                    <img
                      class="w-50 r-2"
                      :src="$auth.user.profile_photo_url"
                      alt="Image placeholder"
                    />
                  </div>
                  <h3 class="text-light">{{ $auth.user.name }}</h3>

                  <div class="mt-4">
                    <ul class="list-group p-0">
                      <li
                        class="
                          list-group-item
                          custom
                          d-flex
                          justify-content-between
                          align-items-center
                          fs-6
                          pointer
                        "
                      >
                        <div>
                          <i class="fas fa-map-marker-alt ml-3"></i>
                          <span>العنوان</span>
                        </div>
                        <span>
                          <i class="fas fa-edit text-light"></i>
                        </span>
                      </li>
                      <li
                        class="
                          list-group-item
                          custom
                          d-flex
                          justify-content-between
                          align-items-center
                          fs-6
                          pointer
                        "
                      >
                        <div>
                          <i class="fab fa-instagram ml-3"></i>
                          <span>الانستكرام</span>
                        </div>
                        <span>
                          <i class="fas fa-edit text-light"></i>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="h-correct">
                  <div class="content">
                    TEST
                  </div>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center mt-5 text-light">
            عنب، مع كل الحب 
            <i class="fas fa-heart text-danger"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions, mapState } from "vuex";
const { remote } = require("electron");

export default {
  methods: {
    ...mapMutations({
      toggleMenu: "supermarket/toggleMenu",
    }),
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
    sync() {
      this.$dialog
        .confirm("هل تريد المزامنة؟", {
          okText: "متأكد",
          cancelText: "الغاء",
          reverse: false,
        })
        .then(() => {
          console.log("sync");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.main-menu {
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;

  .container {
    height: 60%;
    .close {
      &:hover {
        cursor: pointer;
      }
    }
    .row {
      .final-column {
        padding: 2px;
        .content {
          height: 100%;
          padding: 10px;
          background: rgba(0, 0, 0, 0.4);
          border-radius: $r-2;
          transition: 0.3s;
        }
      }
    }
  }
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

    &:hover{
        background: rgba(0, 0, 0, 0.6) !important;
    }
  }
}

.h-correct{
    height: calc(25% - 0.5rem) !important;
}
</style>