const {app} = require('electron');

const initMainWindow = require('../windows/main');
const initNewItemWindow = require('../windows/new-item');
const initFocusWindow = require('../windows/focus');

module.exports = async function(store) {
  await app.whenReady();

  initMainWindow(store);
  initNewItemWindow(store);
  initFocusWindow(store);
};
