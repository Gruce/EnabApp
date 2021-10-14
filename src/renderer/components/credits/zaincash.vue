<template>
  <div>
    <button :disabled="loading ? true : false" @click="pay(), open()" class="btn btn-light btn-block btn-lg r-2 py-3 mt-3">
      أدفع
    </button>

    <c-modal size="full" :is-open="isOpen" :on-close="close" :closeOnOverlayClick="false" is-centered>
      <c-modal-content class="p-5" ref="content">
        <c-modal-header>الدفع بواسطة زين كاش</c-modal-header>
        <c-modal-close-button />
        <c-modal-body py=6>
          <b-overlay :show="overlay" rounded="sm" spinner-large spinner-type="grow" spinner-variant="primary">
            <iframe frameborder="0" height="100%" width="100%" id="zaincash_frame" name="cash_payment" src="https://www.w3schools.com" title="W3Schools Free Online Web Tutorials"></iframe>
          </b-overlay>
        </c-modal-body>
      </c-modal-content>
      <c-modal-overlay />
    </c-modal>
  </div>
</template>

<script>
var jwt = require("jwt-simple");

export default {
  props: ["credit"],
  data() {
    return {
      loading: false,
      isOpen: false,
      overlay: true,
    };
  },

  methods: {
    async pay() {
      this.loading = true;

      await this.$axios
        .post(
          "/api/recharge/zaincash/init",
          { cash: this.credit },
          { withCredentials: true }
        )
        .then(async (response) => {
          window.frames["cash_payment"].location =
            "https://test.zaincash.iq/transaction/pay?id=" +
            response.data.transaction_id;
          this.iframeHandler();
        })
        .catch(function (error) {
          console.log(error);
        });

      this.loading = false;
    },
    iframeHandler() {
      const iframe = document.getElementById("zaincash_frame");
      const handleLoad = () => {
        this.overlay = false;
      };

      iframe.addEventListener("load", handleLoad, true);
    },
    open() {
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
      this.overlay = true;
      this.checkTransaction();
    },
    async checkTransaction() {
      await this.$axios
        .post("/api/recharge/zaincash/check", {}, { withCredentials: true })
        .then(async (response) => {
          this.$toast({
            title: "تم شحن النقاط",
            status: "success",
            duration: 2000,
          });
          this.$auth.fetchUser();
        })
        .catch(function (error) {
          this.$toast({
            title: "لم تتم العملية",
            status: "error",
            duration: 2000,
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
iframe {
  height: 80vh; /* Viewport-relative units */
  width: 100%;
  margin: 0 auto;
  border-radius: $r-2;
}
</style>