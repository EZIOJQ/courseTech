const path = require('path');

module.exports = {
  entry: './views/js/main.jsx',
  output: {
    path: path.join(__dirname, '/views/static/js/'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        // Test for js or jsx files
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          // Convert ES6 syntax to ES5 for browser compatibility
          presets: ['env', 'react'],
          plugins: ["transform-class-properties"]
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};