const {PosPrinter} = require('electron').remote.require("electron-pos-printer");
const path = require("path");
const options = {
    preview: false,               // Preview in window or print
    width: '170px',               //  width of content body
    margin: '0 0 0 0',            // margin of content body
    copies: 1,                    // Number of copies to print
    printerName: 'XP-80C',        // printerName: string, check with webContent.getPrinters()
    timeOutPerLine: 400,
    pageSize: { height: 301000, width: 71000 }  // page size
 }
 
 const data = [
    {
      type: 'image',                                       
      path: path.join(__dirname, 'assets/banner.png'),     // file path
      position: 'center',                                  // position of image: 'left' | 'center' | 'right'
      width: '60px',                                           // width of image in px; default: auto
      height: '60px',                                          // width of image in px; default: 50 or '50px'
    },{
       type: 'text',                                       // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
       value: 'SAMPLE HEADING',
       style: `text-align:center;`,
       css: {"font-weight": "700", "font-size": "18px"}
    },{
       type: 'text',                       // 'text' | 'barCode' | 'qrCode' | 'image' | 'table'
       value: 'Secondary text',
       style: `text-align:left;color: red;`,
       css: {"text-decoration": "underline", "font-size": "10px"}
    },{
       type: 'barCode',
       value: 'HB4587896',
       height: 12,                     // height of barcode, applicable only to bar and QR codes
       width: 1,                       // width of barcode, applicable only to bar and QR codes
       displayValue: true,             // Display value below barcode
       fontsize: 8,
    },{
      type: 'qrCode',
       value: 'https://github.com/Hubertformin/electron-pos-printer',
       height: 55,
       width: 55,
       style: 'margin: 10 20px 20 20px'
     },{
        type: 'table',
        // style the table
        style: 'border: 1px solid #ddd',
        // list of the columns to be rendered in the table header
        tableHeader: ['Animal', 'Age'],
        // multi dimensional array depicting the rows and columns of the table body
        tableBody: [
            ['Cat', 2],
            ['Dog', 4],
            ['Horse', 12],
            ['Pig', 4],
        ],
        // list of columns to be rendered in the table footer
        tableFooter: ['Animal', 'Age'],
        // custom style for the table header
        tableHeaderStyle: 'background-color: #000; color: white;',
        // custom style for the table body
        tableBodyStyle: 'border: 0.5px solid #ddd',
        // custom style for the table footer
        tableFooterStyle: 'background-color: #000; color: white;',
     },{
        type: 'table',
        style: 'border: 1px solid #ddd',             // style the table
        // list of the columns to be rendered in the table header
        tableHeader: [{type: 'text', value: 'Animal'}, {type: 'image', path: path.join(__dirname, 'icons/animal.png')}],
        // multi dimensional array depicting the rows and columns of the table body
        tableBody: [
            [{type: 'text', value: 'Cat'}, {type: 'image', path: './animals/cat.jpg'}],
            [{type: 'text', value: 'Dog'}, {type: 'image', path: './animals/dog.jpg'}],
            [{type: 'text', value: 'Horse'}, {type: 'image', path: './animals/horse.jpg'}],
            [{type: 'text', value: 'Pig'}, {type: 'image', path: './animals/pig.jpg'}],
        ],
        // list of columns to be rendered in the table footer
        tableFooter: [{type: 'text', value: 'Animal'}, 'Image'],
        // custom style for the table header
        tableHeaderStyle: 'background-color: #000; color: white;',
        // custom style for the table body
        tableBodyStyle: 'border: 0.5px solid #ddd',
        // custom style for the table footer
        tableFooterStyle: 'background-color: #000; color: white;',
     },
 ]


