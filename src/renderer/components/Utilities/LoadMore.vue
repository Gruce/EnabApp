<template>
  <div>
    <nav class="d-flex justify-content-center align-items-center">
      <button v-if="currentPage > 1" @click="paginate(currentPage-1)" class="arrow page-item">
        <i class="fas fa-arrow-right"></i>
      </button>
      <button v-else class="arrow page-item">
        <i class="fas fa-arrow-right"></i>
      </button>

      <ul class="pagination justify-content-center">
        <li v-for="i in pagesCount" :key="i" :class="i == currentPage ? 'disabled activated' : ''" class="page-number">
          <a @click="paginate(i)" class="page-link" href="#" :aria-disabled="i == currentPage ? 'true' : 'false'">
            {{ i }}
          </a>
        </li>
      </ul>

      <input v-if="lastPage > 4" @change="paginate($event.target.value)" class="form-control form-control-sm mr-1 text-center text-light tb-1" style="width: 75px" type="number" :placeholder="lastPage">

      <button v-if="currentPage < lastPage" @click="paginate(currentPage+1)" class="arrow page-item">
        <i class="fas fa-arrow-left"></i>
      </button>
      <button v-else class="arrow page-item">
        <i class="fas fa-arrow-left"></i>
      </button>
    </nav>
  </div>
</template>

<script>
export default {
  props: ["data", "perPage"],
  computed: {
    pagesCount() {
      let pages = Math.ceil(this.data.length / this.perPage);
      pages = Array.from({ length: pages }, (_, i) => i + 1);
      pages = pages.filter((x) => x >= this.currentPage - 1 - 2);
      pages = pages.filter((x) => x <= this.currentPage - 1 + 4);
      return pages;
    },
    lastPage() {
      return Math.ceil(this.data.length / this.perPage);
    },
  },
  data() {
    return {
      currentPage: 1,
      dataPaginated: [],
    };
  },
  beforeMount() {
    this.sendData();
  },
  methods: {
    paginate(page) {
      if (page > this.lastPage || page < 0) {
        this.$toast({
          title: "لايمكن الانتقال الى الصفحة",
          description: "اخر صفحة هي رقم " + this.lastPage,
          status: "error",
          duration: 3000,
        });
        return false;
      }
      this.currentPage = page;
      this.sendData();
    },

    pageIt(array, page_size, page_number) {
      return array.slice(
        (page_number - 1) * page_size,
        page_number * page_size
      );
    },

    sendData() {
      this.dataPaginated = this.pageIt(
        this.data,
        this.perPage,
        this.currentPage
      );
      this.$emit("data", this.dataPaginated);
      this.$emit("page", (this.currentPage - 1) * this.perPage);
    },
  },
  watch: {
    data: {
      handler(val) {
        this.data = val;
        this.sendData();
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.page-item .page-link,
.page-item > span {
  box-shadow: none !important;
  font-size: auto;
}

.arrow {
  margin: 0 25px;
  border-radius: 10rem;
  background: $t-1;
  padding: 5px 10px;
  border: 2px solid $t-3;

  transition: 0.2s ease-out;
  &:hover {
    background: $t-3;
    a {
      color: #fff;
    }
  }
}

.page-number {
  background: $t-1;
  padding: 0px 5px;
  transition: 0.2s ease-out;

  border-top: 2px solid $t-3;
  border-bottom: 2px solid $t-3;

  &:first-child {
    border: 2px solid $t-3;
    border-left: 0px solid $t-3;
    border-top-right-radius: $r-2;
    border-bottom-right-radius: $r-2;
  }

  &:last-child {
    border: 2px solid $t-3;
    border-right: 0px solid $t-3;
    border-top-left-radius: $r-2;
    border-bottom-left-radius: $r-2;
  }

  &:hover {
    background: $t-3;
  }

  a {
    background: #ffffff00;
    border: 1px solid #ffffff00;
    color: #fff;
  }
}
.page-number.disabled {
  background: $t-3 !important;
  border: 1px solid $t-1;
}
// .disabled:hover {
//   cursor: default;
//   a {
//     cursor: default;
//   }
// }
</style>