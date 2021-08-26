import { ipcMain  } from 'electron'
import BrowserWinHandler from './BrowserWinHandler'

const winHandler = new BrowserWinHandler({
  height: 600,
  width: 1000,
  frame: false
})

winHandler.onCreated(_browserWindow => {
  winHandler.loadPage('/')
  
  // Or load custom url
  // _browserWindow.loadURL('https://google.com')
})

ipcMain.on('get_printers', (event) => {
  event.sender.send('get_printers', { ...winHandler.browserWindow.webContents.getPrinters() });
});


export default winHandler
