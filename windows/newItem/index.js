const path = require('path');
const {BrowserWindow, globalShortcut, ipcMain} = require('electron');

function createWindow(store) {
  const win = new BrowserWindow({
    width: 600,
    height: 300,
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

  win.loadFile(path.resolve(__dirname, 'index.html'));
  globalShortcut.register('Alt+Shift+X', toggleWindow);
  
  ipcMain.on('hide', toggleWindow);
  ipcMain.on('new-item', (event, payload) => {
    console.log(payload);
  });
  win.on('blur', () => {
    win.hide();
  });
}

module.exports = createWindow;