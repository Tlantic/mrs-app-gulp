
var path = require('path' ),
    jsuglify = require('gulp-uglify' ),
    gulpIf = require('gulp-if' ),
    templateCache = require('gulp-angular-templatecache' );


const TASK_NAME =  __dirname.split( path.sep ).splice( -2 ).join(':') + ':' + path.basename( __filename, '.js' );


/**
 *
 * @param gulp
 * @param options
 */
module.exports = function ( gulp, options ) {

    options.replaces  = options.replaces || [];

    gulp.task( TASK_NAME, options.dependencies || [], function( done ) {
        gulp.src( options.src, options.srcOptions )
            .pipe(templateCache('templates.js', {
                module: 'App',
                root: 'templates/'
            }))
            .pipe(gulpIf(options.minify, jsuglify()))
            .pipe(gulp.dest(options.dest))
            .on( 'end', done );
    } );

};
