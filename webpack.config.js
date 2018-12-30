const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: './src/js/base.js',
  mode: 'production',
  module: {
    rules: [
      {
        test: /.js$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  },
  output: {
    filename: 'base.js',
    path: path.resolve(__dirname, 'dist', 'js'),
  },
};
