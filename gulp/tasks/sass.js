const gulp = require('gulp');
const sequence = require('run-sequence');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const sassLint = require('gulp-sass-lint');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

const CONFIG = require('../config');

// Compiles Sass files into CSS
gulp.task('sass', (cb) => {
  sequence('sass:build', 'sass:lint', cb);
});

gulp.task('sass:build', () => {
  return gulp.src(CONFIG.SASS_FILES)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer({
      browsers: CONFIG.CSS_COMPATIBILITY
    })]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build/css'));
});

gulp.task('sass:lint', () => {
  return gulp.src(CONFIG.SASS_LINT_FILES)
    .pipe(sassLint({
      configFile: './.sass-lint.yml'
    }))
    .pipe(sassLint.format());
});
