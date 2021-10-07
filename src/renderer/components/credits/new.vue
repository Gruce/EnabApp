<template>
  <div>
    <div class="row d-flex justify-content-center mt-3">
      <div class="col-md-12">
        <div class="card t-1 b-1 r-2 p-5">
          <!-- Payment Methods -->

          <div class="row d-flex">
            <div class="col-4 payment-method" v-for="payment in payments" :key="payment.name">
              <button :disabled="payment.statue ? false : true" @click="changePayment(payment.name)" class="btn btn-block py-3 fs-5 r-2" :class="payment.enabled ? 'btn-light selected' : 'btn-secondary'">
                <div>
                  <img class="icon icon-shape r-2" :src="require(`~/assets/imgs/${payment.icon}.png`)" :alt="payment.name">
                </div>
                <div class="mt-1">
                  {{ payment.name }}
                </div>
              </button>
            </div>
          </div>

          <br />
          <!-- Cash to pay -->
          <!-- Credit Calculation -->
          <div class="row d-flex align-items-stretch">
            <div class="col-6">
              <div class="t-1 r-2 py-3 h-100 d-flex align-items-center justify-content-center px-2">
                <div class="text-light mb-0 fs-3">
                  <button class="btn t-1 b-1 r-2" @click="creditChange(true)">
                    <i class="fas fa-arrow-up fa-2x text-light"></i>
                  </button>
                  <span class="mx-3">{{ credit }}</span>
                  <button class="btn t-1 b-1 r-2" @click="creditChange(false)">
                    <i class="fas fa-arrow-down fa-2x text-light"></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="t-1 r-2 py-3">
                <div class="text-light mb-0 fs-3">
                  {{ points }}
                </div>
                <small>النقاط المستحصلة</small>
              </div>
            </div>
          </div>

          <input class="form-control form-control-lg t-3 r-2 my-4" v-model="card_number" placeholder="رقم الرصيد" />

          <button :disabled="submitRequest ? true : false" @click="request(), submitRequest=true" class="btn btn-light btn-lg r-2 py-3 mt-3">
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
import { mapMutations, mapGetters, mapActions, mapState } from "vuex";

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
      credit: 5000,
      points: 2500,
      card_number: "",
      submitRequest: false,
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
      if (type) this.credit += 5000;
      else this.credit = this.credit > 5000 ? this.credit - 5000 : 5000;
    },

    request() {
      let req = {
        type: this.payments.findIndex((x) => x.enabled == true) + 1,
        card_number: this.card_number,
        cash: this.credit,
      };
      this.sendRequest(req);
    },

    ...mapActions({
      sendRequest: "credits/request",
    }),
  },
  watch: {
    credit() {
      this.points = this.credit * 0.5;
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
</style>