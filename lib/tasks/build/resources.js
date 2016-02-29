'use strict';

var path = require('path' ),
    changed = require('gulp-changed'),
    imagemin = require('gulp-imagemin' ),
    gulpIf = require('gulp-if' );


const TASK_NAME = path.basename(__dirname) + ':' + path.basename( __filename, '.js' );




/**
 *
 * @returns {*}
 */
module.exports = function ( gulp, options ) {

    gulp.task( TASK_NAME, options.dependencies || [], function( done ) {

        gulp.src( options.src, options.srcOptions )
            .pipe(changed(options.dest))
            .pipe(gulpIf(options.minify, imagemin({
                progressive: true
            })))
            .pipe(gulp.dest(options.dest))
            .on('end', function() { done(); });

    } );

};




