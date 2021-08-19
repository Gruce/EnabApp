<template>
  <div>
    <div class="main-container">
      <SupermarketNavbar />
      <client-only>
        <UtilitiesKeyup @keyup="keyboardEvent"></UtilitiesKeyup>
        <SupermarketConsole v-if="showConsole"></SupermarketConsole>
        <SupermarketMenu @close-menu="hideMenu" v-if="showMenu"></SupermarketMenu>
      </client-only>
      <nuxt />
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions, mapState } from "vuex";

export default {
  computed: {
    showMenu () {
      return this.$store.state.supermarket.showMenu;
    },
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
      toggleMenu: 'supermarket/toggleMenu',
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
        this.toggleMenu()
      }
    },
  },
};
</script>

<style lang="scss" scoped>
//
</style>