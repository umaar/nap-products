const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');
const watchify = require('watchify');
const babelify = require('babelify');
const handlebars = require('gulp-handlebars');
const wrap = require('gulp-wrap');
const declare = require('gulp-declare');

gulp.task('templates', () => {
	return gulp.src('views/partials/*.hbs')
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
	const bundler = watchify(browserify('resources/js/main.js', {
		debug: true})
		.transform(babelify, {presets: ['@babel/preset-env']}));

	function rebundle() {
		bundler.bundle()
			.on('error', function (err) {
				console.error(`There was an error ${err.message}`);
				this.emit('end');
			})
			.pipe(source('main.js'))
			.pipe(buffer())
			.pipe(sourcemaps.init({loadMaps: true}))
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest('public/js'));
	}

	if (watch) {
		bundler.on('update', () => {
			console.log('-> bundling...');
			rebundle();
		});
	}

	rebundle();
}

function watch() {
	return compile(true);
}

gulp.task('handlebars-runtime', () => {
	return gulp
		.src('node_modules/handlebars/dist/handlebars.runtime.min.js')
		.pipe(gulp.dest('public/js'));	
})


gulp.task('js', gulp.series(['handlebars-runtime', 'templates'], () => {
	return watch();
}));

gulp.task('sass', () => {
	return gulp
		.src('resources/css/main.scss')
		.pipe(sass())
		.pipe(gulp.dest('public/css'));
})

gulp.task('default', gulp.series(['sass', 'js']));
