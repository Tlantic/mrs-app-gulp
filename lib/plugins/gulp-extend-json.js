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


const PLUGIN_NAME = 'extend-json';

/**
 * Extends json files that share the same name into one.
 * First come first set style.
 * @param extensionsPath
 */
function extendJson(  ) {


    var data = {},
        firstFile;



    function bufferContents( file, enc, callback ) {

        var fileName,
            isFirstTry,
            srcObj;


        if ( file.isNull() ) {
            callback();
        }

        if ( file.isStream() ) {
            return this.emit( 'error', new PluginError( PLUGIN_NAME, 'Streaming not supported' ) );
        }

        firstFile   =   firstFile || file;
        fileName    =   path.basename(file.relative);
        isFirstTry  =   data[ fileName ] === void 0;

        try {
            gutil.log( PLUGIN_NAME + ': Extending ' + fileName +' with \'' + gutil.colors.cyan(path.join(file.base, file.relative )) + '\'...' );
            if ( isFirstTry ) {

                data[ fileName ] = JSON.parse( file.contents.toString() );
            } else {

                srcObj = JSON.parse( file.contents.toString() );
                data[ fileName ] = extend( data[ fileName ], srcObj );
            }

        } catch ( err ) {
            return this.emit( 'error',
                new PluginError( PLUGIN_NAME, 'Error parsing JSON: ' + err + ', file: ' + gutil.colors.red( path.join( file.base, file.relative ) ) ) );
        }

        callback();
    }


    function endStream(  ) {

        for ( var fileName in data ) {

            //Configure outgoing file.
            var joinedPath = path.join( firstFile.base, fileName );
            //Emit outgoing file and end.
            this.push( new File( {
                cwd: firstFile.cwd,
                base: firstFile.base,
                path: joinedPath,
                contents: new Buffer( JSON.stringify(data[fileName]) )
            } ) );

            gutil.log( PLUGIN_NAME + ': '+ gutil.colors.green('Done with ' + fileName ) +'.' );
        }

        this.emit( "end" );

    }

    return through.obj( bufferContents, endStream );
}


module.exports = extendJson;
