'use strict';

var path = require('path' ),
    gutil = require('gulp-util' ),
    bower = require('bower' );



const TASK_NAME = path.basename( __filename, '.js' );




/**
 *
 * @returns {*}
 */
module.exports = function (gulp, options) {

    gulp.task( TASK_NAME, options.dependencies || [], function() {
        return bower.commands.install()
            .on('log', function (data) {
                gutil.log('bower', gutil.colors.cyan(data.id), data.message);
            });

    });

};
