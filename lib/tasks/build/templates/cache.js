'use strict';

var path = require('path'),
    changed = require('gulp-changed'),
    jsuglify = require('gulp-uglify'),
    gulpIf = require('gulp-if'),
    templateCache = require('gulp-angular-templatecache');


const TASK_NAME = __dirname.split(path.sep).splice(-2).join(':') + ':' + path.basename(__filename, '.js');


module.exports = function (gulp, options) {

    options.replacements = options.replacements || {};
    options.cacheOptions = options.cacheOptions || {};

    gulp.task(TASK_NAME, options.dependencies || [], function (done) {
        gulp.src(options.src, options.srcOptions)
            .pipe(changed(options.dest))
            .pipe(templateCache('templates.js', {
                module: options.moduleName,
                root: options.dest
            }))
            .pipe(gulpIf(options.minify, jsuglify()))
            .pipe(gulp.dest(options.dest))
            .on('end', done)
    });

};
