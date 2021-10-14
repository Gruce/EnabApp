<template>
  <div>
    <div class="table-responsive" v-if="data">
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
              <slot name="control" />

              <!-- Controllable Buttons -->
              <div class="d-inline-block" v-if="x.id">
                <c-button v-if="properties.watch" size="sm" @click="$emit('watch', x.id)" variant="ghost">
                  <i class="fas fa-eye text-dark"></i>
                </c-button>

                <c-button v-if="properties.edit" variant-color="blue" size="sm" @click="$emit('edit', x.id)" variant="ghost">
                  <i class="fas fa-pen"></i>
                </c-button>

                <c-button v-if="properties.remove" variant-color="red" size="sm" @click="$emit('remove', x.id)" variant="ghost">
                  <i class="fas fa-times"></i>
                </c-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <UtilitiesLoadMore @page="paginatedCounter = $event" @data="paginatedData = $event" :data="data" perPage="10" />

    </div>
    <div v-else>
      <c-alert class="bg-none b-1 r-2" variant="subtle" flexDirection="column" justifyContent="center" textAlign="center" height="200px">
        <c-alert-icon color="gray.250" name="warning" size="40px" :mr="0" />
        <c-alert-title :mt="4" :mb="1" fontSize="xl" v-if="properties.noData.message">{{properties.noData.message}}</c-alert-title>
        <c-alert-title :mt="4" :mb="1" fontSize="xl" v-else>لايوجد بيانات</c-alert-title>
        <c-alert-description maxWidth="sm">
          <span v-if="properties.noData.tip">{{properties.noData.tip}}</span>
          <span v-else></span>
          <nuxt-link v-if="properties.noData.link" to="/supermarket/new-order" class="fw-bold text-light"> نافذة الطلبات </nuxt-link>
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
  },
  data() {
    return {
      // Pagination
      paginatedData: [],
      paginatedCounter: 0,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>