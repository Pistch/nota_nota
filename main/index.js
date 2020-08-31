const { app, BrowserWindow, globalShortcut, ipcMain } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 600,
    height: 300,
    webPreferences: {
      nodeIntegration: true
    },
    show: false,
    frame: false
  });

  win.loadFile('../index.html');
  globalShortcut.register('Alt+Shift+X', () => {
    if (win.isFocused() && win.isVisible()) {
        win.hide();
    } else {
        win.show();
        win.focus();
    }
  });
  win.on('blur', () => {
      win.hide();
  });
  ipcMain.on('asynchronous-message', event => {
    console.log(event);
  });
}

app.whenReady().then(createWindow);