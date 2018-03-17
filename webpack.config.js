const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const uglifyjs = new UglifyJSPlugin({
  test: /\.js($|\?)/i,
  sourceMap: true,
});

const extractSass = new ExtractTextPlugin('./build/css/style.min.css');

module.exports = {
  entry: [
    './src/components/Main.jsx',
    // './src/styles/reset.css',
    // './src/styles/react-select.css',
    // './src/styles/style.css',
  ],
  plugins: [
    uglifyjs,
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
        test: /\.scss$/,
        exclude: /(node_modules)/,
        use: extractSass.extract({
          use: [{
            loader: 'css-loader?minimize', // translates CSS into CommonJS
          },
          {
            loader: 'sass-loader', // creates style nodes from JS strings
          }],
        }),
      },
    ],
  },
};
