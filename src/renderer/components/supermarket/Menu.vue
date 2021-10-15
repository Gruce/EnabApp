<template>
  <div class="main-menu d-flex justify-content-center align-items-center" :class="!day ? 'night' : 'day'">
    <!-- Components Container -->
    <div class="container">

      <!-- Header -->
      <SupermarketMenuHeader />

      <!-- Updating ProgressBar -->
      <SupermarketMenuUpdateProgress />

      <!-- Components -->
      <div class="row mb-3">
        <SupermarketMenuQuickAccess />
      </div>
      <div v-if="updateDetails">
        <SupermarketMenuUpdateDetails @toggle="updateDetails = false" />
      </div>
      <div v-else class="row d-flex align-content-stretch flex-wrap components-height">
        <!-- Quick Access Buttons -->
        <!-- Quick Change Buttons -->
        <div class="col-3">
          <SupermarketMenuQuickChange />
        </div>
        <!-- Important Details -->
        <div class="col-5 d-flex flex-column">
          <div class="row flex-fill">
            <div class="col-12">
              <div class="content">
                <SupermarketMenuNotifications />
              </div>
            </div>
          </div>
          <div class="row pt-3">
            <!-- Update & FAQ -->
            <div class="col-6">
              <a href="https://enab.app/support" target="_blank" rel="noopener noreferrer" class="content pointer d-flex flex-column justify-content-center align-items-center text-center py-4">
                <i class="fas fa-life-ring fa-3x text-light"></i>
                <h6 class="text-light mt-3">الاسئلة الشائعة</h6>
              </a>
            </div>
            <div class="col-6">
              <SupermarketMenuUpdate @toggle="updateDetails = true" />
            </div>
          </div>
        </div>
        <!-- User Configuration -->
        <div class="col-4 d-flex flex-column">
          <div class="row flex-fill">
            <div class="col-12">
              <SupermarketMenuUserProfile />
            </div>
          </div>
          <div class="row pt-3">
            <div class="col-12">
              <SupermarketMenuColor />
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-4">
        <div class="text-center text-light"> عنب، مع كل الحب <i class="fas fa-heart text-danger"></i> </div>
      </div>
    </div>

  </div>
</template>
<script>
import { mapMutations, mapGetters, mapActions, mapState } from "vuex";
export default {
  mounted() {
    if (this.$moment().format("A") == "مساءاً") this.day = false;
    // Refresh User Data
    if (this.$nuxt.isOnline) this.$auth.fetchUser();
  },
  data() {
    return {
      day: true,
      updateDetails: false
    };
  },
};
</script>


<style lang="scss">
@media (max-width: 991.98px) {
}

.night {
  background: rgba(0, 0, 0, 0.7) !important;
}

.main-menu {
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(50px);
  -webkit-backdrop-filter: blur(50px);
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
  .container {
    // margin-top: 2rem;
    // margin-top: 10%;
    .close {
      &:hover {
        cursor: pointer;
      }
    }
  }

  .content {
    height: 100%;
    padding: 10px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid $t-3;
    border-radius: $r-2;
    transition: 0.3s ease-out;
  }

  .pointer:hover {
    cursor: pointer;
    background: rgba(255, 255, 255, 0.3);
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
        background: rgba(255, 255, 255, 0.2) !important;
      }
    }
  }
  .h-correct {
    height: calc(25% - 0.5rem) !important;
  }
}
</style>