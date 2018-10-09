/* styles paths */
var customScssSRC = './build/style.scss';
var vendorCssSRC  = [
    './node_modules/angular-loading-bar/build/loading-bar.css'
];
var vendorCssFile = 'vendors';
var styleDest     = './src/css';

/* js paths  */
var vendorJsSRC = [
    './node_modules/angular/angular.min.js', './node_modules/angular-loading-bar/build/loading-bar.js',
];
// './node_modules/jquery/dist/jquery.min.js'
var vendorJsFile = 'vendors';
var customJsSRC = './build/*.js';
var jsDest       = './src/js/';

/* custom styles and scripts */
var styleWatchFiles = './build/*.scss';
var jsWatchFiles    = './build/*.js';

/* custom and vendor styles and scripts */
var foldersToClean = [
    './src/css/*',
    './src/js/*'
];

/* html to watch */
var templatesToWatch = [
    './inc/*.html',
    './*.html'
];


/**
 * Load Plugins.
 * Load gulp plugins and assing them semantic names.
 */
var gulp            = require('gulp');
var sass            = require('gulp-sass');
var autoprefixer    = require('gulp-autoprefixer');
var concat          = require('gulp-concat');
var uglify          = require('gulp-uglify');
var rename          = require('gulp-rename');
var livereload      = require('gulp-livereload');
var del             = require('del');


/**
 * Task: clean old styles ans scripts
 * Clean former styles and scripts before loading another compilation
 */
 gulp.task('clean', function () {
   return del(foldersToClean);
 });


/**
 * Task: custom styles
 * Compiles Sass, Autoprefixes it and Minifies CSS.
 */
gulp.task('custom-styles', function () {
    gulp.src( customScssSRC )
    .pipe( sass( {
        errLogToConsole: true,
        outputStyle: 'expanded', //['compressed | nested | expanded']
        precision: 10
    }))
    .pipe( autoprefixer(
        'last 2 versions',
        '> 1%',
        'safari 5',
        'opera 12.1',
        'ios 6',
        'android 4'
    ))
    .pipe( gulp.dest( styleDest ) )
    .pipe( livereload() );
});


/**
 * Task: vendor styles
 * Concat(!! 0 concat for the moment) and rename vendor styles
 */
gulp.task('vendor-styles', function () {
    gulp.src( vendorCssSRC )
    .pipe( concat( vendorCssFile + '.css' ) )
    .pipe( gulp.dest( styleDest ) )
    .pipe( sass( {
        errLogToConsole: true,
        outputStyle: 'compressed',
        precision: 10
    }))
    .pipe( rename({
        basename: vendorCssFile,
        suffix: ".min",
        extname: ".css"
    }))
    .pipe( gulp.dest( styleDest ) )
    .pipe(livereload());
});


/**
 * Task: vendor scripts
 * Concatenate and uglify vendor JS scripts.
 */
gulp.task( 'vendor-scripts', function() {
    gulp.src( vendorJsSRC )
    .pipe( concat( vendorJsFile + '.js' ) )
    .pipe( gulp.dest( jsDest ) )
    .pipe( rename({
        basename: vendorJsFile,
        suffix: ".min",
        extname: ".js"
    }))
    .pipe( uglify() )
    .pipe( gulp.dest( jsDest ) )
    .pipe(livereload());
});


/**
 * Task: custom scripts
 * Copy custom scripts to src.
 */
gulp.task( 'custom-scripts', function() {
    gulp.src( customJsSRC )
    .pipe( gulp.dest( jsDest ) )
    .pipe(livereload());
});


/**
 * Task: expose html files
 * Watch templates.
 */
gulp.task( 'watch-templates', function() {
    gulp.src( templatesToWatch ).pipe(livereload());
});



/**
 * Task: watch
 * Watch modification on scss and js files.
 */
gulp.task( 'watch', function() {
    livereload.listen({
        host: 'ng.github'
    });

    gulp.watch(['build/*.scss'], ['custom-styles']);
    gulp.watch(['build/*.js'], ['custom-scripts']);
    gulp.watch(templatesToWatch, ['watch-templates']);
});



/**
 * Default Tasks.
 * Register all tasks and load all
 */
gulp.task( 'default', [ 'clean', 'custom-styles', 'vendor-styles', 'custom-scripts', 'vendor-scripts', 'watch' ]);