export default {
    
    async addProduct({commit, dispatch}, id){
        const product = await this.dispatch('supermarket/products/getProduct', id)
        if (await dispatch('getProduct', product.id))
            commit('count', product.id)
        else
            commit('add', product)
    },
    
    async addProductByBarcode({commit, dispatch}, barcode){
        const product = await this.dispatch('supermarket/products/getProductByBarcode', barcode)
        //Products existed
        if (product){
            if (await dispatch('getProduct', product.id))
                commit('count', product.id)
            else
                commit('add', product)
        } else 
            this.$toast.error('هذا المنتج غير موجود') // WHEN SCANNER NOT FOUND THE PRODUCT
    },

    async removeProduct({commit, dispatch}, id){
        if ((await dispatch('getProduct', id)).inCount > 1)
            commit('countDown', id)
        else
            commit('remove', id)
    }, 

    async getProduct({state, dispatch}, id){
        return state.products.find(x => x.id == id)
    },

    async setCount({state, commit, dispatch}, id){
        const product = await dispatch('getProduct', id)
        return products.find(x => x.id == id)
    },

    async search({state, commit, dispatch}, id){
        let orders = await this.$auth.$storage.getLocalStorage('orders')
        if (id == '')
            commit('set_all', orders);
        else
            commit('set_all', orders.filter(x => x.id == id))
    },

    async searchItems({state}, name){
        if (!state.onlyProducts){
            let categories = await this.dispatch('supermarket/categories/getCategories')
            this.commit('supermarket/categories/set_all', categories.filter(x => x.name.includes(name)));
        }

        let products = await this.dispatch('supermarket/products/getProducts')
        this.commit('supermarket/products/set_all', products.filter(x => x.name.includes(name)));
    },

    async fetchOrders({commit, dispatch}) {
        var orders = await this.$auth.$storage.getLocalStorage('orders')
        if (orders === null) // If not set on the storage
            await this.$axios
                .get('/api/supermarket/orders', { withCredentials: true })
                .then(async (response) => {
                    // Send to Mutations
                    commit('set_all', response.data);
                    //Save To Storage
                    this.$auth.$storage.setLocalStorage('orders', response.data)
                }).catch(error => {
                    throw new Error(`${error}`);
                })
        else
            commit('set_all', orders); // Send to Mutations
    },

    async filterByCategory({}, category_id){
        let products = await this.dispatch('supermarket/products/getProducts')
        let categories = await this.dispatch('supermarket/categories/getCategories')

        if (!category_id == 0){
            products = products.filter(x => x.category_id == category_id)
            // categories = categories.filter(x => (x.id == category_id || x.id == 0))
        }
        this.commit('supermarket/products/set_all', products);
        this.commit('supermarket/categories/set_all', categories);
    },

    emptyProducts({commit}){
        this._vm.$dialog.confirm('هل انت متأكد؟').then(() => {
            commit('emptyProducts')
        })
    },

    async fetchLastOrder({commit}){
        if (!this.$auth.$storage.getLocalStorage('lastOrder'))
            this.$axios.get(
                '/api/supermarket/orders/last-order', { withCredentials: true }
            ).then((response) => {
                commit('lastOrder', response.data)
                this.$auth.$storage.setLocalStorage('lastOrder', response.data)
            })
        
            commit('lastOrder', await this.$auth.$storage.getLocalStorage('lastOrder'))
        return await this.$auth.$storage.getLocalStorage('lastOrder')
    },

    async endOrder({state, commit, dispatch}){
        let calculatorService = await this.dispatch('supermarket/services/serviceState', 1)
        if (calculatorService && state.calculator == false){
            commit('calculator')
            return true
        }


        let products = []
        state.products.forEach(x => {
            products.push({id: x.id, count: x.inCount})
        })

        this.$axios
        .post(
            '/api/supermarket/orders/end-order', { products: products, customer_id: null }, { withCredentials: true }
        ).then((response) => {
            // Reset added products
        }).catch(function (error) {
            console.log(error)
        })

        // Print Order
        if (this.state.supermarket.utilities.printState == true){
            if (this.state.supermarket.utilities.defaultPrinter == ""){
                this.$toast.info('يرجى تحديد طابعة لإجراء عملية الطباعة')
            } else {
                console.log("print it")
                PosPrinter.print(data, options)
                    .then(() => {
                        console.log("printed")
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        }

        let lastOrder = {...await dispatch('fetchLastOrder')}
        lastOrder.id++
        lastOrder.order_number++
        lastOrder.order_price = 0
        
        await state.products.forEach(x => {
            lastOrder.order_price += x.inCount * x.price
            this.commit('supermarket/products/changeCount', {id: x.id, count: x.inCount*-1})
        })

        await this.dispatch('supermarket/products/syncLocalStorage')

        commit('lastOrder', lastOrder)
        this.$auth.$storage.setLocalStorage('lastOrder', lastOrder)

        commit('emptyProducts')

        this.$toast.success('تم انهاء الطلب')
        if (this.isOffline)
            this.$toast.info('سيتم ارسال الطلب عند عودة الانترنت')

        if (calculatorService)
            commit('calculator')
    },

    selectCategory({commit}, id){
        commit('selectCategory', id)
    },

    hideCategories({commit}){
        commit('hideCategories')
    },



}