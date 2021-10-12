<template>
  <div>
    <div @click="initializeService()" class="card mb-1 bg shadow-lg r-2 hover-shadow-lg hover-translate-y-n10 z-index-100" :class="loading ? 'opacity' : 'pointer'">
      <div class="card-body px-lg-5 pt-4 text-center h-100">
        <div v-if="!$auth.user[name]" class="position-absolute top-0 end-0">
          <span class="badge badge-danger mr-1 r-2">
            لاتمتلك هذه الخدمة
          </span>
        </div>

        <div v-if="new_service" class="position-absolute top-0 start-0">
          <span class="badge badge-light text-dark ml-1 r-2">
            جديد
          </span>
        </div>

        <div class="icon icon-xl icon-shape rounded-circle t-3">
          <UtilitiesLoading v-if="loading" />
          <i v-else class="fa-5x text-light" :class="icon ? 'fas fa-shopping-cart' : 'fas fa-briefcase'"></i>
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
    <div>
      <c-menu>
        <c-menu-button :disabled="loading" class="bg r-2 w-100" right-icon="chevron-down">
          تغيير الـ{{ title }}
        </c-menu-button>
        <c-menu-list class="bg r-2 w-100">
          <c-menu-item v-for="(business, i) in all" :key="business.id">
            <div class="w-100 text-right" @click="changeBusiness(business.id)">
              <div class="badge t-1 ml-1">{{++i}}</div>
              {{ business.name }}
            </div>

            <button v-if="business.pivot.user_type!=='admin'" @click="leaveBusiness(business)" class="btn btn-outline-danger btn-sm mr-3 border-0">
              إنسحاب
            </button>

          </c-menu-item>

          <hr class="bg-secondary my-2" />

          <c-menu-item @click="newBusiness()">
            <span class="badge t-1 ml-1">
              <i class="fas fa-plus"></i>
            </span>
            {{ title }} إضافي

            <span v-if="hasAdmin" class="mr-auto text-sm">12,000 نقطة</span>
            <span v-else class="mr-auto text-sm text-success">مجاناً</span>
          </c-menu-item>
        </c-menu-list>
      </c-menu>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions, mapState } from "vuex";

export default {
  props: ["title", "sub_title", "new_service", "link", "name", "icon", "all"],
  computed: {
    hasAdmin() {
      let businesses = this.all.filter((x) => x.pivot.user_type == "admin");
      if (businesses.length > 0) return true;
      else return false;
    },
  },
  created() {
    console.log(this.$auth.user);
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async initializeService() {
      if (this.loading) return false;
      if (this.$auth.user[this.name]) {
        this.$router.push("/" + this.name);
        this.selectBusiness({ name: this.name, title: this.title });

        // Clear Storage
        window.localStorage.clear();
      } else {
        this.sendCreateBusiness();
      }
    },
    async changeBusiness(id) {
      this.loading = true;
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
            description: "تم تغيير الـ" + this.title,
            status: "success",
            duration: 2000,
          });
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async newBusiness() {
      this.loading = true;
      let businesses = await this.all.filter(
        (x) => x.pivot.user_type == "admin"
      );

      if (businesses.length > 0) {
        if (this.$auth.user.points >= 12000)
          await this.$dialog
            .confirm("سيتم إستقطاع 12,000 نقطة")
            .then(async () => {
              await this.sendCreateBusiness(true);
            })
            .catch(async () => {});
        else
          this.$toast({
            title: "عدد النقاط غير كافي",
            description: "يجب شحن نقاط أكثر في حسابك",
            status: "error",
            duration: 5000,
          });
      } else {
        await this.sendCreateBusiness();
      }
      this.loading = false;
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

    async leaveBusiness(business) {
      this.$dialog.confirm("هل انت متأكد من الإنسحاب؟").then(async () => {
        await this.$axios
          .post(
            "/api/staff/leave",
            {
              id: business.id,
              business: this.name,
            },
            {
              withCredentials: true,
            }
          )
          .then(async (response) => {
            this.$auth.fetchUser();
            this.$toast({
              title: response.data.message,
              status: "success",
              duration: 3000,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },

    user_type(value) {
      switch (value) {
        case "admin":
          return "مدير";
        case "staff":
          return "طاقم العمل";
        default:
          return "غير معروف";
      }
    },
    ...mapActions({
      selectBusiness: "business/selectBusiness",
    }),
  },
};
</script>

<style lang="scss" scoped>
.card {
  transition: 0.3s ease-in-out;
}
.bg {
  background: #212529 !important;
}
.bg:hover {
  background: #1a2026 !important;
}

.opacity {
  opacity: 0.5;
}
</style>