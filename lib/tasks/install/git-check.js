'use strict';

var path = require('path' ),
    sh = require('shelljs' );


const TASK_NAME = path.basename(__dirname) + ':' + path.basename( __filename, '.js' );


/**
 *
 * @returns {*}
 */
module.exports = function ( gulp, options ) {

    gulp.task( TASK_NAME, options.dependencies, function( done ) {
        sh.cd(process.cwd());
        if (!sh.which('git')) {
            console.log(
                '  ' + gutil.colors.red('Git is not installed.'),
                '\n  Git, the version control system, is required to download Ionic.',
                '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
                '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
            );
            process.exit(1);
        }
        done();
    });

};
