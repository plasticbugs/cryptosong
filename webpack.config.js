const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const uglifyjs = new UglifyJSPlugin({
  test: /\.js($|\?)/i,
  sourceMap: true,
});

const extractSass = new ExtractTextPlugin({
  filename: './build/css/style.min.css',
  disable: process.env.NODE_ENV === 'development',
});

module.exports = {
  entry: [
    './src/components/Main.jsx',
    // './src/styles/reset.css',
    // './src/styles/react-select.css',
    // './src/styles/style.css',
  ],
  plugins: [
    // PRODUCTION
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     'NODE_ENV': '"production"'
    //   }
    // }),
    // new webpack.optimize.UglifyJsPlugin(),
    // PRODUCTION

    // uglifyjs,
    extractSass,
  ],
  output: {
    filename: 'build/js/bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(css|sass|scss)$/,
        use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader' }),
      },
      {
        test: [/\.eot$/, /\.png$/, /\.jpg$/, /\.gif$/, /\.ttf$/, /\.svg$/, /\.woff$/, /\.woff2$/],
        loader: 'url-loader',
        // output: './dist/public/css'
      },
    ],
  },
};
