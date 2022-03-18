var gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  notify = require('gulp-notify'),
  plumber = require('gulp-plumber'),
  sass = require('gulp-sass')(require('sass')),
  fs = require('fs'),
  util = require('gulp-util'),

  pug = require('gulp-pug'),
  data = require('gulp-data');

var jsonPath = './pug/pug-prod.json';

//------------------------------------------------------------------------------
// scss
//------------------------------------------------------------------------------
gulp.task('sp:sass', () => {
  return gulp
    .src(__dirname + '/scss/**/*.scss')
    .pipe(
      plumber({
        errorHandler: notify.onError('<%= error.message %>'),
      })
    )
    .pipe(
      sass({
        outputStyle: 'expanded',
      }).on('error', sass.logError)
    )
    .pipe(
      autoprefixer({
        overrideBrowserslist: [
          'last 2 versions',
          'ie >= 9',
          'ChromeAndroid >= 6',
          'Android >= 6',
          'iOS >= 9',
        ],
      })
    )
    .pipe(gulp.dest('../assets/css'));
});

gulp.task('sp:watch', () => {
  gulp.watch(__dirname + '/scss/**/*.scss', ['sp:sass']);
});

//------------------------------------------------------------------------------
// pug
//------------------------------------------------------------------------------
gulp.task('pug', function (){
  gulp
    .src([
      './pug/**/*.pug', '!./pug/_**/*.pug', '!./pug/**/_*.pug'
    ])
    .pipe(plumber({ errorHandler: notify.onError("pug Error\n <%= error.message %>") }))
    .pipe(pug({pretty: util.env.d ? true : true}))
    .pipe(gulp.dest('../'));
});

gulp.task('pug-prod', () => {
  const json = JSON.parse(fs.readFileSync(jsonPath));

  for (let key of json) {
    for (let index in key.templateFilename) {
      gulp.src(key.templateDirectory + key.templateFilename[index])
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
  gulp.watch(['./pug/**/*.pug', '!./pug/_**/*.pug', '!./pug/**/_*.pug'], ['pug']);
});

gulp.task('watch-prod', function () {
  gulp.watch(['./pug/_**/*.pug'], ['pug-prod']);
});

gulp.task('default', ['watch','pug','pug-prod','watch-prod','sp:watch']);
