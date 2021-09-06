export default {
    newOrder(state) {
        if (state.ordersList.length < 8) {
            state.ordersList.forEach(x => x.enabled = false)
            state.ordersList.push({ enabled: true })
            state.products.splice(state.ordersList.length - 1, 0, []);
            state.selectedOrderNumber = state.ordersList.length - 1
        } else {
            this.$toast.error('لايمكن اضافة اكثر من 8 طلبات في نفس الوقت')
        }
    },
    removeOrder(state) {
        state.ordersList = state.ordersList.filter((x, key) => key !== state.selectedOrderNumber)
        if (state.ordersList.length > 0){
            state.ordersList[state.ordersList.length-1].enabled = true
            state.selectedOrderNumber = state.ordersList.length - 1
        }
        
    },
    add(state, product) {
        state.products[state.selectedOrderNumber].push({ ...product, inCount: 1 })
    },
    remove(state, id) {
        state.products[state.selectedOrderNumber] = state.products[state.selectedOrderNumber].filter(x => x.id !== id);
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
        state.products[state.selectedOrderNumber].splice(0, 0, []);
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
}