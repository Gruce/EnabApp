
export default {
    async syncLocalStorage({ state }) {
        this.$auth.$storage.setLocalStorage('customers', state.customers)
    },

    async addCustomer({ state, commit, dispatch }, customer) {
        if (state.customers.find(x => x.name == customer.name))
            this.$toast.error("هذا الزبون موجودة بالفعل !")
        else {
            //########### SEND TO API ###########//.
            await this.$axios
                .post('/api/supermarket/customers/insert', customer, { withCredentials: true })
                .then((response) => {
                    const newId = response.data.id
                    const sendCustomer = {id: newId, ...customer}
                    commit('add', sendCustomer)
                    dispatch('syncLocalStorage')
                })
                .catch((error) => {
                    console.log(error)
                })
            this.$toast.success("تمت الإضافة بنجاح !")
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
                    this.$auth.$storage.setLocalStorage('customers', response.data)
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

    async debt({state, commit, dispatch}, {id, debt}){
        if (id == null) return false
        let customer = {...state.customers.find(x => x.id == id)}
        customer.debt = parseInt(customer.debt) + parseInt(debt)

        await this.$axios
            .post('/api/supermarket/customers/update', {...customer}, { withCredentials: true })
            .then(async (response) => {
                await commit('set_debt', {id: id, debt:customer.debt})
                dispatch('syncLocalStorage')
                this.$toast.success('تم إضافة الدين الى الزبون')
            }).catch(error => {
                throw new Error(`${error}`);
            })
            
    }

}