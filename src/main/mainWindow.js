import BrowserWinHandler from './BrowserWinHandler'
const { autoUpdater } = require('electron-updater');

const winHandler = new BrowserWinHandler({
  height: 600,
  width: 1000
})

winHandler.onCreated(_browserWindow => {
  winHandler.loadPage('/')
  // Or load custom url
  // _browserWindow.loadURL('https://google.com')
})

autoUpdater.on('update-available', () => {
  console.log("Update Available")
  winHandler.webContents.send('update_available');
});

autoUpdater.on('update-downloaded', () => {
  console.log("Update Downloaded")
  winHandler.webContents.send('update_downloaded');
});




export default winHandler
