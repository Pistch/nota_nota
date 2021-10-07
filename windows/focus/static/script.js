const {ipcRenderer} = require('electron');

const {App} = require('./build.js');

const app = new App({
  target: document.getElementById('root'),
  props: {
    focusedItem: '',
    onClose: () => {
      ipcRenderer.send('redux-action', {
        type: 'items.focus',
        payload: null,
      });
    },
  },
});

ipcRenderer.on('state-update', (_, newState) => {
  console.log(newState);

  app.$set({focusedItem: newState.focusedItem});
});
