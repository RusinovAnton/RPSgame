'use strict';

const gulp = require("gulp"),
    uglify = require("gulp-uglify"),
    webpack = require("webpack-stream");

const config = {
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
      .pipe(webpack( require(config.webpack.config) ))
      .pipe(uglify())
      .pipe(gulp.dest(config.app.dest));
});

gulp.task('watch', ['app'], function(){
  return gulp.watch('./app/**/*.js', ['app']);
});

gulp.task('default', ['app'], function(){

});
