export default {
    customers: state => {
        return state.customers
    },

    customer: (state, getters) => id => {
        if (id)
            return { ...getters.customers.find(x => x.id == id) }
        else
            return { name: '' }
    }
}