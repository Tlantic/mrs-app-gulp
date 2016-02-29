'use strict';

var path = require( 'path' ),
    rs = require('run-sequence' ),
    $push = Array.prototype.push;
;


const TASK_NAME = path.basename( __filename, '.js' );


/**
 * Gulp task default.
 * @param gulp
 * @param options
 */
module.exports = function ( gulp, options ) {

    var runSequence = rs.use(gulp);

    gulp.task( TASK_NAME, options.dependencies || [], function ( done ) {

        if ( options.runSequence !== void 0 && options.runSequence.length > 1 ) {

            $push.call( options.runSequence, done );
            runSequence.apply( runSequence,options.runSequence);
        }

    } );

};
