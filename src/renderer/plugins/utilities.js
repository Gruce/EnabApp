const { ipcRenderer } = require('electron');

export default function ({ app, store }, inject) {
    ipcRenderer.on('get_printers', (event, arg) => {
        store.dispatch('supermarket/utilities/changePrinters', arg)
    });
}