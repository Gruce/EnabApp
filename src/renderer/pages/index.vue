<template>
  <div class="container mt-6">
    <div class="row t-1 r-2 b-1 p-3">
      <nuxt-link to="/" class="col-6 p-3 clickable">
        <div class="row align-items-center">
          <div class="col-auto">
            <img alt="Image placeholder" :src="$auth.user.profile_photo_url" class="avatar avatar-xl r-2">
          </div>
          <div class="col ml-n3 ml-md-n2">
            <span class="fs-4 text-light">
              {{ $auth.user.name }}
            </span>
            <span class="d-block text-light">
              {{ $auth.user.email }}
            </span>
          </div>
        </div>
      </nuxt-link>
      <nuxt-link to="/credits" class="col-6 p-3 clickable">
        <div class="row align-items-center">
          <div class="col ml-n3 ml-md-n2 text-left">
            <span class="fs-4 text-light">
              رصيد نقاطك
            </span>
            <span class="d-block text-light">
              {{ $auth.user.points }}
            </span>
          </div>
          <div class="col-auto">
            <div class="avatar avatar-xl bg-light r-2">
              <i class="fas fa-credit-card fa-2x text-dark"></i>
            </div>
          </div>
        </div>
      </nuxt-link>
    </div>

    <div class="row d-flex justify-content-center mt-3 b-1 r-2 p-4 show-scroll businesses">
      <!-- <div class="col-12 px-lg-4 mb-3 text-center py-1">
        <span class="fs-3 text-white">
          <b>جميع الخدمات مجانية </b> 
        </span>
      </div> -->
      <div v-for="business in $auth.user.businesses" :key="business.name" class="col-md-4 px-lg-4">
        <Business :link="'/'+business.name" :name="business.name" :title="business.title" :sub_title="business.subtitle" :icon="business.icon" :all="business.all" :new_service="true" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {},
  methods: {
    signout() {
      this.$auth.logout();
      this.$router.push("/");
    },
    test() {
      console.log(this.$auth.user["test"]);
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  font-weight: 600;
}
.businesses {
  min-height: calc(100vh - 21rem) !important;
  max-height: calc(100vh - 21rem) !important;
}

.clickable{
  transition: .2s ease-out;
  border-radius: $r-2;
  &:hover{
    background: $tb-2;
  }
}
</style>