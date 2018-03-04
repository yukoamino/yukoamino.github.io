var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function(){
  gulp.src('./resource/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./htdocs/css/'));
});

gulp.task('watch', function () {
  gulp.watch('./resource/scss/**/*.scss', ['sass']);
});

gulp.task('default', ['watch']);