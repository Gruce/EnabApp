const { ipcRenderer } = require('electron');

ipcRenderer.send('app_version');

ipcRenderer.on('app_version', (event, arg) => {
  ipcRenderer.removeAllListeners('app_version');
  console.log('Version ' + arg.version)
});


// const notification = document.getElementById('notification');
// const message = document.getElementById('message');
// const restartButton = document.getElementById('restart-button');
ipcRenderer.on('update_available', () => {
  ipcRenderer.removeAllListeners('update_available');
  console.log("New update is available. downloading now!")
  // message.innerText = 'A new update is available. Downloading now...';
  // notification.classList.remove('hidden');
});
ipcRenderer.on('update_downloaded', () => {
  ipcRenderer.removeAllListeners('update_downloaded');
  console.log("Update Downloaded. It will be installed on restart.")
  // message.innerText = 'Update Downloaded. It will be installed on restart. Restart now?';
  // restartButton.classList.remove('hidden');
  // notification.classList.remove('hidden');
});