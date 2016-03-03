'use strict';

var changed=require( 'gulp-changed' ),
    path = require('path' ),
    gulpIf = require('gulp-if' ),
    jsuglify = require('gulp-uglify' );


const TASK_NAME = path.basename(__dirname) + ':' + path.basename( __filename, '.js' );




/**
 *
 * @returns {*}
 */
module.exports = function ( gulp, options ) {


        gulp.task( TASK_NAME, options.dependencies || [], function( done ) {
            gulp.src( options.src, options.srcOptions )
                .pipe(gulpIf(options.minify, jsuglify()))
                .pipe( changed( options.dest ) )
                .pipe(gulp.dest(options.dest))
                .on( 'end', done );

        } );


};
