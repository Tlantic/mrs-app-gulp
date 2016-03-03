'use strict';

var path = require( 'path' ),
    rs = require('run-sequence' ),
    $slice=Array.prototype.slice,
    $push = Array.prototype.push;


const TASK_NAME = path.basename( __filename, '.js' );


/**
 * Gulp task default.
 * @param gulp
 * @param options
 */
module.exports = function ( gulp, options ) {

    var runSequence = rs.use(gulp);

    gulp.task( TASK_NAME, options.dependencies || [], function ( done ) {

        if ( options.runSequence !== void 0 && options.runSequence.length ) {
            runSequence( options.runSequence, done );
        } else {
            done();
        }

    } );

};
