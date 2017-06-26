'use strict';

var src = {
  sass: './src/*.scss',
  js: './src/*.js'
};

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglifyjs');

gulp.task('sass', function () {
 return gulp.src(src.sass)
   .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
   .pipe(gulp.dest('./dist'));
});

gulp.task('js', function() {
  gulp.src(src.js)
    .pipe(uglify())
    .pipe(gulp.dest('./dist'))
});

gulp.task('default', ['sass', 'js']);

gulp.task('watch', function() {
  gulp.watch(src.sass, ['sass']);
  gulp.watch(src.js, ['js']);
});
