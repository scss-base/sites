'use strict';

const autoprefixer = require('gulp-autoprefixer');
const gulp = require('gulp/index');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', () => {
  return gulp.src('./scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(['IE 10', '> 1%']))
    //.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./css'));
});
