'use strict';

 var path = require('path' ),
     changed = require('gulp-changed'),
     jsuglify = require('gulp-uglify'),
     gulpIf = require('gulp-if'),
     templateCache = require('gulp-angular-templatecache'),
     replace = require('gulp-replace-task');


const TASK_NAME = path.basename(__dirname) + ':' + path.basename( __filename, '.js' );



module.exports = function ( gulp, options ) {

    options.replacements = options.replacements || {};

    gulp.task( TASK_NAME, options.dependencies || [], function( done ) {
        gulp.src( options.src, options.srcOptions )
            .pipe(changed(options.dest))
            .pipe(templateCache('templates.js', {
                module: 'App',
                root: 'templates/'
            }))
            .pipe(gulpIf(options.minify, jsuglify()))
            .pipe(replace({
                patterns: options.replacements.patterns || []
            }))
            .pipe(gulp.dest(options.dest))
            .on( 'end', done );
    });

};
