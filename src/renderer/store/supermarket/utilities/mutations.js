export default {
    setColor(state, data){
        state.color = data
    },

    setPrinters(state, data){
        state.printers = data
    },

    setDefaultPrinter(state, name){
        state.defaultPrinter = name
    }
}