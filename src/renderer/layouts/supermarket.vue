<template>
  <div>
    <div class="main-container">
      <SupermarketNavbar />
      <client-only>
        <UtilitiesKeyup @keyup="keyboardEvent"></UtilitiesKeyup>
        <SupermarketConsole v-if="showConsole"></SupermarketConsole>
        <SupermarketMenu v-if="showMenu"></SupermarketMenu>
      </client-only>
      <nuxt />
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions, mapState } from "vuex";

export default {
  computed: {
    showMenu() {
      return this.$store.state.supermarket.showMenu;
    },
    backgroundColor() {
      return this.$store.state.supermarket.utilities.color;
    },
  },
  beforeCreate() {
    if ($nuxt.isOnline) {
      this.$auth.$storage.removeLocalStorage("products");
      this.$auth.$storage.removeLocalStorage("categories");
      this.$auth.$storage.removeLocalStorage("orders");
      this.$auth.$storage.removeLocalStorage("lastOrder");
    }
  },
  created() {
    this.getColor();
    var user = this.$auth.user;
    window.$crisp.push(["set", "user:nickname", ["Supermarket." + user.name]]);
    // window.$crisp.push(["set", "session:data", [[Object.keys(user).map(function(key) {return [ key, user[key]] })]]])
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
//
</style>