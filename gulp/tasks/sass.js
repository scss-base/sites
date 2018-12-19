const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const sassLint = require('gulp-sass-lint');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

const CONFIG = require('../config');


gulp.task('sass:build', () => {
  return gulp.src(CONFIG.SASS.SRC)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer({
      browsers: CONFIG.CSS_COMPATIBILITY
    })]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(CONFIG.SASS.DEST));
});

gulp.task('sass:lint', () => {
  return gulp.src(CONFIG.SASS.FILES)
    .pipe(sassLint({
      configFile: './.sass-lint.yml'
    }))
    .pipe(sassLint.format());
});

gulp.task('sass', gulp.series('sass:build', 'sass:lint'));
