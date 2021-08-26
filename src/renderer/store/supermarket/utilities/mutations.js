export default {
    setColor(state, data) {
        state.color = data
    },

    setPrinters(state, data) {
        state.printers = data
    },

    setDefaultPrinter(state, name) {
        state.defaultPrinter = name
    },
    setPrintState(state, stuts) {
        state.printState = stuts
    }
}