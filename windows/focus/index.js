const path = require('path');
const {BrowserWindow} = require('electron');

const {hideWindow} = require('../utils');

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

  function showWindow() {
    win.show();
    win.setAlwaysOnTop(true, 'status');
  }

  function applyStateUpdate() {
    const state = store.store.getState();

    if (!state.focusedItem && win.isVisible()) {
      hideWindow(win);
    }

    if (state.focusedItem && !win.isVisible()) {
      showWindow();
    }

    win.webContents.send('state-update', store.store.getState());
  }

  win.loadFile(path.resolve(__dirname, 'static/index.html'));
  store.store.subscribe(applyStateUpdate);
};
