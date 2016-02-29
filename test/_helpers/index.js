(function() {
    var path = require( 'path' ),
        fs = require( 'fs' ),
        regFixHyphen = /-([a-z])/ig,
        fnFixHyphen = function ( str ) {
            return str.replace( regFixHyphen, function ( all, letter ) {
                return letter.toUpperCase();
            } );
        };

    fs.readdirSync( __dirname ).forEach( function ( file ) {
        /* If its the current file ignore it */
        if ( file === 'index.js' || file.startsWith( '_' ) ) return;

        /* Store module with its name (from filename) */
        module.exports[ fnFixHyphen( path.basename( file, '.js' ) ) ] = require( path.join( __dirname, file ) );
    } );
})();
