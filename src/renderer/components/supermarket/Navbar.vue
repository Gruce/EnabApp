<template>
    <div>
        <div class="position-absolute" style="top: 0px; left: 0%; width: 100%;z-index:1">
            <div class="tb-2 p-2">
                <div class="row">
                    <div class="col-6">
                        <ul class="nav nav-pills mr-5">
                            <li class="nav-item">
                                <nuxt-link to="/supermarket" :class="{ 'active' : $nuxt.$route.path === '/supermarket'}" class="nav-link py-1 px-3">
                                    <i class="fas fa-home"></i>
                                </nuxt-link>
                            </li>
                            <li class="nav-item">
                                <nuxt-link to="/supermarket/new-order" :class="{ 'active' : $nuxt.$route.path === '/supermarket/new-order'}" class="nav-link py-1 px-3">
                                    <i class="fas fa-cash-register"></i>
                                </nuxt-link>
                            </li>
                            <li class="nav-item">
                                <nuxt-link to="/supermarket/control" :class="{ 'active' : $nuxt.$route.path === '/supermarket/control'}" class="nav-link py-1 px-3">
                                    <i class="fas fa-list-ul"></i>
                                </nuxt-link>
                            </li>
                            <li class="nav-item">
                                <nuxt-link to="/supermarket/analytics" :class="{ 'active' : $nuxt.$route.path === '/supermarket/analytics'}" class="nav-link py-1 px-3">
                                    <i class="fas fa-chart-pie"></i>
                                </nuxt-link>
                            </li>
                            <li class="nav-item">
                                <nuxt-link to="/supermarket/services" :class="{ 'active' : $nuxt.$route.path === '/supermarket/services'}" class="nav-link py-1 px-3">
                                    <i class="fas fa-cubes"></i>
                                </nuxt-link>
                            </li>
                            <!-- <li class="nav-item">
                                <a href="https://pos.itourstory.com/supermarket/analysis" class="nav-link  py-1 px-3">
                                    <i class="fas fa-chart-pie"></i>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="https://pos.itourstory.com/supermarket/setting" class="nav-link  py-1 px-3">
                                    <i class="fas fa-cog"></i>
                                </a>
                            </li> -->
                        </ul>
                    </div>
                    <div class="col-6">
                        <div dir="ltr" class="text-white ml-5 d-flex align-items-center">
                            <div dir="rtl" class="d-flex">
                                <!-- <div class="mr-3">
                                    <small></small>
                                </div> -->
                                <div class="mr-1">
                                    <SupermarketServicesEarthlinkUsers service_id="2" />
                                </div>
                                <div class="mr-1">
                                    <div class="badge tb-1 py-2 px-3">{{ datetime }}</div>
                                </div>
                                <div v-if="!updateProgress.percent" class="mr-1">
                                    <div class="badge tb-1 py-2 px-3">الإصدار {{ version }}</div>
                                </div>

                                <div class="mr-1">
                                    <div v-if="updateProgress.percent && updateProgress.percent !== 100" class="badge badge-info py-2 px-3">جاري التحديث</div>
                                    <div v-if="updateProgress.percent == 100" class="badge badge-success py-2 px-3">تم التحديث</div>
                                </div>

                                <div class="mr-1">
                                    <div @click="toggleMenu" class="badge tb-2 py-2 px-3 pointer">
                                        {{ $auth.user.name }}
                                    </div>
                                </div>

                                <div class="mr-1">
                                    <small v-if="$nuxt.isOnline" class="badge badge-success text-light p-2 px-3">متصل</small>
                                    <small v-else class="badge badge-danger text-light p-2 px-3">غير متصل</small>
                                </div>
                                
                                
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
    const { remote } = require("electron");

    export default {
        computed: {
            updateProgress () {
                return this.$store.state.update.progress;
            },
        },
        async mounted() {
            try {
                this.version = await this.$version()
            } catch (e) {
                console.log(e)
            }
        },
        data() {
            return {
                datetime: "",
                version: "",
            }
        },
        created() {
            setInterval(this.getNow, 1000);
        },
        methods: {
            ...mapMutations({
                toggleMenu: 'supermarket/toggleMenu',
            }),
            close(){
                remote.app.exit();
            },
            getNow: function() {
                const today = new Date();
                const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                const dateTime = date +' '+ time;
                this.datetime = dateTime;
            },
            async logout() {
                await this.$auth.logout();
            },
            async sync(){
                // await this.$dialog.confirm('هل انت متأكد تريد إعادة البيانات؟').then(() => {
                //     // Sycning products & categories
                //     this.$axios
                //     .get('/api/supermarket/productsCategories', { withCredentials: true })
                //     .then((response) => {
                //         response.data.categories.unshift({id: 0, name: "جميع الفئات"})
                //         this.$auth.$storage.setLocalStorage('products', response.data.products)
                //         this.$auth.$storage.setLocalStorage('categories', response.data.categories)
                //     })
                // })
                // this.$dialog.alert("تمت المزامنة بنجاح!")
            }
        }
    }
</script>

<style lang="scss" scoped>
    .nav-pills .nav-link.active, .nav-pills .show > .nav-link {
        background-color: $tb-1;
        border-radius: 0.2rem;
        color: #ffffff;
    }

    .nav-pills .nav-link, .nav-pills > .nav-link {
        color: #ffffff;
    }

    .signout-icon{
        transform: scale(-1);
    }

    .pointer:hover{
        cursor: pointer;
    }
</style>