const { ipcRenderer } = require('electron');

export default function ({ app, store }, inject) {
    ipcRenderer.on('get_printers', (event, arg) => {
        console.log(arg)
        store.dispatch('supermarket/utilities/changePrinters', arg)
    });
}