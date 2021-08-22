const { ipcRenderer } = require('electron');

export default function ({ app }, inject) {
  let version = "Loading..."

  ipcRenderer.send('app_version');

  inject('version', () => {return version})

  inject('restart', () => {return arg.version})

  ipcRenderer.on('app_version', (event, arg) => {
    ipcRenderer.removeAllListeners('app_version');
    console.log('Version ' + arg.version)
    version = arg.version
  });

  function restartApp() {
    ipcRenderer.send('restart_app');
  }
    
  ipcRenderer.on('update_available', () => {
    app.$toast.info("يوجد إصدار جديد ! جاري التحميل..", {duration: 60000})
    ipcRenderer.removeAllListeners('update_available');
  });

  ipcRenderer.on('update_downloaded', () => {
    app.$toast.success("تم إكمال التحميل. سيتم تطبيقه بعد إعادة فتح البرنامج.", {duration: 60000})
    ipcRenderer.removeAllListeners('update_downloaded');
  });

  ipcRenderer.on('download_progress', (something) => {
    app.$toast.info(something, {duration: 1000})
    ipcRenderer.removeAllListeners('download_progress');
  });

}