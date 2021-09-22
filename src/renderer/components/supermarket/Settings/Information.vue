<template>
  <div>
    <c-box>
      <c-heading as="h1" fontSize="4xl" ml="4" mb=6 color="white">
        معلومات السوبرماركت
      </c-heading>

      <form @submit.prevent="submit">

        <c-grid class="t-1 r-2 b-1" p="6" templateColumns="repeat(4, 1fr)" gap=4>
          <c-grid-item col-span=4>
            <c-form-control is-required>
              <c-form-label for="name">الأسم</c-form-label>
              <c-input size="lg" v-model="thisData.name" id="name" :placeholder="thisData.name" />
            </c-form-control>
          </c-grid-item>

          <c-grid-item col-span=2>
            <c-form-control>
              <c-form-label for="location">العنوان</c-form-label>
              <c-input size="lg" v-model="thisData.location" id="location" placeholder="العنوان" />
            </c-form-control>
          </c-grid-item>
          <c-grid-item col-span=1>
            <c-form-control>
              <c-form-label for="instagram">انستكرام</c-form-label>
              <c-input size="lg" v-model="thisData.instagram" id="instagram" placeholder="انستكرام" />
            </c-form-control>
          </c-grid-item>
          <c-grid-item col-span=1>
            <c-form-control is-required>
              <c-form-label for="city">المدينة</c-form-label>
              <v-select v-model="thisData.city" :options="cities"></v-select>
            </c-form-control>
          </c-grid-item>
        </c-grid>

        <c-button mt="4" :isLoading="loading" type="submit" class="t-1 r-2" size="lg" border="2px" border-color="primary.1">
          <span>التعديل</span>
        </c-button>
      </form>
    </c-box>
  </div>
</template>

<script>
export default {
  data() {
    return {
      thisData: {},
      loading: false,
      cities: [
        "بغداد",
        "البصرة",
        "نينوى",
        "أربيل",
        "حلبجة",
        "النجف",
        "ذي قار",
        "كركوك",
        "الأنبار",
        "ديالى",
        "المثنى",
        "القادسية",
        "ميسان",
        "واسط",
        "صلاح الدين",
        "دهوك",
        "السليمانية",
        "بابل",
        "كربلاء",
      ],
    };
  },
  created() {
    let supermarket = this.$auth.user.supermarket;

    this.thisData = {
      name: supermarket.name,
      city: supermarket.city,
      instagram: supermarket.instagram,
      location: supermarket.location,
    };
  },
  methods: {
    async submit() {
      this.loading = true
      await this.$axios
        .post(
          "/api/supermarket/update",
          { ...this.thisData },
          { withCredentials: true, }
        )
        .then(async (response) => {
          this.$toast({
            title: "تم التعديل بنجاح",
            status: "success",
            duration: 3000,
          });
          this.$auth.fetchUser();
        })
        .catch((error) => {
          console.log(error);
        });
      this.loading = false
    },
  },
};
</script>

<style lang="scss" scoped>
</style>