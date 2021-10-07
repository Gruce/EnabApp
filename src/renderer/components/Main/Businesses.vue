
<template>
  <div class="businesses r-2 b-1 mt-3">
    <!-- مفرد -->
    <div class="horizontal-scrollable">
      <div class="row m-4 p-4 pb-3 t-1 r-2">
        <div class="col-12 px-lg-4 mb-3 text-center">
          <span class="badge fs-3">أعمال بيع التجزئة</span>
        </div>
        <div v-for="business in $auth.user.businesses" :key="business.name" class="col-md-4 px-lg-4">
          <Business :link="'/'+business.name" :name="business.name" :title="business.title" :sub_title="business.subtitle" :icon="business.icon" :all="business.all" :new_service="business.new" />
        </div>
      </div>
    </div>

    <!-- جملة -->
    <div class="horizontal-scrollable">
      <div class="row m-4 p-4 pb-3 t-1 r-2">
        <div class="col-12 px-lg-4 mb-3 text-center">
          <span class="badge fs-3">أعمال بيع الجملة</span>
        </div>
        <!--  -->
      </div>
    </div>

    <!-- الاشتراك -->
    <div class="horizontal-scrollable">
      <div class="row m-4 p-4 pb-3 t-1 r-2">
        <div class="col-12 px-lg-4 mb-3 text-center">
          <span class="badge fs-3">أعمال أخرى</span>
        </div>
        <!--  -->
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.horizontal-scrollable > .row {
  display: block !important;
  overflow-x: auto !important;
  white-space: nowrap !important;
}
.horizontal-scrollable > .row > .col-md-4 {
  display: inline-block !important;
}

.horizontal-scrollable > .row::-webkit-scrollbar {
	width: 10px;
}

/* Track */
.horizontal-scrollable > .row::-webkit-scrollbar-track {
	/* box-shadow: inset 0 0 2px grey;  */
	border-radius: 10px;
}

/* Handle */
.horizontal-scrollable > .row::-webkit-scrollbar-thumb {
	background: #cdd7ec40;
	border-radius: 10px;
}

/* Handle on hover */
.horizontal-scrollable > .row::-webkit-scrollbar-thumb:hover {
	background: #cdd7ec60;
}
</style>