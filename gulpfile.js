var gulp = require('gulp'),
    image = require('gulp-image'),
    watch = require('gulp-watch'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    path = require('path'),
    LessPluginCleanCSS = require('less-plugin-clean-css'),
    cleancss = new LessPluginCleanCSS({
      advanced: true
    });

var jsPlugins = [
  './bower_components/jquery/dist/jquery.js',
  './bower_components/bootstrap/dist/js/bootstrap.js',
  './bower_components/jquery.nicescroll/jquery.nicescroll.js'
];

gulp.task('scripts', function() {
  return gulp.src(jsPlugins.concat(['./assets/js/**/*.js']))
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('styles', function() {
  return gulp.src('./assets/less/app.less')
    .pipe(less({
      paths: [path.join(__dirname, 'bower_components')],
      plugins: [cleancss]
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('images', function() {
  return gulp.src('./assets/images/**/*')
    .pipe(image())
    .pipe(gulp.dest('./dist/img'));
});

gulp.task('fonts', function() {
  return gulp.src(['./assets/fonts/**/*', './bower_components/**/fonts/*'], { base: 'fonts' })
    .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('build', ['css', 'js', 'imgs']);

gulp.task('watch-scripts', function() {
  return gulp.watch('./assets/js/**/*.js', ['scripts']);
});

gulp.task('watch-styles', function() {
  return gulp.watch('./assets/less/**/*.less', ['styles']);
});

gulp.task('watch-images', function() {
  return gulp.watch('./assets/images/**/*', ['images']);
});

gulp.task('watch', ['watch-scripts', 'watch-styles']);

gulp.task('default', ['watch']);
