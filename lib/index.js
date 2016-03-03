'use strict';

var gutil = require( 'gulp-util' ),
    path = require( 'path' ),
    tasks=require( './tasks' ),
    defaults = require( './_defaults' ),
    extend = require( 'extendify' )( {
        inPlace: false,
        strings: 'or',
        arrays: 'replace'
    } );


function _loadTasks( newTasks ) {

    Object.keys( newTasks ).forEach( function ( taskName ) {
        var taskOptions=this.mrsTasks[ taskName ]=newTasks[ taskName ];
        tasks[ taskName ]( this, extend( this.options, taskOptions ) );
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
