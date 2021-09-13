export default {
    add(state, customer){
        state.customers.push(customer)
    },

    edit(state, customer){
        let x = state.customers.find(x => x.id == customer.id)
        for(let y in x) x[y] = customer[y]
    },

    setCustomer(state, id){
        state.customer = state.customers.find(x => x.id == id)
    },

    set_all(state, customers){
        state.customers = customers
    },
    
    remove(state, id) {
        if (id !== 0)
            state.customers = state.customers.filter(x => x.id !== id);
    },

    set_debt(state, {id, debt}){
        let customer = state.customers.find(x => x.id == id)
        customer.debt = debt
    }

}