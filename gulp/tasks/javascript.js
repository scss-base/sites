const gulp = require('gulp');
const named = require('vinyl-named');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const CONFIG = require('../config');

const webpackGulpConfig = {
  externals: {},
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
  mode: 'development',
};

gulp.task('javascript:dev', () => {
  return gulp.src(CONFIG.JS.SRC)
    .pipe(named())
    .pipe(webpackStream(webpackGulpConfig, webpack))
    .pipe(gulp.dest(CONFIG.JS.DEST));
});

gulp.task('javascript:build', () => {
  return gulp.src(CONFIG.JS.SRC)
    .pipe(named())
    .pipe(webpackStream(Object.assign({}, webpackGulpConfig, {
      plugins: [
        new UglifyJsPlugin()
      ]
    }), webpack))
    .pipe(gulp.dest(CONFIG.JS.DEST));
});

gulp.task('javascript', gulp.series('javascript:dev'));
