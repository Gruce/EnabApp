<template>
  <div>
    <div class="container">
      <div class="row d-flex justify-content-center align-items-center vh-100">
        <div class="col-6 text-white text-center t-1 p-5 r-2">
          <c-heading as="h1" fontSize="4xl" ml="4" color="white">إستعادة كلمة المرور</c-heading>

          <br /><br />

          <p class="text-center">
            <UtilitiesLoading v-if="loading" />
          </p>
          <div v-if="errors.length > 0">
            <p v-for="error in errors" :key="error">
            <ul>
              <li>{{error}}</li>
            </ul>
            </p>
          </div>
          <!-- Forget Password Request Email -->
          <form @submit.prevent="sendEmail" class="text-right" v-if="requestEmail">
            <div class="mb-3">
              <label for="inputEmail" class="form-label">البريد الالكتروني</label>
              <input v-model="email" placeholder="example@enab.com" type="email" class="form-control form-control-lg r-2" id="inputEmail" />
            </div>
            <button type="submit" class="btn btn-block btn-light btn-lg py-3 r-2 mt-3">
              ارسال
            </button>
          </form>
          <form @submit.prevent="sendRequest" class="text-right" v-else>
            <div class="mb-3">
              <label for="inputEmail" class="form-label">البريد الالكتروني</label>
              <input v-model="email" placeholder="example@enab.com" type="email" class="form-control form-control-lg r-2" id="inputEmail" />
            </div>
            <div class="mb-3">
              <label for="inputEmail" class="form-label">كود التحقق</label>
              <input v-model="token" placeholder="example@enab.com" type="text" class="form-control form-control-lg r-2" id="inputEmail" maxlength="9" />
            </div>
            <div class="mb-3">
              <label for="inputEmail" class="form-label">كلمة المرور الجديدة</label>
              <input v-model="password" type="password" class="form-control form-control-lg r-2" id="inputEmail" />
            </div>
            <div class="mb-3">
              <label for="inputEmail" class="form-label">اعد كتابة كلمة المرور</label>
              <input v-model="password_confirm" type="password" class="form-control form-control-lg r-2" id="inputEmail" />
            </div>
            <a @click="requestEmail = false" class="text-light pointer">
              أعد ارسال كود التحقق
            </a>
            <button type="submit" class="btn btn-block btn-light btn-g r-2 py-3 mt-3">
              تغيير كلمة المرور
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      requestEmail: true,
      email: "",
      token: "",
      password: "",
      password_confirm: "",
      loading: false,
      errors: [],
    };
  },
  methods: {
    async sendEmail() {
      this.loading = true;
      this.errors = [];

      if (this.email.length < 6) this.errors.push("البريد الالكتروني مطلوب");

      if (this.errors.length <= 0) {
        await this.$axios
          .post(
            "/api/reset-password-request",
            { email: this.email },
            {
              withCredentials: true,
            }
          )
          .then(() => {
            this.$toast.info("تم ارسال رسالة الى البريد الالكتروني");
            this.requestEmail = false;
          })
          .catch((error) => {
            console.log(error);
          });
      }
      this.loading = false;
    },
    async sendRequest() {
      this.loading = true;
      this.errors = [];

      if (this.email.length < 6) this.errors.push("البريد الالكتروني مطلوب");
      if (this.token.length < 9) this.errors.push("كود التحقق مطلوب");
      if (this.password.length < 6) this.errors.push("كلمة المرور مطلوبة");
      if (this.password !== this.password_confirm)
        this.errors.push("تأكيد كلمة المرور غير متطابقة");

      if (this.errors.length <= 0) {
        await this.$axios
          .post(
            "/api/change-password-request",
            {
              email: this.email,
              password: this.password,
              password_confirmation: this.password_confirm,
              token: this.token,
            },
            {
              withCredentials: true,
            }
          )
          .then(() => {
            this.$toast.info("تم تغيير كلمة المرور");
            this.$router.push("/");
          })
          .catch((error) => {
            console.log(error);
            this.$toast.error(
              "يوجد خطأ تأكد من البريد الالكتروني أو كود التحقق"
            );
          });
      }
      this.loading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
//
</style>