export default {
    business: state => {
        return state.business
    },

    businesses: state => {
        if (state.business.title){
            return state.businesses.filter((x) => x.title == state.business.title)
        }
    },
}