'use strict';

var path=require( 'path' ),
    sass=require( 'gulp-sass' ),
    changed=require( 'gulp-changed' );


const TASK_NAME=__dirname.split( path.sep ).splice( -2 ).join( ':' ) + ':' + path.basename( __filename, '.js' );


/**
 * options = {
 *      target: gulp.options.globs.scssFilesDeep,
 *      targetOptions: {},
 *      dest: gulp.options.paths.merge.www.scss.root
 *      cssDest: gulp.options.paths.www.css.root
 *      minify: true
 * }
 * @param gulp
 * @param options
 */
module.exports=function ( gulp, options ) {

    gulp.task( TASK_NAME, options.dependencies || [], function ( done ) {
        gulp.src( options.src, options.srcOptions )
            .pipe( gulp.dest( options.dest ) )
            .on( 'end', done );
    } );

};
