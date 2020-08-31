const initWindows = require('./windows');
const initStore = require('./store'); 

const store = initStore();

initWindows(store);