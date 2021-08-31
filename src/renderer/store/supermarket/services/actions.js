export default {
    async syncLocalStorage({state}, dispatch){
        this.$auth.$storage.setLocalStorage('services', state.services)
    },
    
    async fetchServices({commit, state}){
        // let services = this.$auth.$storage.getLocalStorage('services')
        let services

        //############### Fetch from API ###########
        this.$axios.get(
            '/api/supermarket/services', { withCredentials: true }
        ).then((response) => {
            services = response.data
            commit('set_all', services)
            this.$auth.$storage.setLocalStorage('services', services)
        })

        commit('set_all', services)
    },

    async toggleService({state, commit, dispatch}, id){
        // let service = state.services.find(x => x.id == id)

        //############### Send to API ###########
        this.$axios.post(
            '/api/supermarket/services/activate', {service_id: id}, { withCredentials: true }
        ).then(async () => {
            await commit('toggle', id)
            this.$toast.success("تم تعديل الخدمة !")
            dispatch('syncLocalStorage')
        }).catch((error) => {
            console.log(error)
        })
        
    },

    async serviceState({state, commit}, id){
        let service = state.services.find(x => x.id == id)
        return (service.state && service.owned)
    },

    async buyService({state, commit, dispatch}, id){
        let service = state.services.find(x => x.id == id)
        if (this.$auth.user.points < service.points){
            this.$toast.error("الرصيد غير كافي")
        } else {
            this._vm.$dialog.confirm('هل انت متأكد؟').then(() => {
                this.$axios.post(
                    '/api/supermarket/services/purchase', {service_id: id}, { withCredentials: true }
                ).then((response) => {
                    dispatch('fetchServices')
                    this.$auth.fetchUser()
                    this.$toast.success("تم شراء الخدمة !")
                }).catch((error) => {
                    this.$toast.error("الرصيد غير كافي")
                })
            })
        }
    }

}