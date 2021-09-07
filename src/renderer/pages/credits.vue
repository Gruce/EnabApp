<template>
  <div class="container mt-0 text-center">
    <span class="fs-2 text-white"> شحن رصيد الحساب </span>
    <div class="row mx-lg-n1 d-flex justify-content-center mt-3">
      <div class="col-md-12 px-xl-9">
        <div class="card t-1 b-1 r-2 p-5">
          <!-- Payment Methods -->

          <div class="row d-flex">
            <div class="col-4 payment-method" v-for="payment in payments" :key="payment.name">
              <button :disabled="payment.statue ? false : true" @click="changePayment(payment.name)" class="btn btn-block py-3 fs-5 r-2" :class="payment.enabled ? 'btn-light selected' : 'btn-secondary'">
                <div>
                  <img class="icon icon-shape r-2" width="100%" :src="require(`~/assets/imgs/${payment.icon}.png`)" :alt="payment.name">
                </div>
                <div class="mt-1">
                  {{ payment.name }}
                </div>
              </button>
            </div>
          </div>

          <br />
          <!-- Cash to pay -->

          <div class="row t-1 p-3 r-2 mx-0">
            <div class="col-6 d-flex align-items-center">
              <h2 class="text-light text-right">الرصيد</h2>
            </div>
            <div class="col-6 text-left">
              <h3 class="text-light mb-0">
                <button class="btn t-1 b-1 r-2" @click="creditChange(true)">
                  <i class="fas fa-arrow-up fa-2x text-light"></i>
                </button>
                <span class="mx-4">{{ credit }}$</span>
                <button class="btn t-1 b-1 r-2" @click="creditChange(false)">
                  <i class="fas fa-arrow-down fa-2x text-light"></i>
                </button>
              </h3>
            </div>
          </div>
          <!-- Credit Calculation -->
          <div class="row mt-4 tb-2 p-3 r-2 mx-0">
            <div class="col-12">
              <h1 class="text-light mb-0">
                {{ points }}
              </h1>
              <small>النقاط المستحصلة</small>
            </div>
          </div>

          <input class="form-control form-control-lg t-3 r-2 my-4" v-model="copun" placeholder="رقم الرصيد" />

          <button class="btn btn-light btn-lg r-2 py-3">
            أدفع
          </button>
          <small class="text-right mt-1">
            * سيتم شحن النقاط في حسابك خلال فترة لاتتجاوز 24 ساعة
          </small>
          <small class="text-right mt-1">
            * في حال محاولتك في ادخال رقم غير صحيح لإكثر من 5 محاولات سيتم إغلاق حسابك نهائياً
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
        { name: "Asiacell", enabled: true, icon: "asiacell", statue: true },
        { name: "Zain", enabled: false, icon: "zaincash", statue: true },
        {
          name: "Credit Card",
          enabled: false,
          icon: "MA",
          statue: false,
        },
      ],
      credit: 5,
      points: 2500,
      copun: "",
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
    credit() {
      this.points = this.credit * 500;
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  font-weight: 600;
}
small,
hr {
  color: aliceblue;
}
.btn-secondary {
  background: $t-1;
  border: 1px solid $t-1;
  transition: 0.2s ease-in-out;

  &:hover {
    background: $t-3;
  }
}

// .payment-method {
//   flex: 1 1 auto !important;
// }
</style>