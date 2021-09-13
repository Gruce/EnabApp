<template>
  <div class="content">
    <div class="mt-5 text-center">
      <div class="img-fluid mb-1">
        <img class="w-50 r-2 mx-auto" :src="$auth.user.profile_photo_url" alt="Image placeholder" />
      </div>
      <div class="text-light fs-4 fw-bold mb-0">{{$auth.user.name}}</div>
      <div class="text-light fs-6 mt-0">( {{$auth.user.supermarket.name}} )</div>
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
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>