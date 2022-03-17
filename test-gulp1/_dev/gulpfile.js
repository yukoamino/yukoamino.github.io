var gulp            = require('gulp');
var util            = require('gulp-util');
var plumber         = require('gulp-plumber');
var notify          = require("gulp-notify");
var pug             = require('gulp-pug');

/*--------------------------------------------------------*/
gulp.task('pug', function (){
  gulp
    .src([
      './pug/**/*.pug',
    ])
    .pipe(plumber({ errorHandler: notify.onError("pug Error\n <%= error.message %>") }))
    .pipe(pug({pretty: util.env.d ? true : true}))
    .pipe(gulp.dest('../'));
});

gulp.task('watch', function () {
  gulp.watch(['./pug/**/*.pug'], ['pug']);
});

gulp.task('default', ['watch','pug']);
