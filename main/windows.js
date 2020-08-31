const {app} = require('electron');

const initMainWindow = require('../windows/main');
const initNewItemWindom = require('../windows/newItem');

module.exports = async function(store) {
  await app.whenReady();

  initMainWindow(store);
  initNewItemWindom(store);
};
