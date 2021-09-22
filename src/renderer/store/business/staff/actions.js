
export default {
    async syncLocalStorage({ state }) {
        this.$auth.$storage.setLocalStorage('staffs', state.staffs)
    },

    async addStaff({ state, commit, dispatch }, staff) {
        if (this.$auth.user.points < 1000){
            this.$toast.error("عدد النقاط غير كافي")
            return false
        }
        let business_name = this.state.business.business.name
        if (state.staffs.find(x => x.name == staff.name)){
            this.$toast.error("هذا الموظف موجود بالفعل !")
            return false 
        } else {
            //########### SEND TO API ###########//.
            return await this.$axios
                .post('/api/staff/insert', {business: business_name, ...staff}, { withCredentials: true })
                .then(async (response) => {
                    dispatch('fetchStaffs', true);
                    this.$toast.success("تمت الإضافة بنجاح !")
                    return true
                })
                .catch((error) => {
                    this.$toast.error(error.response.data.message)
                    return false
                })
        }
    },


    async editStaff({ commit, dispatch }, staff) {
        await commit('edit', staff)
        dispatch('syncLocalStorage')
        //########### SEND TO API ###########//.
        await this.$axios
            .post('/api/staff/update', staff, { withCredentials: true })
            .catch((error) => {
                console.log(error)
            })
        this.$toast.success('تم التعديل')
    },

    async removeStaff({ commit, dispatch }, id) {
        await commit('remove', id)
        dispatch('syncLocalStorage')

        //########### SEND TO API ###########//
        await this.$axios
            .post('/api/staff/remove', { id: id }, { withCredentials: true })
            .catch((error) => {
                console.log(error)
            })
    },

    async getStaff({ commit, dispatch }, id) {
        var staffs = await this.$auth.$storage.getLocalStorage('staffs')
        return staffs.find(x => x.id == id)
    },

    async getStaff({ state, dispatch }) {
        let staffs = await this.$auth.$storage.getLocalStorage('staffs')
        if (staffs == null)
            await dispatch('fetchStaffs')
        staffs = await this.$auth.$storage.getLocalStorage('staffs')
        return staffs
    },

    async fetchStaffs({ commit, dispatch }, force = false) {
        let business_name = this.state.business.business.name
        var staffs = await this.$auth.$storage.getLocalStorage('staffs')
        if (staffs === null || force) // If not set on the storage
            await this.$axios
                .get('/api/staff/' + business_name, { withCredentials: true })
                .then(async (response) => {
                    // Send to Mutations
                    commit('set_all', response.data);

                    //Save To Storage
                    this.$auth.$storage.setLocalStorage('staffs', response.data)
                }).catch(error => {
                    throw new Error(`${error}`);
                })
        else
            commit('set_all', staffs); // Send to Mutations
    },

    async search({ state, commit, dispatch }, name) {
        let staffs = await this.$auth.$storage.getLocalStorage('staffs')
        commit('set_all', staffs.filter(x => x.name.includes(name)));
    },


}