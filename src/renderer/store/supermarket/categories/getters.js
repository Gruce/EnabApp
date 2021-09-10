export default {
    categories_all: state => {
        return state.categories
    },

    categories: state => {
        return state.categories.filter(x => x.id !== 0)
    },

    category: (state, getters) => id => {
        if (id)
            return {...getters.categories.find(x => x.id == id)}
        else
            return {name: ''}
    }
}