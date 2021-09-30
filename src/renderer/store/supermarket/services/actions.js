function isNewerVersion(oldVer, newVer) {
    const oldParts = oldVer.split('.')
    const newParts = newVer.split('.')
    for (var i = 0; i < newParts.length; i++) {
        const a = ~~newParts[i] // parse int
        const b = ~~oldParts[i] // parse int
        if (a >= b) return true
        if (a < b) return false
    }
    return false
}

export default {
    async syncLocalStorage({ state }, dispatch) {
        this.$auth.$storage.setLocalStorage('supermarket.services', state.services)
    },

    async fetchServices({ commit, state, dispatch }, force = false) {
        let services = this.$auth.$storage.getLocalStorage('supermarket.services')

        //############### Fetch from API ###########
        if (services === null || force) // If not set on the storage Or forced
            await this.$axios.get(
                '/api/supermarket/services', { withCredentials: true }
            ).then(async (response) => {
                let version = await this.$version()
                services = response.data.filter(x => isNewerVersion(x.version, version))

                commit('set_all', services)
                this.$auth.$storage.setLocalStorage('supermarket.services', services)
            })
        else
            await commit('set_all', services)
    },

    async toggleService({ state, commit, dispatch }, id) {
        // let service = state.services.find(x => x.id == id)

        //############### Send to API ###########
        this.$axios.post(
            '/api/supermarket/services/activate', { service_id: id }, { withCredentials: true }
        ).then(async () => {
            await commit('toggle', id)
            this.$toast.success("تم تعديل الخدمة !")
            dispatch('syncLocalStorage')
        }).catch((error) => {
            console.log(error)
        })

    },

    serviceState({ state, commit }, id) {
        let service = state.services.find(x => x.id == id)
        if (service)
            return (service.state && service.owned)
        else
            return false
    },

    async buyService({ state, commit, dispatch }, id) {
        let service = state.services.find(x => x.id == id)
        if (this.$auth.user.points < service.points) {
            this.$toast.error("الرصيد غير كافي")
        } else {
            this._vm.$dialog.confirm('هل انت متأكد. سيتم التمديد لـ شهر إضافي؟', {
                okText: "متأكد",
                cancelText: "الغاء",
            }).then(() => {
                this.$axios.post(
                    '/api/supermarket/services/purchase', { service_id: id }, { withCredentials: true }
                ).then((response) => {
                    dispatch('fetchServices', true)
                    this.$auth.fetchUser()
                    this.$toast.success("تم شراء الخدمة !")
                }).catch((error) => {
                    this.$toast.error("الرصيد غير كافي")
                })
            })
        }
    },


    

}