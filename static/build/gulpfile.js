var gulp = require('gulp');
//Plugins
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var gulpif = require('gulp-if');

var jsSources,
	bowerJs,
	cssSources,
	bowerCss,
	outputDir;

jsSources = [
	'development/scripts/hga.js',
	'development/scripts/hga.config.js',
	'development/scripts/hga.routes.js',
	'development/scripts/**/**.module.js',
	'development/scripts/**/*.js',
	'development/js/**/*.js'
];

bowerJs = [
	'development/bower_components/jquery/dist/jquery.min.js',
	'development/bower_components/angular/angular.js',
	'development/bower_components/angular-animate/angular-animate.min.js',
	'development/bower_components/angular-ui-router/release/angular-ui-router.min.js',
	'development/bower_components/ng-file-upload/ng-file-upload.min.js',
	'development/bower_components/underscore/underscore-min.js',
	'development/bower_components/bootstrap/dist/js/bootstrap.min.js',
	'development/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
	'development/bower_components/remarkable-bootstrap-notify/dist/bootstrap-notify.min.js'
];

cssSources = [
	// 'development/css/lib/**/*.css',
	'development/css/**/*.css'
];

bowerCss = [
	'development/bower_components/bootstrap/dist/css/bootstrap.min.css',
	'development/bower_components/animate.css/animate.min.css'
];

outputDir = 'production/';

gulp.task('scripts', function() {
	return gulp.src(jsSources)
		.pipe(concat('main.min.js'))
		.pipe(ngAnnotate())
		.pipe(uglify())
		.pipe(gulp.dest(outputDir + 'js'));
});

gulp.task('bowerScripts', function() {
	return gulp.src(bowerJs)
		.pipe(concat('bower.min.js'))
		.pipe(ngAnnotate())
		.pipe(uglify())
		.pipe(gulp.dest(outputDir + 'js'));
});

gulp.task('styles', function() {
	return gulp.src(cssSources)
		.pipe(concat('main.min.css'))
		.pipe(cleanCSS())
		.pipe(gulp.dest(outputDir + 'css'));
});

gulp.task('bowerStyles', function() {
	return gulp.src(bowerCss)
		.pipe(concat('bower.min.css'))
		.pipe(cleanCSS())
		.pipe(gulp.dest(outputDir + 'css'));
});

gulp.task('views', function() {
	gulp.src('development/views/**/*.*')
		.pipe(gulp.dest(outputDir + 'views'));
});

gulp.task('fonts', function() {
	gulp.src('development/fonts/**/*.*')
		.pipe(gulp.dest(outputDir + 'fonts'));
});

gulp.task('images', function() {
	gulp.src('development/images/**/*.*')
		.pipe(gulp.dest(outputDir + 'images'));
});
// Build runs
gulp.task('default', ['scripts', 'bowerScripts', 'styles', 'bowerStyles', 'views', 'fonts', 'images']);

