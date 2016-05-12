'use strict';

const gulp = require("gulp");
const uglify = require("gulp-uglify");
const webpack = require("webpack-stream");
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');

const config = {
  app: {
    src: './app/index.js',
    dest: './dist/assets'
  },
  webpack: {
    config: './webpack.config.js'
  }
};


gulp.task('app', function () {
  return gulp.src(config.app.src)
    .pipe(plumber())
    .pipe(webpack(require(config.webpack.config)))
    //.pipe(uglify())
    .pipe(gulp.dest(config.app.dest));
});

gulp.task('watch', ['app'], function () {
  return gulp.watch('./app/**/*.js', ['app']);
});

gulp.task('default', ['app'], function () {

});
