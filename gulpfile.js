(function() {

  'use strict';

  // requires
  var gulp            = require('gulp'),
      autoprefixer    = require('gulp-autoprefixer'),
      browserSync     = require('browser-sync').create(),
      cleanCSS        = require('gulp-clean-css'),
      concat          = require('gulp-concat'),
      include         = require('gulp-include'),
      normalize       = require('node-normalize-scss'),
      sass            = require('gulp-sass'),
      sourcemaps      = require('gulp-sourcemaps'),
      uglify          = require('gulp-uglify');

  //
  // directory variables
  //

  // project name
  var projectName = 'truly-responsive-menu';

  var baseDir = 'dist';

  // dist directories
  var htmlDistFiles   = baseDir + '/frontend/',
      cssDistFiles    = baseDir,
      jsDistFiles     = baseDir,
      fontsDistFiles  = baseDir + '/assets/fonts/',
      imgDistFiles    = baseDir + '/assets/img/';

  // source directories
  var allHtmlFiles = 'app/html/**/*.html',
      mainHtmlFiles = 'app/html/*.html',
      sassFiles = 'app/styles/**/*.scss',
      jsFiles   = 'app/js/**/*.js';

  //
  // gulp tasks
  //

  // gulp static server task (start server on port 8080)
  gulp.task('browser-sync', function() {
    browserSync.init({
      server: {
        baseDir: baseDir,
        directory: true
      },
      port: 8080,
      notify: false
    });
  });

  // gulp html task (move html files to dist and refresh browser)
  gulp.task('html', function() {
    gulp.src(mainHtmlFiles)
    .pipe(include())
      .on('error', console.log)
    .pipe(gulp.dest(htmlDistFiles))
    .pipe(browserSync.stream());
  });

  // gulp sass task (process sass files, add sourcemap and prefixes, refresh browser)
  gulp.task('sass', function() {
    return gulp.src(sassFiles)
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: normalize.includePaths // add normalize to compiled css
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['not ie <= 8', 'last 3 versions']
    }))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(cssDistFiles))
    .pipe(browserSync.stream());
  });

  // gulp js task (move js files to dist and refresh browser)
  gulp.task('js', function() {
    return gulp.src(jsFiles)
    .pipe(concat(projectName + '.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(jsDistFiles))
    .pipe(browserSync.stream());
  });

  // gulp serve task (setup server, watch for file changes)
  gulp.task('serve', ['sass', 'browser-sync'], function() {
    gulp.watch( allHtmlFiles, ['html']);
    gulp.watch( sassFiles, ['sass']);
    gulp.watch( jsFiles, ['js']);
  });

  // gulp default task
  gulp.task('default', ['serve']);

  // gulp init task (run once on project init for file/folder creation)
  gulp.task('init', ['html', 'sass', 'js']);

})();
