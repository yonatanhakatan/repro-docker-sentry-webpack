const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const SentryWebpackPlugin = require('@sentry/webpack-plugin');

const common = require('./webpack.common.js');
const configName = process.env.NODE_ENV || 'production';
const config = require(`./config/config.${configName}.js`);

const vendorRegExp = /[\\/]node_modules[\\/]/;
const vendorPackageNameRegExp = /[\\/]node_modules[\\/](.*?)([\\/]|$)/;

/**
 * generatePackageName: Generates a web-safe filename for the package based on it's filepath
 *
 * @param {string} modulePath
 * @return {string}
 */
const generatePackageName = modulePath => {
  // Gets the module path name (node_modules/packageName).
  const [_, packageName] = modulePath.match(vendorPackageNameRegExp);
  // npm package names are URL-safe, but some servers don't like @ symbols
  return `vendor.${packageName.replace('@', '')}`;
};

module.exports = merge(common, {
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.DefinePlugin(config),
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
      exclude: /vendor.*/,
    }),
    new SentryWebpackPlugin({
      include: './dist',
      ignore: '*vendor*',
      validate: true,
      release: 'test',
    }),
  ],
  optimization: {
    runtimeChunk: 'single',
    minimizer: [
      new UglifyJsPlugin({
        exclude: /vendor.react-intl-*/,
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
    ],
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: vendorRegExp,
          name(module) {
            return generatePackageName(module.context);
          },
        },
      },
    },
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[contenthash:8].js',
    sourceMapFilename: '[name].[contenthash:8].js.map',
  },
});
