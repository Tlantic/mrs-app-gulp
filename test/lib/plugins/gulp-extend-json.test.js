var expect = require( 'chai' ).expect,
    gulp = require( 'gulp' ),
    fs = require( 'fs' ),
    path = require( 'path' ),
    assert = require( 'stream-assert' ),
    extendJson = require( '../../../lib/plugins/gulp-extend-json.js' ),
    rm = require( '../../_helpers/rm' ),
    testPaths = require( '../../_assets/paths' );


describe( path.basename( __filename, '.test.js' ), function () {

    it( 'should output a file for each streamed filename', function ( done ) {
        rm( testPaths.dest );
        gulp.src( [ path.join( testPaths.src1, 'webapp.json' ),
                path.join( testPaths.src2, 'widget.json' ),
                path.join( testPaths.src2, 'webapp.json' ),
                path.join( testPaths.src1, 'glossary.json' ) ] )
            .pipe( extendJson() )
            .pipe( gulp.dest( testPaths.dest ) )
            .pipe( assert.end( function () {
                expect( fs.readdirSync( testPaths.dest ).length ).to.be.equal( 3 );
                done();
            } ) );

    } );

    it( 'should extend streamed content in order of arrival ( extend({a:1}, {a:2}) <=> {a:1} )', function ( done ) {
        rm( testPaths.dest );
        gulp.src( [ path.join( testPaths.src1, 'webapp.json' ),
                path.join( testPaths.src2, 'widget.json' ) ] )
            .pipe( extendJson() )
            .pipe( gulp.dest( testPaths.dest ) )
            .pipe( assert.end( function () {
                fs.readFile( path.join( testPaths.dest, 'webapp.json' ), 'utf8', function ( err, data ) {
                    if ( err ) throw err;

                    var obj = JSON.parse( data );
                    expect( obj ).to.have.deep.property( 'web-app.servlet[0].servlet-name' );
                    expect( obj[ 'web-app' ].servlet[ 0 ][ 'servlet-name' ] ).to.be.equal( 'src1' );
                    done();
                } );

            } ) );

    } );

} );
