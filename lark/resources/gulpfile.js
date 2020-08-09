'use strict';

const fs = require('fs');
const path = require('path');

const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cached = require('gulp-cached');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const watch = require('gulp-watch');
const encode = require('gulp-convert-encoding');
// const pleeease = require('gulp-pleeease');
const replace = require('gulp-replace');
const browserSync = require('browser-sync');

// ------------------------------------------------------------------------------
// PC:sass / scss / css
// ------------------------------------------------------------------------------
gulp.task('pc:sass', function() {
  return (gulp
      .src([
        __dirname + '/scss/css/**/*.scss'
      ])
      .pipe(plumber({ errorHandler: notify.onError('<%= error.message %>') }))
      // .pipe(cached('sass'))
      .pipe(
        sass({
          outputStyle: 'expanded'
        }).on('error', sass.logError)
      )
        // .pipe(pleeease({
        //     rem: {rootValue: '10px'},
        //     mqpacker: true,
        // }))
      .pipe(
        autoprefixer({
          browsers: [
            'last 2 versions',
            'ie >= 9',
            'ChromeAndroid >= 6',
            'Android >= 6',
            'iOS >= 9'
          ]
        })
      )
      //.pipe(replace('UTF-8', 'Shift_JIS'))
      //.pipe(encode({ to: 'Shift_JIS' }))
      .pipe(gulp.dest(__dirname + '/../htdocs/css/')) );
});

// ------------------------------------------------------------------------------
// PC:watch
// ------------------------------------------------------------------------------
gulp.task('pc:watch', function() {
  watch(__dirname + '/scss/css/**/*.scss', function() {
    return gulp.start('pc:sass');
  });
});

// pc:watch
gulp.task('pc', ['pc:watch']);

// default
gulp.task('default', ['pc']);
