<template>
  <div>

    <div class="service mb-3 r-2 hover-shadow-lg hover-translate-y-n3">
      <div class="position-absolute top-0 start-50 translate-middle">
        <span v-if="service.new" class="badge tb-2 text-light">
          🔥 جديد
        </span>
      </div>
      <!-- Card body -->
      <div class="card-body p-4">

        <div class="faq position-relative">
          <a :href="service.faq_url" target="_blank" rel="noopener noreferrer">
            <c-tooltip label="شرح الإستخدام">
              <c-stack is-inline class="position-absolute top-0 start-100 translate-middle">
                <c-badge px=3 py=1 class="r-2 t-2">
                  <i class="fas fa-question"></i>
                </c-badge>
              </c-stack>
            </c-tooltip>
          </a>
        </div>
        <div class="expire position-relative" v-if="service.expiry_date && service.points > 0">
          <div class="text-light position-absolute top-0 start-0 translate-middle">
            <c-tooltip label="تاريخ الإنتهاء">
              <c-stack is-inline>
                <c-badge px=3 py=1 class="r-2 t-2">
                  {{ service.expiry_date }}
                  <i class="fas fa-history mr-2"></i>
                </c-badge>
              </c-stack>
            </c-tooltip>
          </div>
        </div>

        <!-- App logo + status -->
        <div class="row d-flex justify-content-between align-items-center">
          <div class="text-center">
            <span class="img">
              <UtilitiesLoading v-if="loading_state" size=4 />
              <i v-else :class="service.icon" class="fa-3x"></i>
            </span>
          </div>
        </div>

        <!-- App title -->
        <div class="row">
          <div class="col-12">
            <div class="mt-3 text-center">
              <h6 class="mb-0 fw-bold text-light">{{ service.title }}</h6>
              <p class="mb-0 text-sm subtitle">
                {{ service.subtitle }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <div class="row m-0">
          <div class="col-5 statueColumn">
            <div class="text-right d-flex flex-column">
              <button v-if="service.owned" @click="toggleService(service.id), loading_state=true" type="button" class="btn bg-none btn-icon text-dark">
                <div class="text-light">
                  <div v-if="service.state">
                    <span class="btn-inner--icon"><i class="fas fa-thumbs-down mx-1"></i></span>
                    <span class="btn-inner--text ml-1">الغاء التفعيل</span>
                  </div>
                  <div v-else>
                    <span class="btn-inner--icon"><i class="fas fa-thumbs-up mx-1"></i></span>
                    <span class="btn-inner--text ml-1">تفعيل</span>
                  </div>
                </div>
              </button>
              <button @click="buyService(service.id)" v-else type="button" class="btn bg-none btn-icon text-dark">
                <div class="text-light">
                  <span class="btn-inner--icon"><i class="fas fa-credit-card mx-1"></i></span>
                  <span class="btn-inner--text ml-1">
                    شراء
                  </span>
                </div>
              </button>
            </div>
          </div>
          <div class="col-7 d-flex align-items-center text-light">
            <div class="text-center w-100" v-if="service.points == 0">
              مجاناً 🤩
            </div>
            <div class="text-center w-100" v-else>
              <button v-if="service.owned" @click="buyService(service.id)" type="button" class="btn bg-none btn-icon text-dark">
                <div class="text-light">
                  <span class="btn-inner--icon"><i class="fas fa-credit-card mx-1"></i></span>
                  <span class="btn-inner--text ml-1">
                    تمديد ( {{ service.points }} نقطة)
                  </span>
                </div>
              </button>
              <div v-else>
                {{ service.points }} نقطة
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

export default {
  props: ["service"],
  data() {
    return {
      loading_state: false,
    };
  },
  methods: {
    async toggleService(id) {
      this.loading_state = true;
      await this.$store.dispatch("supermarket/services/toggleService", id);
      this.loading_state = false;
    },

    ...mapActions({
      buyService: "supermarket/services/buyService",
    }),
  },
};
</script>

<style lang="scss" scoped>
.service {
  position: relative;
  background: #ffffff00;
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: 0.3s ease-in-out;

  .img {
    i.fas {
      display: inline-block;
      border-radius: 60px;
      box-shadow: 0px 0px 2px rgba(255, 255, 255, 0.3);
      padding: 0.5em 0.6em;
      transition: 0.3s ease-in-out;
      color: #fff;
    }
  }

  .faq {
    a {
      opacity: 0;
      transition: 0.3s ease-in-out;
    }
  }

  .expire {
    div {
      opacity: 0;
      transition: 0.3s ease-in-out;
      margin-left: 30px;
    }
  }

  .subtitle {
    color: #fff;
    opacity: 0;
    transition: 0.3s ease-in-out;
  }

  .card-footer {
    border-top: 1px solid rgba(255, 255, 255, 0.3);
    padding: 0;
    transition: 0.3s ease-in-out;
    border-radius: 0 0 0.5rem 0.5rem;

    .statueColumn {
      border-bottom-right-radius: 0.5rem;
      padding: 0.25rem 0;
      transition: 0.3s ease-in-out;
      // &:hover{
      //     background: $tb-2;
      // }
    }

    &:hover {
      background: rgba(0, 0, 0, 0.2);
    }
  }

  &:hover {
    background: rgba(255, 255, 255, 0.075);
    .img {
      i.fas {
        box-shadow: 0px 0px 2px rgba(255, 255, 255, 0.6);
        background: rgba(0, 0, 0, 0.1);
      }
    }

    .subtitle {
      opacity: 1;
    }

    .faq {
      a {
        opacity: 1;
      }
    }

    .expire {
      div {
        opacity: 1;
      }
    }
  }
}
</style>