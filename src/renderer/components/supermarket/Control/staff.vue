<template>
  <div class="mt-3">
    <div class="r-2 border-0 shadow-none">
      <div class="row">
        <div class="col-xl-12 col-md-12 d-flex align-items-center">
          <c-heading as="h1" fontSize="4xl" ml="4" color="white">طاقم العمل</c-heading>
          <!-- <span v-if="staff">(الإجمالي<span class="badge t-1 mx-1">{{ staff.length }}</span>)</span> -->


          <c-button v-if="$nuxt.isOnline" px="6" height="100%" class="t-1 b-1 r-2 text-light me-auto" variant="ghost" @click="show = !show,editState=false,thisData = {}">
            إضافة موظف
          </c-button>
        </div>
        <div class="col-xl-12 col-md-12">
          <c-input-group mt=1>
            <c-input-left-element>
              <i class="fas fa-search"></i>
            </c-input-left-element>
            <c-input py=5 v-model="search" type="text" placeholder="بحث" />
          </c-input-group>
        </div>
      </div>

      <div class="mt-3">
        <!-- ADD / EDIT -->
        <c-collapse :is-open="show">
          <h3 class="text-center text-light tb-2 r-2 p-3 my-2" v-if="$nuxt.isOffline && !editState">لايوجد اتصال بالانترنت</h3>
          <c-box class="t-1 r-2 b-1" p="6" v-else>
            <form @submit.prevent="submit">

              <c-grid templateColumns="repeat(4, 1fr)" gap=4>
                <c-grid-item col-span=2>
                  <c-form-control is-required>
                    <c-form-label for="name">أسم الموظف</c-form-label>
                    <c-input size="lg" v-model="thisData.name" id="name" placeholder="أسم الموظف" />
                  </c-form-control>
                </c-grid-item>
                <c-grid-item col-span=2>
                  <c-form-control is-required>
                    <c-form-label for="email-alerts">لديه وصول الى النظام؟</c-form-label>
                    <div class="btn-group w-100" role="group" aria-label="Basic radio toggle button group" dir="ltr">
                      <input v-model="thisData.state" type="radio" class="btn-check" value="false" id="btnradio2" autocomplete="off">
                      <label class="btn btn-lg btn-outline-light r-2 mx-1 text-dark" for="btnradio2">كلا</label>

                      <input v-model="thisData.state" type="radio" class="btn-check" value="true" id="btnradio1" autocomplete="off">
                      <label class="btn btn-lg btn-outline-light r-2 mx-1 text-dark" for="btnradio1">نعم</label>
                    </div>
                  </c-form-control>
                </c-grid-item>
                <c-grid-item col-span=2>
                  <c-form-control is-required>
                    <c-form-label for="email">البريد الالكتروني</c-form-label>
                    <c-input size="lg" type="email" v-model="thisData.email" id="email" placeholder="البريد الالكتروني" />
                  </c-form-control>
                </c-grid-item>
                <c-grid-item col-span=2>
                  <c-form-control is-required>
                    <c-form-label for="phone_number">رقم الهاتف</c-form-label>
                    <c-input size="lg" v-model="thisData.phone_number" id="phone_number" placeholder="رقم الهاتف" />
                  </c-form-control>
                </c-grid-item>
                <c-grid-item col-span=4>
                  <c-form-control is-required>
                    <c-form-label for="location">العنوان</c-form-label>
                    <c-input size="lg" v-model="thisData.location" id="location" placeholder="العنوان" />
                  </c-form-control>
                </c-grid-item>
              </c-grid>

              <c-button mt="4" :isLoading="loading" type="submit" class="t-1 r-2" size="lg" border="2px" border-color="primary.1">
                <span v-if="editState">تعديل</span>
                <span v-else>إضافة</span>
              </c-button>
            </form>
            <small>* تكلفة الإضافة 1,000 نقطة</small>
            <small class="d-block">* سيتم إرسال بريد الكتروني يحتوي على كلمة المرور</small>
          </c-box>
        </c-collapse>

        <div class="table-responsive" v-if="staffs.length > 0">
          <table class="table table-cards text-right">
            <thead>
              <tr class="text-light">
                <th scope="col">#</th>
                <th scope="col">الاسم</th>
                <th scope="col">البريد الالكتروني</th>
                <th scope="col">رقم الهاتف</th>
                <th scope="col">الصنف</th>
                <th scope="col">الحالة</th>
                <th scope="col">التحكم</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(staff, i) in paginatedData" :key="staff.id" class="table-divider">
                <td class="align-middle" scope="row">{{ i + 1 }}</td>
                <td class="align-middle">{{ staff.name }}</td>
                <td class="align-middle">{{ staff.email }}</td>
                <td class="align-middle">{{ staff.phone_number }}</td>
                <td class="align-middle">{{ staff.pivot.user_type }}</td>
                <td class="align-middle">{{ staff.state ? 'مفعل' : 'غير مفعل' }}</td>
                <td class="align-middle">
                  <c-button v-if="staff.id !== 0" variant-color="blue" size="xs" @click="thisData = getStaff(staff.id), editState = true, show = true" variant="ghost">
                    <i class="fas fa-pen"></i>
                  </c-button>
                  <c-button v-if="staff.id !== 0" variant-color="red" size="xs" @click="removeStaff(staff.id)" variant="ghost">
                    <i class="fas fa-times"></i>
                  </c-button>
                </td>
              </tr>
            </tbody>
          </table>
          <UtilitiesLoadMore @page="paginatedCounter = $event" @data="paginatedData = $event" :data="staffs" perPage="10" />
        </div>
        <div v-else>
          <c-alert class="bg-none b-1 r-2 mt-3" variant="subtle" flexDirection="column" justifyContent="center" textAlign="center" height="200px">
            <c-alert-icon color="gray.250" name="warning" size="40px" :mr="0" />
            <c-alert-title :mt="4" :mb="1" fontSize="xl">
              لايوجد زبائن
            </c-alert-title>
            <c-alert-description maxWidth="sm">
              يمكن إضافة زبائن من خلال (إضافة زبون)
            </c-alert-description>
          </c-alert>
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
        getStaff: "business/staff/staff",
    }),

    staffs(){
      return this.$store.getters['business/staff/staffs']
    }
  },
  data() {
    return {
      show: false,
      search: "",
      thisData: {
        state: true,
      },
      editState: "",
      loading: false,

      // Pagination
      paginatedData: [],
      paginatedCounter: 0
    };
  },
  created() {
    this.fetchStaffs();
  },
  methods: {
    async submit() {
      if (this.editState) {
        this.loading = true;
        await this.$store.dispatch(
          "business/staff/editstaff",
          this.thisData
        );
        this.loading = false;
        this.show = false;
      } else {
        this.loading = true;
        let statue = await this.$store.dispatch(
          "business/staff/addStaff",
          this.thisData
        );
        if (statue)
          this.thisData = { state: true };
        this.loading = false;
      }
    },
    ...mapActions({
        removeStaff: "business/staff/removeStaff",
        fetchStaffs: "business/staff/fetchStaffs",
    }),
  },
  watch: {
    ...mapActions({
        search: "business/staff/search",
    }),
  },
};
</script>

<style lang="scss" scoped>
//
</style>