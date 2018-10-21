const gulp = require('gulp');
const named = require('vinyl-named');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

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
  return gulp.src('js/base.js')
    .pipe(named())
    .pipe(webpackStream(webpackGulpConfig, webpack))
    .pipe(gulp.dest('build/js'));
});

gulp.task('javascript:build', () => {
  return gulp.src('js/base.js')
    .pipe(named())
    .pipe(webpackStream(Object.assign({}, webpackGulpConfig, {
      plugins: [
        new UglifyJsPlugin()
      ]
    }), webpack))
    .pipe(gulp.dest('build/js'));
});

gulp.task('javascript', gulp.series('javascript:dev'));
