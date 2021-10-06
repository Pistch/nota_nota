const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = function({entryPath, entryName, outputPath}) {
  return {
    entry: {
      build: entryPath,
    },
    resolve: {
      alias: {
        svelte: path.dirname(require.resolve('svelte/package.json')),
      },
      extensions: ['.mjs', '.js', '.svelte'],
      mainFields: ['svelte', 'browser', 'module', 'main'],
    },
    output: {
      path: outputPath,
      filename: '[name].js',
      chunkFilename: '[name].[id].js',
      library: entryName,
      libraryTarget: 'umd',
    },
    module: {
      rules: [
        {
          test: /\.svelte$/,
          use: {
            loader: 'svelte-loader',
            options: {
              compilerOptions: {
                dev: !prod,
              },
              emitCss: true,
              hotReload: false,
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
          ],
        },
        {
          // required to prevent errors from Svelte on Webpack 5+
          test: /node_modules\/svelte\/.*\.mjs$/,
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(js)$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
    mode,
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
    ],
    devtool: false,
  };
};
