const {app} = require('electron');

const initMainWindow = require('../windows/main');
const initNewItemWindom = require('../windows/newItem');

module.exports = async function() {
    await app.whenReady();

    initMainWindow();
    initNewItemWindom();
}