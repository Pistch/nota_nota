const {app} = require('electron');

function isWindowActive(win) {
  return win.isFocused() && win.isVisible();
}

function hideWindow(win) {
  win.hide();
  app.hide();
}

function toggleWindow(win) {
  if (isWindowActive(win)) {
    hideWindow(win);
  } else {
    win.show();
    win.focus();
  }
}

module.exports.hideWindow = hideWindow;
module.exports.toggleWindow = toggleWindow;
module.exports.windowVisibilityUtilsFactory = (win) => {
  return {
    hideWindow: hideWindow.bind(null, win),
    toggleWindow: toggleWindow.bind(null, win),
    isWindowActive: isWindowActive.bind(null, win),
  };
};
