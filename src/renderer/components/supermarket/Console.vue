<template>
  <div>
    <input ref="console" v-model="magicalText" @change="getMagic" placeholder="You have just found the magical giant" class="form-control fs-5" type="text">
  </div>
</template>

<script>
export default {
  mounted() {
    this.$refs.console.focus();
    this.$toast({
      title: "Congratulations!",
      description: "You have just found the magical genie! 🧞‍♂️",
      status: "info",
    });
  },
  beforeDestroy() {
    this.$toast({
      title: "At your service! 🧞‍♂️",
      status: "info",
    });
  },
  data() {
    return {
      magicalText: "",
    };
  },

  methods: {
    getMagic() {
      let t = this.magicalText;
      switch (t) {
        case "reset":
          this.resetStorage();
          this.$toast({
            title: "Reseted!",
            status: "success",
            duration: 3000
          });
          break;
      }
      this.magicalText = "";
    },
    resetStorage() {
      this.$auth.$storage.removeLocalStorage("products");
      this.$auth.$storage.removeLocalStorage("categories");
      this.$auth.$storage.removeLocalStorage("customers");
      this.$auth.$storage.removeLocalStorage("orders");
      this.$auth.$storage.removeLocalStorage("lastOrder");
      this.$auth.$storage.removeLocalStorage("services");
    },
  },
};
</script>

<style lang="scss" scoped>
input {
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60vw;
  border: 0;
  border-radius: $r-2;
  z-index: 99;
  background: $tb-2;
  color: white !important;
  transition: 0.3s ease-in-out;
  padding: 30px 20px !important;

  &:hover {
    background: $tb-3;
  }

  &:focus {
    background: $tb-3;
    transform: translate(-50%, -50%) scale(1.05);
  }
}
</style>