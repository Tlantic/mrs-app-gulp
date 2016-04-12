'use strict';

var path = require('path'),
    changed = require('gulp-changed'),
    foreach = require('gulp-foreach'),
    gulpIf = require('gulp-if'),
    jsuglify = require('gulp-uglify'),
    replace = require('gulp-replace-task'),
    flatten = require('../../plugins/gulp-flatten');


const TASK_NAME = path.basename(__dirname) + ':' + path.basename(__filename, '.js');


/**
 *
 * @returns {*}
 */
module.exports = function (gulp, options) {

    gulp.task(TASK_NAME, options.dependencies || [], function (done) {

        options.replacements = options.replacements || {};

        gulp.src(options.src, options.srcOptions)
            .pipe(gulpIf(options.minify, jsuglify()))
            .pipe(replace({
                patterns: options.replacements.patterns || []
            }))
            .pipe(flatten())
            .pipe(gulp.dest(options.dest))
            .on('end', function () {
                done();
            });

    });

};
