<template>
  <div class="mt-3">
    <div class="r-2 border-0 shadow-none">
      <div class="row d-flex justify-content-center align-items-center">
        <div class="col-6 d-flex">
          <c-heading as="h1" fontSize="4xl" ml="4" color="white">
            الطابعات
          </c-heading>
        </div>
        <div class="col-6">
          <div class="form-group text-left mb-2">
              <label for="onlySearchProducts" class="text-light">
                <small>تفعيل الطباعة</small>
              </label>
              <c-switch :isChecked="printState" @change="setPrintState()" mt=3 mr=3 size="md" />
          </div>
        </div>
      </div>

      <br />

      <div class="row mt-4">
        <div class="col-6" v-for="(printer, i) in printers" :key="i" @click="setDefaultPrinter(printer.name)">
          <div class="m-1 p-3 r-2 pointer hover-translate-y-n3" :class="printer.name == defaultPrinter ? 'tb-2' : 'bg-none b-1'">
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
