const path = require('path');
const {BrowserWindow, globalShortcut, ipcMain, app} = require('electron');

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

  function hideWindow() {
    win.hide();
    app.hide();
  }

  function toggleWindow() {
    if (win.isFocused() && win.isVisible()) {
      hideWindow();
    } else {
      win.show();
      win.focus();
    }
  }

  win.loadFile(path.resolve(__dirname, 'static/index.html'));
  globalShortcut.register('Alt+Shift+C', toggleWindow);

  ipcMain.on('new-item-window_hide', toggleWindow);
  win.on('blur', () => hideWindow());
};
