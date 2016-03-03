'use strict';

var path=require( 'path' ),
    inject=require( 'gulp-inject' ),
    gulpfilter = require('gulp-filter' ),
    angularFilesort = require('gulp-angular-filesort' ),
    changed=require( 'gulp-changed' );


const TASK_NAME=path.basename( __dirname ) + ':' + path.basename( __filename, '.js' );



module.exports=function ( gulp, options ) {

    var filter = gulpfilter( [ '*', '!**/*.css' ], {restore: true} );

    gulp.task( TASK_NAME, options.dependencies || [], function ( done ) {
        gulp.src( options.src, options.srcOptions )
            .pipe( inject(
                gulp.src(options.inject.src, options.inject.srcOptions)
                    .pipe(filter)
                    .pipe( angularFilesort() )
                    .pipe(filter.restore),
                {
                    addRootSlash: false
                }
            ) )
            .pipe( changed( options.dest, { hasChanged: changed.compareSha1Digest } ) )
            .pipe( gulp.dest( options.dest ) )
            .on( 'end', done );

    } );

};




