var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css');

gulp.task('js', function() {
  gulp.src('src/js/main.js')
    .pipe(browserify({transform:'reactify'}))
    .pipe(uglify())
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('css', function() {
  gulp.src(['src/css/fontello.css','src/css/styles.css'])
  	.pipe(concat('styles.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('img', function() {
  gulp.src('src/img/whale.png')
    .pipe(gulp.dest('dist/img'));
});

gulp.task('fonts', function() {
  gulp.src('src/font/*')
    .pipe(gulp.dest('dist/font'));
});

gulp.task('copy', function() {
  gulp.src('src/index.html')
    .pipe(gulp.dest(''));
});

gulp.task('connect', function() {
  connect.server({
    root: './',
    livereload: true
  });
});

gulp.task('all',['js', 'css', 'img', 'fonts', 'copy'])
gulp.task('default',['all', 'connect']);

gulp.task('watch', function() {
  gulp.watch('src/**/*.*', ['all']);
});
