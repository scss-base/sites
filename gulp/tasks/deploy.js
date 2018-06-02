const gulp = require('gulp');
const inquirer = require('inquirer');

const CURRENT_VERSION = require('../../package.json').version;
let NEXT_VERSION;

gulp.task('deploy:prompt', (cb) => {
  inquirer.prompt([{
    type: 'input',
    name: 'version',
    message: 'What version are we moving to? (Current version is ' + CURRENT_VERSION + ')'
  }])
    .then((res) => {
      NEXT_VERSION = res.version;
      cb();
    });
});

gulp.task('deploy', gulp.series('deploy:prompt'));
