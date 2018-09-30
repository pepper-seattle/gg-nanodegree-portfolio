const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const eslint = require('gulp-eslint');
const jasmineBrowser = require('gulp-jasmine-browser');
const sourcemaps = require('gulp-sourcemaps');

gulp.task("default", ["styles"], function() {
  gulp.watch("sass/**/*.scss", ["styles"]);
  browserSync.init({
    server: "./"
  });
});

gulp.task('lint', function() {
  return (
      gulp
          .src(['js/**/*.js'])
          // eslint() attaches the lint output to the eslint property
          // of the file object so it can be used by other modules.
          .pipe(eslint())
          // eslint.format() outputs the lint results to the console.
          // Alternatively use eslint.formatEach() (see Docs).
          .pipe(eslint.format())
          // To have the process exit with an error code (1) on
          // lint error, return the stream and pipe to failOnError last.
          .pipe(eslint.failOnError())
  );
});

gulp.task("styles", function() {
  gulp
    .src("sass/**/*.scss")
    .pipe(sass())
    .on("error", sass.logError)
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"]
      })
    )
    .pipe(gulp.dest("./css"))
});

gulp.task('tests', function() {
  return gulp
      .src('tests/spec/extraSpec.js')
      .pipe(jasmineBrowser.specRunner({ console: true }))
      .pipe(jasmineBrowser.headless({ driver: 'chrome' }));
});

gulp.task('scripts-dist', function() {
  gulp.src('js/**/*.js')
   .pipe(sourcemaps.init())
   .pipe(concat('all.js'))
   .pipe(uglify())
   .pipe(sourcemaps.write())
   .pipe(gulp.dest('dist/js'));
});