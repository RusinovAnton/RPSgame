'use strict';

var gulp = require("gulp"),
    uglify = require("gulp-uglify"),
    plumber = require('gulp-plumber'),
    webpack = require("webpack-stream");

var config = {
  app: {
    src: './app/index.js',
    dest: './dist'
  },
  webpack: {
    config: './webpack.config.js'
  }
};


gulp.task('app', function(){
  return gulp.src(config.app.src)
      .pipe(plumber())
      .pipe(webpack( require(config.webpack.config) ))
      .pipe(uglify())
      .pipe(gulp.dest(config.app.dest));
});

gulp.task('watch', function(){
  gulp.watch('./app/**/*.js', ['app']);
});

gulp.task('default', ['app'], function(){

});
