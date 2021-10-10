<template>
  <div>

    <div v-if="loading" class="text-center mt-3">
      <UtilitiesLoading size="4" />
    </div>
    <div v-else>
      <b-carousel id="carousel-fade" style="text-shadow: 0px 0px 2px #000" class="mb-3" fade indicators img-width="1024" img-height="480">
        <a v-for="ad in ads" :key="ad.id" :href="ad.url" target="_blank">
          <b-carousel-slide :img-src="ad.image"></b-carousel-slide>
        </a>
      </b-carousel>
    </div>

  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions, mapState } from "vuex";

export default {
  computed: {
    ...mapGetters({
      ads: "supermarket/utilities/ads",
    }),
  },
  async created() {
    await this.fetchAds(this.$auth.user.supermarket.id);
    this.loading = false
  },
  data() {
    return {
      loading: true,
    };
  },
  methods: {
    ...mapActions({
      fetchAds: "supermarket/utilities/fetchAds",
    }),
  },
};
</script>

<style lang="scss" scoped>
</style>