'use strict';

var path = require('path' ),
    changed = require('gulp-changed');


const TASK_NAME = path.basename(__dirname) + ':' + path.basename( __filename, '.js' );



/**
 *
 * @returns {*}
 */
module.exports = function ( gulp, options ) {

    options.src = options.src instanceof Array ? options.src : [ options.src ];

    options.src.push('!**/*(gruntfile.js|Gruntfile.js|gulpfile.js|bower.json|package.json|karma.conf.js|*.md|*.cmd|*.sh|*.map'
        +   '|src|samples|nuget|test){,/**}');


    gulp.task( TASK_NAME, options.dependencies || [], function( done ) {

        gulp.src( options.src, options.srcOptions )
            .pipe(changed(options.dest))
            .pipe(gulp.dest(options.dest ) )
            .on('end', function() { done(); });
    } );

};
