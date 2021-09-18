export default {
    newOrder(state) {
        if (state.ordersList.length < 8) {
            state.ordersList.forEach(x => x.enabled = false)
            state.ordersList.push({ enabled: true, customer_id: null, debt: false })
            state.products.splice(state.ordersList.length - 1, 0, []);
            state.selectedOrderNumber = state.ordersList.length - 1
        } else {
            this.$toast.error('لايمكن اضافة اكثر من 8 طلبات في نفس الوقت')
        }
    },
    removeOrder(state) {
        if (state.ordersList.length <= 1) return false

        state.ordersList = state.ordersList.filter((x, key) => key !== state.selectedOrderNumber)
        state.products = state.products.filter((x,key) => key !== state.selectedOrderNumber);

        if (state.ordersList.length > 0){
            state.ordersList[state.ordersList.length-1].enabled = true
            state.selectedOrderNumber = state.ordersList.length - 1
        }
        
    },

    add(state, product) {
        state.products[state.selectedOrderNumber].push({ ...product, inCount: 1 })
    },
    remove(state, id) {
        let productIndex = state.products[state.selectedOrderNumber].findIndex(x => x.id == id)
        state.products[state.selectedOrderNumber].splice(productIndex, 1);
    },
    count(state, id) {
        state.products[state.selectedOrderNumber].find(x => x.id == id).inCount++
    },

    countDown(state, id) {
        state.products[state.selectedOrderNumber].find(x => x.id == id).inCount--
    },

    onlyProducts(state) {
        state.onlyProducts = !state.onlyProducts
    },

    emptyProducts(state) {
        state.products[state.selectedOrderNumber].splice(0);
    },

    lastOrder(state, order) {
        state.lastOrder = order
    },

    set_all(state, orders) {
        state.orders = orders
    },

    insert_order(state, order) {
        state.orders.push(order)
    },

    calculator(state) {
        state.calculator = !state.calculator
    },

    selectCategory(state, id) {
        state.selectedCategory = id
    },

    hideCategories(state) {
        state.hideCategories = !state.hideCategories
    },

    selectOrder(state, i) {
        state.ordersList.forEach((x, key) =>
            key == i ? (x.enabled = true) : (x.enabled = false)
        );
        state.selectedOrderNumber = i
    },

    selectCustomer(state, id){
        this.$toast.success('تم تعيين الزبون')
        state.ordersList[state.selectedOrderNumber].customer_id = id
    },

    unselectCustomer(state){
        const customer_id = state.ordersList[state.selectedOrderNumber].customer_id

        if (customer_id !== null)
            this.$toast.success('تم الغاء تعيين الزبون')

        state.ordersList[state.selectedOrderNumber].customer_id = null
    },

    toggleDebt(state){
        const order = state.ordersList[state.selectedOrderNumber]
        order.debt = !order.debt
    }
}