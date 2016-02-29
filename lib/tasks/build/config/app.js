'use strict';

var extendConfig=require( '../../../plugins/gulp-extend-config' ),
    path=require( 'path' ),
    merge=require( 'merge-stream' ),
    replace=require( 'gulp-replace-task' ),
    rename=require( 'gulp-rename' );


const TASK_NAME=__dirname.split( path.sep ).splice( -2 ).join( ':' ) + ':' + path.basename( __filename, '.js' );


/**
 *
 * {
 *    target: gulp.options.globs.jsonConfFiles,
 *    targetOptions: {
 *        base: options.paths.root
 *    },
 *    dest: gulp.options.paths.merge.www.root,
 *    basename: 'app.conf'
 *  },
 * @param gulp
 * @param opts
 */
module.exports=function ( gulp, options ) {

    gulp.task( TASK_NAME, options.dependencies || [], function ( done ) {

        options.replaces=options.replaces || {};

        gulp.src( options.src, options.srcOptions )
            .pipe( extendConfig() )
            .pipe( replace( {
                patterns: options.replaces.patterns || []
            } ) )
            .pipe( rename( { basename: options.basename } ) )
            .pipe( gulp.dest( options.dest ) )
            .on('end', function() { done(); });

    } );

};
