'use strict';

var changed = require('gulp-changed' ),
    path = require( 'path' );


const TASK_NAME = path.basename( __dirname ) + ':' + path.basename( __filename, '.js' );


module.exports = function ( gulp, options ) {
    gulp.task(TASK_NAME, options.dependencies || [], function (done) {
        done();
    });
};
