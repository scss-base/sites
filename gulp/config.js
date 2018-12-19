module.exports = {

  CSS_COMPATIBILITY: [
    'last 2 versions',
    'ie >= 9',
    'Android >= 2.3',
    'ios >= 7',
  ],

  JS: {
    SRC: ['src/js/base.js'],
    DEST: 'build/js',
    FILES: ['src/js/**/*.js'],
  },

  SASS: {
    SRC: ['src/scss/base.scss'],
    DEST: 'build/css',
    FILES: ['src/scss/**/*.scss'],
  },
};
