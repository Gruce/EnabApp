export default {
    add(state, category){
        state.categories.push(category)
    },

    edit(state, category){
        let x = state.categories.find(x => x.id == category.id)
        for(let y in x) x[y] = category[y]
    },

    setCategory(state, id){
        state.category = state.categories.find(x => x.id == id)
    },

    set_all(state, categories){
        state.categories = categories
    },
    
    set_products_count(state, {id, count}){
        let category = state.categories.find(x => x.id == id)
        category.productsCount = id == 0 ? this.state.supermarket.products.products.length : count
    },

    remove(state, id) {
        if (id !== 0)
            state.categories = state.categories.filter(x => x.id !== id);
    },

}