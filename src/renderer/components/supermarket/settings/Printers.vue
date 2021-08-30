<template>
  <div class="mt-3">
    <div class="r-2 border-0 shadow-none">
      <div class="row d-flex justify-content-center align-items-center">
        <div class="col-9 d-flex">
          <h1 class="text-light">الطابعات</h1>
        </div>
        <div class="col-3">
          <div class="form-group text-left mb-2">
            <div class="form-check form-switch">
              <label for="onlySearchProducts" class="form-check-label text-light">
                <small>تفعيل الطباعة</small>
              </label>
              <input :value="printState" :checked="printState" @change="setPrintState()" type="checkbox" class="form-check-input mr-2" />
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="row d-flex justify-content-center align-items-center">
        <div class="col-6">
          <b-dropdown id="dropdown-offset" text="قائمة الطابعات" block toggle-class="t-1 border-0 text-right" class="m-2" size="lg">
            <b-dropdown-item href="#" v-for="(printer, i) in printers" :key="i" @click="setDefaultPrinter(printer.name)">
              <span class="badge badge-light text-dark" v-if="printer.name == defaultPrinter">الافتراضي</span>
              {{ printer.name }}
            </b-dropdown-item>
          </b-dropdown>
        </div>
        <div class="col-6">
          <h6 class="text-light text-left">
            <div>
              <span v-if="defaultPrinter == ''">لايوجد طابعة افتراضية</span>
              <span v-else> {{ defaultPrinter }} </span>
              <i class="fas fa-print"></i>
            </div>
          </h6>
        </div>
      </div>

      <br /> -->

      <div class="row mt-4">
        <div class="col-6" v-for="(printer, i) in printers" :key="i" @click="setDefaultPrinter(printer.name)">
          <div class="card p-3 r-2 pointer hover-shadow-lg hover-translate-y-n3" :class="printer.name == defaultPrinter ? 'tb-2' : 't-1'">
            <div class="card-body text-center h-100">
              <h5 class="mb-0 text-light">{{ printer.name }}</h5>
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
  computed: {
    printers() {
      return this.$store.state.supermarket.utilities.printers;
    },
    defaultPrinter() {
      return this.$store.state.supermarket.utilities.defaultPrinter;
    },
    printState() {
      return this.$store.state.supermarket.utilities.printState;
    },
  },
  created() {
    this.fetchPrinters();
    this.getDefaultPrinter();
    this.getPrintState();
  },
  methods: {
    ...mapActions({
      fetchPrinters: "supermarket/utilities/fetchPrinters",
      getDefaultPrinter: "supermarket/utilities/getDefaultPrinter",
      setDefaultPrinter: "supermarket/utilities/setDefaultPrinter",
      getPrintState: "supermarket/utilities/getPrintState",
      setPrintState: "supermarket/utilities/setPrintState",
      setDefaultPrinter: "supermarket/utilities/setDefaultPrinter",
    }),
  },
};
</script>
