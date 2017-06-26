"use strict";

var gulp        = require('gulp'),
  plumber       = require('gulp-plumber'),
  concat        = require('gulp-concat'),
  rename        = require('gulp-rename'),
  sass          = require('gulp-sass'),
  autoprefixer  = require('gulp-autoprefixer'),
  cssMinify     = require('gulp-clean-css'),
  packer        = require('gulp-uglify'),
  hb            = require('gulp-hb'),
  htmlmin       = require('gulp-htmlmin'),
  sourcemaps    = require('gulp-sourcemaps'),
  imagemin      = require('gulp-imagemin'),
  browserSync   = require("browser-sync").create(),
  del           = require('del'),
  reload        = browserSync.reload;

var paths = {
  deploy:     '.',
  build:      'build',
  source:     'src',
  hbs:        'src/hbs/',
  style:      'src/sass/main.scss',
  js:         'src/js/*.js',
  images:     'src/img/**/*',
  fonts:      'src/fonts/**/*'
};

var watch = {
  hbs:        'src/hbs/**/*',
  style:      'src/sass/**/*',
  js:         'src/js/**/*',
  images:     'src/img/**/*'
};

var jsMain = [
  paths.source + '/js/main.js'
];



// ===============================================
// BUILD
// ===============================================

// Build HTML
// -----------------------------------------------
gulp.task('build-html', function() {
  var hbStream = hb()
    // Partials
    .partials(paths.hbs + 'partials/*.hbs')
    // Helpers
    .helpers(require('handlebars-helpers'))
  return gulp
    .src(paths.hbs + 'pages/*.hbs')
    .pipe(plumber())
    .pipe(hbStream)
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest(paths.build));
});


// Build CSS
// -----------------------------------------------
gulp.task('build-css', function() {
  return gulp
    .src(paths.style)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    // .pipe(cssMinify())
    .pipe(rename('main.min.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.build + '/assets/css'));
});


// Build JavaSCript
// -----------------------------------------------

// Build JS
gulp.task('build-js', function() {
  return gulp
    .src(paths.js)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat('script.js'))
    .pipe(packer())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.build + '/assets/js'));
});


// Build Images
// -----------------------------------------------

// Minify Images
gulp.task('build-img', ['build-ico'], function() {
  return gulp
    .src(paths.images + '.{jpg,png,svg,gif}')
    .pipe(plumber())
    .pipe(imagemin())
    .pipe(gulp.dest(paths.build + '/assets/img'));
});

// Copy Icons
// -----------------------------------------------
gulp.task('build-ico', function() {
  return gulp
    .src(paths.images + '.ico')
    .pipe(plumber())
    .pipe(gulp.dest(paths.build + '/assets/img'));
});


// Copy Fonts
// -----------------------------------------------
gulp.task('build-fonts', function() {
  return gulp
    .src(paths.fonts)
    .pipe(plumber())
    .pipe(gulp.dest(paths.build + '/assets/fonts'));
});


// Clean Build
// -----------------------------------------------
gulp.task('clean', function() {
  del.sync(paths.build);
});



// ===============================================
// DEPLOY
// ===============================================

// Deploy HTML
// -----------------------------------------------
gulp.task('deploy-html', function() {
  var hbStream = hb()
    // Partials
    .partials(paths.hbs + 'partials/*.hbs')
    // Helpers
    .helpers(require('handlebars-helpers'))
  return gulp
    .src(paths.hbs + 'pages/*.hbs')
    .pipe(plumber())
    .pipe(hbStream)
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest(paths.deploy));
});


// Deploy CSS
// -----------------------------------------------
gulp.task('deploy-css', function() {
  return gulp
    .src(paths.style)
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cssMinify())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest(paths.deploy + '/assets/css'));
});


// Deploy JavaSCript
// -----------------------------------------------

// Deploy JS
gulp.task('deploy-js', function() {
  return gulp
    .src(paths.js)
    .pipe(plumber())
    .pipe(concat('script.js'))
    .pipe(packer())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.deploy + '/assets/js'));
});


// Deploy Images
// -----------------------------------------------

// Minify Images
gulp.task('deploy-img', ['deploy-ico'], function() {
  return gulp
    .src(paths.images + '.{jpg,png,svg,gif}')
    .pipe(plumber())
    .pipe(imagemin())
    .pipe(gulp.dest(paths.deploy + '/assets/img'));
});

// Copy Icons
// -----------------------------------------------
gulp.task('deploy-ico', function() {
  return gulp
    .src(paths.images + '.ico')
    .pipe(plumber())
    .pipe(gulp.dest(paths.deploy + '/assets/img'));
});


// Deploy Fonts
// -----------------------------------------------
gulp.task('deploy-fonts', function() {
  return gulp
    .src(paths.fonts)
    .pipe(plumber())
    .pipe(gulp.dest(paths.deploy + '/assets/fonts'));
});



// ===============================================
// WATCH
// ===============================================

// Watch HTML
// -----------------------------------------------
gulp.task('html-watch', ['build-html'], function(done) {
  browserSync.reload();
  done();
});

// Watch CSS
// -----------------------------------------------
gulp.task('css-watch', ['build-css'], function(done) {
  browserSync.reload();
  done();
});

// Watch JS
// -----------------------------------------------
gulp.task('js-watch', ['build-js'], function(done) {
  browserSync.reload();
  done();
});

// Watch Images
// -----------------------------------------------
gulp.task('img-watch', ['build-img'], function(done) {
  browserSync.reload();
  done();
});



// ===============================================
// TASKS
// ===============================================

// Default Task
// -----------------------------------------------

// browser-sync
gulp.task('default', ['build'],
  function() {
    browserSync.init({
      ghostMode: {
        clicks: false,
        forms: false,
        scroll: false
      },
      reloadDelay: 1000,
      notify: false,
      server: {
        baseDir: paths.build
      },
      open: false
    });

    gulp.watch(watch.hbs, ['html-watch']);

    gulp.watch(watch.style, ['css-watch']);

    gulp.watch(watch.js, ['js-watch']);

    gulp.watch(watch.images, ['img-watch']);
  });


// Build Task
// -----------------------------------------------
gulp.task('build', ['build-html', 'build-css', 'build-js', 'build-img', 'build-fonts']);


// Deploy Task
// -----------------------------------------------
gulp.task('deploy', ['deploy-html', 'deploy-css', 'deploy-js', 'deploy-img', 'deploy-fonts']);
