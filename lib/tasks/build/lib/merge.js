
var path = require('path' ),
    changed = require('gulp-changed');


const TASK_NAME =  __dirname.split( path.sep ).splice( -2 ).join(':') + ':' + path.basename( __filename, '.js' );

/**
 *
 * @param gulp
 * @param options
 */
module.exports = function ( gulp, options ) {

    gulp.task( TASK_NAME, options.dependencies || [], function( done ) {
        gulp.src( options.src, options.srcOptions )
            .pipe(changed(options.dest))
            .pipe(gulp.dest(options.dest ) )
            .on( 'end', done );
    } );

};
