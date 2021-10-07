<template>
  <div>
    <div class="row t-1 r-2 b-1 p-3 mx-0">
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
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>