export default {
    saveBusiness(state, {name, title}){
        state.business = {
            name: name,
            title: title
        }
    },

    selectBusinesses(state, businesses){
        state.businesses = businesses
    },
}