const path = require('path');

module.exports = env => {
  const MINIMIZE = !!(env && env.MINIMIZE);

  return {
    devtool: 'source-map',
    entry: {
      'base': './src/js/entries/base.js',
      'base.core': './src/js/entries/base.core.js',
      'base.dropdown': './src/js/entries/base.dropdown.js',
      'base.dropdown-menu': './src/js/entries/base.dropdown-menu.js',
      'base.modal': './src/js/entries/base.modal.js',
      'base.toggler': './src/js/entries/base.toggler.js',
      'base.tooltip': './src/js/entries/base.tooltip.js',
    },
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
    optimization: {
      minimize: MINIMIZE,
    },
    output: {
      filename: MINIMIZE ? '[name].min.js' : '[name].js',
      path: path.resolve(__dirname, 'dist', 'js'),
    },
  };
};
