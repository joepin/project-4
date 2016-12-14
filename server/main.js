const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const settings = require('electron-settings')

settings.defaults({
  width: 800,
  height: 600,
  internalPort: 4000,
  publicPort: 5000,
  defaultPath: '~/Media',
  serverName: 'Default Media Server',
  serverUUID: null,
});

let currSettings = {}

console.log('path:', settings.getSettingsFilePath())

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function prepareForWindow () {

  Promise.all([settings.get('width'), settings.get('height'), settings.get('internalPort')])
  .then(values => {
    // console.log(values);
    currSettings.width = values[0]
    currSettings.height = values[1]
    currSettings.innerPort = values[2]
    startExpressServer();
    createWindow();
  });
}

function startExpressServer() {
  const express = require('express');
  const logger = require('morgan');
  const history = require('connect-history-api-fallback');

  const eapp = express();

  eapp.use(history({ logger: logger }));

  // eapp.use(logger('dev'));
  eapp.listen(4000);
  eapp.use(express.static(path.join(__dirname, 'dist')))
  eapp.get('/test', (req, res) => res.json('works'))
}

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: currSettings.width, height: currSettings.height, title: 'Testing'})

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: 'localhost:4000',
    protocol: 'http:',
    slashes: true
  }))

  // Open the DevTools.
  win.webContents.openDevTools()

  // set up a key in win to pass data to renderer
  // win.transfer = {}

  // get current serverUUID so that app can check whether or not we're starting over
  // settings.get('serverUUID').then(data => {
  //   win.transfer = {
  //     serverUUID: data
  //   }
  // });


  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', prepareForWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    prepareForWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
