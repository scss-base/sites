const gulp = require('gulp');
const requireDir = require('require-dir');

const CONFIG = require('./gulp/config');

requireDir('./gulp/tasks');

// Watch files for changes
gulp.task('watch', function() {
  gulp.watch(CONFIG.SASS.FILES, gulp.series('sass'));
  gulp.watch(CONFIG.JS.FILES, gulp.series('javascript'));
});
