var gulp            = require('gulp');
var util            = require('gulp-util');
var plumber         = require('gulp-plumber');
var notify          = require("gulp-notify");
var pug             = require('gulp-pug');

var fs             = require('fs');
const data   = require('gulp-data');
// const rename = require('gulp-rename');

// var template = './pug/card/test.pug';
var jsonPath = './pug/pug-prod.json';

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

/**************************************************
 * task
 *************************************************/
gulp.task('pug-prod', () => {
  const json = JSON.parse(fs.readFileSync(jsonPath));

  for (let key of json) {
    for (let index in key.templateFilename) {
      gulp.src(key.templateDirectory + key.templateFilename[index])
        // .pipe(rename(key.no + ".html"))
        .pipe(data (function (file){
          return {
            'fileName': file.path.split('/').pop().replace('.html', ''),
            'planList': json
          }
        }))
        .pipe(pug({
          pretty: true
        }))
        .pipe(gulp.dest('../' + key.directory + '/'));
    }
  }
});

gulp.task('watch', function () {
  gulp.watch(['./pug/**/*.pug'], ['pug']);
});

gulp.task('default', ['watch','pug']);
