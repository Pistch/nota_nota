const {ipcRenderer} = require('electron');

const input = document.getElementById('new-item');

window.addEventListener('keyup', (event) => {
  if (event.key === 'Escape') {
    ipcRenderer.send('hide');
    input.value = '';

    return;
  }

  if (event.key === 'Enter') {
    ipcRenderer.send('redux-action', {
      type: 'items.create',
      payload: input.value,
    });
    ipcRenderer.send('hide');
    input.value = '';

    return;
  }
});

window.addEventListener('focus', () => {
  input.focus();
});
