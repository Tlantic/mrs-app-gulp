'use strict';

var gutil = require( 'gulp-util' ),
    path = require( 'path' ),
    tasks=require( './tasks' ),
    defaults = require( './_defaults' ),
    argv=require( 'yargs' )
        .count( 'verbose' )
        .alias( 'v', 'verbose' )
        .argv,
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

                var taskPath=path.join( __dirname, 'tasks', taskName.split( ':' ).join( path.sep ) );

                    task=require( taskPath );

            } catch ( e ) {

                var taskPath=path.join( process.cwd(), 'tasks', taskName.split( ':' ).join( path.sep ) );

                if ( e.message.startsWith( 'Cannot find module ' ) ) {
                    task=require( taskPath );
                } else {
                    throw e;
                }
                }


            this.task( taskName, task);

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

    this.options=extend( options || {}, defaults );

    this.mrsTasks=this.options.tasks || {};
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


    gulp._init=_init;
    gulp.load=_loadTasks;
    gulp.task=_task;

    return gulp._init( options );
};
