<template>
  <div>
    <div class="row">
      <div class="col-8">
        <SupermarketHomeWelcome />
      </div>
      <div class="col-4">
        <div class="card tb-2 rounded-lg border-0">
          <div class="card-body text-center">
            <div class="row py-4">
              <div class="col-8">
                <h1 class="text-white text-right fs-1">
                  ليلة سعيدة !
                </h1>
              </div>
            </div>
          </div>
        </div>
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
//
</style>