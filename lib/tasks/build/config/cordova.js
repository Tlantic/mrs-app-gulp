'use strict';

var path=require( 'path' ),
    replace=require( 'gulp-replace-task' ),
    changed=require( 'gulp-changed' ),
    rename=require( 'gulp-rename' );

const TASK_NAME=__dirname.split( path.sep ).splice( -2 ).join( ':' ) + ':' + path.basename( __filename, '.js' );


/**
 *
 * options = {
 *      target: options.globs.jsonConfFiles,
 *      targetOptions: {
 *          base: options.paths.root
 *      },
 *      dest: options.paths.merge.www.root,
 *      basename: 'app.conf',
 *  }
 * @param gulp
 * @param opts
 */
module.exports=function ( gulp, options ) {

    gulp.task( TASK_NAME, options.dependencies || [], function ( done ) {

        options.replaces=options.replaces || {};

        gulp.src( options.src, options.srcOptions )
            .pipe( changed( options.dest ) )
            .pipe( replace( {
                patterns: options.replaces.patterns || []
            } ) )
            .pipe( rename( { basename: options.basename || 'config' } ) )
            .pipe( gulp.dest( options.dest ) )
            .on('end', function() { done(); });

    } );

};
