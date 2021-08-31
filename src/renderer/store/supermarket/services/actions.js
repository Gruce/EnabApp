export default {
    async syncLocalStorage({state}, dispatch){
        this.$auth.$storage.setLocalStorage('services', state.services)
    },
    
    async fetchServices({commit, state}){
        let services = this.$auth.$storage.getLocalStorage('services')

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
        let service = state.services.find(x => x.id == id)

        //############### Send to API ###########
        

        await commit('toggle', id)
        this.$toast.success("تم تعديل الخدمة !")
        dispatch('syncLocalStorage')
    },

    async serviceState({state, commit}, id){
        let service = state.services.find(x => x.id == id)
        return (service.state && (service.owned || service.price == 0))
    }


}