'use strict';

var path = require('path');


const TASK_NAME = path.basename(__filename, '.js');

/**
 *
 * @param gulp
 * @param options
 */
module.exports = function (gulp, options) {

    gulp.task(TASK_NAME, options.dependencies || [], function (done) {
        done();
    });

};
