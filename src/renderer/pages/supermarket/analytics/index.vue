<template>
  <div>
    <div class="container-fluid">
      <div class="row main-height">
        <div class="">
          <div class="show-scroll p-2">
            <div class="h-items-height">
              <h1 class="text-right text-light">احصائية</h1>
              <div class="mt-5">
                <div class="row ">
                  <div class="col-lg-8">
                    <div class="row">
                      <div class="col-4 ">
                        <div class="card t-3 r-2">
                          <div class="card-body">
                            <h5 class="text-light card-title">المبيعات</h5>
                            <div class="mb-3">
                              <div class="icon icon-shape icon-md  text-white">
                                <i class="fas fa-wallet"></i>
                              </div>
                              <h5 class="mb-2">$25,370.00</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-4">
                        <div class="card t-3 r-2">
                          <div class="card-body">
                            <h5 class="text-light card-title">الارباح</h5>

                          </div>
                        </div>
                      </div>
                      <div class="col-4">
                        <div class="card t-3 r-2">
                          <div class="card-body">
                            <h5 class="text-light card-title">الديون</h5>

                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row pt-4">
                      <div class="col-12">
                        <div class="card t-2 r-1">
                          <div class="card-body">
                            <h5 class="text-dark card-title">المنتجات</h5>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <div class="card t-3 r-2 vh-100">
                      <div class="card-body">
                        <h5 class="text-light card-title">الاوقات</h5>
                        <div class="progress-circle progress-lg mx-auto mt-5" id="progress-performance-1" data-progress="72" data-trailwidth="4" data-text="72%" data-textclass="h3" data-shape="circle" data-color="primary" style="position: relative;"><svg viewBox="0 0 100 100" style="display: block;">
                            <path d="M 50,50 m 0,-46.5 a 46.5,46.5 0 1 1 0,93 a 46.5,46.5 0 1 1 0,-93" stroke="#eee" stroke-width="2" fill-opacity="0"></path>
                            <path d="M 50,50 m 0,-46.5 a 46.5,46.5 0 1 1 0,93 a 46.5,46.5 0 1 1 0,-93" stroke="#07294a" stroke-width="4" fill-opacity="0" style="stroke-dasharray: 292.273, 292.273; stroke-dashoffset: 81.8366;"></path>
                          </svg>
                          <div class="h3" style="position: absolute; left: 50%; top: 50%; padding: 0px; margin: 0px; transform: translate(-50%, -50%); color: #eee;">7:00PM</div>
                        </div>
                      </div>
                    </div>
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
import { mapActions } from "vuex";

export default {
  layout: "supermarket",
  head: {
    title: "Analytics",
  },
  methods: {
    ...mapActions({}),
    getOpen: function (opened) {
      return this.open == opened ? "active" : "";
    },
  },
};
</script>

<style lang="scss" scoped>
//
</style>