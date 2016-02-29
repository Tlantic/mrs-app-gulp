'use strict';

 var path = require('path' ),
     changed = require('gulp-changed' );


const TASK_NAME = path.basename(__dirname) + ':' + path.basename( __filename, '.js' );


/**
 * options = {
 *    target: [
 *        gulp.options.paths.merge.templates.files.deep + '.+(html)'
 *    ],
 *    dest: gulp.options.paths.www.js.root
 * }
 * @param gulp
 * @param options
 */
module.exports = function ( gulp, options ) {

    gulp.task( TASK_NAME, options.dependencies || [], function( done ) {
        gulp.src( options.src, options.srcOptions )
            .pipe(changed(options.dest))
            .pipe(gulp.dest(options.dest))
            .on('end', function() { done(); });
    });

};
