const {app} = require('electron');

const initMainWindow = require('../windows/main');
const initNewItemWindow = require('../windows/new-item');

module.exports = async function(store) {
  await app.whenReady();

  initMainWindow(store);
  initNewItemWindow(store);
};
