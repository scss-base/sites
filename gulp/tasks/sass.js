'use strict';

const autoprefixer = require('gulp-autoprefixer'),
  config = require('../config'),
  gulp = require('gulp'),
  sass = require('gulp-sass'),
  sassdoc = require('sassdoc'),
  sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', () => {
  return gulp.src(config.sass.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(config.sass.autoprefixer))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.sass.dev));
});

gulp.task('sass-doc', () => {
  return gulp.src(config.sass.src)
    .pipe(sassdoc({
      dest: 'docs'
    }));
});
