'use strict';

var gulp = require('gulp');
var server = require('gulp-server-livereload');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
//var minifyCss = require('gulp-csso');
var minifyCss = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');

//server
gulp.task('serv', function() {
  gulp.src('app')
    .pipe(server({
      livereload: true,
      open: true
    }));
});

//styles
gulp.task('style', function () {
  return gulp.src('./app/sass/**/*.sass')
    .pipe(sass().on('error', sass.logError)) // {outputStyle: 'compressed'}
    .pipe(prefix({
      browsers: ['last 15 versions']
    }))
    .pipe(gulp.dest('./app/css'));
});

//build
gulp.task('build', function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        //.pipe(gulpif('*.html', htmlmin({collapseWhitespace: true})))
        .pipe(gulp.dest('public'));
});

gulp.task('watch', function () {
  gulp.watch('./app/sass/**/*.sass', ['style']);
});

gulp.task('default', ['serv', 'watch']);