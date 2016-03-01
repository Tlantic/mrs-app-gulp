
var path = require('path' ),
changed = require('gulp-changed'),
    extendJson = require('../../../plugins/gulp-extend-json' ),
    replace=require( 'gulp-replace-task' );


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
            .pipe( extendJson() )
            .pipe( replace( {
                patterns: options.replaces.patterns || []
            } ) )
            .pipe(changed(options.dest, {hasChanged: changed.compareSha1Digest}))
            .pipe(gulp.dest( options.dest ))
            .on('end', function() { done(); });
    } );

};