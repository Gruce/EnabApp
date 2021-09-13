export default {
    products (state) {
        return state.products
    },

    productsPartial (state) {
        let products = [...state.products]
        products = products.splice(0, 27)
        return products
    },

    product: (state, getters) => id => {
        if (id)
            return {...getters.products.find(x => x.id == id)}
        else
            return {name: ''}
    }
}