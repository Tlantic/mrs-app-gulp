var expect = require('chai').expect,
    path = require('path'),
    mrsAppGulp = require('../../lib/mrsGulp'),
    fs = require('fs');


describe( 'mrs-app-gulp', function () {

    it('should be function of length 2', function (done) {
        expect(mrsAppGulp).to.be.a.function;
        expect(mrsAppGulp).to.have.length(2);
        done();
    });


    fs.readdirSync( __dirname ).forEach( function ( file ) {

        if ( file !== 'index.js' && !file.startsWith( '_' ) ) {

            describe( '#' + path.basename( file, '.test.js' ), function () {
                require( path.join( __dirname, file ) );

            } );

        }
    } );

});






