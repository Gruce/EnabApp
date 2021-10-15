<template>
  <div>
    <div class="row d-flex align-content-stretch flex-wrap components-height m-0 content">
      <div class="col-12">
        <div class="row mt-3">
          <div class="col-6">
            <span class="fs-3">
              قائمة التحديثات للإصدار <span class="badge">({{version}})</span>
            </span>
          </div>
          <div class="col-6 text-left">
            <c-button @click="$emit('toggle')" class="content text-light px-4" variant="ghost">
              رجوع
            </c-button>
          </div>
        </div>
        <hr class="my-3" />
        <div class="row mb-3">
          <div class="col-12">
            <div v-if="loading">
              <UtilitiesLoading />
            </div>
            <div v-else>
              <ul class="list-group r-2" v-if="list.length > 0">
                <li v-for="item in list" :key="item" class="list-group-item fs-4 text-light b-1">{{ item }}</li>
              </ul>
              <div v-else class="text-center b-1 r-2 p-3 content">
                <span class="fs-4 text-light">لايوجد معلومات</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions, mapState } from "vuex";
const { remote, ipcRenderer } = require("electron");
export default {
  async mounted() {
    try {
      this.loading = true
      this.version = await this.$version();

      await this.$axios
        .get("/api/release/notes?version=" + "1.6.0", {
          withCredentials: true,
        })
        .then((response) => {
          this.list = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
        this.loading = false
    } catch (e) {
      console.log(e);
    }
  },
  data() {
    return {
      version: "",
      list: [],
      loading: true
    };
  },
};
</script>

<style lang="scss" scoped>
</style>