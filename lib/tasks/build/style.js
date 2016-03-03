'use strict';

var path = require('path' ),
    changed = require('gulp-changed' ),
    gulpIf = require('gulp-if'),
    cssMinify = require('gulp-minify-css');

const TASK_NAME = path.basename(__dirname) + ':' + path.basename( __filename, '.js' );


/**
 *
 * @param gulp
 * @param options
 */
module.exports = function ( gulp, options ) {

    gulp.task( TASK_NAME, options.dependencies || [], function( done ) {
        gulp.src( options.src, options.srcOptions )
            .pipe(gulpIf(options.minify, cssMinify()))
            .pipe( changed( options.dest ) )
            .pipe(gulp.dest(options.dest ) )
            .on( 'end', done );

    } );

};
