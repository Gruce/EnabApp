export default {
    services: state => {
        return state.services
    },

    owned: state => {
        return state.services.filter(x => x.owned == true)
    },

    calculator: (state, getters) => {
        // ID = 1
        return getters.services.find(x => x.id == 1 && x.state == true)
    },

    multipleOrder: (state, getters) => {
        // ID = 2
        return getters.services.find(x => x.id == 2 && x.state == true)
    },
    
    customerAssign: (state, getters) => {
        // ID = 3
        return getters.services.find(x => x.id == 3 && x.state == true)
    },

}