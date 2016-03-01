'use strict';

var path=require( 'path' ),
    sass=require( 'gulp-sass' ),
    changed=require( 'gulp-changed' ),
    gulpFilter=require( 'gulp-filter' );


const TASK_NAME=__dirname.split( path.sep ).splice( -2 ).join( ':' ) + ':' + path.basename( __filename, '.js' );


/**
 * options = {
 *      target: gulp.options.merge.www.scss.deep,
 *      targetOptions: {},
 *      dest: gulp.options.paths.merge.www.css.root
 *      minify: true
 * }
 * @param gulp
 * @param opts
 */
module.exports=function ( gulp, options ) {

    gulp.task( TASK_NAME, options.dependencies || [], function ( done ) {

        var stream=gulp.src( options.src, options.srcOptions )
                .pipe( sass( { errLogToConsole: true } ) )
                .pipe( changed( options.cssDest ) )
                .pipe( gulp.dest( options.cssDest ) )
                .on( 'end', function () {
                    done();
                } );
    } );

};
