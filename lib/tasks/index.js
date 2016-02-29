'use strict';

var path = require( 'path' ),
    fs = require( 'fs' ),

    baseDir = (__dirname + path.sep).split( path.sep ).join('\\' + path.sep),
    rexRelativePath = new RegExp( '(?:'+baseDir+')(.*?)(?:\\w\\-)*\\.js$', 'i');


function resolveTaskName( filepath ) {
    return filepath.match( rexRelativePath )[1 ].split(path.sep ).join(':');
}

function getTasksRecursive( curPath ) {

    curPath = curPath || __dirname;

    fs.readdirSync( curPath ).forEach( function ( node ) {

        if ( node !== 'index.js' && !node.startsWith( '_' ) ) {

            var targetPath,
                fstat;

            targetPath = path.join( curPath, node );

            fstat = fs.lstatSync( targetPath );

            if ( fstat.isFile() ) {

                this[ resolveTaskName( targetPath ) ] = require( targetPath );

            } else if ( fstat.isDirectory() ) {
                getTasksRecursive.call( this, targetPath );
            }

        }

    }, this );

    return this;
}


module.exports = (function() {
    getTasksRecursive.call(this);
    return this;
}.call({}));


