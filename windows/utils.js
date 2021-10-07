const {app, BrowserWindow} = require('electron');

function isWindowActive(win) {
  return win.isFocused() && win.isVisible();
}

function showWindow(win) {
  win.show();
  win.focus();
}

function hideWindow(win) {
  win.hide();

  const visibleWindows = BrowserWindow.getAllWindows()
      .filter((win) => win.isVisible());

  if (!visibleWindows.length) {
    app.hide();
  }
}

function toggleWindow(win) {
  if (isWindowActive(win)) {
    hideWindow(win);
  } else {
    showWindow(win);
  }
}

module.exports.showWindow = showWindow;
module.exports.hideWindow = hideWindow;
module.exports.toggleWindow = toggleWindow;
module.exports.windowVisibilityUtilsFactory = (win) => {
  return {
    showWindow: showWindow.bind(null, win),
    hideWindow: hideWindow.bind(null, win),
    toggleWindow: toggleWindow.bind(null, win),
    isWindowActive: isWindowActive.bind(null, win),
  };
};
