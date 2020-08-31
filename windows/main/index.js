const path = require('path');
const {BrowserWindow, globalShortcut, ipcMain} = require('electron');

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

  function toggleWindow() {
    if (win.isFocused() && win.isVisible()) {
      win.hide();
    } else {
      win.show();
      win.focus();
    }
  }

  win.loadFile(path.resolve(__dirname, 'static/index.html'));
  globalShortcut.register('Alt+Shift+Z', toggleWindow);

  ipcMain.on('hide', toggleWindow);
  ipcMain.on('new-item', (event, payload) => {
    console.log(payload);
  });
  win.on('blur', () => win.hide());
};
