const {ipcRenderer} = require('electron');
const {App} = require('./build');

const app = new App({
  target: document.getElementById('root'),
  props: {
    inputValue: '',
    onClose: () => {
      ipcRenderer.send('new-item-window_hide');
      app.$set({inputValue: ''});
    },
    onSend: (newValue) => {
      console.log(newValue);

      ipcRenderer.send('redux-action', {
        type: 'items.create',
        payload: newValue,
      });
      ipcRenderer.send('new-item-window_hide');
      app.$set({inputValue: ''});
    },
  },
});
