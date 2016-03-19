var gulp = require('gulp');
var sass = require('gulp-sass');
var ignore = require('gulp-ignore');
var del = require('del');
var gutil = require('gulp-util');
var minifyCss = require('gulp-minify-css');
var ngmin = require('gulp-ngmin');
var uglify = require('gulp-uglify');
var concat = require("gulp-concat");
var babel = require('gulp-babel');

var dirs = {
  src: {
    js: "./client/src/**/*.js",
    scss: "./client/src/app.scss",
    html: "./client/src/**/*.html",
    lib: "./client/assets/**/*"
  },
  dist: {
    html: 'dist/',
    css: 'dist/',
    lib: 'dist/'
  }
}

gulp.task('default', ['clean', 'sass', 'assets', 'bundle', 'watch']);
gulp.task('buildDontWatch', ['clean', 'sass', 'assets', 'bundle']);

gulp.task('clean', function(){
  del('dist/*');
})

gulp.task('sass', function(done) {
  gulp.src(dirs.src.scss)
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(minifyCss())
    .pipe(gulp.dest(dirs.out.css))
    .on('end', done);
});

gulp.task('assets',['sass'], function() {
  gulp.src(dirs.src.lib)
    .pipe(gulp.dest(dirs.out.lib))
});

gulp.task('bundle', function(done) {
  gulp.src('src/app/index.html')
    .pipe(gulp.dest('dist'))
  gulp.src(dirs.src.html)
    .pipe(ignore('index.html'))
    .pipe(ignore('app.scss'))
    .pipe(ignore('my_scss'))
    .pipe(gulp.dest('dist/js'))
  gulp.src(dirs.src.js)
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('bundle.js'))
    .pipe(ngmin({dynamic: true}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .on('end', done)
});

gulp.task('watch', function() {
  gulp.watch(dirs.src.html, ['assets', 'bundle']);
  gulp.watch(dirs.src.lib, ['assets']);
  gulp.watch(dirs.src.scss, ['sass']);
  gulp.watch(dirs.src.js, ['buildDontWatch']);
});
