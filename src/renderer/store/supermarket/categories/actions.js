
export default {
    async syncLocalStorage({ state }, dispatch) {
        this.$auth.$storage.setLocalStorage('supermarket.categories', state.categories)
    },

    async addCategory({ state, commit, dispatch }, category) {
        if (state.categories.find(x => x.name == category.name))
            this.$toast.error("هذه الفئة موجودة بالفعل !")
        else {
            //########### SEND TO API ###########//.
            await this.$axios
                .post('/api/supermarket/categories/insert', category, { withCredentials: true })
                .then((response) => {
                    const newId = response.data.id
                    const sendCategory = { id: newId, ...category }
                    commit('add', sendCategory)
                    dispatch('syncLocalStorage')
                })
                .catch((error) => {
                    console.log(error)
                })
            this.$toast.success("تمت الإضافة بنجاح !")
        }
    },


    async editCategory({ state, commit, dispatch }, category) {
        if (state.categories.find(x => x.name == category.name))
            this.$toast.error("هذه الفئة موجودة بالفعل !")
        else {
            await commit('edit', category)
            dispatch('syncLocalStorage')
            //########### SEND TO API ###########//.
            await this.$axios
                .post('/api/supermarket/categories/update', category, { withCredentials: true })
                .catch((error) => {
                    console.log(error)
                })
            this.$toast.success('تم التعديل')
        }
    },

    async removeCategory({ commit, dispatch }, id) {
        await commit('remove', id)
        await this.dispatch('supermarket/products/removeProducts', id)
        await dispatch('syncLocalStorage')
        await this.dispatch('supermarket/products/syncLocalStorage')

        //########### SEND TO API ###########//
        await this.$axios
            .post('/api/supermarket/categories/delete', { id: id }, { withCredentials: true })
            .catch((error) => {
                console.log(error)
            })
    },

    async countUp() {
        if (this.$auth.user.point < 2000) {
            this.$toast.success('عدد النقاط غير كافي')
            return false
        }

        this._vm.$dialog.confirm('هل انت متأكد؟').then(async () => {
            //########### SEND TO API ###########//
            await this.$axios
                .post('/api/supermarket/categories/update-category-count', { withCredentials: true })
                .then((response) => {
                    this.$toast.success('تم التمديد')
                    this.$auth.fetchUser();
                })
                .catch((error) => {
                    console.log(error.response.data.message)
                })
        })
    },

    async getCategory({ commit, dispatch }, id) {
        var categories = await this.$auth.$storage.getLocalStorage('supermarket.categories')
        return categories.find(x => x.id == id)
    },

    async getCategories({ state, dispatch }) {
        let categories = await this.$auth.$storage.getLocalStorage('supermarket.categories')
        if (categories == null)
            await dispatch('fetchCategories')
        categories = await this.$auth.$storage.getLocalStorage('supermarket.categories')
        return categories
    },

    async fetchCategories({ commit, dispatch }) {
        var categories = await this.$auth.$storage.getLocalStorage('supermarket.categories')
        if (categories === null) // If not set on the storage
            await this.$axios
                .get('/api/supermarket/categories', { withCredentials: true })
                .then(async (response) => {
                    // Send to Mutations
                    response.data.unshift({ id: 0, name: "جميع الفئات" })
                    commit('set_all', response.data);

                    // Set each category products count
                    const products = await this.dispatch('supermarket/products/getProducts')

                    //Save To Storage
                    this.$auth.$storage.setLocalStorage('supermarket.categories', response.data)
                }).catch(error => {
                    throw new Error(`${error}`);
                })
        else
            commit('set_all', categories); // Send to Mutations

    },

    async search({ state, commit, dispatch }, name) {
        let categories = await this.$auth.$storage.getLocalStorage('supermarket.categories')
        commit('set_all', categories.filter(x => x.name.includes(name)));
    },

}