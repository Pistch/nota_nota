const path = require('path');
const getConfig = require('./webpack.base.config');

module.exports = getConfig({
  entryPath: path.resolve(__dirname, '../windows/main/entry.js'),
  outputPath: path.resolve(__dirname, '../windows/main/static'),
  entryName: 'main',
});
