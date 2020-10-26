const gulp = require('gulp')
const gulpBabel = require('gulp-babel')
const gulpClean = require('gulp-clean')
const gulpPrint = require('gulp-print').default
const nodemon = require('gulp-nodemon')

const devel = (done) =>
  nodemon({ script: 'src/server.js', exec: 'babel-node', done })
    .on('restart', () => { console.log('>> node restart') })

const clean = () => gulp.src('dist/*').pipe(gulpClean())

/* WARNING: This is broken right now */
const build = () =>
  gulp.src('src/**/*.js')
    .pipe(gulpBabel())
    .pipe(gulpPrint())
    .pipe(gulp.dest('dist/'))

exports.devel = devel
exports.clean = clean
exports.build = build
exports.default = gulp.series(clean, build)
