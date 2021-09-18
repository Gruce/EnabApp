
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
                .post('/api/business/add-staff', {business: business_name, ...staff}, { withCredentials: true })
                .then(async (response) => {
                    const newId = response.data.id
                    const sendStaff = { id: newId, ...staff }
                    await commit('add', sendStaff)
                    dispatch('syncLocalStorage')
                    this.$toast.success("تمت الإضافة بنجاح !")
                    this.$auth.fetchUser()
                    return true
                })
                .catch((error) => {
                    this.$toast.error(error.response.data.message)
                    return false
                })
        }
    },


    async editCustomer({ commit, dispatch }, customer) {
        await commit('edit', customer)
        dispatch('syncLocalStorage')
        //########### SEND TO API ###########//.
        await this.$axios
            .post('/api/supermarket/customers/update', customer, { withCredentials: true })
            .catch((error) => {
                console.log(error)
            })
        this.$toast.success('تم التعديل')
    },

    async removeCustomer({ commit, dispatch }, id) {
        await commit('remove', id)
        dispatch('syncLocalStorage')

        //########### SEND TO API ###########//
        await this.$axios
            .post('/api/supermarket/customers/delete', { id: id }, { withCredentials: true })
            .catch((error) => {
                console.log(error)
            })
    },

    async getCustomer({ commit, dispatch }, id) {
        var customers = await this.$auth.$storage.getLocalStorage('customers')
        return customers.find(x => x.id == id)
    },

    async getCustomers({ state, dispatch }) {
        let customers = await this.$auth.$storage.getLocalStorage('customers')
        if (customers == null)
            await dispatch('fetchCustomers')
        customers = await this.$auth.$storage.getLocalStorage('customers')
        return customers
    },

    async fetchCustomers({ commit, dispatch }) {
        var customers = await this.$auth.$storage.getLocalStorage('customers')
        if (customers === null) // If not set on the storage
            await this.$axios
                .get('/api/supermarket/customers', { withCredentials: true })
                .then(async (response) => {
                    // Send to Mutations
                    commit('set_all', response.data);

                    //Save To Storage
                    this.$auth.$storage.setLocalStorage('supermarket.customers', response.data)
                }).catch(error => {
                    throw new Error(`${error}`);
                })
        else
            commit('set_all', customers); // Send to Mutations
    },

    async search({ state, commit, dispatch }, name) {
        let customers = await this.$auth.$storage.getLocalStorage('customers')
        commit('set_all', customers.filter(x => x.name.includes(name)));
    },


}