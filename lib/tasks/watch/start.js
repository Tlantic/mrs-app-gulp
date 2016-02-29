'use strict';

var path = require('path' ),
    watch = require('gulp-watch' ),
    batch = require('gulp-batch' ),
    rs = require('run-sequence' ),
    $push = Array.prototype.push,
    $filter = Array.prototype.filter,
    $forEach = Array.prototype.forEach;



const TASK_NAME = path.basename(__dirname) + ':' + path.basename( __filename, '.js' );



/**
 *
 * @returns {*}
 */
module.exports = function ( gulp, options ) {

    var runSequence = rs.use(gulp);


    gulp.task( TASK_NAME, options.dependencies || [], function( done ) {

        $forEach.call( options.tasks || [], function ( task ) {

            console.log("watching "+ task.src )

            watch(task.src, batch(function (events, done) {

                if ( task.runSequence !== void 0 && task.runSequence.length ) {
                    $push.call( task.runSequence, done );
                    runSequence.apply( runSequence, $filter.call( task.runSequence, x => x !== void 0 ));
                }
            }));
        } )

    });



};
