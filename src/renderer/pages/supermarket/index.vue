<template>
  <div>
    <div>
      <div class="row">
        <div class="col-12">
          <div class="card tb-2 rounded-lg border-0">
            <div class="card-body text-center">
              <div class="row py-4">
                <div class="col-8">
                  <h1 class="text-white text-right fs-1">
                    ليلة سعيدة !
                    ..نوم الهنا
                  </h1>
                </div>
                <div class="col-4 d-flex">
                  <div class="align-self-center w-100 text-left">
                    <!-- <span class="text-light">
                        {{ this.$auth.user }}
                    </span> -->

                    <button @click="refreshAuth()">asdasd</button>
                  </div>
                </div>
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
    refreshAuth(){
      this.$auth.refreshTokens().then((x) => {
        console.log(x)
      })
    }
  }
};
</script>

<style lang="scss" scoped>
//
</style>