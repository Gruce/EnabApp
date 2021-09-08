export default {
    async syncLocalStorage({ state }, dispatch) {
        this.$auth.$storage.setLocalStorage('requests', state.requests)
    },

    async fetchRequests({ commit, state }, force = false) {
        let requests = this.$auth.$storage.getLocalStorage('requests')

        //############### Fetch from API ###########
        if (requests === null || force) // If not set on the storage Or forced
            await this.$axios.get(
                '/api/recharge/', { withCredentials: true }
            ).then((response) => {
                requests = response.data
                commit('set_all', requests)
                this.$auth.fetchUser()
                this.$auth.$storage.setLocalStorage('requests', requests)
            })
        else
            await commit('set_all', requests)
    },

    async request({ state, commit, dispatch }, data) {
        this.$axios.post(
            '/api/recharge/request', data, { withCredentials: true }
        ).then((response) => {
            console.log(response)
            this.$toast.success("تم الارسال")
        }).catch((error) => {
            this.$toast.error("يوجد مشكلة")
        })
    }

}