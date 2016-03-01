var path = require( 'path' ),
    fs = require( 'fs' ),
    regFixHyphen = /-([a-z])/ig;

function fnFixHyphen( str ) {
    return str.replace( regFixHyphen, function ( all, letter ) {
        return letter.toUpperCase();
    } );
}

fs.readdirSync( __dirname ).forEach( function ( file ) {
    if ( file !== 'index.js' && !file.startsWith( '_' ) ) {
        module.exports[ path.basename( file, '.js' ) ] = require( path.join( __dirname, file ) );
    }
} );
