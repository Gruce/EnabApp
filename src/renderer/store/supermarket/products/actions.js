export default {
    async syncLocalStorage({ state }, dispatch) {
        this.$auth.$storage.setLocalStorage('supermarket.products', state.products)
    },

    async addProduct({ state, commit, dispatch }, product) {
        if (await this.dispatch('supermarket/categories/getCategory', product.category_id) === undefined) {
            this.$toast.error('هذه الفئة غير موجودة')
            return false
        }

        else if (state.products.find(x => (x.name == product.name && x.category_id == product.category_id))) {
            this.$toast.info('هذا المنتج موجود بالفعل!')
            return false
        }

        else {
            product.type = 0 /* 0 => Count, 1 => Kg */
            //########### SEND TO API ###########//.
            await this.$axios
                .post('/api/supermarket/products/insert', product, { withCredentials: true })
                .then((response) => {
                    const newId = response.data.id
                    const sendProduct = { id: newId, ...product }
                    commit('add', sendProduct)
                    dispatch('syncLocalStorage')
                    commit('emptyProduct')
                    this.$toast.success('تم اضافة المنتج بنجاح!')
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    },

    async editProduct({ state, commit, dispatch }, product) {
        if (await this.dispatch('supermarket/categories/getCategory', product.category_id) === undefined) {
            this.$toast.error('هذه الفئة غير موجودة')
            return false
        }

        else if (state.products.find(x => (x.name == product.name && x.category_id == product.category_id))) {
            this.$toast.info('هذا المنتج موجود بالفعل!')
            return false
        }
        else {
            await commit('edit', product)
            dispatch('syncLocalStorage')
            //########### SEND TO API ###########//.
            await this.$axios
                .post('/api/supermarket/products/update', product, { withCredentials: true })
                .catch((error) => {
                    console.log(error)
                })
            this.$toast.success('تم التعديل')
        }
    },

    async removeProduct({ commit, dispatch }, id) {
        await commit('remove', id)
        dispatch('syncLocalStorage')

        //########### SEND TO API ###########//
        // await this.$axios
        //     .post('/api/supermarket/categories/delete', { name: name }, { withCredentials: true })
        //     .catch((error) => {
        //         console.log(error)
        //     })
    },

    async removeProducts({ commit, dispatch }, category_id) {
        await commit('removeBulk', category_id)
        dispatch('syncLocalStorage')

        //########### SEND TO API ###########//
        // await this.$axios
        //     .post('/api/supermarket/categories/delete', { name: name }, { withCredentials: true })
        //     .catch((error) => {
        //         console.log(error)
        //     })
    },

    async countUp() {
        if (this.$auth.user.point < 2000) {
            this.$toast.success('عدد النقاط غير كافي')
            return false
        }

        this._vm.$dialog.confirm('هل انت متأكد؟').then(async () => {
            //########### SEND TO API ###########//
            await this.$axios
                .post('/api/supermarket/products/update-product-count', { withCredentials: true })
                .then((response) => {
                    this.$toast.success('تم التمديد')
                    this.$auth.fetchUser();
                })
                .catch((error) => {
                    console.log(error.response.data.message)
                })
        })
    },

    async getProduct({ commit, dispatch }, id) {
        var products = await this.$auth.$storage.getLocalStorage('supermarket.products')
        return products.find(x => x.id == id)
    },

    async getProductByBarcode({ commit, dispatch }, barcode) {
        var products = await this.$auth.$storage.getLocalStorage('supermarket.products')
        return products.find(x => x.barcode == barcode)
    },

    async getProducts({ state, dispatch }) {
        let products = await this.$auth.$storage.getLocalStorage('supermarket.products')
        if (products == null)
            await dispatch('fetchProducts')
        products = await this.$auth.$storage.getLocalStorage('supermarket.products')
        return products
    },

    async fetchProducts({ commit, dispatch }) {
        var products = await this.$auth.$storage.getLocalStorage('supermarket.products')
        if (products === null) // If not set on the storage
            await this.$axios
                .get('/api/supermarket/products', { withCredentials: true })
                .then((response) => {
                    this.$auth.$storage.setLocalStorage('supermarket.products', response.data) //Save To Storage
                    commit('set_all', response.data); // Send to Mutations
                }).catch(error => {
                    throw new Error(`${error}`);
                })
        else
            commit('set_all', products); // Send to Mutations
    },

    async search({ state, commit, dispatch }, name) {
        let products = await this.$auth.$storage.getLocalStorage('supermarket.products')
        commit('set_all', products.filter(x => x.name.includes(name)));
    },

}