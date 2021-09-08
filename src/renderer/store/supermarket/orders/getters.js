export default {
    products: state => {
        return state.products
    },

    productsAdded: state => {
        return state.products[state.selectedOrderNumber]
    },

    productInCount: state => id => {
        let product = state.products[state.selectedOrderNumber].find(x => x.id == id)
        if (product)
            return product.inCount
        else
            return 0
    },

    ordersList: state => {
        return state.ordersList
    },

    totalPrice: (state, getters) => {
        let total = 0
        getters.productsAdded.forEach(x => total += x.price * x.inCount)
        return total
    },

    lastOrder: state => {
        return state.lastOrder
    },

    calculator: state => {
        return state.calculator
    },

    selectedCategory: state => {
        return state.selectedCategory
    },

    hideCategoriesValue: state => {
        return state.hideCategories
    },


}