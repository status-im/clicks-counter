const gulp = require('gulp')
const babel = require('gulp-babel')
const concat = require('gulp-concat-util')
const count = require('gulp-count')
const clean = require('gulp-clean')
const debug = require('gulp-debug');

gulp.task('clean', () =>
  gulp.src('dist/*').pipe(clean())
)

gulp.task('build', () =>
  gulp.src('src/**/*.js')
    .pipe(count('## js-files selected'))
    .pipe(babel())
    .pipe(debug({title: 'debug:'}))
    .pipe(concat.scripts('counter.js'))
    .pipe(gulp.dest('dist/'))
)

gulp.task('default', ['clean', 'build']);
