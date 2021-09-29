
<template>
  <div>
    <div class="row d-flex justify-content-center mt-3 b-1 r-2 p-4 show-scroll businesses">
      <div v-for="business in $auth.user.businesses" :key="business.name" class="col-md-4 px-lg-4">
        <Business :link="'/'+business.name" :name="business.name" :title="business.title" :sub_title="business.subtitle" :icon="business.icon" :all="business.all" :new_service="business.new" />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>