export default () => ({
    products: state => {
        return state.products
    },

    category: (state, getters) => id => {
        if (id)
            return {...getters.products.find(x => x.id == id)}
        else
            return {name: ''}
    }
})
