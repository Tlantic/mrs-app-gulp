
'use strict';

var path = require('path'),
    inject = require('gulp-inject'),
    gulpfilter = require('gulp-filter'),
    angularFilesort = require('gulp-angular-filesort'),
    replace = require('gulp-replace-task'),
    changed = require('gulp-changed');


const TASK_NAME = path.basename(__dirname) + ':' + path.basename(__filename, '.js');


module.exports = function (gulp, options) {

    
    options.replacements = options.replacements || {};

    gulp.task(TASK_NAME, options.dependencies || [], function (done) {

        var filter = gulpfilter(['*', '!**/*.css'], {restore: true});

        gulp.src(options.src, options.srcOptions)
            .pipe(replace({
                patterns: options.replacements.patterns
            }))
            .pipe(inject(
                gulp.src(options.inject.src, options.inject.srcOptions)
                    .pipe(filter)
                    .pipe(angularFilesort())
                    .pipe(filter.restore),
                options.inject.options
            ))
            .pipe(changed(options.dest, {hasChanged: changed.compareSha1Digest}))
            .pipe(gulp.dest(options.dest))
            .on('end', done);

    });

};




