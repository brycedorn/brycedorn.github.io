var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('js', function() {
  gulp.src('src/js/main.js')
    .pipe(browserify({transform:'reactify'}))
    .pipe(uglify())
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('css', function() {
  gulp.src(['src/css/styles.css','src/css/font-awesome.min.css'])
  	.pipe(concat('styles.css'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('img', function() {
  gulp.src('src/img/whale.png')
    .pipe(gulp.dest('dist/img'));
});

gulp.task('fonts', function() {
  gulp.src('src/fonts/*')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('copy', function() {
  gulp.src('src/index.html')
    .pipe(gulp.dest(''));
});

gulp.task('default',['js', 'css', 'img', 'fonts', 'copy']);

gulp.task('watch', function() {
  gulp.watch('src/**/*.*', ['default']);
});
