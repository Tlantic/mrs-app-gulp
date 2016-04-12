'use strict';

var path = require('path'),
    sass=require( 'gulp-sass' ),
    changed = require('gulp-changed'),
    gulpIf = require('gulp-if'),
    cssMinify = require('gulp-minify-css');

const TASK_NAME = path.basename(__dirname) + ':' + path.basename(__filename, '.js');


/**
 * options = {
 *      target: gulp.options.merge.www.scss.deep,
 *      targetOptions: {},
 *      dest: gulp.options.paths.merge.www.css.root
 *      minify: true
 * }
 * @param gulp
 * @param options
 */
module.exports=function ( gulp, options ) {

    gulp.task( TASK_NAME, options.dependencies || [], function ( done ) {

        gulp.src( options.src, options.srcOptions )
            .pipe(changed(options.dest))
            .pipe(sass({errLogToConsole: true}))
            .pipe(gulpIf(options.minify, cssMinify()))
            .pipe(gulp.dest(options.dest))
            .on( 'end', done );
    } );

};
