const {ipcRenderer} = require('electron');

const input = document.getElementById('new-item');
const itemsField = document.querySelector('.items');

window.addEventListener('keyup', (event) => {
  if (event.key === 'Escape') {
    ipcRenderer.send('main-window_hide');
    input.value = '';

    return;
  }

  if (event.key === 'Enter') {
    ipcRenderer.send('redux-action', {
      type: 'items.create',
      payload: input.value,
    });
    ipcRenderer.send('main-window_hide');
    input.value = '';

    return;
  }
});

window.addEventListener('focus', () => {
  input.focus();
});

ipcRenderer.on('state-update', (_, newState) => {
  itemsField.textContent = newState.items
      .map((itemText) => `"${itemText}"`).join(', ');
});
