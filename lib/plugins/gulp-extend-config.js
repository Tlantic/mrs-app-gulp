'use strict';

var through     =   require( 'through2' ),
    path        =   require( 'path' ),
    fs          =   require( 'fs' ),
    gutil       =   require( 'gulp-util' ),
    extend      =   require( 'extendify' )( {
        inPlace: false,
        arrays: 'replace'
    } ),
    File        =   gutil.File,
    PluginError =   gutil.PluginError;


const PLUGIN_NAME = 'extend-config';

/**
 * Extends json files that share the same name into one.
 * JSON must be a single array with each element containing and object with an
 * object id named module { module: <string> }.
 * First come first set style.
 */
function extendConfig(  ) {


    var data = {},
        firstFile;



    function bufferContents( file, enc, callback ) {

        var fileName,
            fileData,
            srcObj;


        if ( file.isNull() ) {
            callback();
        }

        if ( file.isStream() ) {
            return this.emit( 'error', new PluginError( PLUGIN_NAME, 'Streaming not supported' ) );
        }


        firstFile   =   firstFile || file;
        fileName    =   path.basename(file.relative);
        fileData    =   data[ fileName ] || {};

        gutil.log( PLUGIN_NAME + ': Extending ' + fileName +' with \''+ gutil.colors.cyan(path.join(file.base, file.relative )) + '\'...' );

        try {

            srcObj = JSON.parse( file.contents.toString() );

            if ( !( srcObj instanceof Array ) ) {
                return this.emit( 'error',
                    new PluginError( PLUGIN_NAME, 'Error parsing JSON: expecting an JSON array of object, file: ' + gutil.colors.red( path.join( file.base, file.relative ) ) ) );
            }


            srcObj.forEach( function ( moduleConfig ) {

                fileData[ moduleConfig.module ] = extend(fileData[ moduleConfig.module ] || {}, moduleConfig );
            } );
            data[ fileName ] = fileData;

        } catch ( err ) {
            return this.emit( 'error',
                new PluginError( PLUGIN_NAME, 'Error parsing JSON: ' + err + ', file: ' + gutil.colors.red( path.join( file.base, file.relative ) ) ) );
        }

        callback();
    }


    function endStream(  ) {

        for ( var fileName in data ) {
            if ( data.hasOwnProperty(fileName) ) {

                //Configure outgoing file.
                var joinedPath = path.join( firstFile.base, fileName ),
                    configData = data[ fileName ],
                    configFile = [];

                Object.keys(configData).forEach(m = > configFile.push(configData[m])
            )

                //Emit outgoing file and end.
                this.push( new File( {
                    cwd: firstFile.cwd,
                    base: firstFile.base,
                    path: joinedPath,
                    contents: new Buffer( JSON.stringify(configFile) )
                } ) );

                gutil.log(PLUGIN_NAME + ': Done with ' + gutil.colors.green(fileName) + '.');

            };
        }

        this.emit( "end" );

    }

    return through.obj( bufferContents, endStream );
}


module.exports = extendConfig;
