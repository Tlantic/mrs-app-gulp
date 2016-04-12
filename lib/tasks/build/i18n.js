'use strict';

var path = require('path' ),
    extendJson = require('../../plugins/gulp-extend-json'),
    changed = require('gulp-changed'),
    replace=require( 'gulp-replace-task' );


const TASK_NAME = path.basename(__dirname) + ':' + path.basename(__filename, '.js');



/**
 *
 * @returns {*}
 */
module.exports = function ( gulp, options ) {
    options.replacements = options.replacements || {};
    gulp.task( TASK_NAME, options.dependencies || [], function( done ) {
        gulp.src( options.src, options.srcOptions )
            .pipe( extendJson() )
            .pipe( replace( {
                patterns: options.replacements.patterns || []
            } ) )
            .pipe(gulp.dest(options.dest))
            .on( 'end', done );
    } );

};
