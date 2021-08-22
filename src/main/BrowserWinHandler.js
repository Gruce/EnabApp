/* eslint-disable */
import { EventEmitter } from 'events'
import { BrowserWindow, app, protocol } from 'electron'
const { autoUpdater } = require('electron-updater');
const log = require('electron-log');
autoUpdater.logger = log;

// Vercel Configuration
// const server = "enab-app-n515b232n-ourstory.vercel.app"
// const url = `${server}/update/${process.platform}/${app.getVersion()}`
// autoUpdater.setFeedURL({ url })

log.transports.file.level = "debug"


const DEV_SERVER_URL = process.env.DEV_SERVER_URL
const isProduction = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'

export default class BrowserWinHandler {
  /**
   * @param [options] {object} - browser window options
   * @param [allowRecreate] {boolean}
   */
  constructor (options, allowRecreate = true) {
    this._eventEmitter = new EventEmitter()
    this.allowRecreate = allowRecreate
    this.options = options
    this.browserWindow = null
    this._createInstance()
  }

  _createInstance () {
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    if (app.isReady()) this._create()
    else {
      app.once('ready', async () => {
        autoUpdater.checkForUpdatesAndNotify();

        protocol.registerFileProtocol('app', (request, callback) => {
          const url = request.url.substr(6);
          callback({
              path: path.normalize(`${__dirname}/${url}`)
          });
        }, (error) => {
            if (error) console.error('Failed to register protocol');
        });
        
        this._create()
      })
    }

    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (!this.allowRecreate) return
    app.on('activate', () => this._recreate())
  }

  _create () {
    this.browserWindow = new BrowserWindow(
      {
        ...this.options,
        webPreferences: {
          ...this.options.webPreferences,
          webSecurity: isProduction, // disable on dev to allow loading local resources
          nodeIntegration: true, // allow loading modules via the require () function
          contextIsolation: false, // https://github.com/electron/electron/issues/18037#issuecomment-806320028
          enableRemoteModule: true,
        }
      }
    )
    this.browserWindow.maximize();
    this.browserWindow.setMenu(null);

    

    autoUpdater.on('update-available', () => {
      this.browserWindow.webContents.send('update_available');
    });
    
    autoUpdater.on('update-downloaded', () => {
      this.browserWindow.webContents.send('update_downloaded');
    });

    autoUpdater.on('download-progress', (progressObj) => {
      let log_message = "Download speed: " + progressObj.bytesPerSecond;
      log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
      log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
      log.info(log_message);
    })

    
    this.browserWindow.on('closed', () => {
      // Dereference the window object
      this.browserWindow = null
    })
    this._eventEmitter.emit('created')
        
  }

  _recreate () {
    if (this.browserWindow === null) this._create()
  }

  /**
   * @callback onReadyCallback
   * @param {BrowserWindow}
   */

  /**
   *
   * @param callback {onReadyCallback}
   */
  onCreated (callback) {
    if (this.browserWindow !== null) return callback(this.browserWindow);
    this._eventEmitter.once('created', () => {
      callback(this.browserWindow)
    })
  }

  async loadPage(pagePath) {
    if (!this.browserWindow) return Promise.reject(new Error('The page could not be loaded before win \'created\' event'))
    const serverUrl = isDev ? DEV_SERVER_URL : 'app://./index.html'
    const fullPath = serverUrl + '#' + pagePath;
    await this.browserWindow.loadURL(fullPath)
  }

  /**
   *
   * @returns {Promise<BrowserWindow>}
   */
  created () {
    return new Promise(resolve => {
      this.onCreated(() => resolve(this.browserWindow))
    })
  }

  

}
