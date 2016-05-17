'use strict';

var $slice=Array.prototype.slice,
    $push = Array.prototype.push,
    rs = require('run-sequence' ),
    path = require( 'path' );



const TASK_NAME = path.basename( __filename, '.js' );


/**
 * Gulp task default.
 * @param gulp
 * @param options
 */
module.exports = function ( gulp, options ) {

    var runSequence = rs.use(gulp );

    gulp.task( TASK_NAME, options.dependencies || [], function ( done ) {

        if ( options.runSequence !== void 0 && options.runSequence.length ) {

            var seq=$slice.call( options.runSequence );
            $push.call( seq, done );

            runSequence.apply( runSequence, seq );

        } else {
            done();
        }

    } );

};
