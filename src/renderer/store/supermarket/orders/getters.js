export default {
    products: state => {
        return state.products
    },

    productsAdded: (state, getters) => {
        return getters.products[state.selectedOrderNumber]
    },

    productInCount: (state, getters) => id => {
        let product = getters.products[state.selectedOrderNumber].find(x => x.id == id)
        if (product)
            return product.inCount
        else
            return 0
    },

    ordersList: state => {
        return state.ordersList
    },

    orderList: (state, getters) => {
        return getters.ordersList[state.selectedOrderNumber]
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

    orders: state => {
        return state.orders
    },




}