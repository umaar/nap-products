var gulp = require('gulp');
var rollup = require('rollup');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var sourcemaps = require("gulp-sourcemaps");
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');

gulp.task('templates', function(){
  gulp.src('views/partials/*.hbs')
    .pipe(handlebars({
    	handlebars: require('handlebars')
    }))
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      root: 'module.exports',
      noRedeclare: true
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('resources/js/'));
});

function compile(watch) {
  var bundler = watchify(browserify('resources/js/main.js', { debug: true })
	  .transform(babelify, { presets: ['es2015'] }));

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('main.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('public/js'));
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
    });
  }

  rebundle();
}

function watch() {
  return compile(true);
};

gulp.task('js', ['templates'], function() { return watch(); });

gulp.task('sass', () => gulp
	.src('resources/css/main.scss')
	.pipe(sass())
	.pipe(gulp.dest('public/css')));


gulp.task('default', ['sass', 'js'])