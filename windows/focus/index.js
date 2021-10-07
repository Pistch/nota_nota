const path = require('path');
const {BrowserWindow, globalShortcut} = require('electron');

module.exports = function(store) {
  const win = new BrowserWindow({
    width: 250,
    height: 100,
    webPreferences: {
      nodeIntegration: true,
    },
    show: false,
    focusable: false,
  });

  function sendStateToWindow() {
    const state = store.store.getState();

    // if (state.focusedItem && !win.isVisible()) {
    //   app.show();
    //   win.show();
    //   win.setAlwaysOnTop(true, 'status');
    // } else if (win.isVisible()) {
    //   win.hide();
    // }

    win.webContents.send('state-update', store.store.getState());
  }

  win.loadFile(path.resolve(__dirname, 'static/index.html'));

  globalShortcut.register('Alt+Shift+F', () => {
    if (!win.isVisible()) {
      win.show();
      win.setAlwaysOnTop(true, 'status');
    } else {
      win.hide();
    }
  });
  store.store.subscribe(sendStateToWindow);
};
