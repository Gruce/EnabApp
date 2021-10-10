<template>
  <div>
    <div class="row mx-0 mb-2">
      <div class="col-6 p-0">
        <div class="text-light">
          <div class="display-4">
            {{ time }}
          </div>
          <span>
            {{ date }}
          </span>
        </div>
      </div>
      <div class="col-6 p-0">
        <div class="text-light text-left">
          <a @click="backgroundColor == '#070d1d' ? setColor('#4776E6') : setColor('#070d1d')" href="#" class="display-5 text-light">
            <i v-if="day" class="fas fa-sun"></i>
            <i v-else class="fas fa-moon"></i>
          </a>
        </div>
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
  async mounted() {
    // Check PM or AM
    if (this.$moment().format("A") == "مساءاً") this.day = false;

    setInterval(this.updateClock, 1000);
  },
  created() {
    this.updateClock();
    this.$moment.updateLocale("en", {
      monthsShort: [
        "يناير",
        "فبراير",
        "مارس",
        "أبريل",
        "مايو",
        "يونيو",
        "يوليو",
        "أغسطس",
        "سبتمبر",
        "أكتوبر",
        "نوفمبر",
        "ديسمبر",
      ],
      weekdaysShort: [
        "الأحد",
        "الأثنين",
        "الثلاثاء",
        "الأربعاء",
        "الخميس",
        "الجمعة",
        "السبت",
      ],
      meridiem: function (hour, minute, isLowercase) {
        if (hour < 7) {
          return "فجراً";
        } else if (hour < 11 && minute < 30) {
          return "صباحاً";
        } else if (hour < 15 && minute < 30) {
          return "ظهراً";
        } else if (hour < 18) {
          return "عصراً";
        } else {
          return "مساءاً";
        }
      },
    });
  },

  data() {
    return {
      time: "00:00",
      date: "",
      day: true,
    };
  },
  methods: {
    updateClock() {
      this.time = this.$moment().format("LT");
      this.date = this.$moment().format("ddd، D MMM، YYYY");
    },
    ...mapActions({
      setColor: "supermarket/utilities/setColor",
    }),
  },
};
</script>

<style lang="scss" scoped>
</style>