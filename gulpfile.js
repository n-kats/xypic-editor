var gulp = require('gulp'),
    plumber = require('gulp-plumber');
  
gulp.task('develop', function () {
});

var tsc = require('gulp-tsc');
gulp.task('tsc', function () {
  gulp.src(["src/**/*.ts"])
    .pipe(plumber())
    .pipe(tsc())
    .pipe(gulp.dest('./dist/javascripts'));
});

var compass = require('gulp-compass');
gulp.task('compass', function () {
  gulp.src(["src/**/*.sass"])
    .pipe(plumber())
    .pipe(compass({
      project: __dirname,
      css: 'css',
      sass: 'sass',
      image: 'img'
    })).pipe(gulp.dest('./dist/stylesheets'));
});

gulp.task('default', ['develop']);
gulp.task('build', ['tsc', 'compass']);
