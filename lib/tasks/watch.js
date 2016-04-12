'use strict';

var path = require('path'),
    watch = require('gulp-watch'),
    batch = require('gulp-batch'),
    rs = require('run-sequence'),
    $forEach = Array.prototype.forEach,
    gutil = require('gulp-util'),
    log = gutil.log,
    colors = gutil.colors;

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

                if (colors.cyan(task._originTaskName)) {
                    log("watch: changes in ", colors.cyan(task._originTaskName) + " src files ... will trigger ", colors.cyan(task.runSequence));
                }

                    watch(task.src, batch(function (events, done) {
                        runSequence(task.runSequence, done);
                    }));
                } else {
                    done();
                }
        })

    });
};