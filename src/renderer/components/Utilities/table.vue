<template>
  <div>
    <div class="table-responsive" v-if="data.length > 0">
      <c-input-group v-if="properties.search" mt=1>
        <c-input-left-element>
          <i class="fas fa-search"></i>
        </c-input-left-element>
        <c-input py=5 v-model="searchInput" type="text" placeholder="بحث" />
      </c-input-group>
      <table class="table table-cards text-right">
        <thead>
          <tr class="text-light">
            <th scope="col">#</th>
            <th v-for="item in properties.head" :key="item.title" scope="col">{{item.title}}</th>
            <th scope="col">التحكم</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(x, i) in paginatedData" :key="x.id" class="table-divider">
            <!-- Default Counting Column -->
            <td class="align-middle" scope="row">{{ paginatedCounter + i + 1 }}</td>

            <!-- Body Data -->
            <td class="align-middle" v-for="item in columns" :key="item.title + x.id">
              <span v-if="$_.get(x, item.column)">{{ $_.get(x, item.column) }}</span>
              <span v-else>لايوجد</span>
            </td>

            <!-- Control Column -->
            <td class="align-middle">
              <!-- Custom Control -->
              <!-- <slot name="control" /> -->

              <!-- Controllable Buttons -->
              <div class="d-inline-block" v-if="x.id">
                <div v-for="control in properties.control" :key="control.name" class="d-inline-block">
                  <c-button v-if="$_.get(x, control.column ? control.column : 'id')" size="sm" @click="$emit(control.name, $_.get(x, control.column ? control.column : 'id'))" variant="ghost">
                    <i class="fas" :class="[control.icon, 'text-'+(control.variant ? control.variant : 'dark')]"></i>
                  </c-button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <UtilitiesLoadMore @page="paginatedCounter = $event" @data="paginatedData = $event" :data="datas" perPage="10" />

    </div>
    <div v-else>
      <c-alert class="bg-none b-1 r-2" variant="subtle" flexDirection="column" justifyContent="center" textAlign="center" height="200px">
        <c-alert-icon color="gray.250" name="warning" size="40px" :mr="0" />
        <c-alert-title :mt="4" :mb="1" fontSize="xl" v-if="properties.noData.message">{{properties.noData.message}}</c-alert-title>
        <c-alert-title :mt="4" :mb="1" fontSize="xl" v-else>لايوجد بيانات</c-alert-title>
        <c-alert-description maxWidth="sm">
          <span v-if="properties.noData.tip">
            <nuxt-link v-if="properties.noData.link" :to="properties.noData.link" class="fw-bold text-light">
              {{properties.noData.tip}}
            </nuxt-link>
            <span v-else>{{properties.noData.tip}}</span>
          </span>
          <span v-else></span>
        </c-alert-description>
      </c-alert>
    </div>
  </div>
</template>

<script>
export default {
  props: ["properties", "data"],
  computed: {
    columns() {
      return this.properties.head.filter((x) => x.column);
    },
    datas() {
      let datas = this.data;
      if (this.searchInput !== "") {
        datas = datas.filter((x) => {
          let t = this.$_.get(x, this.properties.search);
          return this.$_.includes((t + ''), this.searchInput);
        });
      }
      return datas;
    },
  },
  data() {
    return {
      // Pagination
      paginatedData: [],
      paginatedCounter: 0,
      searchInput: "",
    };
  },
};
</script>

<style lang="scss" scoped>
</style>