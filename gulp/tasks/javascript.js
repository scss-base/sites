const gulp = require('gulp');
const named = require('vinyl-named');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');

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


gulp.task('javascript', function () {
  return gulp.src('js/base.js')
    .pipe(named())
    .pipe(webpackStream(webpackGulpConfig, webpack))
    .pipe(gulp.dest('build/js'));
});
