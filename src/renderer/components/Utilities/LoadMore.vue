<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item arrow" :class="currentPage <= 1 ? 'disabled' : ''">
          <a @click="paginate(currentPage-1)" class="page-link" href="#" tabindex="-1" :aria-disabled="currentPage <= 1 ? 'true' : 'false'">
            <i class="fas fa-arrow-right"></i>
          </a>
        </li>

        <li v-for="i in pagesCount" :key="i" :class="i == currentPage ? 'disabled activated' : ''" class="page-item">
          <a @click="paginate(i)" class="page-link" href="#" :aria-disabled="i == currentPage ? 'true' : 'false'">
            {{ i }}
          </a>
        </li>

        <li class="page-item arrow" :class="currentPage >= lastPage ? 'disabled' : ''">
          <a @click="paginate(currentPage+1)" class="page-link" href="#" :aria-disabled="currentPage >= data.length ? 'true' : 'false'">
            <i class="fas fa-arrow-left"></i>
          </a>
        </li>

      </ul>
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
    },
  },
  watch: {
    data: {
      handler(val) {
        this.data = val
        this.sendData()
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  background: $t-1;
  border-radius: $r-2;
  padding: 10px;

  .arrow {
    a {
      background: $tb-2;
      border-radius: $r-2;
      transition: 0.15s ease-out;
      color: #fff !important;

      &:hover {
        background: $tb-3;
      }
    }
  }
  .arrow.disabled {
    a {
      background: $tb-3;
    }
  }
}
.page-item {
  a {
    background: #ffffff00;
    border: 0;
    color: #fff;
  }
  &:first-child {
    margin-left: 35px;
  }
  &:last-child {
    margin-right: 35px;
  }
}

.page-item.activated {
  a {
    border-radius: $r-2;
    background: $t-2 !important;
    color: black;
  }
}

.page-item .page-link,
.page-item > span {
  box-shadow: none !important;
}
</style>