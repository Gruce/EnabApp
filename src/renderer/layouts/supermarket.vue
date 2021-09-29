<template>
  <CThemeProvider>
    <CReset />
    <div class="main-container">
      <div class="bg" />
      <SupermarketNavbar />
      <client-only>
        <UtilitiesKeyup @keyup="keyboardEvent"></UtilitiesKeyup>
        <SupermarketConsole v-if="showConsole"></SupermarketConsole>
        <SupermarketMenu v-if="showMenu"></SupermarketMenu>
      </client-only>
      <nuxt />
      <SupermarketFooter />
    </div>
  </CThemeProvider>
</template>

<script>
import { CThemeProvider, CReset } from "@chakra-ui/vue";
import { mapMutations, mapGetters, mapActions, mapState } from "vuex";

export default {
  components: { CThemeProvider },

  computed: {
    showMenu() {
      return this.$store.state.supermarket.showMenu;
    },
    ...mapGetters({
      backgroundColor: "supermarket/utilities/backgroundColor",
    }),
  },
  mounted() {
    // Recharge Notification
    this.$echo
      .channel("recharge-" + this.$auth.user.id)
      .listen("RechargeRequestEvent", (data) => {
        this.$toast({
          title: data.message,
          status: "info",
          duration: 10000,
        });
        this.$auth.fetchUser();
      });
  },
  created() {
    this.fetchServices();
    this.getColor();
    this.fetchPrinters();
    this.getDefaultPrinter();
    this.getPrintState();
    var user = this.$auth.user;
    window.$crisp.push(["set", "user:nickname", ["Supermarket." + user.name]]);
    window.$crisp.push(["set", "session:data", [[["email", user.email]]]]);
  },
  data() {
    return {
      showConsole: false,
      barcode: "",
      interval: "",
    };
  },
  methods: {
    ...mapMutations({
      toggleMenu: "supermarket/toggleMenu",
    }),
    ...mapActions({
      getColor: "supermarket/utilities/getColor",
      fetchPrinters: "supermarket/utilities/fetchPrinters",
      getDefaultPrinter: "supermarket/utilities/getDefaultPrinter",
      getPrintState: "supermarket/utilities/getPrintState",
      fetchServices: "supermarket/services/fetchServices",
    }),
    keyboardEvent(e) {
      if (this.interval) clearInterval(this.interval);
      if (e.code == "Enter") {
        if (this.barcode) {
          this.$store.dispatch(
            "supermarket/orders/addProductByBarcode",
            this.barcode
          );
          // this.$emit('barcode', this.barcode)
          // this.addProductByBarcode(this.barcode)
        }
        this.barcode = "";
        return;
      }
      if (e.key != "Shift") this.barcode += e.key;
      this.interval = setInterval(() => (this.barcode = ""), 20);

      // if not input
      var e = event || window.event,
        target = e.target || e.srcElement;
      if (target.tagName.toUpperCase() == "INPUT") return;

      // Ctrl + ` => Show Console
      if (e.which === 192) {
        this.showConsole = !this.showConsole;
        console.log("showed");
      }

      // Ctrl + ESC => Show Menu
      if (e.which === 27) {
        this.toggleMenu();
      }
    },
  },
  watch: {
    backgroundColor(color) {
      document.querySelector("body").style.backgroundColor = color;
    },
  },
};
</script>

<style lang="scss" scoped>
.bg {
  background: #5415e7;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #6A82FB, #5415e7);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #6A82FB, #5415e7); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */




  background-size: cover;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  position: absolute;
  opacity: 0.4;
  // filter: blur(25px);
  overflow: hidden;
  z-index: -1;

  background-size: 300% 100%;
  animation: gradient 3s linear infinite;
  animation-direction: alternate;
}
@keyframes gradient {
  0% {
    background-position: 0%;
  }
  100% {
    background-position: 100%;
  }
}
</style>