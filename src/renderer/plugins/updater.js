const { ipcRenderer } = require('electron');

export default function ({ app, context }, inject) {

  ipcRenderer.send('app_version');

  ipcRenderer.on('app_version', (event, arg) => {
    ipcRenderer.removeAllListeners('app_version');
    console.log('Version ' + arg.version)
    inject('version', () => {return arg.version})

  });
    
  ipcRenderer.on('update_available', () => {
    ipcRenderer.removeAllListeners('update_available');
    context.$toast.info("يوجد إصدار جديد ! جاري التحميل..", {duration: 60000})
  });

  ipcRenderer.on('update_downloaded', () => {
    ipcRenderer.removeAllListeners('update_downloaded');
    context.$toast.success("تم إكمال التحميل. سيتم تطبيقه بعد إعادة فتح البرنامج.", {duration: 60000})
  });

  ipcRenderer.on('download_progress', () => {
    console.log("fuck")
    ipcRenderer.removeAllListeners('download_progress');
  });

}