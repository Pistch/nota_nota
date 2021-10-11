const path = require('path');
const {BrowserWindow, globalShortcut, ipcMain} = require('electron');

const {windowVisibilityUtilsFactory} = require('../utils');

module.exports = function(store) {
  const win = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
    show: false,
    frame: false,
  });
  const {hideWindow, toggleWindow} = windowVisibilityUtilsFactory(win);

  function sendStateToWindow() {
    win.webContents.send('state-update', store.store.getState());
  }

  win.loadFile(path.resolve(__dirname, 'static/index.html'));
  globalShortcut.register('Alt+Shift+Z', toggleWindow);

  ipcMain.on('main-window_hide', toggleWindow);
  win.on('blur', hideWindow);
  win.on('show', sendStateToWindow);

  store.store.subscribe(sendStateToWindow);
};
