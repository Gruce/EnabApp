<template>
  <div>
    <nuxt-link :to="link">
      <div class="card shadow-lg bg r-2 hover-shadow-lg hover-translate-y-n10 z-index-100">
        <div class="card-body px-lg-5 pt-4 text-center h-100">
          <div class="icon icon-xl icon-shape rounded-circle t-3">
            <i class="fas fa-shopping-cart fa-5x text-light"></i>
          </div>
          <h4 class="mt-4 text-light mb-0">{{ title }}</h4>
          <hr class="divider divider-fade my-3">
          <h6 class="h6 mb-0 text-muted">{{ sub_title }}</h6>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: ["title", "sub_title", "new_service", "link"],
};
</script>

<style lang="scss" scoped>
.bg{
    background: #212529 !important;
    transition: 0.3s ease-in-out;
}
.bg:hover{
    background: #1a2026 !important;
}
</style>