const path = require('path');
const getConfig = require('./webpack.base.config');

module.exports = getConfig({
  entryPath: path.resolve(__dirname, '../windows/new-item/entry.js'),
  outputPath: path.resolve(__dirname, '../windows/new-item/static'),
  entryName: 'new-item',
});
