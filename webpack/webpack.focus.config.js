const path = require('path');
const getConfig = require('./webpack.base.config');

module.exports = getConfig({
  entryPath: path.resolve(__dirname, '../windows/focus/entry.js'),
  outputPath: path.resolve(__dirname, '../windows/focus/static'),
  entryName: 'focus',
});
