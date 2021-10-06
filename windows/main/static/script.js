const {ipcRenderer} = require('electron');

const {App} = require('./build.js');

const app = new App({
  target: document.getElementById('root'),
  props: {
    items: [],
    inputValue: '',
    onClose: () => {
      ipcRenderer.send('main-window_hide');
      app.$set({inputValue: ''});
    },
    onSend: (newValue) => {
      ipcRenderer.send('redux-action', {
        type: 'items.create',
        payload: newValue,
      });
      ipcRenderer.send('main-window_hide');
      app.$set({inputValue: ''});
    },
  },
});

ipcRenderer.on('state-update', (_, newState) => {
  app.$set({items: newState.items});
});
