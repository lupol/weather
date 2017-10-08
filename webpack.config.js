/* eslint-disable */

const { resolve, join } = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    app: ['babel-polyfill', 'react-hot-loader/patch', './index.js']
  },
  output: {
    filename: 'bundle.js',
    path: join(__dirname, 'dist', 'assets'),
    publicPath: '/assets/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  context: resolve(__dirname, 'src'),

  devtool: 'cheap-module-source-map',

  devServer: {
    hot: true,
    contentBase: join(__dirname, 'dist'),
    publicPath: '/assets/',
    historyApiFallback: true,
    compress: true,
    port: 3000
  },
  resolveLoader: {
    moduleExtensions: ['-loader']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
      }
    ]
  },

  plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.NamedModulesPlugin()]
}
