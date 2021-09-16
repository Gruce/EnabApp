<template>
  <div>
    <div @click="initializeService()" class="card shadow-lg bg r-2 hover-shadow-lg hover-translate-y-n10 z-index-100 pointer">
      <div class="card-body px-lg-5 pt-4 text-center h-100">
        <div v-if="!$auth.user[name]" class="position-absolute top-0 end-0">
          <span class="badge badge-danger mr-1 r-2">
            لاتمتلك هذه الخدمة
          </span>
        </div>
        <div class="icon icon-xl icon-shape rounded-circle t-3">
          <i class="fa-5x text-light" :class="icon ? 'fas fa-shopping-cart' : 'fas fa-briefcase'"></i>
        </div>
        <div class="mt-4 fw-bold fs-4 text-light mb-0">{{ title }}</div>
        <hr class="divider divider-fade my-3">
        <div class="fs-6 mb-0 text-muted">{{ sub_title }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "sub_title", "new_service", "link", "name", "icon"],
  methods: {
    async initializeService() {
      if (this.$auth.user[this.name]){
        this.$router.push("/" + this.name);
      } else {
        await this.$axios
          .post(
            "/api/business",
            { business: this.name },
            {
              withCredentials: true,
            }
          )
          .then((response) => {
            this.$toast({
              title: "تم الإنشاء بنجاح!",
              description: "تم إنشاء منصة العمل الخاصة بك بنجاح!",
              status: "success",
              duration: 3000,
            });
  
            this.$router.push("/" + this.name);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.bg {
  background: #212529 !important;
  transition: 0.3s ease-in-out;
}
.bg:hover {
  background: #1a2026 !important;
}
</style>