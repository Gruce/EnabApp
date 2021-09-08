<template>
  <div class="show-scroll">
    <table class="table table-borderless table-hover text-light mt-4">
      <thead>
        <tr>
          <th class="fs-6" scope="col">#</th>
          <th class="fs-6" scope="col">طريقة الدفع</th>
          <th class="fs-6" scope="col">التاريخ</th>
          <th class="fs-6" scope="col">الحالة</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(request, i) in requests" :key="request.id">
          <th class="fs-6" scope="row">{{ ++i }}</th>
          <td class="fs-6">{{getType(request.type)}}</td>
          <td class="fs-6">{{$moment(request.created_at).format("MMMM Do YYYY, h:mm:ss a")}}</td>
          <td class="fs-6">
            <span v-if="request.state == 1" class="badge fs-6 r-2 px-3 badge-warning">{{getState(request.state)}}</span>
            <span v-if="request.state == 2" class="badge fs-6 r-2 px-3 badge-success">{{getState(request.state)}}</span>
            <span v-if="request.state == 3" class="badge fs-6 r-2 px-3 badge-danger">{{getState(request.state)}}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions, mapState } from "vuex";

export default {
  computed: {
    ...mapGetters({
      requests: "credits/requests",
    }),
  },
  created() {
    this.fetchRequests(true);
  },
  methods: {
    ...mapActions({
      fetchRequests: "credits/fetchRequests",
    }),
    getType(type) {
      switch (type) {
        case 1:
          return "اسياسيل";
        case 2:
          return "زين";
        default:
          return "غير معروف";
      }
    },
    getState(state) {
      switch (state) {
        case 1:
          return "قيد المراجعة";
        case 2:
          return "تم القبول";
        case 3:
          return "تم الرفض";
        default:
          return "غير معروف";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>