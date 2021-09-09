<template>
  <!-- Service ID = 1 -->
  <div v-click-outside="outsideClick" class="main">
    <div @click="outsideClick">
      <UtilitiesClose class="float-left" />
    </div>
    <div class="row p-3 d-flex justify-content-center">
      <div class="col-xl-8 col-sm-12">
        <div class="t-1 b-1 p-4 r-2 h-100 d-flex flex-column">

          <div class="row">
            <div class="position-relative">
              <input dir="ltr" maxlength="16" v-model="final" type="text" class="form-control fs-3 fw-bold">
              <a href="#" v-longclick="() => removeNumber()" @click="removeNumber" class="backspace">
                <i class="fas fa-backspace text-danger fa-2x"></i>
              </a>
            </div>
          </div>

          <div class="row mt-1 r-2 mt-3">
            <!-- Suggestions -->
            <div v-for="suggestion in suggestions" :key="suggestion" class="col-4">
              <button @click="setNumber(suggestion)" class="t-1 border-0 r-2 py-2 px-4 fs-2 btn-block">
                {{ suggestion }}
              </button>
            </div>

            <div class="col-12 mt-2"></div>

            <!-- Numbers -->
            <div v-for="number in numbers" :key="number" class="col-4">
              <button @click="addNumber(number)" class="t-1 border-0 r-2 py-2 px-4 fs-2 btn-block my-2">
                {{ number }}
              </button>
            </div>

            <div class="col-12 mt-2"></div>

            <!-- Thousands -->
            <div v-for="thousand in thousnads" :key="thousand" class="col-4">
              <button @click="addNumber(thousand)" class="t-1 border-0 r-2 py-2 px-4 fs-2 btn-block my-2">
                {{ thousand }}
              </button>
            </div>
          </div>

        </div>
      </div>
      <div class="col-xl-8 col-sm-12 mt-3">
        <div class="row tb-2 text-light r-2 p-3 m-0">
          <div class="col-6 text-right">
            <h3 class="text-light d-inline-block">
              المتبقي
              <span class="badge badge-info r-1" v-if="final - totalPrice > 0">الى الزبون</span>
              <span class="badge badge-danger r-1" v-else-if="final - totalPrice < 0">الى المحاسب</span>
            </h3>
          </div>
          <div class="col-6 text-left">
            <h3 class="text-light" dir="ltr">{{ $n(final - totalPrice, 'currency') }}</h3>
          </div>
        </div>
      </div>
      <div class="col-xl-8 col-sm-12 mt-3">
        <button @click="endOrder" type="button" class="btn btn-block btn-light py-2 fs-3 r-2">
          إنهاء الطلب
        </button>
      </div>
    </div>

  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions, mapState } from "vuex";

export default {
  props: ["service_id", "totalPrice"],
  created() {
    this.createSuggestions();
  },
  data() {
    return {
      firstOpen: true,
      final: 0,
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9].reverse(),
      thousnads: ["0", "00", "000"].reverse(),
      suggestions: [],
      suggestedNumbers: [1000, 5000, 10000, 25000, 50000],
    };
  },
  methods: {
    addNumber: function (number) {
      if (this.final.toString().length < 16) {
        if (this.final == 0 && parseInt(number, 10) == 0) this.final = 0;
        else if (this.final == 0) this.final = "" + number;
        else this.final += "" + number;
      }
    },
    setNumber: function (number) {
      this.final = number;
    },
    removeNumber: function () {
      try {
        this.final = this.final.slice(0, -1);
      } catch {
        this.final = 0;
      }
    },
    createSuggestions() {
      this.suggestedNumbers = [
        1000,
        5000,
        10000,
        25000,
        50000,
        this.totalPrice,
      ];
      this.suggestedNumbers.sort((a, b) => {
        return Math.abs(a - this.totalPrice) - Math.abs(b - this.totalPrice);
      })[0];
      this.suggestions = this.suggestedNumbers.slice(0, -3).reverse();
    },
    outsideClick() {
      if (this.firstOpen) this.firstOpen = false;
      else this.toggleCalculator();
    },
    ...mapMutations({
      toggleCalculator: "supermarket/orders/calculator",
    }),
    ...mapActions({
      endOrder: "supermarket/orders/endOrder",
    }),
  },
  watch: {
    totalPrice: {
      deep: true,
      handler() {
        this.createSuggestions();
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  position: fixed;
  background: $t-1;
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  z-index: 999;
  // margin: 1px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 95vw;
  height: 95vh;
  border-radius: $r-2;
  padding: 1rem;

  .form-control {
    background-color: $t-2;
    border-radius: $r-2;
  }

  .backspace {
    position: absolute;
    margin: 0;
    top: 50%;
    right: 0;
    transform: translate(-50%, -50%);
  }
}

.received_title {
  top: -27.5px;
  width: 100%;
}
</style>