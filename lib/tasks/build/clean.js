'use strict';

var path = require('path'),
    del = require('del' );


const TASK_NAME = path.basename(__dirname) + ':' + path.basename( __filename, '.js' );

/**
 *
 * @param gulp
 * @param options
 */
module.exports = function ( gulp, options ) {

    gulp.task( TASK_NAME, options.dependencies || [], function( ) {
        return del( options.src, options.srcOptions )
    });

};
