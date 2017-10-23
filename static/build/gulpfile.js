var gulp = require('gulp');
//Plugins
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var gzip = require('gulp-gzip');
var cachebust = require('gulp-cache-bust');

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
	// 'development/js/**/*.js'
];

bowerJs = [
	'development/bower_components/jquery/dist/jquery.js',
	'development/bower_components/angular/angular.js',
	'development/bower_components/angular-animate/angular-animate.js',
	'development/bower_components/angular-touch/angular-touch.min.js',
	'development/bower_components/angular-ui-router/release/angular-ui-router.js',
	'development/bower_components/angular-sanitize/angular-sanitize.js',
	'development/bower_components/angular-elastic/elastic.js',
	'development/bower_components/ng-file-upload/ng-file-upload.js',
	'development/bower_components/underscore/underscore.js',
	'development/bower_components/bootstrap/dist/js/bootstrap.js',
	'development/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
	'development/bower_components/remarkable-bootstrap-notify/dist/bootstrap-notify.js',
	'development/bower_components/moment/moment.js',
	'development/bower_components/angular-moment/angular-moment.js',
	'development/bower_components/interactjs/dist/interact.js',
	'development/bower_components/angular-bootstrap-calendar/dist/js/angular-bootstrap-calendar-tpls.js',
	'development/bower_components/angular-cookies/angular-cookies.js',
	'development/bower_components/angular-ui-select/dist/select.js',
	'development/bower_components/angular-audio/app/angular.audio.js'
];

cssSources = [
	'development/css/paper-dashboard.css',
	'development/css/metronome.css',
	'development/css/themify-icons.css',
	'development/css/sidebar.css',
	'development/css/main.css'
];

bowerCss = [
	'development/bower_components/bootstrap/dist/css/bootstrap.css',
	'development/bower_components/animate.css/animate.css',
	'development/bower_components/angular-bootstrap-calendar/dist/css/angular-bootstrap-calendar.css',
	'development/bower_components/angular-ui-select/dist/select.css'
];

outputDir = 'production/';

gulp.task('scripts', function() {
	return gulp.src(jsSources)
		.pipe(concat('main.min.js'))
		.pipe(ngAnnotate())
		.pipe(uglify()
		.on('error', gutil.log))
		.pipe(gulp.dest(outputDir + 'js'));
});

gulp.task('bowerScripts', function() {
	return gulp.src(bowerJs)
		.pipe(concat('bower.min.js'))
		.pipe(ngAnnotate())
		.pipe(uglify()
		.on('error', gutil.log))
		.pipe(gulp.dest(outputDir + 'js'));
});

gulp.task('styles', function() {
	return gulp.src(cssSources)
		.pipe(concat('main.min.css'))
		.pipe(cleanCSS()
		.on('error', gutil.log))
		.pipe(gulp.dest(outputDir + 'css'));
});

gulp.task('bowerStyles', function() {
	return gulp.src(bowerCss)
		.pipe(concat('bower.min.css'))
		.pipe(cleanCSS()
		.on('error', gutil.log))
		.pipe(gulp.dest(outputDir + 'css'));
});

gulp.task('gzipJs', ['scripts', 'bowerScripts'], function() {
    return gulp.src(['production/js/main.min.js', 'production/js/bower.min.js'])
    .pipe(cachebust({
        type: 'timestamp'
    }))    
    .pipe(gzip({ append: true }))
    .pipe(gulp.dest(outputDir + 'js'));
});

gulp.task('gzipCss', ['styles', 'bowerStyles'], function() {
    return gulp.src(['production/css/main.min.css', 'production/css/bower.min.css'])
    .pipe(cachebust({
        type: 'timestamp'
    }))    
    .pipe(gzip({ append: true }))
    .pipe(gulp.dest(outputDir + 'css'));
});

gulp.task('views', function() {
	gulp.src('development/views/**/*.*')
	    .pipe(cachebust({
	        type: 'timestamp'
	    }))  
		.pipe(gulp.dest(outputDir + 'views'));
});

gulp.task('fonts', function() {
	gulp.src('development/fonts/**/*.*')
	    // .pipe(cachebust({
	    //     type: 'timestamp'
	    // }))  
		.pipe(gulp.dest(outputDir + 'fonts'));
});

gulp.task('images', function() {
	gulp.src('development/images/**/*.*')
	    // .pipe(cachebust({
	    //     type: 'timestamp'
	    // }))  
		.pipe(gulp.dest(outputDir + 'images'));
});
// Build runs
gulp.task('default', ['scripts', 'bowerScripts', 'styles', 'bowerStyles', 'gzipJs', 'gzipCss', 'views', 'fonts', 'images']);

