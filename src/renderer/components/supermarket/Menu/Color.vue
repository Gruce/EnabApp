<template>
  <div>
    <div class="content">
      <div class="d-flex flex-column justify-content-center align-items-center text-center py-2" style="margin: 6px">
        <v-swatches v-model="color" :swatches="swatches" popover-x="left"></v-swatches>
        <h6 class="text-light mt-3">تغيير اللون</h6>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions, mapState } from "vuex";

export default {
  computed: {
    ...mapGetters({
      backgroundColor: "supermarket/utilities/backgroundColor",
    }),
  },
  created() {
    this.color = this.backgroundColor
  },
  data() {
    return {
      color: "#4776E6",
      swatches: [
        "#4776E6", //Primary Color
        "#070d1d", //Secondary Color
        "#04898b", // تركوازي
        "#362222", //بني
        "#046582", // مائي
        "#6C5B7B", // بنفسجي فاتح
      ],
    };
  },
  methods: {
    ...mapActions({
      getColor: "supermarket/utilities/getColor",
      setColor: "supermarket/utilities/setColor",
    }),
  },
  watch: {
    color(color) {
      this.setColor(color);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>