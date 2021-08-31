<template>
  <div class="container mt-5 text-center">
    <h1 class="mt-5 mb-3">
      مرحباً، يا
      {{ this.$auth.user.name }}
    </h1>

    <span class="fs-5 text-white"> شحن رصيد الى حسابك </span>

    <div class="row mx-lg-n1 d-flex justify-content-center mt-5">
      <div class="col-md-9 px-lg-9">
          <div class="card hover-translate-y-n3 hover-shadow-lg t-1 mb-15 r-2 p-5">
          <h3 class="text-light">طريقة الدفع</h3>
          <!-- Payment Methods -->
          <div class="row mt-3">
            <div class="col-6" v-for="payment in payments" :key="payment.name">
              <button
                @click="changePayment(payment.name)"
                class="btn btn-block"
                :class="payment.enabled ? 'btn-light' : 'btn-secondary'"
              >
              <i class="fas fa-credit-card"></i>
                {{ payment.name }}
              </button>
            </div>
          </div>

          <br />

          <!-- Cash to pay -->

          <div class="row mt-4">
            <div class="col-6 d-flex align-items-center justify-content-center">
              <h4 class="text-light">الرصيد</h4>
            </div>
            <div class="col-6 d-flex align-items-center justify-content-center">
              <h3 class="text-light">
                <button class="btn btn-light" @click="creditChange(true)">
                  <i class="fas fa-arrow-up"></i>
                </button>
                <span class="mx-4">{{ credit }}$</span>
                <button class="btn btn-light" @click="creditChange(false)">
                  <i class="fas fa-arrow-down"></i>
                </button>
              </h3>
            </div>
          </div>
          <!-- Credit Calculation -->
          <div class="row mt-4">
            <div class="col-6 d-flex align-items-center justify-content-center">
              <h4 class="text-light">النقاط المستحصلة</h4>
            </div>
            <div class="col-6 d-flex align-items-center justify-content-center">
              <h3 class="text-light">
                {{ points }}
              </h3>
            </div>
          </div>
            
            <hr/>
            <input class="form-control bg-light my-4" v-model="copun" placeholder="رقم الرصيد" /> 
            <hr class="" />
            <button class="btn btn-light">
                أدفع
            </button>
            <small class="text-right mt-1">
                * سيتم شحن النقاط في حسابك خلال فترة لاتتجاوز 24 ساعة
            </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      payments: [
        { name: "Asiacell", enabled: true },
        { name: "Zain", enabled: false },
      ],
      credit: 5,
      points: 2500
    };
  },
  created() {},
  methods: {
    changePayment(payment_name) {
      this.payments.forEach((x) =>
        x.name == payment_name ? (x.enabled = true) : (x.enabled = false)
      );
    },
    creditChange(type) {
      if (type) this.credit += 5;
      else this.credit = this.credit > 5 ? this.credit - 5 : 5;
    },
  },
  watch: {
      credit(){
          this.points = this.credit * 500
      }
  }
};
</script>

<style lang="scss" scoped>
h1 {
  font-weight: 600;
}
small , hr {
  color: aliceblue;
}
</style>