<template>
  <div>
    <div @click="initializeService()" class="card mb-1 shadow-lg bg r-2 hover-shadow-lg hover-translate-y-n10 z-index-100 pointer">
      <div class="card-body px-lg-5 pt-4 text-center h-100">
        <div v-if="loading">
          <UtilitiesLoading />
        </div>

        <div v-else>
          <div v-if="!$auth.user[name]" class="position-absolute top-0 end-0">
            <span class="badge badge-danger mr-1 r-2">
              لاتمتلك هذه الخدمة
            </span>
          </div>

          <div class="icon icon-xl icon-shape rounded-circle t-3">
            <i class="fa-5x text-light" :class="icon ? 'fas fa-shopping-cart' : 'fas fa-briefcase'"></i>
          </div>
          <div class="mt-4 fw-bold fs-4 text-light mb-0">
            <span v-if="$auth.user[name]">
              {{ $auth.user[name].name }}
            </span>
            <span v-else>
              {{ title }}
            </span>
          </div>
          <hr class="divider divider-fade my-3">
          <div class="fs-6 mb-0 text-muted">
            <span v-if="$auth.user[name]">
              {{ user_type($auth.user[name].pivot.user_type) }}
            </span>
            <span v-else>
              {{ sub_title }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div>
      <c-menu>
        <c-menu-button class="bg r-2 w-100" right-icon="chevron-down">
          تغيير الـ{{ title }}
        </c-menu-button>
        <c-menu-list class="bg r-2 w-100">
          <c-menu-item v-for="(business, i) in all" :key="business.id" @click="changeBusiness(business.id)">
            <span class="badge t-1 ml-1">{{++i}}</span>
            {{ business.name }}
          </c-menu-item>

          <hr class="bg-secondary my-2" />

          <c-menu-item @click="newBusiness()">
            <span class="badge t-1 ml-1">
              <i class="fas fa-plus"></i>
            </span>
            {{ title }} إضافي
          </c-menu-item>
        </c-menu-list>
      </c-menu>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "sub_title", "new_service", "link", "name", "icon", "all"],
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async initializeService() {
      if (this.$auth.user[this.name]) {
        this.$router.push("/" + this.name);
      } else {
        this.sendCreateBusiness();
      }
    },
    async changeBusiness(id) {
      await this.$axios
        .post(
          "/api/" + this.name + "/select",
          { id: id },
          {
            withCredentials: true,
          }
        )
        .then(async (response) => {
          await this.$auth.fetchUser();

          this.$toast({
            title: "تم التغيير بنجاح",
            description: "تم تغيير العمل",
            status: "success",
            duration: 2000,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async newBusiness() {
      let businesses = this.all.filter((x) => x.pivot.user_type == "admin");

      if (businesses.length > 0) {
        if (this.$auth.user.points >= 12000)
          this.$dialog.confirm("سيتم إستقطاع 12,000 نقطة").then(async () => {
            this.sendCreateBusiness(true);
          });
        else
          this.$toast({
            title: "عدد النقاط غير كافي",
            description: "يجب شحن نقاط أكثر في حسابك",
            status: "error",
            duration: 5000,
          });
      } else {
        this.sendCreateBusiness();
      }
    },

    async sendCreateBusiness(newBusiness = false) {
      await this.$axios
        .post(
          "/api/business",
          { business: this.name, new: newBusiness },
          {
            withCredentials: true,
          }
        )
        .then(async (response) => {
          // Selecting Business
          await this.$axios
            .post(
              "/api/" + this.name + "/select",
              { id: response.data.id },
              { withCredentials: true }
            )
            .then(async (response) => {
              this.$auth.fetchUser();

              this.$toast({
                title: "تم الإنشاء بنجاح!",
                description: "تم إنشاء منصة العمل الخاصة بك بنجاح!",
                status: "success",
                duration: 3000,
              });
            });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    user_type(value) {
      switch (value) {
        case "admin":
          return "المدير";
        case "staff":
          return "طاقم العمل";
        default:
          return "غير معروف";
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