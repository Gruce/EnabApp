const { ipcRenderer } = require('electron');

export default {
    changeColor({ commit }, data) {
        commit('setColor', data)
    },

    getColor({ commit }) {
        let color = this.$auth.$storage.getLocalStorage('background-color')
        if (color)
            commit('setColor', color)
        else
            commit('setColor', "#4776E6")
    },

    setColor({ commit }, color) {
        commit('setColor', color)
        this.$auth.$storage.setLocalStorage('background-color', color)
    },

    fetchPrinters() {
        ipcRenderer.send('get_printers');
    },

    changePrinters({ commit }, data) {
        commit('setPrinters', data)
    },

    getDefaultPrinter({ commit }) {
        let printer = this.$auth.$storage.getLocalStorage('default-printer')
        if (printer)
            commit('setDefaultPrinter', printer)
        else
            return false
    },

    setDefaultPrinter({ commit }, defaultPrinter) {
        commit('setDefaultPrinter', defaultPrinter)
        this.$auth.$storage.setLocalStorage('default-printer', defaultPrinter)
    },
    printState({ commit }, printState) {
        commit('setPrintState', printState)
    }

}