'use strict';

var src = {
  sass: './src/*.scss',
  js: './src/*.js'
};

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglifyjs');
var webpack = require('gulp-webpack');

gulp.task('sass', function () {
 return gulp.src(src.sass)
   .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
   .pipe(gulp.dest('./dist'));
});

gulp.task('webpack', function() {
  return gulp.src('src/pureMasonry.js')
  .pipe(webpack( require('./webpack.config.js') ))
  .pipe(gulp.dest('dist/'));
});

gulp.task('uglify', function() {
  gulp.src('dist/pureMasonry.js')
    .pipe(uglify('pureMasonry.min.js'))
    .pipe(gulp.dest('dist/'))
});

gulp.task('default', ['sass', 'webpack']);

gulp.task('watch', function() {
  gulp.watch(src.sass, ['sass']);
  gulp.watch(src.js, ['webpack']);
});
