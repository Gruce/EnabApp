export default {
    async syncLocalStorage({state}, dispatch){
        this.$auth.$storage.setLocalStorage('services', state.services)
    },
    
    async fetchServices({commit, state}){
        // let services = this.$auth.$storage.getLocalStorage('services')

        //############### Fetch from API ###########
        // this.$axios.get(
        //     '/api/supermarket/orders/last-order', { withCredentials: true }
        // ).then((response) => {
        //     if (response.data.order_number){
        //         commit('lastOrder', response.data)
        //         this.$auth.$storage.setLocalStorage('lastOrder', response.data)
        //     }
        //     else {
        //         commit('lastOrder', {order_number: 0})
        //         this.$auth.$storage.setLocalStorage('lastOrder', {order_number: 0})
        //     }
        // })

        // commit('set_all', services)
    },

    async toggleService({commit, dispatch}, id){
        await commit('toggle', id)
        this.$toast.success("تم تعديل الخدمة !")
        dispatch('syncLocalStorage')
    },

    async serviceState({state, commit}, id){
        let service = state.services.find(x => x.id == id)
        return (service.state && service.owned)
    }


}