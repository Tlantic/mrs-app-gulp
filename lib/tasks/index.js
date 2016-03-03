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

    /*
     this['install'] = require('./install');
     this['install:git-check'] = require('./install/git-check');
     this['default'] = require('./default');
     this['watch'] = require('./watch');
     this['watch:start'] = require('./watch/start');
     this['build'] = require('./build');
     this['build:clean'] = require('./build/clean');
     this['build:config'] = require('./build/config');
     this['build:config:app'] = require('./build/config/app');
     this['build:config:cordova'] = require('./build/config/cordova');
     this['build:i18n'] = require('./build/i18n');
     this['build:i18n:merge'] = require('./build/i18n/merge');
     this['build:img'] = require('./build/img');
     this['build:img:merge'] = require('./build/img/merge');
     this['build:index-files'] = require('./build/index-files');
     this['build:index-files:merge'] = require('./build/index-files/merge');
     this['build:js'] = require('./build/js');
     this['build:js:flatten'] = require('./build/js/flatten');
     this['build:js:merge'] = require('./build/js/merge');
     this['build:lib'] = require('./build/lib');
     this['build:lib:merge'] = require('./build/lib/merge');
     this['build:resources'] = require('./build/resources');
     this['build:resources:merge'] = require('./build/resources/merge');
     this['build:style'] = require('./build/style');
     this['build:style:merge'] = require('./build/style/merge');
     this['build:style:process'] = require('./build/style/process');
     this['build:templates'] = require('./build/templates');
     this['build:templates:cache'] = require('./build/templates/cache');
     this['build:templates:merge'] = require('./build/templates/merge');

     this['clean'] = require('./clean');
     */
    return this;
}.call({}));


