const path = require('path');
const {BrowserWindow, globalShortcut, ipcMain, app} = require('electron');

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

  function isWindowActive() {
    return win.isFocused() && win.isVisible();
  }

  function sendStateToWindow() {
    win.webContents.send('state-update', store.store.getState());
  }

  function hideWindow() {
    win.hide();
    app.hide();
  }

  function toggleWindow() {
    if (isWindowActive()) {
      hideWindow();
    } else {
      win.show();
      sendStateToWindow();
      win.focus();
    }
  }

  win.loadFile(path.resolve(__dirname, 'static/index.html'));
  globalShortcut.register('Alt+Shift+Z', toggleWindow);

  ipcMain.on('main-window_hide', toggleWindow);
  win.on('blur', () => hideWindow());

  store.store.subscribe(sendStateToWindow);
};
