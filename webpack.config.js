var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

  entry: {
    'app': './src/main.ts',
    'polyfills': [
      'core-js/es6',
      'core-js/es7/reflect',
      'zone.js/dist/zone'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      {test: /\.component.ts$/, loader: 'ts-loader!angular2-template-loader'},
      {test: /\.ts$/, exclude: /\.component.ts$/, loader: 'ts-loader'},
      {test: /\.html$/, loader: 'raw-loader'},
      {test: /\.css$/, include: path.resolve('src/app'), loader: 'raw-loader'},
      {test: /\.css$/, exclude: path.resolve('src/app'), loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })},
      {test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/, loader: 'file-loader?name=fonts/[name].[ext]'}
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.html', '.css']
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'polyfills'
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.DefinePlugin({
      app: {
        environment: JSON.stringify(process.env.APP_ENVIRONMENT || 'development')
      }
    }),
    new ExtractTextPlugin('[name].css')
  ]

};
