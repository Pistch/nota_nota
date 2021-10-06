const path = require('path');
const {BrowserWindow, globalShortcut, ipcMain} = require('electron');

const {windowVisibilityUtilsFactory} = require('../utils');

module.exports = function(store) {
  const win = new BrowserWindow({
    width: 800,
    height: 140,
    webPreferences: {
      nodeIntegration: true,
    },
    show: false,
    frame: false,
  });
  const {toggleWindow, hideWindow} = windowVisibilityUtilsFactory(win);

  win.loadFile(path.resolve(__dirname, 'static/index.html'));
  globalShortcut.register('Alt+Shift+C', toggleWindow);

  ipcMain.on('new-item-window_hide', toggleWindow);
  win.on('blur', hideWindow);
};
