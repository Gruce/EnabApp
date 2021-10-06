<template>
  <div class="mx-5 mt-6">
    <MainUserInformation />
    <MainBusinesses />
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions, mapState } from "vuex";

export default {
  created() {
    this.selectBusinesses(this.$auth.user.businesses);
  },
  methods: {
    signout() {
      this.$auth.logout();
      this.$router.push("/");
    },
    ...mapMutations({
      selectBusinesses: "business/selectBusinesses",
    }),
  },
};
</script>

<style lang="scss">
h1 {
  font-weight: 600;
}
.businesses {
  min-height: calc(100vh - 21rem) !important;
  max-height: calc(100vh - 21rem) !important;
}

.clickable {
  transition: 0.2s ease-out;
  border-radius: $r-2;
  &:hover {
    background: $tb-2;
  }
}
</style>