<template>
  <div class="mt-3">
    <div class="r-2 border-0 shadow-none">
      <div class="row">
        <div class="col-9 d-flex">
          <h1 class="text-light">الطابعات</h1>
        </div>
      </div>

      <div class="row d-flex justify-content-center align-items-center">
        <div class="col-6">
          <b-dropdown
            id="dropdown-offset"
            text="قائمة الطابعات"
            block
            toggle-class="t-1 border-0 text-right"
            class="m-2"
            size="lg"
          >
            <b-dropdown-item
              href="#"
              v-for="(printer, i) in printers"
              :key="i"
              @click="setDefaultPrinter(printer.name)"
              >
              <span class="badge badge-light text-dark" v-if="printer.name == defaultPrinter">الافتراضي</span>
              {{ printer.name }}
              </b-dropdown-item
            >
          </b-dropdown>
        </div>
        <div class="col-6">
            <!-- Default -->
            <h6 class="text-light text-left">
                <div>
                    <span v-if="defaultPrinter == ''">لايوجد طابعة افتراضية</span>
                    <span v-else> {{ defaultPrinter }} </span>
                    <i class="fas fa-print"></i>
                </div>
            </h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  computed: {
    printers() {
      return this.$store.state.supermarket.utilities.printers;
    },
    defaultPrinter() {
      return this.$store.state.supermarket.utilities.defaultPrinter;
    },
  },
  created() {
    this.fetchPrinters();
    this.getDefaultPrinter();
  },
  methods: {
    ...mapActions({
      fetchPrinters: "supermarket/utilities/fetchPrinters",
      getDefaultPrinter: "supermarket/utilities/getDefaultPrinter",
      setDefaultPrinter: "supermarket/utilities/setDefaultPrinter",
    }),
  },
};
</script>

<style lang="scss" scoped>
//
</style>