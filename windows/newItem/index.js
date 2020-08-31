const path = require('path');
const {BrowserWindow, globalShortcut, ipcMain} = require('electron');

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

  function toggleWindow() {
    if (win.isFocused() && win.isVisible()) {
      win.hide();
    } else {
      win.show();
      win.focus();
    }
  }

  win.loadFile(path.resolve(__dirname, 'static/index.html'));
  globalShortcut.register('Alt+Shift+X', toggleWindow);

  ipcMain.on('hide', toggleWindow);
  win.on('blur', () => win.hide());
};
