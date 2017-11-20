const gulp = require('gulp');
const sequence = require('run-sequence');
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
};

gulp.task('javascript', (cb) => {
  sequence('javascript:dev', cb);
});

gulp.task('javascript:dev', function () {
  return gulp.src('js/base.js')
    .pipe(named())
    .pipe(webpackStream(webpackGulpConfig, webpack))
    .pipe(gulp.dest('build/js'));
});

gulp.task('javascript:build', function () {
  return gulp.src('js/base.js')
    .pipe(named())
    .pipe(webpackStream(Object.assign({}, webpackGulpConfig, {
      plugins: [
        new UglifyJsPlugin()
      ]
    }), webpack))
    .pipe(gulp.dest('build/js'));
});
