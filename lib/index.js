'use strict';

var gutil = require( 'gulp-util' ),
    path = require( 'path' ),
    defaults = require( './_defaults' ),
    extend = require( 'extendify' )( {
        inPlace: false,
        strings: 'or',
        arrays: 'replace'
    } );



function _loadTasks( tasks ) {
    Object.keys( tasks ).forEach( function ( taskName ) {

        this.mrsTasks[ taskName ] = tasks[ taskName ];

        try {
            var task;

            try {
                task = require( path.join( __dirname, 'tasks', taskName.split( ':' ).join( path.sep ) ) );

            } catch ( e ) {
                if ( e.message.startsWith('Cannot find module ')) {
                    task = require( path.join( process.cwd(), 'tasks', taskName.split( ':' ).join( path.sep ) ) );
                } else {
                    throw e;
                }
            }

            this.task( taskName, task);
            gutil.log("mrs-app-gulp: Loaded Task: \'"+ gutil.colors.cyan(taskName)+"\'...");

        } catch( e ) {

            if ( e.message.startsWith('Cannot find module ')) {
                gutil.log(e);
            } else {
                throw e;
            }

        }



    }, this );

    return this;
}

function _init( options ) {

    options = extend( options || {}, defaults );

    Object.defineProperties( this, {

        options: {
            configurable: true,
            writable: false,
            value: options
        },

        mrsTasks: {
            configurable: true,
            writable: false,
            value: options.tasks || {}
        }

    } );

    delete this.options.tasks;
    return this.load( this.mrsTasks );
}


module.exports = function decorator( gulp, options ) {

    var fnTask = gulp.task;

    function _task( name, task  ) {

        if ( arguments.length < 3 && typeof task === 'function' ) {
            task( this, extend( this.mrsTasks[ name ], this.options ) );
        } else {
            fnTask.apply( this, arguments );
        }
    }


    Object.defineProperties( gulp, {

        _init: {
            writable: false,
            configurable: false,
            enumerable: false,
            value: _init
        },

        load: {
            writable: false,
            configurable: false,
            enumerable: false,
            value: _loadTasks
        },

        task: {
            writable: false,
            configurable: false,
            enumerable: false,
            value: _task
        },

        globs: {

            configurable: false,
            enumerable: false,
            get: function() {
                return this.options.globs;
            },
            set: function(value) {
                this.options.globs = value;
            }
        }

    });


    return gulp._init( options );
};
