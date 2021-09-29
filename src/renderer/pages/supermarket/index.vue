<template>
  <div>
    <div class="row">
      <div class="col-8">
        <SupermarketHomeWelcome />
      </div>
      <div class="col-4">
        <SupermarketHomePerformance />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "supermarket",
  head: {
    title: "Supermarket",
  },
  mounted(){
    console.log(this.$business().name)
  },
  methods: {
    // refreshAuth(){
    //   this.$auth.refreshTokens().then((x) => {
    //     console.log(x)
    //   })
    // }
  },
};
</script>

<style lang="scss" scoped>
</style>