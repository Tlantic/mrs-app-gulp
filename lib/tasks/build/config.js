'use strict';

var changed = require('gulp-changed' ),
    path = require( 'path' );


const TASK_NAME = path.basename( __dirname ) + ':' + path.basename( __filename, '.js' );


/**
 *
 * options = {
 *  json: {
 *      target: options.paths.config.brand.files.conf + '+(xml)',
 *      targetOptions: {
 *          base: options.paths.root
 *      },
 *      dest: options.paths.merge.root,
 *      basename: 'conf'
 *  },
 *  xml: {
 *      target: options.globs.jsonConfFiles,
 *      targetOptions: {
 *          base: options.paths.root
 *      },
 *      dest: options.paths.merge.www.root,
 *      basename: 'app.conf',
 *  }
 * }
 * @param gulp
 * @param opts
 */
module.exports = function ( gulp, options ) {

        gulp.task( TASK_NAME, options.dependencies || [], function( done ) {
            gulp.src( options.src, options.srcOptions )
                .pipe(changed(options.dest, {hasChanged: changed.compareSha1Digest}))
                .pipe(gulp.dest(options.dest))
                .on('end', function() { done(); });
        } );

};
