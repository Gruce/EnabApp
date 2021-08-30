<template>
    <!-- eslint-disable -->
    <div class="container-fluid">
        <div class="row main-height">
            <div class="col-4">
                <div class="show-scroll p-2">
                    <div class="h-items-height">
                        <h1 class="text-right text-light">إعدادات</h1>
                        <br />
                        <div class="nav flex-column nav-pills nav-customized" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            <button :class="getOpen('personal_information')" @click="open='personal_information'" class="btn btn-secondary btn-icon btn-block py-3 r-2">
                                <span class="btn-inner--text fs-5">المعلومات الشخصية</span>
                            </button>
                            <button :class="getOpen('printers')" @click="open='printers'" class="btn btn-secondary btn-icon btn-block py-3 r-2">
                                <span class="btn-inner--text fs-5">إعدادات الطابعة</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-8 b-1 r-1 show-scroll">
                <div class="card-fluid p-5 h-items-height">
                    <div class="text-right">
                        <div v-if="open=='personal_information'">
                            Peronsal Information
                        </div>
                        <div v-if="open=='printers'">
                            <SupermarketSettingsPrinters />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  layout: 'supermarket',
  head: {
    title: 'Settings',
  },
  mounted() {
    return {
    
    }
  },
  created() { },
  data() {
    return {
        open: "personal_information"
    }
  },
  methods:{
    ...mapActions({}),
    getOpen: function(opened){
        return this.open == opened ? 'active' : ''
    }
  }
}
</script>

<style lang="scss" scoped>
    .btn-secondary:not(:disabled):not(.disabled):active, .btn-secondary:not(:disabled):not(.disabled).active, .show > .btn-secondary.dropdown-toggle {
        background-color: #d3e7ff82 !important;
    }
    .btn-feature:not(:disabled):not(.disabled):active, .btn-feature:not(:disabled):not(.disabled).active, .show > .btn-feature.dropdown-toggle {
        background-color: #1100ff9b !important;
    }
    .btn {
        background-color: #ddeaff1c !important;
        border-radius: 0;
        border: 0;
    }
    .btn-secondary{
        transition: .2s;
    }
    .btn-secondary:hover {
        background-color: #fcfcfc45 !important;
    }
    .btn-feature{
        background-color: #1300ff4a !important;
        color: white;
    }
    .btn-feature:hover {
        background-color: #1300ff82 !important;
    }
    .nav-pills .nav-link, .nav-pills > .nav-link {
        color: #ffffff;
    }
</style>