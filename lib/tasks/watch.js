'use strict';

var path = require('path'),
    watch = require('gulp-watch'),
    batch = require('gulp-batch'),
    rs = require('run-sequence'),
    $forEach = Array.prototype.forEach;


const TASK_NAME = path.basename(__filename, '.js');



/**
 *
 * @returns {*}
 */
module.exports = function ( gulp, options ) {

    var runSequence = rs.use(gulp);


    gulp.task(TASK_NAME, options.dependencies || [], function (done) {
        $forEach.call(options.watchers || [], function (task) {
                if (task.runSequence !== void 0 && task.runSequence.length) {
                    watch(task.src, batch(function (events, done) {
                        runSequence(task.runSequence, done);
                    }));
                } else {
                    done();
                }
        })

    });
};