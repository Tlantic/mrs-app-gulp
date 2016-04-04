var path = require( 'path' ),
    fs = require('fs');


fs.readdirSync( __dirname ).forEach( function ( file ) {
    if ( file !== 'index.js' && !file.startsWith( '_' ) ) {
        module.exports[ path.basename( file, '.js' ) ] = require( path.join( __dirname, file ) );
    }
} );

