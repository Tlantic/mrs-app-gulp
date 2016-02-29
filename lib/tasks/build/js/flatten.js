
var path = require('path' ),
    foreach = require('gulp-foreach' ),
    replace=require( 'gulp-replace-task' ),
    fs = require('fs' ),
    concat = require('gulp-concat' );


const TASK_NAME =  __dirname.split( path.sep ).splice( -2 ).join(':') + ':' + path.basename( __filename, '.js' );


function rm (filepath) {
    if( fs.existsSync(filepath) ) {
        fs.readdirSync(filepath).forEach(function(file){
            var curPath = path.join( filepath, file);
            if(fs.lstatSync(curPath).isDirectory()) { // recurse
                rm(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(filepath);
    }
}

/**
 *
 * @param gulp
 * @param options
 */
module.exports = function ( gulp, options ) {

    var dirs = [];

    options.replaces  = options.replaces || [];


    gulp.task( TASK_NAME, options.dependencies || [], function( done ) {
        gulp.src( options.src, options.srcOptions )
            .pipe(foreach(function(stream, file) {
                if (fs.statSync(file.path).isDirectory()) {
                    dirs.push(file.path);
                    return gulp.src(path.join(file.path, '**', '*.js'))
                        .pipe(concat(path.basename(file.path) + '.js'));
                }
                return stream;
            }))
            .pipe(gulp.dest(options.dest))
            .on('end', function() { dirs.forEach( d => rm(d) ); done(); });
    } );

};
