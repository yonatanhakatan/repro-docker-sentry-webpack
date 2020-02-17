const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const paths = {
  APP_DIR: path.resolve(__dirname, 'src'),
};

module.exports = {
  entry: './src/index.js',
  resolve: {
    alias: {
      '@containers': path.resolve(paths.APP_DIR, 'containers'),
      '@components': path.resolve(paths.APP_DIR, 'components'),
      '@styles': path.resolve(paths.APP_DIR, 'styles'),
      '@data': path.resolve(paths.APP_DIR, 'data'),
      '@constants': path.resolve(paths.APP_DIR, 'constants'),
      '@utils': path.resolve(paths.APP_DIR, 'utils'),
      '@helpers': path.resolve(paths.APP_DIR, 'helpers'),
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Development',
      template: './src/index.ejs',
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/assets/favicons/*',
        flatten: true,
      },
      {
        from: 'src/assets/ios/*',
        to: '.well-known/',
        flatten: true,
      },
      {
        from: 'src/assets/ios/*',
        flatten: true,
      },
    ]),
  ],
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
    ],
  },
  output: {
    publicPath: '/',
  },
};
