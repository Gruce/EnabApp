<template>
  <div class="d-inline">
    <c-button @click="open" class="r-2 t-1" variant="solid" v-b-tooltip.hover.bottom title="تخفيض">
      <i class="fas fa-percentage"></i>
    </c-button>

    <c-modal size="xl" :is-open="isOpen" :on-close="close" :closeOnOverlayClick="false" is-centered>
      <c-modal-content ref="content">
        <c-modal-header>إعدادت</c-modal-header>
        <c-modal-close-button />
        <c-modal-body py=6>
          <div class="form-group text-right mb-2">
            <label for="onlySearchProducts" class="text-light">
              إظهار المنتجات
            </label>
            <c-switch @change="updateSettings('showProducts')" :isChecked="settings.showProducts" size="md" float="left" />
          </div>
          <div v-if="settings.showProducts" class="form-group text-right mb-2">
            <label for="onlySearchProducts" class="text-light">
              إظهار الفئات
            </label>
            <c-switch @change="updateSettings('showCategories')" :isChecked="settings.showCategories" size="md" float="left" />
          </div>
        </c-modal-body>
      </c-modal-content>
      <c-modal-overlay />
    </c-modal>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions, mapState } from "vuex";

export default {
  computed: {
    ...mapGetters({
      settings: "supermarket/orders/settings",
    }),
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    updateSettings(attr){
        let _settings = {...this.settings}
        _settings[attr] = !_settings[attr]
        this.changeSettings(_settings)
    },
    open() {
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
    },
    ...mapActions({
      changeSettings: "supermarket/orders/changeSettings",
    }),
  },
};
</script>

<style lang="scss" scoped>
</style>