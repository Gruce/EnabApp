const { ipcRenderer } = require('electron');

export default function ({ app, store }, inject) {
  let version = "Loading..."

  ipcRenderer.send('app_version');

  inject('version', () => {return version})

  inject('restart', () => {return arg.version})

  inject('progress', () => {return progress})

  ipcRenderer.on('app_version', (event, arg) => {
    ipcRenderer.removeAllListeners('app_version');
    console.log('Version ' + arg.version)
    version = arg.version
  });
    
  ipcRenderer.on('update_available', () => {
    app.$toast.info("يوجد إصدار جديد ! جاري التحميل..", {duration: 3000})
    ipcRenderer.removeAllListeners('update_available');
  });

  ipcRenderer.on('update_downloaded', () => {
    app.$toast.success("تم إكمال التحميل. سيتم تطبيقه بعد إعادة فتح البرنامج.", {duration: 3000})
    ipcRenderer.removeAllListeners('update_downloaded');
  });

  ipcRenderer.on('download_progress', (event, data) => {
    // ipcRenderer.removeAllListeners('download_progress');
    // console.log(data)
    store.dispatch('update/changeProgress', data)
  });

}