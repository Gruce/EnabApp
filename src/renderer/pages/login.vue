<template>
  <div class="container">
    <img class="mx-auto mt-6 mb-5 logo-big" width="30%" src="../assets/imgs/enab-white-big.png" alt="">
    <div class="row d-flex justify-content-center align-items-center">
      <div class="col-6 text-white text-center t-1 p-5 r-2">
        <c-heading as="h1" fontSize="4xl" ml="4" color="white">تسجيل الدخول</c-heading>

        <br />
        <form @submit.prevent="userLogin" class="text-right">
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
          <div class="mb-3">
            <label for="inputEmail" class="form-label text-light">البريد الالكتروني</label>
            <input v-model="login.email" placeholder="example@enab.com" type="email" class="form-control form-control-lg r-2" id="inputEmail">
          </div>
          <div class="mb-3">
            <label for="inputPassword" class="form-label text-light">كلمة المرور</label>
            <input v-model="login.password" placeholder="******" type="password" class="form-control form-control-lg r-2" id="inputPassword">
          </div>
          <nuxt-link to="/forgetpassword" class="text-light">
            هل نسيت كلمة السر؟
          </nuxt-link>

          <button type="submit" class="btn btn-block btn-lg r-2 btn-light py-3 mt-5">تسجيل الدخول</button>
        </form>
      </div>

      <div class="w-100 text-center mt-5">
        <a href="https://enab.app/businesses/subscribe" class="btn btn-link text-light" target="_blank">
          <span>ليس لديك حساب؟ أشترك الآن مجاناً</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async mounted() {
    try {
      await this.$recaptcha.init();
    } catch (e) {
      console.log(e);
    }
  },
  data() {
    return {
      login: {
        email: "",
        password: "",
      },
      errors: [],
      loading: false,
    };
  },
  methods: {
    async userLogin() {
      this.loading = true;
      this.errors = [];

      if (this.login.email.length < 6)
        this.errors.push("البريد الالكتروني مطلوب");
      if (this.login.password < 6) this.errors.push("كلمة المرور مطلوبة");

      if (this.errors.length <= 0) {
        const token = await this.$recaptcha.execute("login");

        await this.$auth
          .loginWith("laravelJWT", {
            data: {
              email: this.login.email,
              password: this.login.password,
              token: token,
            },
          })
          .then(() => {
            console.log("Logged in");
            this.$router.push("/");
          })
          .catch((error) => {
            if (error.response.data.message)
              this.errors.push(error.response.data.message);
            else this.errors.push("البريد الالكتروني او كلمة المرور خاطئة");
          });
        await this.$recaptcha.reset();
      }
      this.loading = false;
    },
  },
  beforeDestroy() {
    this.$recaptcha.destroy();
  },
};
</script>

<style lang="scss" scoped>
</style>